document.addEventListener('DOMContentLoaded', () => {
    // ================= HAMBURGER MENU =================
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                hamburger.textContent = '☰';
            });
        });
    }

    // ================= HEADER SCROLL EFFECT =================
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ================= ACTIVE NAV LINK =================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // ================= INTERSECTION OBSERVER FOR ANIMATIONS =================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate');
        observer.observe(section);
    });

    // ================= STATS COUNTER ANIMATION =================
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                let count = 0;
                const increment = target / 200;
                
                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        entry.target.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.textContent = target + '+';
                    }
                };
                
                updateCount();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ================= LIGHTBOX GALLERY =================
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    
    if (galleryImages.length > 0) {
        // Create lightbox element
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img src="" alt="Lightbox Image">
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');

        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ================= SMOOTH SCROLL FOR ANCHOR LINKS =================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ================= UTM CAPTURE + DEMO QUOTE FORM =================
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'gclid'];
    keys.forEach(k => {
        if (params.get(k)) sessionStorage.setItem(k, params.get(k));
    });
    const src = sessionStorage.getItem('utm_source');
    const camp = sessionStorage.getItem('utm_campaign');

    // show the attribution chip when the visit came from a (simulated) ad
    const chip = document.querySelector('.utm-chip');
    if (chip && (src || camp)) {
        let txt = 'This visit is being tracked';
        if (src) txt += ' \u2022 source: ' + src;
        if (camp) txt += ' \u2022 campaign: "' + camp + '"';
        chip.querySelector('.utm-text').textContent = txt;
        chip.classList.add('show');
    }

    document.querySelectorAll('form.quote-form').forEach(form => {
        // carry attribution in hidden fields
        keys.forEach(k => {
            const inp = form.querySelector('input[name="' + k + '"]');
            if (inp) inp.value = sessionStorage.getItem(k) || '';
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const get = n => {
                const el = form.querySelector('[name="' + n + '"]');
                return el ? el.value.trim() : '';
            };
            const panel = document.querySelector('.form-success');
            if (!panel) return;

            const name = get('name');
            panel.querySelector('.success-name').textContent =
                name ? 'Thanks, ' + name.split(' ')[0] + ' — enquiry received.' : 'Enquiry received.';

            const detailBits = [];
            if (get('crane_size')) detailBits.push(get('crane_size'));
            if (get('location')) detailBits.push('site: ' + get('location'));
            if (get('start_date')) detailBits.push('from ' + get('start_date'));
            panel.querySelector('.success-size').textContent =
                detailBits.length ? detailBits.join(' \u2022 ') : 'your enquiry details';

            panel.querySelector('.success-attr').textContent =
                (src || camp)
                    ? 'the Google Ads click that brought you here (' + [src, camp].filter(Boolean).join(' / ') + ')'
                    : 'a direct visit — no ad campaign this time';

            form.style.display = 'none';
            panel.classList.add('show');
            panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
});
