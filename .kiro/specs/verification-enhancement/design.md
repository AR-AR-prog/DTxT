# Design Document: Verification Enhancement

## Overview

The Verification Enhancement feature extends the existing URL credibility analysis system with four key improvements:

1. **Cross-Source Verification**: Integrates web search to find and display supporting or contradicting sources for analyzed articles
2. **Navigation Enhancement**: Adds a "Back to Home" button to authentication pages for improved UX
3. **Testimonial Updates**: Replaces placeholder testimonials with authentic team member quotes
4. **Database Cleanup**: Removes test data from the production database

This feature enhances user trust by providing cross-referenced sources, improves navigation flow, and ensures data integrity. The implementation leverages existing patterns in the codebase (Next.js 16, React 19, TypeScript, Prisma, Tailwind CSS) and integrates a web search API for source discovery.

## Architecture

### System Components

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[VerifyClient] --> B[ResultCard]
        B --> C[BackerInformation Component]
        D[Login/Register Pages] --> E[SignInPage Component]
        E --> F[Back to Home Button]
    end
    
    subgraph "API Layer"
        G[/api/analyze] --> H[analyzeCredibilityWithGemini]
        G --> I[searchRelatedSources]
        I --> J[Web Search API]
    end
    
    subgraph "Data Layer"
        K[Prisma Client] --> L[(SQLite Database)]
        M[Database Cleanup Script]
        M --> L
    end
    
    A --> G
    H --> A
    I --> A
    
    style C fill:#e1f5ff
    style F fill:#e1f5ff
    style I fill:#fff4e1
    style M fill:#ffe1e1
```

### Data Flow: Cross-Source Verification

1. User submits URL for analysis
2. `/api/analyze` fetches article content and analyzes credibility (existing flow)
3. After credibility analysis, extract key topics/claims from the article
4. Query web search API with extracted topics
5. Filter and rank search results by relevance and credibility
6. Return top 3-5 supporting and contradicting sources
7. Display sources in ResultCard's BackerInformation section

### Integration Points

- **Web Search API**: New integration for finding related sources
- **ResultCard Component**: Extended to display backer information
- **SignInPage Component**: Modified to include navigation button
- **Authentication Pages**: Updated testimonial content
- **Database**: Cleanup script for test data removal

## Components and Interfaces

### 1. Web Search Integration

#### API Selection

**Recommended: Google Custom Search JSON API**
- **Pros**: Reliable, well-documented, generous free tier (100 queries/day), high-quality results
- **Cons**: Requires Google Cloud project setup
- **Alternative**: Bing Web Search API (similar features, Microsoft Azure)

#### Environment Configuration

```typescript
// .env additions
GOOGLE_SEARCH_API_KEY=your_api_key_here
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here
```

#### Search Service Interface

```typescript
// lib/web-search.ts

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

/**
 * Searches for sources related to the analyzed article
 * @param articleTitle - Title of the analyzed article
 * @param articleSummary - Summary from credibility analysis
 * @param mainClaims - Key claims extracted from the article
 * @returns Related sources categorized by stance
 */
export async function searchRelatedSources(
  articleTitle: string,
  articleSummary: string,
  mainClaims: string[]
): Promise<RelatedSources>

/**
 * Extracts key topics and claims from article content
 * Uses simple keyword extraction or Gemini API
 */
export async function extractKeyTopics(
  title: string,
  content: string
): Promise<string[]>
```

### 2. Enhanced API Response

#### Updated `/api/analyze` Response

```typescript
// app/api/analyze/route.ts - Updated response type

interface AnalyzeResponse {
  success: boolean
  url: string
  title: string
  analysis: {
    score: number
    summary: string
    reasoning: string
    verdict: string
    factors?: string[]
  }
  backerInformation?: {
    supporting: SearchResult[]
    contradicting: SearchResult[]
    neutral: SearchResult[]
  }
  remaining: number
}
```

### 3. ResultCard Component Enhancement

#### BackerInformation Sub-Component

```typescript
// components/verify/BackerInformation.tsx

interface BackerInformationProps {
  supporting: SearchResult[]
  contradicting: SearchResult[]
  neutral: SearchResult[]
}

export function BackerInformation({ 
  supporting, 
  contradicting, 
  neutral 
}: BackerInformationProps) {
  // Displays categorized sources with visual indicators
  // Supporting: green accent, checkmark icon
  // Contradicting: red accent, alert icon
  // Neutral: gray accent, info icon
}
```

#### Updated ResultCard Props

```typescript
// components/verify/ResultCard.tsx - Updated interface

interface ResultCardProps {
  analysis: {
    score: number
    summary: string
    reasoning: string
    verdict: string
    factors?: string[]
  }
  backerInformation?: {
    supporting: SearchResult[]
    contradicting: SearchResult[]
    neutral: SearchResult[]
  }
}
```

### 4. SignInPage Component Enhancement

#### Back to Home Button

```typescript
// components/ui/sign-in.tsx - Add button above form

<div className="flex items-center gap-2 mb-6">
  <Link 
    href="/" 
    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
  >
    <ArrowLeft className="w-4 h-4" />
    Back to Home
  </Link>
</div>
```

### 5. Database Cleanup Script

```typescript
// scripts/cleanup-test-data.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanupTestData() {
  // Identify test accounts by email patterns or specific identifiers
  const testPatterns = [
    '%copilot%',
    '%test%',
    '%@example.com',
    // Add specific test email patterns
  ]
  
  // Log before deletion
  const testUsers = await prisma.user.findMany({
    where: {
      OR: testPatterns.map(pattern => ({
        email: { contains: pattern }
      }))
    }
  })
  
  console.log(`Found ${testUsers.length} test accounts`)
  
  // Delete test accounts
  const result = await prisma.user.deleteMany({
    where: {
      OR: testPatterns.map(pattern => ({
        email: { contains: pattern }
      }))
    }
  })
  
  console.log(`Deleted ${result.count} test accounts`)
}

