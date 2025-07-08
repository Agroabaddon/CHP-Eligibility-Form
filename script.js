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
