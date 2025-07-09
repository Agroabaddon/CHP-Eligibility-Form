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

function renderHouseholdSummary() {
  const summaryEl = document.getElementById('household-summary');
  if (!summaryEl) return;
  const data = collectHouseholdData();
  if (!data.length) {
    summaryEl.innerHTML = '';
    return;
  }
  const rows = data
    .map((m, i) =>
      `<tr><td>${i + 1}</td><td>${m.age}</td><td>${m.pregnant ? 'Yes' : 'No'}</td><td>${m.snap ? 'Yes' : 'No'}</td></tr>`
    )
    .join('');
  summaryEl.innerHTML = `
    <table>
      <thead>
        <tr><th>#</th><th>Age</th><th>Pregnant</th><th>SNAP</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
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

// Dynamic member addition and removal
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-member');
  const container = document.getElementById('members');
  if (!addBtn || !container) return;

  const createMemberDiv = () => {
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
      </label>
      <button type="button" class="remove-member">Remove</button>`;
    return div;
  };

  addBtn.addEventListener('click', () => {
    container.appendChild(createMemberDiv());
    renderHouseholdSummary();
  });

  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-member')) {
      e.target.closest('.member').remove();
      renderHouseholdSummary();
    }
  });

  renderHouseholdSummary();
});
