document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Digital Clock Logic
    const clock = () => {
        const timeBox = document.getElementById('current-time');
        const now = new Date();
        timeBox.innerText = now.toTimeString().split(' ')[0];
    };
    setInterval(clock, 1000);
    clock();

    // 2. Study Slider Interaction
    const slider = document.getElementById('hour-slider');
    const valDisplay = document.getElementById('hour-val');
    const fill = document.getElementById('study-fill');

    slider.addEventListener('input', (e) => {
        const val = e.target.value;
        valDisplay.innerHTML = `${val}<small>h</small>`;
        
        // Update the visual progress bar width
        const percentage = (val / 12) * 100;
        fill.style.width = `${percentage}%`;
    });

    // 3. Counter Animation (Discipline Score)
    const animateDiscipline = () => {
        const counter = document.querySelector('.counter');
        let count = 0;
        const target = 82;
        
        const update = () => {
            if(count < target) {
                count++;
                counter.innerText = count + "%";
                setTimeout(update, 20);
            }
        };
        update();
    };
    animateDiscipline();

    // 4. Navigation Toggle
    const links = document.querySelectorAll('.nav-links li');
    links.forEach(link => {
        link.addEventListener('click', () => {
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});