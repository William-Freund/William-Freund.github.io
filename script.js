function setTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    event.target.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);

    document.querySelectorAll('.theme-btn').forEach(btn => {
        if (btn.textContent === savedTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    function showSection(targetId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });

        if (targetId !== '#home') {
            history.pushState(null, '', targetId);
        } else {
            history.pushState(null, '', window.location.pathname);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            showSection(targetId);
        });
    });

    const hash = window.location.hash;
    if (hash && document.querySelector(hash)) {
        showSection(hash);
    } else {
        showSection('#home');
    }

    window.addEventListener('popstate', function() {
        const hash = window.location.hash || '#home';
        showSection(hash);
    });

    const asciiArt = document.querySelector('.ascii-art');
    if (asciiArt) {
        asciiArt.addEventListener('click', function() {
            const colors = ['#6c5ce7', '#74b9ff', '#a29bfe', '#fd79a8', '#fdcb6e', '#00b894'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.color = randomColor;

            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }

    document.addEventListener('keydown', function(e) {

        const currentActiveLink = document.querySelector('.nav-link.active');
        const allLinks = Array.from(navLinks);
        const currentIndex = allLinks.indexOf(currentActiveLink);

        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            e.preventDefault();
            allLinks[currentIndex - 1].click();
        } else if (e.key === 'ArrowRight' && currentIndex < allLinks.length - 1) {
            e.preventDefault();
            allLinks[currentIndex + 1].click();
        }
    });

    const blogPosts = document.querySelectorAll('.blog-post');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    blogPosts.forEach((post, index) => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(20px)';
        post.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(post);
    });


    console.log('%c welcome to my website', 'color: #6c5ce7; font-size: 16px;');
    console.log('%c arrow keys: navigate sections', 'color: #636e72; font-size: 12px;');
});