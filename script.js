
let household = [];

function addHouseholdMember() {
  const container = document.getElementById('household-container');
  const index = household.length;

  const memberDiv = document.createElement('div');
  memberDiv.classList.add('member', 'compact-member');
  memberDiv.innerHTML = `
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.5em; margin-bottom:0.25em;">
      <label>Age: <input type="number" min="0" name="age${index}" style="width:3em;"></label>
      <label><input type="checkbox" name="disabled${index}"> Disabled</label>
      <label><input type="checkbox" name="veteran${index}"> Veteran</label>
      <label><input type="checkbox" name="pregnant${index}"> Pregnant</label>
      <label><input type="checkbox" name="snap${index}"> SNAP</label>
      <label>
        Income: <input type="number" min="0" name="income${index}" style="width:5em;">
        <select name="freq${index}">
          <option value="annual">Annual</option>
          <option value="monthly">Monthly</option>
          <option value="biweekly">Biweekly</option>
          <option value="weekly">Weekly</option>
        </select>
      </label>
    </div>
  `;
  container.appendChild(memberDiv);
  household.push({}); // Placeholder

  memberDiv.addEventListener('input', updateHouseholdSummary);
  memberDiv.addEventListener('change', updateHouseholdSummary);
  updateHouseholdSummary();
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
    const snap = divs[i].querySelector(`input[name=snap${i}]`).checked;
    const income = parseFloat(divs[i].querySelector(`input[name=income${i}]`).value) || 0;
    const freq = divs[i].querySelector(`select[name=freq${i}]`).value;
    members.push({ age, disabled, veteran, pregnant, snap, income, freq });
  }
  return members;
}

function getClientIncomeAnnual() {
  const amount = parseFloat(document.getElementById('client-income').value) || 0;
  const freq = document.getElementById('client-income-freq').value;
  if (freq === 'annual') return amount;
  if (freq === 'monthly') return amount * 12;
  if (freq === 'biweekly') return amount * 26;
  if (freq === 'weekly') return amount * 52;
  return amount;
}

function updateHouseholdSummary() {
  const members = collectHouseholdData();
  const summaryDiv = document.getElementById('household-summary');
  const amount = document.getElementById('client-income').value;
  const freq = document.getElementById('client-income-freq').value;
  let html = `<div><b>Client Income:</b> ${amount ? '$' + amount + ' / ' + freq : '<em>None entered</em>'}</div>`;

  if (!members.length) {
    html += "<em>No household members entered yet.</em>";
    summaryDiv.innerHTML = html;
    return;
  }
  html += `<table><tr>
    <th>#</th><th>Age</th><th>Disabled</th><th>Veteran</th><th>Pregnant</th><th>SNAP</th><th>Income</th>
  </tr>`;
  members.forEach((m, i) => {
    html += `<tr>
      <td>${i + 1}</td>
      <td>${m.age ? m.age : ''}</td>
      <td>${m.disabled ? "✔️" : ""}</td>
      <td>${m.veteran ? "✔️" : ""}</td>
      <td>${m.pregnant ? "✔️" : ""}</td>
      <td>${m.snap ? "✔️" : ""}</td>
      <td>${m.income ? "$" + m.income + " / " + (m.freq || "") : ""}</td>
    </tr>`;
  });
  html += "</table>";
  summaryDiv.innerHTML = html;
}

function checkEligibility() {
  household = collectHouseholdData();
  const clientIncome = getClientIncomeAnnual();

  // You can add your eligibility logic here
  const eligibilityData = {
    household,
    clientIncome,
  };

  // Placeholder result output
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<pre>${JSON.stringify(eligibilityData, null, 2)}</pre>`;
}
