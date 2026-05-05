document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const domainFilter = document.getElementById('domain-filter');
  const sortFilter = document.getElementById('sort-filter');
  const tableRows = document.querySelectorAll('.term-row');
  const countDisplay = document.getElementById('result-count');

  // Set initial count
  if (countDisplay) {
    countDisplay.textContent = tableRows.length;
  }

  function filterTable() {
    if (!searchInput || !domainFilter || !sortFilter) return;

    const searchTerm = searchInput.value.toLowerCase();
    const domainValue = domainFilter.value.toLowerCase();
    let visibleCount = 0;

    tableRows.forEach(row => {
      const termName = row.dataset.term.toLowerCase();
      const domains = row.dataset.domains.toLowerCase();

      const matchesSearch = termName.includes(searchTerm);
      const matchesDomain = domainValue === 'all' || domains.includes(domainValue);

      if (matchesSearch && matchesDomain) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';

        // Ensure detail row is also hidden
        const detailRowId = `detail-${row.dataset.id}`;
        const detailRow = document.getElementById(detailRowId);
        if (detailRow) {
          detailRow.classList.add('hidden');
          row.querySelector('.expand-icon').classList.remove('rotate-180');
        }
      }
    });

    if (countDisplay) {
      countDisplay.textContent = visibleCount;
    }
  }

  // Sort function (Note: simple DOM reordering, typically done on server but spec says client-side)
  function sortTable() {
    const tbody = document.getElementById('db-tbody');
    if (!tbody || !sortFilter) return;

    const sortValue = sortFilter.value;
    const rowsArray = Array.from(tableRows);

    rowsArray.sort((a, b) => {
      if (sortValue === 'newest') {
        return new Date(b.dataset.date) - new Date(a.dataset.date);
      } else if (sortValue === 'alphabetical') {
        return a.dataset.term.localeCompare(b.dataset.term);
      } else if (sortValue === 'contested') {
        const aTrend = a.dataset.trend === 'Contested' ? 1 : 0;
        const bTrend = b.dataset.trend === 'Contested' ? 1 : 0;
        if (aTrend !== bTrend) {
          return bTrend - aTrend;
        }
        return a.dataset.term.localeCompare(b.dataset.term);
      }
      return 0;
    });

    // Re-append to DOM in order
    rowsArray.forEach(row => {
      tbody.appendChild(row);
      // Also append the detail row right after
      const detailRow = document.getElementById(`detail-${row.dataset.id}`);
      if (detailRow) {
        tbody.appendChild(detailRow);
      }
    });
  }

  // Add Event Listeners
  if (searchInput) searchInput.addEventListener('input', filterTable);
  if (domainFilter) domainFilter.addEventListener('change', filterTable);
  if (sortFilter) {
    sortFilter.addEventListener('change', () => {
      sortTable();
      filterTable(); // Re-apply filters after sort
    });
  }

  // Expand/Collapse rows
  const toggleBtns = document.querySelectorAll('.row-toggle');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-target');
      const detailRow = document.getElementById(`detail-${id}`);
      const icon = btn.querySelector('.expand-icon');

      if (detailRow.classList.contains('hidden')) {
        detailRow.classList.remove('hidden');
        icon.classList.add('rotate-180');
      } else {
        detailRow.classList.add('hidden');
        icon.classList.remove('rotate-180');
      }
    });
  });

  // Run initial sort
  if (sortFilter) {
    sortTable();
  }
});
