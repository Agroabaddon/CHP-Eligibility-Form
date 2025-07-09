// services-render.js (ES module)
import { programs as basePrograms } from './Services.js';

// Retrieve any additional programs stored locally
const storedPrograms = JSON.parse(localStorage.getItem('programs') || '[]');
const programs = [...basePrograms, ...storedPrograms];

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('program-list');
  list.innerHTML = programs.map(p => `<li><b>${p.name}</b>: ${p.description}</li>`).join('');
});
