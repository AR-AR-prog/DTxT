# Bugfix Requirements Document

## Introduction

The billing page has a layout issue where the Pro plan card's "MOST POPULAR" badge is not visible/cut off when the user is logged in. This occurs because the badge is positioned above the card using absolute positioning, but the card container has `overflow-hidden` applied, which clips the badge.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN viewing the billing page with the Pro plan displayed AND the user is logged in THEN the "MOST POPULAR" badge is clipped/hidden because the card container has `overflow-hidden` applied
1.2 WHEN the billing cycle is toggled between monthly and yearly THEN the "MOST POPULAR" badge remains clipped for the Pro plan card

### Expected Behavior (Correct)

2.1 WHEN viewing the billing page with the Pro plan displayed AND the user is logged in THEN the "MOST POPULAR" badge SHALL be fully visible above the Pro plan card
2.2 WHEN the billing cycle is toggled between monthly and yearly THEN the "MOST POPULAR" badge SHALL remain fully visible at all times

### Unchanged Behavior (Regression Prevention)

3.1 WHEN viewing the Free or Unlimited plan cards THEN the system SHALL CONTINUE TO display them without any badge
3.2 WHEN the billing page is rendered on different screen sizes THEN the system SHALL CONTINUE TO maintain the responsive grid layout
3.3 WHEN the user clicks on a plan's CTA button THEN the system SHALL CONTINUE TO show the "Billing checkout coming soon" message