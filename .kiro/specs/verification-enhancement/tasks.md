# Implementation Plan: Verification Enhancement

## Overview

This implementation plan breaks down the Verification Enhancement feature into four phases: Web Search Integration, API Enhancement, UI Updates, and Database Cleanup. Each task builds incrementally, with early validation through unit tests. The implementation uses TypeScript, React 19, Next.js 16, Prisma, and integrates Google Custom Search API for cross-source verification.

## Tasks

- [x] 1. Set up Google Custom Search API configuration
  - Add `GOOGLE_SEARCH_API_KEY` and `GOOGLE_SEARCH_ENGINE_ID` to `.env` file
  - Add corresponding entries to `.env.example` with placeholder values
  - Document API setup instructions in comments
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 2. Implement web search service
  - [x] 2.1 Create `lib/web-search.ts` with TypeScript interfaces
    - Define `SearchResult` interface with title, url, snippet, source, publishedDate fields
    - Define `RelatedSources` interface with supporting, contradicting, neutral arrays
    - Define `SearchAPIError` custom error class for error handling
    - _Requirements: 1.1, 1.2, 1.5_
  
  - [x] 2.2 Implement `extractKeyTopics` function
    - Extract key topics and claims from article title and content
    - Use simple keyword extraction or integrate with Gemini API
    - Return array of topic strings for search queries
    - _Requirements: 1.1, 1.2_
  
  - [x] 2.3 Implement `searchRelatedSources` function
    - Integrate with Google Custom Search JSON API
    - Query API with extracted topics from article
    - Filter and categorize results into supporting, contradicting, neutral
    - Return top 3-5 sources per category
    - Handle API errors gracefully (quota exceeded, network timeout, invalid response)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  
  - [ ]* 2.4 Write unit tests for web search service
    - Test `extractKeyTopics` with sample article content
    - Test `searchRelatedSources` with mocked API responses
    - Test error handling for API failures (invalid key, quota exceeded, timeout)
    - Test result filtering and categorization logic
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 3. Checkpoint - Verify web search service works
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Enhance API route with backer information
  - [x] 4.1 Update `/api/analyze` route response type
    - Add `backerInformation` field to `AnalyzeResponse` interface
    - Include `RelatedSources` type with supporting, contradicting, neutral arrays
    - Maintain backward compatibility by making field optional
    - _Requirements: 1.1, 1.2, 1.6_
  
  - [x] 4.2 Integrate web search into analysis flow
    - Import `searchRelatedSources` and `extractKeyTopics` from `lib/web-search`
    - Call search service after credibility analysis completes
    - Add try-catch block for graceful degradation if search fails
    - Return backer information in API response
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  
  - [ ]* 4.3 Write unit tests for enhanced API route
    - Test successful analysis with backer information
    - Test graceful degradation when search API fails
    - Test response format matches expected interface
    - Test that existing analysis flow is not broken
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 5. Create BackerInformation UI component
  - [x] 5.1 Create `components/verify/BackerInformation.tsx`
    - Define `BackerInformationProps` interface with supporting, contradicting, neutral arrays
    - Implement component to display categorized sources
    - Add visual indicators: green checkmark for supporting, red alert for contradicting, gray info for neutral
    - Display source title, snippet, and clickable link for each result
    - Handle empty state with message "No cross-source verification data available"
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  
  - [ ]* 5.2 Write unit tests for BackerInformation component
    - Test rendering of empty state
    - Test rendering with only supporting sources
    - Test rendering with only contradicting sources
    - Test rendering with mixed sources
    - Test link functionality and accessibility
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [-] 6. Update ResultCard component
  - [ ] 6.1 Modify `components/verify/ResultCard.tsx` to include backer information
    - Add `backerInformation` field to `ResultCardProps` interface (optional)
    - Import and render `BackerInformation` component at bottom of card
    - Pass supporting, contradicting, neutral arrays to BackerInformation
    - Handle case when backerInformation is undefined (graceful fallback)
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  
  - [ ]* 6.2 Write unit tests for updated ResultCard
    - Test rendering with backer information present
    - Test rendering without backer information (graceful fallback)
    - Test that existing analysis display is not affected
    - _Requirements: 1.1, 1.2, 1.4_

- [x] 7. Update VerifyClient to handle backer information
  - Modify `components/verify/VerifyClient.tsx` to pass backerInformation from API response to ResultCard
  - Ensure type safety with updated response interface
  - _Requirements: 1.1, 1.2_

- [ ] 8. Checkpoint - Verify cross-source verification works end-to-end
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Add "Back to Home" button to authentication pages
  - [x] 9.1 Update `components/ui/sign-in.tsx` component
    - Import `Link` from `next/link` and `ArrowLeft` icon
    - Add "Back to Home" button above the form in both login and register modes
    - Use consistent styling with existing design system
    - Ensure button is visible without scrolling
    - Link button to "/" route
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  
  - [ ]* 9.2 Write unit tests for SignInPage component
    - Test "Back to Home" button renders in login mode
    - Test "Back to Home" button renders in register mode
    - Test button navigation functionality
    - Test button styling and accessibility
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 10. Update testimonial content on authentication pages
  - [x] 10.1 Update testimonials in login page
    - Modify `app/login/page.tsx` or testimonial data source
    - Add testimonial from France Lagazo with title "Project Manager"
    - Add testimonial from Jeiwinfrey Ulep with title "System Architect"
    - Ensure quotes reflect URL credibility verification purpose
    - _Requirements: 3.1, 3.2, 3.3, 3.5_
  
  - [x] 10.2 Update testimonials in register page
    - Modify `app/register/page.tsx` or testimonial data source
    - Use distinct quotes from login page
    - Include same team members with appropriate quotes
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 11. Checkpoint - Verify UI updates work correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Create database cleanup script
  - [x] 12.1 Create `scripts/cleanup-test-data.ts`
    - Import `PrismaClient` from `@prisma/client`
    - Define test account patterns (email patterns containing "copilot", "test", "@example.com")
    - Implement `cleanupTestData` function to find and delete test accounts
    - Add logging before and after deletion for audit purposes
    - Ensure legitimate accounts are preserved
    - Add proper error handling and Prisma disconnect
    - _Requirements: 4.1, 4.2, 4.3_
  
  - [x] 12.2 Add npm script for cleanup
    - Add `"cleanup:test-data": "tsx scripts/cleanup-test-data.ts"` to `package.json` scripts
    - Document usage in script comments
    - _Requirements: 4.1, 4.3_
  
  - [x] 12.3 Run cleanup script in development environment
    - Execute cleanup script to verify it works correctly
    - Review logs to confirm only test accounts are removed
    - Verify legitimate accounts are preserved
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 13. Final checkpoint - Integration testing
  - Test complete URL analysis flow with backer information display
  - Test authentication page navigation with "Back to Home" button
  - Verify testimonials display correctly on both login and register pages
  - Confirm database cleanup completed successfully
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Web search integration includes graceful degradation for API failures
- Database cleanup should be run with caution and proper backups
- Google Custom Search API has a free tier limit of 100 queries/day
