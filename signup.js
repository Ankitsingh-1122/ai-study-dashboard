const form = document.getElementById("signupForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("https://myserver-8ggd.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
        message.style.color = "#00ff88";
        message.innerText = "Account created successfully ✅";
    } else {
        message.style.color = "#ff4b5c";
        message.innerText = data.message;
    }
});
