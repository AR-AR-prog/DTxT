# User Acceptance Testing (UAT) Guide Using Google Forms

## Project Context
This guide defines a complete User Acceptance Testing (UAT) process for the agpAIso system using Google Forms as the primary evaluation tool. It is intended for a college software engineering team preparing for capstone implementation, pilot rollout, and project defense.

---

## 1. UAT Overview

### Purpose of User Acceptance Testing
User Acceptance Testing verifies whether the system satisfies real user needs in realistic usage conditions. Unlike developer testing, UAT focuses on usability, clarity, reliability, and overall user confidence.

### Importance Before Deployment
UAT is the final quality gate before release. It helps ensure that:
- Core workflows are usable by target users.
- High-impact defects are discovered before production.
- Requirements are validated from the user perspective.
- The team has objective evidence for deployment readiness.

### Objectives of the Test
The UAT cycle should confirm that:
- Account registration and login flows work as expected.
- Main features (URL verification and AI analysis) are understandable and dependable.
- Navigation, interface labels, and actions are clear.
- Error handling is informative and user-friendly.
- Performance is acceptable for classroom and regular internet conditions.
- Overall user satisfaction meets the project acceptance target.

---

## 2. Google Forms UAT Structure

Design the form with the following sections in this sequence:

1. Tester Information
2. Instructions
3. Account Registration (Sign Up)
4. Login Module
5. Dashboard / Home Page
6. Core Features / Main Functions
7. Navigation and User Interface
8. Error Handling
9. Performance and Speed
10. Overall Satisfaction
11. Final Comments and Suggestions

Recommended Google Form settings:
- Collect email addresses: Enabled
- Limit to one response: Enabled (if using institutional accounts)
- Progress bar: Enabled
- Shuffle question order: Disabled (to preserve flow)
- Confirmation message: Include next steps and thank-you note

---

## 3. Ready-to-Copy Google Forms Question List

## Section A: Tester Information
1. Full Name (Short answer)
2. Email Address used during testing (Short answer)
3. Role (Multiple choice)
   - Student
   - Faculty
   - Staff
   - External User
4. Program/Department (Short answer)
5. Date of Testing (Date)
6. Device Used (Checkboxes)
   - Laptop/Desktop
   - Android Phone
   - iPhone/iPad
7. Browser Used (Multiple choice)
   - Google Chrome
   - Microsoft Edge
   - Mozilla Firefox
   - Safari
   - Other

## Section B: Instructions
Instruction text (Description only):
- Use the test account provided or create a new account.
- Complete each task in order: Sign Up, Login, Verify URL, check Account and Billing pages, and Logout.
- Answer all required questions based on your actual experience.
- Use the scale consistently:
  1 = Strongly Disagree, 2 = Disagree, 3 = Neutral, 4 = Agree, 5 = Strongly Agree.

Checkpoint question:
8. I have read and understood the test instructions. (Required, Multiple choice)
   - Yes
   - No

Use response validation in Google Forms to proceed only when the answer is Yes.

## Section C: Account Registration (Sign Up)
Use Linear Scale questions (1 to 5) for items 9 to 13.

9. The Sign Up button works properly.
10. The registration form is easy to understand.
11. Required fields (name, email, password) are clearly indicated.
12. Account creation completes successfully without errors.
13. Registration feedback (success/failure message) is clear.

14. Did you experience issues during sign-up? (Multiple choice)
   - No issues
   - Minor issues
   - Major issues

15. If there were issues, describe them. (Paragraph, optional)

## Section D: Login Module
Use Linear Scale questions (1 to 5) for items 16 to 21.

16. The Login button authenticates correctly.
17. The login process is straightforward.
18. Incorrect credentials trigger an appropriate message.
19. "Continue with Google" works as expected (if tested).
20. The system redirects to the correct page after login.
21. The Logout button functions properly.

22. Login outcome (Multiple choice)
   - Successful without issue
   - Successful with minor issue
   - Unsuccessful

## Section E: Dashboard / Home Page
Use Linear Scale questions (1 to 5) for items 23 to 27.

23. The dashboard/home page loads correctly.
24. Key information on the page is easy to understand.
25. Page layout and content hierarchy are clear.
26. Buttons and links on the page behave correctly.
27. The page supports my intended tasks effectively.

## Section F: Core Features / Main Functions
Use Linear Scale questions (1 to 5) for items 28 to 34.

28. The URL input accepts valid article links correctly.
29. The Analyze/Submit button responds correctly.
30. The system returns AI analysis results successfully.
31. The credibility score and verdict are understandable.
32. Save/Submit actions (if available) work reliably.
33. Account and billing pages display expected information.
34. Main features match expected project requirements.

35. Which core feature had the most issues? (Multiple choice)
   - Sign Up
   - Login
   - URL Verification
   - AI Analysis Display
   - Account/Billing
   - None

## Section G: Navigation and User Interface
Use Linear Scale questions (1 to 5) for items 36 to 41.

