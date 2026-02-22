let assignments = [
    { name: "Unit 1 Vectors", subject: "Math", file: "vectors.pdf" },
    { name: "Pointers Lab", subject: "C Programming", file: "ptr.c" }
];

const grid = document.getElementById('assignmentGrid');
const searchInput = document.getElementById('assignmentSearch');

/* ================= RENDER ================= */

function render(filter = "") {
    grid.innerHTML = "";

    const filtered = assignments.filter(a =>
        a.name.toLowerCase().includes(filter.toLowerCase()) ||
        a.subject.toLowerCase().includes(filter.toLowerCase())
    );

    const groups = filtered.reduce((acc, curr) => {
        if (!acc[curr.subject]) acc[curr.subject] = [];
        acc[curr.subject].push(curr);
        return acc;
    }, {});

    Object.keys(groups).forEach((subject, index) => {
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <h3>${subject}</h3>
                <span style="font-size:0.7rem; background:rgba(255,255,255,0.1); padding:4px 8px; border-radius:5px;">
                    ${groups[subject].length} Tasks
                </span>
            </div>
            <div class="task-list">
                ${groups[subject].map(task => `
                    <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05)">
                        <span>${task.name}</span>
                        <i class="fas fa-file-pdf"></i>
                    </div>
                `).join('')}
            </div>
        `;

        grid.appendChild(card);
    });
}

/* ================= ADD ================= */

/* ================= 3D PARALLAX EFFECT ================= */

document.addEventListener("mousemove", (e) => {

    const wrapper = document.querySelector(".dashboard-wrapper");
    const cards = document.querySelectorAll(".subject-card");

    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;

    wrapper.style.transform = `
        rotateY(${x}deg)
        rotateX(${y}deg)
    `;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = (e.clientX - rect.left - rect.width / 2) / 20;
        const cardY = (e.clientY - rect.top - rect.height / 2) / 20;

        card.style.transform = `
            rotateY(${cardX}deg)
            rotateX(${-cardY}deg)
            translateZ(10px)
        `;
    });

});

/* Reset when mouse leaves */
document.addEventListener("mouseleave", () => {
    document.querySelector(".dashboard-wrapper").style.transform = "rotateX(0) rotateY(0)";
    document.querySelectorAll(".subject-card").forEach(card => {
        card.style.transform = "rotateX(0) rotateY(0)";
    });
});

document.getElementById('addBtn').onclick = () => {
    const name = document.getElementById('taskName').value;
    const subject = document.getElementById('subjectSelect').value;

    if (name.trim()) {
        assignments.unshift({ name, subject, file: "new_upload.pdf" });
        render();
        document.getElementById('taskName').value = "";
    }
};

/* ================= SEARCH ================= */

searchInput.oninput = (e) => render(e.target.value);

/* ================= HELPER SYSTEM ================= */

const helperBtn = document.getElementById("helperBtn");
const helperModal = document.getElementById("helperModal");
const closeHelper = document.getElementById("closeHelper");
const sendHelper = document.getElementById("sendHelper");
const helperOutput = document.getElementById("helperOutput");
const helperInput = document.getElementById("helperInput");

/* ===== Open Helper ===== */

helperBtn.onclick = () => {
    helperModal.classList.add("active");
    helperInput.focus();
};

/* ===== Close Helper ===== */

function closeModal() {
    helperModal.classList.remove("active");
}

closeHelper.onclick = closeModal;

/* Close on outside click */
helperModal.addEventListener("click", (e) => {
    if (e.target === helperModal) {
        closeModal();
    }
});

/* Close on ESC key */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});

/* ================= MESSAGE SYSTEM ================= */

function addMessage(text, type) {
    const msg = document.createElement("div");

    msg.style.padding = "10px 14px";
    msg.style.marginBottom = "10px";
    msg.style.borderRadius = "12px";
    msg.style.maxWidth = "80%";
    msg.style.wordWrap = "break-word";

    if (type === "user") {
        msg.style.background = "linear-gradient(45deg,#00f2fe,#4facfe)";
        msg.style.alignSelf = "flex-end";
    } else {
        msg.style.background = "rgba(255,255,255,0.1)";
        msg.style.alignSelf = "flex-start";
    }

    msg.innerHTML = text;
    helperOutput.appendChild(msg);

    helperOutput.scrollTop = helperOutput.scrollHeight;
}

/* Markdown format */
function formatResponse(text) {
    return text
        .replace(/\n/g, "<br>")
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
        .replace(/\*(.*?)\*/g, "<i>$1</i>");
}

/* ================= SEND MESSAGE ================= */

sendHelper.onclick = sendMessage;

helperInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {

    const message = helperInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    helperInput.value = "";

    addMessage("🤖 Thinking...", "bot");

    try {

        const response = await fetch("https://myserver-8ggd.onrender.com/helper", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) throw new Error("Server error");

        const data = await response.json();

        helperOutput.lastChild.remove();

        addMessage(
            data.reply
                ? formatResponse(data.reply)
                : "⚠️ No response received.",
            "bot"
        );

    } catch (err) {
        helperOutput.lastChild.remove();
        addMessage("❌ Error connecting to AI", "bot");
        console.error(err);
    }
}

/* ================= INIT ================= */

render();