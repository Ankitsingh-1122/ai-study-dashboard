let assignments = [
    { name: "Unit 1 Vectors", subject: "Math", file: "vectors.pdf" },
    { name: "Pointers Lab", subject: "C Programming", file: "ptr.c" }
];

const grid = document.getElementById('assignmentGrid');
const searchInput = document.getElementById('assignmentSearch');

function render(filter = "") {
    grid.innerHTML = "";
    
    // Filtering logic
    const filtered = assignments.filter(a => 
        a.name.toLowerCase().includes(filter.toLowerCase()) || 
        a.subject.toLowerCase().includes(filter.toLowerCase())
    );

    // Grouping
    const groups = filtered.reduce((acc, curr) => {
        if (!acc[curr.subject]) acc[curr.subject] = [];
        acc[curr.subject].push(curr);
        return acc;
    }, {});

    // Create Cards
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

// Add Functionality
document.getElementById('addBtn').onclick = () => {
    const name = document.getElementById('taskName').value;
    const subject = document.getElementById('subjectSelect').value;

    if (name) {
        assignments.unshift({ name, subject, file: "new_upload.pdf" });
        render();
        document.getElementById('taskName').value = "";
    }
};

// Real-time Search
searchInput.oninput = (e) => render(e.target.value);

// Helper Bot Click (Connect your API here)
document.getElementById('helperBtn').onclick = () => {
    alert("Helper Bot Activated! Ready for your API integration.");
};

// Initial Load
render();