cleanupTestData()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

## Data Models

### Extended Analysis Result

The existing `CredibilityAnalysis` interface remains unchanged. The backer information is added as a separate field in the API response to maintain backward compatibility.

```typescript
// No changes to lib/gemini.ts CredibilityAnalysis interface

// New type in lib/web-search.ts
export interface SearchResult {
  title: string
  url: string
  snippet: string
  source: string
  publishedDate?: string
}

export interface RelatedSources {
  supporting: SearchResult[]
  contradicting: SearchResult[]
  neutral: SearchResult[]
}
```

### Database Schema

No database schema changes required. The User model remains unchanged. Test data cleanup operates on existing schema.

## Error Handling

### Web Search API Errors

```typescript
// lib/web-search.ts error handling

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

// Error scenarios:
// 1. API key invalid/missing -> Return empty results, log error
// 2. Quota exceeded -> Return empty results, show user message
// 3. Network timeout -> Return empty results, log error
// 4. Invalid response -> Return empty results, log error

// Graceful degradation: If search fails, analysis still succeeds
// BackerInformation section shows "No cross-source data available"
```

### API Route Error Handling

```typescript
// app/api/analyze/route.ts

try {
  const backerInfo = await searchRelatedSources(title, analysis.summary, [])
  return NextResponse.json({
    // ... existing response
    backerInformation: backerInfo
  })
} catch (searchError) {
  // Log error but don't fail the request
  console.error('Search API error:', searchError)
  return NextResponse.json({
    // ... existing response
    backerInformation: undefined // Frontend handles gracefully
  })
}
```

### UI Error States

- **No sources found**: Display message "No cross-source verification data available for this article"
- **Search API unavailable**: Display message "Cross-source verification temporarily unavailable"
- **Partial results**: Display available sources even if some categories are empty

## Testing Strategy

This feature involves UI enhancements, external API integration, content updates, and database operations. Property-based testing is not applicable as the feature does not involve pure functions with universal properties. Instead, we will use:

### Unit Tests

**Web Search Integration** (`lib/web-search.test.ts`):
- Test `extractKeyTopics` with sample article content
- Test `searchRelatedSources` with mocked API responses
- Test error handling for various API failure scenarios
- Test result filtering and categorization logic

**API Route** (`app/api/analyze/route.test.ts`):
- Test successful analysis with backer information
- Test graceful degradation when search API fails
- Test response format matches expected interface
- Test that existing analysis flow is not broken

**ResultCard Component** (`components/verify/ResultCard.test.tsx`):
- Test rendering with backer information present
- Test rendering without backer information (graceful fallback)
- Test rendering of supporting, contradicting, and neutral sources
- Test visual indicators for each source category

**BackerInformation Component** (`components/verify/BackerInformation.test.tsx`):
- Test rendering of empty state
- Test rendering with only supporting sources
- Test rendering with only contradicting sources
- Test rendering with mixed sources
- Test link functionality and accessibility

**SignInPage Component** (`components/ui/sign-in.test.tsx`):
- Test "Back to Home" button renders in login mode
- Test "Back to Home" button renders in register mode
- Test button navigation functionality
- Test button styling and accessibility

### Integration Tests

**End-to-End Analysis Flow**:
- Submit URL → Receive analysis with backer information
- Verify backer information displays correctly in UI
- Test with real Google Search API (in staging environment)

**Authentication Flow**:
- Navigate to login page → Click "Back to Home" → Verify landing page loads
- Navigate to register page → Click "Back to Home" → Verify landing page loads

### Manual Testing

**Testimonial Updates**:
- Visual inspection of login page testimonials
- Visual inspection of register page testimonials
- Verify team member names and roles are correct

**Database Cleanup**:
- Run cleanup script in development environment
- Verify test accounts are removed
- Verify legitimate accounts are preserved
- Review cleanup logs for accuracy

### Test Coverage Goals

- Unit test coverage: >80% for new code
- Integration test coverage: All critical user flows
- Manual testing: All UI changes verified visually

## Implementation Notes

### Phase 1: Web Search Integration
1. Set up Google Custom Search API credentials
2. Implement `lib/web-search.ts` with search and extraction functions
3. Add error handling and graceful degradation
4. Write unit tests for search functionality

### Phase 2: API Enhancement
1. Update `/api/analyze` route to call search service
2. Integrate search results into response
3. Ensure backward compatibility
4. Test API with and without search results

### Phase 3: UI Updates
1. Create `BackerInformation` component
2. Update `ResultCard` to display backer information
3. Add "Back to Home" button to `SignInPage`
4. Update testimonial content in login/register pages
5. Test all UI changes across different screen sizes

### Phase 4: Database Cleanup
1. Create cleanup script with test account patterns
2. Run script in development environment
3. Review and verify results
4. Document cleanup process for future reference

### Deployment Considerations

- **Environment Variables**: Add `GOOGLE_SEARCH_API_KEY` and `GOOGLE_SEARCH_ENGINE_ID` to production environment
- **API Quotas**: Monitor Google Search API usage (100 free queries/day)
- **Graceful Degradation**: Ensure app works without search API if quota exceeded
- **Database Backup**: Create backup before running cleanup script in production
- **Rollback Plan**: Keep cleanup script reversible by logging deleted records

### Performance Considerations

- **Search API Latency**: Add 200-500ms to analysis time
- **Caching**: Consider caching search results for identical queries (future enhancement)
- **Parallel Requests**: Fetch credibility analysis and search results in parallel where possible
- **Rate Limiting**: Respect Google Search API rate limits (100 queries/day free tier)

