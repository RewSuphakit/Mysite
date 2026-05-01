// ── Typed.js ──
new Typed('#typed-name', {
    strings: ['REW.', 'SUPHAKIT.'],
    typeSpeed: 80,
    backDelay: 3000,
    backSpeed: 50,
    loop: true,
    showCursor: true,
    cursorChar: '_',
    onStringTyped: () => {
        triggerGlitch();
    }
});
new Typed('#typed-role', {
    strings: ['Full-Stack Developer', 'IT Student @ RMUTI', 'Web Designer'],
    typeSpeed: 60,
    backDelay: 2500,
    backSpeed: 40,
    loop: true,
    showCursor: false,
});

// ── Glitch effect ──
function triggerGlitch() {
    const el = document.getElementById('heroName');
    el.dataset.text = el.textContent;
    el.classList.add('glitch');
    setTimeout(() => el.classList.remove('glitch'), 300);
}

// ── Custom Cursor ──
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let ringX = 0, ringY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', e => {
    curX = e.clientX; curY = e.clientY;
    dot.style.left = curX + 'px';
    dot.style.top = curY + 'px';
});

function animateRing() {
    ringX += (curX - ringX) * 0.12;
    ringY += (curY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .gallery-item, .prog-badge, .skill-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ── Scroll Progress Bar ──
window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / total) * 100;
    document.getElementById('progress-bar').style.width = pct + '%';

    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
    document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 300);
    revealElements();
    animateSkills();
    animateCounters();
    parallaxGrid();
});

// ── Parallax Hero Grid ──
function parallaxGrid() {
    const grid = document.getElementById('heroGrid');
    const y = window.scrollY;
    grid.style.transform = `translateY(${y * 0.3}px)`;
}

// ── Reveal on scroll ──
function revealElements() {
    document.querySelectorAll('.reveal').forEach((el, i) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
            setTimeout(() => el.classList.add('visible'), i * 60);
        }
    });
}
revealElements();

// ── Skill animation ──
let skillsAnimated = false;
function animateSkills() {
    if (skillsAnimated) return;
    const block = document.getElementById('skills-block');
    if (!block) return;
    if (block.getBoundingClientRect().top < window.innerHeight - 60) {
        document.querySelectorAll('.skill-item').forEach((el, i) => {
            setTimeout(() => {
                el.querySelectorAll('.level-dot.on').forEach((dot, j) => {
                    dot.style.opacity = '0';
                    setTimeout(() => { dot.style.opacity = '1'; }, j * 120);
                });
            }, i * 120);
        });
        skillsAnimated = true;
    }
}

// ── Counter Animation ──
let countersAnimated = false;
function animateCounters() {
    if (countersAnimated) return;
    const counters = document.querySelectorAll('.stat-num[data-target]');
    if (!counters.length) return;
    const first = counters[0].getBoundingClientRect().top;
    if (first > window.innerHeight - 60) return;

    counters.forEach(el => {
        const target = +el.dataset.target;
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current + '+';
        }, 40);
    });
    countersAnimated = true;
}

// ── Tilt Effect on Gallery Cards ──
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -8;
        const rotY = ((x - cx) / cx) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ── Magnetic Buttons ──
document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ── Ripple Effect on Buttons ──
document.querySelectorAll('.btn-primary-c, .btn-secondary-c').forEach(btn => {
    btn.addEventListener('click', e => {
        const r = document.createElement('span');
        r.className = 'ripple';
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
        btn.appendChild(r);
        setTimeout(() => r.remove(), 600);
    });
});

// ── Particle System ──
(function () {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function rand(a, b) { return Math.random() * (b - a) + a; }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = rand(0, W);
            this.y = rand(0, H);
            this.size = rand(0.5, 2);
            this.speed = rand(0.1, 0.4);
            this.angle = rand(0, Math.PI * 2);
            this.opacity = rand(0.1, 0.5);
            this.color = Math.random() > 0.5 ? '100,255,218' : '123,140,255';
        }
        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.angle += 0.005;
            if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    // draw connections
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100,255,218,${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);
        drawLines();
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    }
    loop();
})();

// ── Lightbox ──
function openLight(src) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = src;
    lb.classList.add('active');
}
function closeLight(e) {
    if (e.target === document.getElementById('lightbox')) closeLightDirect();
}
function closeLightDirect() {
    document.getElementById('lightbox').classList.remove('active');
}
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightDirect();
});

// ── Hamburger ──
function toggleNav() {
    document.getElementById('navLinks').classList.toggle('open');
}