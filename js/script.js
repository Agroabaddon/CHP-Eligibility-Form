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
  resultDiv.innerHTML = '';
  const qualified = programs.filter(p => p.isEligible(data));
  if (!qualified.length) {
    const p = document.createElement('p');
    p.textContent = 'No qualifying programs found.';
    resultDiv.appendChild(p);
    return;
  }
  const ul = document.createElement('ul');
  qualified.forEach(p => {
    const li = document.createElement('li');
    const bold = document.createElement('b');
    bold.textContent = p.name;
    li.appendChild(bold);
    li.appendChild(document.createTextNode(`: ${p.description}`));
    ul.appendChild(li);
  });
  resultDiv.appendChild(ul);
}

// expose checkEligibility to the global scope for inline call
window.checkEligibility = checkEligibility;
