// script.js (ES module)
import { programs } from './Services.js';

function collectHouseholdData() {
  const members = document.querySelectorAll('#members .member');
  return Array.from(members).map(m => {
    const age = parseInt(m.querySelector('input[name="age"]').value, 10) || 0;
    const pregnant = m.querySelector('input[name="pregnant"]').checked;
    const snap = m.querySelector('input[name="snap"]').checked;
    return { age, pregnant, snap };
  });
}

function getClientIncomeAnnual() {
  const incomeInput = document.getElementById('incomeAnnual');
  return incomeInput ? parseFloat(incomeInput.value) || 0 : 0;
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

// Dynamic member addition
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-member');
  if (!addBtn) return;
  addBtn.addEventListener('click', () => {
    const container = document.getElementById('members');
    const div = document.createElement('div');
    div.className = 'member compact-member';
    div.innerHTML = `
      <label>Age
        <input type="number" name="age" min="0" required>
      </label>
      <label>
        <input type="checkbox" name="pregnant">
        Pregnant
      </label>
      <label>
        <input type="checkbox" name="snap">
        Receives SNAP
      </label>`;
    container.appendChild(div);
  });
});
