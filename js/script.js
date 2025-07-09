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

function refreshHouseholdSummary() {
  const summary = document.getElementById('household-summary');
  if (!summary) return;
  const members = collectHouseholdData();
  if (!members.length) {
    summary.innerHTML = '';
    return;
  }
  const rows = members
    .map(
      (m, idx) =>
        `<tr><td>${idx + 1}</td><td>${m.age}</td><td>${m.pregnant ? 'Yes' : 'No'}</td><td>${m.snap ? 'Yes' : 'No'}</td></tr>`
    )
    .join('');
  summary.innerHTML = `
    <table>
      <thead>
        <tr><th>#</th><th>Age</th><th>Pregnant</th><th>SNAP</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function createMemberElement() {
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
  div.querySelector('.remove-member').addEventListener('click', () => {
    div.remove();
    refreshHouseholdSummary();
  });
  return div;
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
  const container = document.getElementById('members');

  container.querySelectorAll('.member').forEach(m => {
    if (!m.querySelector('.remove-member')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'remove-member';
      btn.textContent = 'Remove';
      btn.addEventListener('click', () => {
        m.remove();
        refreshHouseholdSummary();
      });
      m.appendChild(btn);
    }
  });

  refreshHouseholdSummary();

  const addBtn = document.getElementById('add-member');
  if (!addBtn) return;
  addBtn.addEventListener('click', () => {
    const div = createMemberElement();
    container.appendChild(div);
    refreshHouseholdSummary();
  });
});
