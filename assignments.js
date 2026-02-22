let assignments = [
    { name: "Unit 1 Vectors", subject: "Math", file: "vectors.pdf" },
    { name: "Pointers Lab", subject: "C Programming", file: "ptr.c" }
];

const grid = document.getElementById('assignmentGrid');
const searchInput = document.getElementById('assignmentSearch');

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
                <h3 style="margin:0; color:var(--primary)">${subject}</h3>
                <span style="font-size:0.7rem; background:rgba(255,255,255,0.1); padding:4px 8px; border-radius:5px;">
                    ${groups[subject].length} Tasks
                </span>
            </div>
            <div class="task-list">
                ${groups[subject].map(task => `
                    <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05)">
                        <span>${task.name}</span>
                        <i class="fas fa-file-pdf" style="color:var(--accent)"></i>
                    </div>
                `).join('')}
            </div>
        `;
        grid.appendChild(card);
    });
}

// Add Assignment
document.getElementById('addBtn').onclick = () => {
    const name = document.getElementById('taskName').value;
    const subject = document.getElementById('subjectSelect').value;

    if (name) {
        assignments.unshift({ name, subject, file: "new_upload.pdf" });
        render();
        document.getElementById('taskName').value = "";
    }
};

// Search
searchInput.oninput = (e) => render(e.target.value);

// ================= HELPER INTEGRATION =================

const helperBtn = document.getElementById("helperBtn");
const helperModal = document.getElementById("helperModal");
const closeHelper = document.getElementById("closeHelper");
const sendHelper = document.getElementById("sendHelper");
const helperOutput = document.getElementById("helperOutput");

// Open modal
helperBtn.onclick = () => {
    helperModal.style.display = "flex";
};

// Close modal
closeHelper.onclick = () => {
    helperModal.style.display = "none";
};

// Send to backend
sendHelper.onclick = async () => {

    const message = document.getElementById("helperInput").value;
    if (!message) return;

    helperOutput.innerText = "🤖 Thinking...";

    try {

        const response = await fetch("https://myserver-8ggd.onrender.com/helper", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        helperOutput.innerText = data.reply;

    } catch (err) {
        helperOutput.innerText = "❌ Error connecting to AI";
    }
};

// Initial Load
render();