document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('eligibilityForm');
  const resultDiv = document.getElementById('result');

  // Add event listeners to all inputs for real-time updates
  form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', checkEligibility);
  });

  function checkEligibility() {
    const id = document.getElementById('hc_id').value.trim();
    const age = parseInt(document.getElementById('age').value, 10);
    const household = parseInt(document.getElementById('size').value, 10);
    const income = parseFloat(document.getElementById('income').value);
    const pregnant = document.getElementById('pregnant').checked;
    const veteran = document.getElementById('veteran').checked;

    // Clear result if inputs are incomplete
    if (isNaN(age) || isNaN(household) || isNaN(income)) {
      resultDiv.innerHTML = '';
      return;
    }

    // Compute thresholds
    // SNAP: 130% FPL gross monthly (approx $1632 + $583*(n-1) per month)
    const snapMonthly = 1632 + 583 * (household - 1);
    const snapAnnualThreshold = snapMonthly * 12;

    // Estimate FPL: $15,000 + $6,000 per additional person
    const fpl = 15000 + 6000 * (household - 1);

    // Medicaid: 138% of FPL
    const medThreshold = fpl * 1.38;

    // Determine eligibility
    const eligiblePrograms = [];

    // SNAP
    if (income <= snapAnnualThreshold) {
      eligiblePrograms.push('SNAP (Food Assistance)');
    }

    // Medicaid
    if (income <= medThreshold) {
      eligiblePrograms.push('Medicaid (Health Coverage)');
    }

    // TANF (assume household >1 means a dependent/family)
    if (household > 1 && income <= fpl) {
      eligiblePrograms.push('TANF (Cash Assistance for Families)');
    }

    // LIHEAP (up to ~150% FPL for energy bills)
    if (income <= fpl * 1.5) {
      eligiblePrograms.push('LIHEAP (Energy Bill Assistance)');
    }

    // WIC: for pregnant women or children <5, or categorical
    const eligibleSnap = (income <= snapAnnualThreshold);
    const eligibleMed = (income <= medThreshold);
    const eligibleTanf = (household > 1 && income <= fpl);
    if (pregnant || age < 5 || eligibleSnap || eligibleMed || eligibleTanf) {
      eligiblePrograms.push('WIC (Women, Infants & Children Nutrition)');
    }

    // Section 8 (Housing Choice Voucher): assume income ≤2×FPL as low-income cutoff
    if (income <= fpl * 2) {
      eligiblePrograms.push('Section 8 (Housing Choice Vouchers)');
    }

    // HUD-VASH for homeless veterans
    if (veteran) {
      eligiblePrograms.push('HUD-VASH (Veterans Housing Assistance)');
    }

    // If no income-based program qualifies, suggest shelters
    // (We exclude Food Bank which is always added below)
    const hasService = eligiblePrograms.length > 0;
    if (!hasService) {
      eligiblePrograms.push('Local Emergency Shelters (if homeless)');
    }

    // Food banks/pantries are available to all in need
    eligiblePrograms.push('Food Pantry / Food Bank (open to those in need)');

    // Build HTML output
    let html = '';
    if (id) {
      html += `<p><strong>HealthCall ID:</strong> ${id}</p>`;
    }
    html += '<h2>Eligible Programs:</h2><ul>';
    eligiblePrograms.forEach(prog => {
      html += `<li>${prog}</li>`;
    });
    html += '</ul>';
    resultDiv.innerHTML = html;
  }
});
