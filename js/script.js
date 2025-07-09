// script.js (ES module)
import { programs } from './Services.js';

function collectHouseholdData() {
  // TODO: replace with actual logic
  return [];
}

function getClientIncomeAnnual() {
  // TODO: replace with actual logic
  return 0;
}

export function checkEligibility() {
  const data = {
    household: collectHouseholdData(),
    clientIncome: getClientIncomeAnnual(),
  };
  const resultDiv = document.getElementById('result');
  const qualified = programs.filter(p => p.isEligible(data));
  if (!qualified.length) {
    resultDiv.innerHTML = '<p>No qualifying programs found.</p>';
    return;
  }
  resultDiv.innerHTML = '<ul>' + qualified.map(p => `<li><b>${p.name}</b>: ${p.description}</li>`).join('') + '</ul>';
}

// expose checkEligibility to the global scope for inline call
window.checkEligibility = checkEligibility;