36. Navigation buttons are clear and easy to find.
37. Menu labels and page names are understandable.
38. The interface is user-friendly.
39. Visual design supports readability and focus.
40. Mobile/desktop responsiveness is acceptable.
41. Overall navigation flow is intuitive.

## Section H: Error Handling
Use Linear Scale questions (1 to 5) for items 42 to 46.

42. Error messages are understandable.
43. Error messages help me recover from mistakes.
44. Invalid input is detected correctly.
45. The system remains stable when errors occur.
46. No confusing or technical error language is shown.

47. Did you encounter any system error? (Multiple choice)
   - No
   - Yes (minor)
   - Yes (major)

48. Provide the exact step and error message observed. (Paragraph, optional)

## Section I: Performance and Speed
Use Linear Scale questions (1 to 5) for items 49 to 53.

49. Pages load quickly.
50. Login and authentication complete within acceptable time.
51. AI analysis results are generated within acceptable time.
52. Switching between pages is smooth.
53. Overall system speed is satisfactory.

## Section J: Overall Satisfaction
Use Linear Scale questions (1 to 5) for items 54 to 58.

54. The system is easy to use overall.
55. I am satisfied with the quality of this system.
56. I would recommend this system to other students/users.
57. The system appears ready for deployment.
58. I trust the results and behavior of the system.

59. Overall rating (Multiple choice)
   - Excellent
   - Good
   - Acceptable
   - Needs Improvement
   - Poor

## Section K: Final Comments and Suggestions
60. What did you like most about the system? (Paragraph)
61. What should be improved before final deployment? (Paragraph)
62. List any bugs encountered, including steps to reproduce. (Paragraph)
63. Additional comments or suggestions for the development team. (Paragraph, optional)

---

## 4. Likert Scale Standard

Use a single rating standard for all scaled items:
- 1 = Strongly Disagree
- 2 = Disagree
- 3 = Neutral
- 4 = Agree
- 5 = Strongly Agree

This standard should be shown in the form description and used consistently across all sections.

---

## 5. UAT Implementation Plan (Step-by-Step)

1. Prepare final build of system
- Deploy the latest stable test build.
- Freeze feature changes during UAT.
- Verify test accounts and API limits are ready.

2. Select testers
- Target 15 to 30 testers minimum.
- Include mixed user types: students, faculty, and general users.

3. Create Google Form questionnaire
- Build sections exactly as defined in this guide.
- Mark all critical questions as Required.
- Pilot test the form with 2 to 3 internal reviewers.

4. Conduct UAT session
- Provide test script and timeframe (for example, 45 to 60 minutes).
- Observe sessions where possible and collect incident notes.

5. Collect responses
- Keep the form open for a defined window (for example, 3 to 7 days).
- Track response count daily.

6. Analyze scores and comments
- Export results to Google Sheets.
- Compute per-section means and overall mean.
- Categorize qualitative comments into: usability, bugs, performance, feature requests.

7. Identify bugs and improvements
- Convert recurring issues into actionable tickets.
- Assign severity levels: Critical, High, Medium, Low.

8. Apply revisions
- Fix high-priority issues first.
- Perform regression checks on sign-up, login, verify, account, and billing modules.

9. Final approval for deployment
- Re-run a focused validation on resolved issues.
- Present metrics, fixes, and acceptance summary to adviser/panel.

---

## 6. Scoring Interpretation

Interpret mean scores using this benchmark:
- 4.50 to 5.00 = Excellent
- 3.50 to 4.49 = Good
- 2.50 to 3.49 = Acceptable
- 1.50 to 2.49 = Needs Improvement
- 1.00 to 1.49 = Poor

Recommended acceptance rule for capstone readiness:
- Overall mean must be at least 3.50 (Good), and
- No critical module (Sign Up, Login, Core Features) should score below 3.00.

---

## 7. UAT Implementation Workflow

Use this practical workflow for team execution:

1. Build Freeze -> 2. Tester Recruitment -> 3. Form Setup -> 4. UAT Execution -> 5. Data Export -> 6. Quantitative + Qualitative Analysis -> 7. Bug Triage -> 8. Fix and Retest -> 9. Deployment Decision

Suggested team roles:
- UAT Lead: owns schedule, form quality, and analysis report.
- QA Recorder: logs incidents and test observations.
- Dev Team: fixes defects and verifies regressions.
- Documentation Lead: prepares defense-ready summary and evidence.

---

## 8. Final Recommendations

- Keep the form concise but complete; avoid redundant questions.
- Require evidence for major bug reports (steps, screenshot, module).
- Prioritize issues that block sign-up, login, and core feature usage.
- Present both numeric results and selected user quotes during defense.
- Archive Google Form, Sheets analysis, and revision log as project evidence.

---

## 9. Deliverables Checklist

- Final Google Form link
- Raw response dataset (Google Sheets)
- Summary dashboard (means per section + overall)
- Defect list with status (Open/In Progress/Resolved)
- UAT sign-off statement for deployment readiness

This checklist can be used directly as the appendix in your capstone documentation or oral defense slides.