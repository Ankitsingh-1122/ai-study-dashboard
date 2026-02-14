document.addEventListener('DOMContentLoaded', () => {
    // 1. Live Clock
    setInterval(() => {
        document.getElementById('current-time').innerText = new Date().toLocaleTimeString('en-GB');
    }, 1000);

    // 2. Animated Balance Counter
    const balanceElement = document.querySelector('.balance-amount');
    const targetValue = 15000;
    let startValue = 0;
    const duration = 1500; // 1.5 seconds
    const stepTime = 20;
    const increment = targetValue / (duration / stepTime);

    const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= targetValue) {
            balanceElement.innerText = `₹${targetValue.toLocaleString()}.00`;
            clearInterval(timer);
        } else {
            balanceElement.innerText = `₹${Math.floor(startValue).toLocaleString()}.00`;
        }
    }, stepTime);

    // 3. Simple Button Interaction
    document.querySelector('.btn-primary').addEventListener('click', function() {
        this.innerText = "Processing...";
        this.style.opacity = "0.7";
        setTimeout(() => {
            this.innerText = "Transfer Complete ✓";
            this.style.background = "#10b981";
        }, 1500);
    });
});