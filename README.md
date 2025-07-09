
# CHP Eligibility Form

A modern, client- and household-based eligibility screener for Lee County, FL social service programs.

## Features

- Collects income and attributes for client and any number of household members.
- Customizable eligibility engine for local, state, and federal programs.
- Live household summary and modern interface.
- Responsive and accessible.

## Usage

1. Enter client (applicant) income and frequency.
2. Add household members (age, SNAP, income, etc.).
3. Click "Check Eligibility" to see qualifying programs.
4. Review available programs on the resources page.

## Customizing Programs

- Edit `resources.js`. Each program has an `isEligible` function that works with the full household/client structure.

## Deployment

- Upload all files to GitHub Pages, Netlify, or any static host.
- Open `index.html` in any modern browser.
