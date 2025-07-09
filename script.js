// script.js

// Load resources.js before this script!

function getUserData() {
  const age = parseInt(document.getElementById('age').value, 10);
  const household = parseInt(document.getElementById('size').value, 10);

  // Gather all income fields
  const annualInput = parseFloat(document.getElementById('income_annual').value);
  const monthlyInput = parseFloat(document.getElementById('income_monthly').value);
  const biweeklyInput = parseFloat(document.getElementById('income_biweekly').value);
  const weeklyInput = parseFloat(document.getElementById('income_weekly').value);

  // Convert to annual income, prioritizing annual > monthly > biweekly > weekly
  let income = NaN;
  if (!isNaN(annualInput) && annualInput > 0) {
    income = annualInput;
  } else if (!isNaN(monthlyInput) && monthlyInput > 0) {
    income = monthlyInput * 12;
  } else if (!isNaN(biweeklyInput) && biweeklyInput > 0) {
    income = biweeklyInput * 26;
  } else if (!isNaN(weeklyInput) && weeklyInput > 0) {
    income = weeklyInput * 52;
  }

  // Compute thresholds for use in resource logic
  const snapMonthly = 1632 + 583 * (household - 1);
  const snapAnnualThreshold = snapMonthly * 12;
  const fpl = 15000 + 6000 * (household - 1);
  const medThreshold = fpl * 1.38;

  return {
    id: document.getElementById('hc_id').value.trim(),
    age,
    household,
    income,
    pregnant: document.getElementById('pregnant').checked,
    veteran: document.getElementById('veteran').checked,
    snapAnnualThreshold,
    fpl,
    medThreshold
  };
}

function checkEligibility() {
  const data = getUserData();
  const resultDiv = document.getElementById('result');
  if (isNaN(data.age) || isNaN(data.household) || isNaN(data.income)) {
    resultDiv.innerHTML = '<p style="color:#d32f2f;">Please fill out age, household size, and at least one income field.</p>';
    return;
  }

  // Find eligible programs
  const eligiblePrograms = resources.filter(resource => resource.isEligible(data));

  // Output result
  let html = '';
  if (data.id) {
    html += `<p><strong>HealthCall ID:</strong> ${data.id}</p>`;
  }
  html += '<h2>Eligible Programs & Services:</h2><ul>';
  eligiblePrograms.forEach(prog => {
    html += `<li><strong>${prog.name}:</strong> ${prog.description}</li>`;
  });
  html += '</ul>';
  resultDiv.innerHTML = html;
}

// Dynamically populate the "Services We Check" list
function populateServicesList() {
  const listDiv = document.getElementById('services-list');
  if (!listDiv) return;
  let html = '<h2>Programs & Services We Check <span class="location">(Lee County, FL)</span>:</h2><ul>';
  resources.forEach(r => {
    html += `<li><strong>${r.name}</strong>: ${r.description}</li>`;
  });
  html += '</ul>';
  listDiv.innerHTML = html;
}

// On page load, populate the services list
window.onload = populateServicesList;


let household = [];

function addHouseholdMember() {
  const container = document.getElementById('household-container');
  const index = household.length;

  const memberDiv = document.createElement('div');
  memberDiv.classList.add('member');
  memberDiv.innerHTML = `
    <h4>Member ${index + 1}</h4>
    Age: <input type="number" name="age${index}" min="0"><br>
    <label><input type="checkbox" name="disabled${index}"> Disabled</label>
    <label><input type="checkbox" name="veteran${index}"> Veteran</label>
    <label><input type="checkbox" name="pregnant${index}"> Pregnant</label>
    <hr>
  `;
  container.appendChild(memberDiv);

  household.push({});
}

function collectHouseholdData() {
  const members = [];
  const container = document.getElementById('household-container');
  const divs = container.getElementsByClassName('member');

  for (let i = 0; i < divs.length; i++) {
    const age = parseInt(divs[i].querySelector(`input[name=age${i}]`).value) || 0;
    const disabled = divs[i].querySelector(`input[name=disabled${i}]`).checked;
    const veteran = divs[i].querySelector(`input[name=veteran${i}]`).checked;
    const pregnant = divs[i].querySelector(`input[name=pregnant${i}]`).checked;
    members.push({ age, disabled, veteran, pregnant });
  }
  return members;
}

function calculateFPL(percent, size) {
  const base = 15000 + 6000 * (size - 1);
  return (base * percent) / 100;
}

function isEligibleForSeniorAid(data) {
  const hasSenior = data.household.some(m => m.age >= 60);
  return hasSenior && data.totalIncome < calculateFPL(200, data.household.length);
}

function checkEligibility() {
  household = collectHouseholdData();
  const income = parseFloat(document.getElementById('income').value) || 0;

  const eligibilityData = {
    household,
    totalIncome: income,
    incomeFrequency: 'annual',
    housingStatus: document.getElementById('housingStatus')?.value || '',
    benefits: [],
    county: 'lee'
  };

  const eligible = [];

  if (isEligibleForSeniorAid(eligibilityData)) {
    eligible.push("Senior Aid Program");
  }

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = eligible.length
    ? `<ul>${eligible.map(p => `<li>${p}</li>`).join('')}</ul>`
    : `<p>No eligible programs found.</p>`;
}
