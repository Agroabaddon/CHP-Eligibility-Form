// referral.js (ES module)
const form = document.getElementById('referralForm');

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const all = JSON.parse(localStorage.getItem('programs') || '[]');
  all.push({
    name: data.name,
    description: escapeHTML(data.description),
    isEligible: () => false
  });
  localStorage.setItem('programs', JSON.stringify(all));
  window.location.href = 'services.html';
});
