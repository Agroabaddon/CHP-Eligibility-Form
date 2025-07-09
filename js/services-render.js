// services-render.js (ES module)
import { programs as basePrograms } from './Services.js';

// Retrieve any additional programs stored locally
const storedPrograms = JSON.parse(localStorage.getItem('programs') || '[]');
const programs = [...basePrograms, ...storedPrograms];

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('program-list');
  programs.forEach(p => {
    const li = document.createElement('li');
    const bold = document.createElement('b');
    bold.textContent = p.name;
    li.appendChild(bold);
    li.appendChild(document.createTextNode(`: ${p.description}`));
    list.appendChild(li);
  });
});
