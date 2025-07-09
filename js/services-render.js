// services-render.js (ES module)
import { programs } from './Services.js';

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('program-list');
  list.innerHTML = programs.map(p => `<li><b>${p.name}</b>: ${p.description}</li>`).join('');
});
