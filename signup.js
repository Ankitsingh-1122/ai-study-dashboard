const form = document.getElementById("signupForm");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.querySelector("input[type='email']").value;
    const password = form.querySelector("input[type='password']").value;

    try {
        const response = await fetch("https://myserver-8ggd.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("token", data.token);
            window.location.href = "dashboard.html";
        } else {
            errorMessage.innerText = data.message;
        }

    } catch (error) {
        errorMessage.innerText = "Server error. Try again.";
    }
});
