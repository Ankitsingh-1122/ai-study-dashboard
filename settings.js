document.addEventListener('DOMContentLoaded', () => {
    const volSlider = document.getElementById('vol-slider');
    const volLabel = document.getElementById('vol-label');
    const saveBtn = document.querySelector('.btn-primary');

    // 1. Update Volume Label in Real-time
    volSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        volLabel.innerText = `Volume: ${val}%`;
    });

    // 2. Save Button Interaction
    saveBtn.addEventListener('click', () => {
        const originalText = saveBtn.innerText;
        saveBtn.innerText = "Config Saved ✓";
        saveBtn.style.background = "#10b981"; // Change to success green
        
        // Return to normal after 2 seconds
        setTimeout(() => {
            saveBtn.innerText = originalText;
            saveBtn.style.background = "#bf40ff"; // Back to purple
        }, 2000);
    });

    // 3. Navigation Highlighting
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
});