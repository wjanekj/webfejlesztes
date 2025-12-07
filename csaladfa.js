document.addEventListener('DOMContentLoaded', () => {

  // bezárás, ha szülő elemet bezárjuk
  function closeChildren(root) {
    if (!root) return;

    // becsukjuk az összes nyitva levő infot
    root.querySelectorAll('.horse-info').forEach(info => {
      info.style.display = 'none';
      const btn = info.parentElement.querySelector('.toggle-info');
      if (btn) btn.textContent = 'További infó ▼';
    });

    // bezárjuk az össezs nyitva levő szulőt
    root.querySelectorAll('.parents-container').forEach(pc => {
      pc.style.display = 'none';
      // keressük a closest .horse elemet
      const parentHorse = pc.parentElement;
      if (parentHorse) {
        const toggleBtn = parentHorse.querySelector('.toggle-parents');
        if (toggleBtn) toggleBtn.textContent = 'Szülők megjelenítése ▼';
      }
    });
  }

  // toggle-info gombok
  document.querySelectorAll('.toggle-info').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const horseEl = btn.closest('.horse');
      if (!horseEl) return;

      // csak a közvetlen child .horse-info-t keressük
      const infoEl = horseEl.querySelector(':scope > .horse-info');
      if (!infoEl) return;

      const isVisible = window.getComputedStyle(infoEl).display === 'block';
      if (isVisible) {
        infoEl.style.display = 'none';
        btn.textContent = 'További infó ▼';
        // ha bezárjuk az info részt, nem kell automatikusan bezárni a gyerekeket
      } else {
        infoEl.style.display = 'block';
        btn.textContent = 'Bezár ▲';
      }
    });
  });

  // toggle-parents gombok
  document.querySelectorAll('.toggle-parents').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const horseEl = btn.closest('.horse');
      if (!horseEl) return;

      // csak a közvetlen child .parents-container-t keressük
      const parentsEl = horseEl.querySelector(':scope > .parents-container');
      if (!parentsEl) return;

      const isVisible = window.getComputedStyle(parentsEl).display === 'block';
      if (isVisible) {
        // bezárjuk a szülőket és minden leszármazottjukat
        parentsEl.style.display = 'none';
        btn.textContent = 'Szülők megjelenítése ▼';
        // minden belső infót és gyereket is bezárni
        closeChildren(parentsEl);
      } else {
        parentsEl.style.display = 'block';
        btn.textContent = 'Szülők elrejtése ▲';
      }
    });
  });

});