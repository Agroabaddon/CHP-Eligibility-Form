// script.js (ES module)
import { programs } from './Services.js';

function collectHouseholdData() {
  const form = document.getElementById('eligibilityForm');
  if (!form) return [];

  const members = form.querySelectorAll('.member');
  return Array.from(members).map(m => {
    const ageInput = m.querySelector('input[name="age"]');
    const snapInput = m.querySelector('input[name="snap"]');
    const pregnantInput = m.querySelector('input[name="pregnant"]');
    return {
      age: ageInput ? parseInt(ageInput.value, 10) || 0 : 0,
      snap: snapInput ? snapInput.checked : false,
      pregnant: pregnantInput ? pregnantInput.checked : false,
    };
  });
}

function getClientIncomeAnnual() {
  const incomeInput = document.querySelector('input[name="clientIncome"]');
  return incomeInput ? Number(incomeInput.value) || 0 : 0;
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
