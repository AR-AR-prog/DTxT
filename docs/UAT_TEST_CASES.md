# User Acceptance Testing (UAT) Plan - agpAIso

This document outlines the User Acceptance Testing (UAT) scenarios for the agpAIso project. Testers should follow these steps in the UAT environment to verify that the system works as expected from an end-user perspective.

## 1. Authentication & Onboarding

### UAT-AUTH-01: Email/Password Registration
- **Pre-condition:** User is logged out.
- **Steps:**
  1. Navigate to the landing page (`/`).
  2. Click "Get Started" or "Register" to go to `/register`.
  3. Enter a valid full name, email address, and a strong password.
  4. Submit the form.
- **Expected Result:** Account is created successfully. User is automatically logged in and redirected to the `/verify` workspace.

### UAT-AUTH-02: Email/Password Login
- **Pre-condition:** User has an existing account with email/password.
- **Steps:**
  1. Navigate to `/login`.
  2. Enter the registered email and password.
  3. Submit the form.
- **Expected Result:** User is logged in successfully and redirected to the `/verify` workspace.

### UAT-AUTH-03: Google Sign-In (Registration & Login)
- **Pre-condition:** User is logged out.
- **Steps:**
  1. Navigate to `/login` or `/register`.
  2. Click the "Continue with Google" button.
  3. Complete the Google authentication flow.
- **Expected Result:** If a new user, an account is created. If an existing user, they are logged in. The user is redirected to `/verify`.

### UAT-AUTH-04: Logout
- **Pre-condition:** User is logged in.
- **Steps:**
  1. Click the profile/avatar icon in the header or sidebar.
  2. Select "Log out".
- **Expected Result:** The user's session ends, and they are redirected to the landing page (`/`). Attempting to visit `/verify` redirects back to `/login`.

---

## 2. URL Verification & AI Analysis

### UAT-VERIFY-01: Analyze a Valid News Article
- **Pre-condition:** User is logged in and has `apiUsageCount` < `apiUsageLimit`.
- **Steps:**
  1. Navigate to `/verify`.
  2. Enter a valid URL of a news article (e.g., a BBC or CNN article).
  3. Click "Analyze" or hit Enter.
- **Expected Result:** The system shows a loading/typing indicator. Once finished, a chat bubble appears with the extracted article title, a credibility score, a verdict (e.g., Reliable, Questionable), a summary, and reasoning factors.

### UAT-VERIFY-02: API Usage Limit Enforcement
- **Pre-condition:** User is logged in and has reached their `apiUsageLimit` (e.g., `apiUsageCount` = 50, `apiUsageLimit` = 50).
- **Steps:**
  1. Navigate to `/verify`.
  2. Enter a valid URL and submit.
- **Expected Result:** The system prevents the analysis and shows an error/warning message stating that the daily limit has been reached.

### UAT-VERIFY-03: Invalid URL Handling
- **Pre-condition:** User is logged in.
- **Steps:**
  1. Navigate to `/verify`.
  2. Enter an invalid URL format (e.g., `not-a-real-url`) or a URL that cannot be fetched.
  3. Submit.
- **Expected Result:** The system returns an error gracefully (e.g., "Invalid URL" or "Could not fetch article content") without incrementing the user's usage count.

---

## 3. Account Management

### UAT-ACCT-01: Link Google Account
- **Pre-condition:** User logged in via Email/Password and has no Google account linked.
- **Steps:**
  1. Navigate to `/account`.
  2. Under the "Sign-in Methods" or "Linked Accounts" section, click "Link Google Account".
  3. Complete the Google authentication flow.
- **Expected Result:** The Google account is successfully linked, and the UI updates to reflect the linked status.

### UAT-ACCT-02: Unlink Google Account
- **Pre-condition:** User is logged in via Email/Password AND has a Google account linked. (Cannot unlink if Google is the *only* sign-in method).
- **Steps:**
  1. Navigate to `/account`.
  2. Click "Unlink" next to the connected Google account.
  3. Confirm the action.
- **Expected Result:** The Google account is removed from the user's profile.

---

## 4. Billing & Usage

### UAT-BILL-01: View Current Usage
- **Pre-condition:** User is logged in and has analyzed 3 URLs today.
- **Steps:**
  1. Navigate to `/billing`.
- **Expected Result:** The page accurately displays the user's current usage (e.g., 3 / 50 calls used) and when the limit resets (12:00 AM Philippine Time).

### UAT-BILL-02: View Pricing Plans
- **Pre-condition:** User is logged in.
- **Steps:**
  1. Navigate to `/billing`.
- **Expected Result:** The page displays the available pricing plans (Free vs. Premium/Pro) as per the design, even if checkout is not fully implemented yet.
