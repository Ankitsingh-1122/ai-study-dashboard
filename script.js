// Bubble Effect
document.addEventListener("click", function(e) {

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const size = Math.random() * 60 + 20;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    bubble.style.left = e.clientX - size/2 + "px";
    bubble.style.top = e.clientY - size/2 + "px";

    const colors = [
        "#ff4b5c",
        "#ff9a00",
        "#00f5d4",
        "#9b5de5",
        "#f15bb5",
        "#00bbf9"
    ];

    bubble.style.background = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    }, 1000);
});


// Login Logic
const form = document.querySelector(".login-form");
const message = document.getElementById("message");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = form.querySelector("input[type='email']").value;
    const password = form.querySelector("input[type='password']").value;

    const response = await fetch("https://myserver-8ggd.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
        message.style.color = "lightgreen";
        message.textContent = "Login successful ✅";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    } else {
        message.style.color = "red";
        message.textContent = "Login unsuccessful ❌";
    }
});
