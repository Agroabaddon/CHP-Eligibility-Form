# CHP Eligibility Form

## Installation & Deployment
1. Clone or download this repo.
2. Ensure the following structure is intact:
   ```
   /css/style.css
   /js/Services.js
   /js/script.js
   /js/services-render.js
   /js/referral.js
   index.html
   services.html
   referral.html
   README.md
   ```
3. Push to GitHub Pages (or any static host).
4. Open `index.html` in your browser.

This project is licensed under the [MIT License](LICENSE).

## Adding a New Program
- Navigate to **Add New Program**.
- Fill out the form and submit—it will appear under Programs.

## Customizing Eligibility Logic
- Edit `/js/Services.js` to modify criteria in each program's `isEligible()`.
