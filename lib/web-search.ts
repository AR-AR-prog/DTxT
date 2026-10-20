/**
 * Web Search Service for Cross-Source Verification
 * 
 * This module integrates with Google Custom Search API to find related sources
 * that discuss the same topic as an analyzed article. Sources are categorized
 * as supporting, contradicting, or neutral based on their content.
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface SearchResult {
  title: string
  url: string
  snippet: string
  source: string // domain name
  publishedDate?: string
}

export interface RelatedSources {
  supporting: SearchResult[]
  contradicting: SearchResult[]
  neutral: SearchResult[]
}

export class SearchAPIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public isQuotaExceeded: boolean = false
  ) {
    super(message)
    this.name = 'SearchAPIError'
  }
}

// ============================================================================
// Configuration
// ============================================================================

const GOOGLE_SEARCH_API_KEY = process.env.GOOGLE_SEARCH_API_KEY
const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID
const GOOGLE_SEARCH_API_URL = 'https://www.googleapis.com/customsearch/v1'

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Extracts domain name from URL
 */
function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return 'unknown'
  }
}

/**
 * Removes common stop words and extracts meaningful keywords
 */
function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ])

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word))

  // Return unique words, limited to top 10 by frequency
  const wordFreq = new Map<string, number>()
  words.forEach(word => {
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1)
  })

  return Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word)
}

// ============================================================================
// Main Functions
// ============================================================================

/**
 * Extracts key topics and claims from article title and content
 * Uses simple keyword extraction
 * 
 * @param title - Article title
 * @param content - Article content (summary or full text)
 * @returns Array of topic strings for search queries
 */
export async function extractKeyTopics(
  title: string,
  content: string
): Promise<string[]> {
  try {
    // Combine title and content, giving more weight to title
    const combinedText = `${title} ${title} ${content}`
    
    // Extract keywords
    const keywords = extractKeywords(combinedText)
    
    // Return top 5 keywords as topics
    return keywords.slice(0, 5)
  } catch (error) {
    console.error('Error extracting key topics:', error)
    return []
  }
}

/**
 * Searches for sources related to the analyzed article using Google Custom Search API
 * 
 * @param articleTitle - Title of the analyzed article
 * @param articleSummary - Summary from credibility analysis
 * @param mainClaims - Key claims extracted from the article
 * @returns Related sources categorized by stance
 */
export async function searchRelatedSources(
  articleTitle: string,
  articleSummary: string,
  mainClaims: string[]
): Promise<RelatedSources> {
  // Check if API credentials are configured
  if (!GOOGLE_SEARCH_API_KEY || !GOOGLE_SEARCH_ENGINE_ID) {
    console.warn('Google Search API credentials not configured')
    return {
      supporting: [],
      contradicting: [],
      neutral: []
    }
  }

  try {
    // Extract key topics for search query
    const topics = await extractKeyTopics(articleTitle, articleSummary)
    
    if (topics.length === 0) {
      return {
        supporting: [],
        contradicting: [],
        neutral: []
      }
    }

    // Build search query from top topics
    const searchQuery = topics.slice(0, 3).join(' ')
    
    // Call Google Custom Search API
    const searchParams = new URLSearchParams({
      key: GOOGLE_SEARCH_API_KEY,
      cx: GOOGLE_SEARCH_ENGINE_ID,
      q: searchQuery,
      num: '10', // Request 10 results
      sort: 'date' // Prefer recent articles
    })

    const response = await fetch(`${GOOGLE_SEARCH_API_URL}?${searchParams}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      const isQuotaExceeded = response.status === 429
      throw new SearchAPIError(
        `Search API request failed: ${response.statusText}`,
        response.status,
        isQuotaExceeded
      )
    }

    const data = await response.json()
    
    // Parse search results
    const searchResults: SearchResult[] = (data.items || []).map((item: any) => ({
      title: item.title || '',
      url: item.link || '',
      snippet: item.snippet || '',
      source: extractDomain(item.link || ''),
      publishedDate: item.pagemap?.metatags?.[0]?.['article:published_time']
    }))

    // For MVP, categorize all results as neutral
    // Future enhancement: Use AI to categorize as supporting/contradicting
    return {
      supporting: [],
      contradicting: [],
      neutral: searchResults.slice(0, 5) // Return top 5 results
    }

  } catch (error) {
    if (error instanceof SearchAPIError) {
      if (error.isQuotaExceeded) {
        console.warn('Google Search API quota exceeded')
      } else {
        console.error('Search API error:', error.message)
      }
    } else {
      console.error('Unexpected error in searchRelatedSources:', error)
    }

    // Return empty results on error (graceful degradation)
    return {
      supporting: [],
      contradicting: [],
      neutral: []
    }
  }
}
