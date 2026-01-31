// Observable Compute Foundation - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const siteNav = document.querySelector('.site-nav');

    if (navToggle && siteNav) {
        navToggle.addEventListener('click', function () {
            siteNav.classList.toggle('open');
        });
    }

    // Concept search (Lexicon page)
    const searchInput = document.getElementById('concept-search');
    const searchBtn = document.getElementById('search-btn');

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function () {
            const query = searchInput.value.trim();
            if (query) {
                // For now, simple redirect. Will integrate with Supabase later.
                window.location.href = `/lexicon/?q=${encodeURIComponent(query)}`;
            }
        });

        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    // Subscribe form handling
    const subscribeForms = document.querySelectorAll('.subscribe-form');
    subscribeForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            // TODO: Integrate with email service
            alert(`Thanks! We'll notify you at ${email} when new reports publish.`);
            form.reset();
        });
    });
});
