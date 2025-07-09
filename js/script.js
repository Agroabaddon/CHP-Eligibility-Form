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
  // Clear previous results
  resultDiv.innerHTML = '';

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

// Dynamic member addition
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-member');
  if (!addBtn) return;
  addBtn.addEventListener('click', () => {
    const container = document.getElementById('members');
    const div = document.createElement('div');
    div.className = 'member compact-member';
    const labelAge = document.createElement('label');
    labelAge.textContent = 'Age ';
    const inputAge = document.createElement('input');
    inputAge.type = 'number';
    inputAge.name = 'age';
    inputAge.min = '0';
    inputAge.required = true;
    labelAge.appendChild(inputAge);

    const labelPregnant = document.createElement('label');
    const inputPregnant = document.createElement('input');
    inputPregnant.type = 'checkbox';
    inputPregnant.name = 'pregnant';
    labelPregnant.appendChild(inputPregnant);
    labelPregnant.appendChild(document.createTextNode(' Pregnant'));

    const labelSnap = document.createElement('label');
    const inputSnap = document.createElement('input');
    inputSnap.type = 'checkbox';
    inputSnap.name = 'snap';
    labelSnap.appendChild(inputSnap);
    labelSnap.appendChild(document.createTextNode(' Receives SNAP'));

    div.appendChild(labelAge);
    div.appendChild(labelPregnant);
    div.appendChild(labelSnap);

    container.appendChild(div);
  });
});
