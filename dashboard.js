// 1. Live Time Update
const updateClock = () => {
    const clock = document.getElementById('current-time');
    clock.innerText = new Date().toLocaleTimeString('en-GB', { hour12: false });
};
setInterval(updateClock, 1000);
updateClock();

// 2. Theme Toggle (Light/Dark Mode)
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

modeToggle.addEventListener('change', () => {
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
});

// 3. Hour Slider & Progress Interaction
const slider = document.getElementById('hour-slider');
const hourDisplay = document.getElementById('hour-val');
const progressFill = document.querySelector('.neon-progress-fill');

slider.addEventListener('input', (e) => {
    const value = e.target.value;
    hourDisplay.innerText = value;
    
    // Update visual progress
    const percentage = (value / 12) * 100;
    progressFill.style.width = percentage + '%';
    
    // Dynamic glow intensification
    progressFill.style.boxShadow = `0 0 ${10 + (value * 2)}px var(--neon-purple)`;
});

// 4. Sidebar Nav Active State
const navItems = document.querySelectorAll('.nav-links li');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// 5. Entrance Animation
window.addEventListener('load', () => {
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = '0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});