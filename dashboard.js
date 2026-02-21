// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    checkProfile();
    updateDate();
    loadTasks();
    updateExamCountdown();
});

// --- PROFILE MANAGEMENT ---
function checkProfile() {
    const name = localStorage.getItem('studentName');
    const course = localStorage.getItem('studentCourse');
    const modal = document.getElementById('setupModal');

    if (name && course) {
        modal.style.display = "none";
        renderProfile(name, course);
    } else {
        modal.style.display = "flex";
    }
}

function saveProfile() {
    const nameInput = document.getElementById('userName').value.trim();
    const courseInput = document.getElementById('userCourse').value;

    if (nameInput && courseInput) {
        localStorage.setItem('studentName', nameInput);
        localStorage.setItem('studentCourse', courseInput);
        checkProfile(); // Refresh view
    } else {
        alert("Please enter both your name and course!");
    }
}

function renderProfile(name, course) {
    document.getElementById('welcomeText').innerText = `Welcome, ${name} 👋`;
    const badge = document.getElementById('courseBadge');
    badge.innerText = course;
    badge.style.display = "inline-block";
}

function resetProfile() {
    if(confirm("Are you sure? This will delete all your tasks and profile data.")) {
        localStorage.clear();
        location.reload();
    }
}

// --- TASK MANAGEMENT ---
// Initialize tasks from LocalStorage or empty array
let tasks = JSON.parse(localStorage.getItem('studentTasks')) || [];

function loadTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task} 
            <i class="fas fa-check" style="cursor:pointer; color:green" onclick="removeTask(${index})"></i>
        `;
        list.appendChild(li);
    });

    document.getElementById('taskCount').innerText = tasks.length;
}

function addTask() {
    const input = document.getElementById('taskInput');
    const taskValue = input.value.trim();

    if (taskValue === '') return;

    tasks.push(taskValue);
    syncTasks();
    input.value = '';
    loadTasks();
}

function removeTask(index) {
    tasks.splice(index, 1);
    syncTasks();
    loadTasks();
}

function syncTasks() {
    localStorage.setItem('studentTasks', JSON.stringify(tasks));
}

// --- HELPERS & EXTRA FEATURES ---
function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').innerText = new Date().toLocaleDateString(undefined, options);
}

function updateExamCountdown() {
    // Set your exam date here
    const examDate = new Date("2026-05-01"); 
    const today = new Date();
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const display = document.getElementById('daysToExam');
    display.innerText = diffDays > 0 ? diffDays : "Exam Day!";
}

function showAbout() {
    alert("🚀 StudentOS v1.0\nYour all-in-one productivity dashboard.\nBuilt for students, by students.");
}

function showHelp() {
    alert("Quick Guide:\n1. Add assignments in the task box.\n2. Click the green check to finish.\n3. Use 'Reset' to change your profile.");
}