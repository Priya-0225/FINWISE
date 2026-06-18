let goals = [];

let cachedGoals = localStorage.getItem("goals_cache");

if (cachedGoals) {
    goals = JSON.parse(cachedGoals);
    renderGoals();
}
auth.onAuthStateChanged(user => {

    if (!user) return;

    db.collection("users").doc(user.uid).get()
    .then(doc => {

        if (doc.exists && doc.data().goals) {

            goals = doc.data().goals;

            localStorage.setItem("goals_cache", JSON.stringify(goals));

            renderGoals();
        }
    });
});

function createGoal() {

    const user = auth.currentUser;
    if (!user) return alert("Login first");

    let name = document.getElementById("goalName").value;
    let target = parseFloat(document.getElementById("goalAmount").value);

    if (!name || !target) return alert("Enter valid details");

    let newGoal = {
        id: Date.now(),
        name: name,
        target: target,
        saved: 0,
        completed: false
    };

    goals.push(newGoal);

    saveGoals();
    renderGoals();

    document.getElementById("goalName").value = "";
    document.getElementById("goalAmount").value = "";
}

function renderGoals() {

    let container = document.getElementById("goalList");

    if (goals.length === 0) {
        container.innerHTML = `
        <div class="card">
            🎯 No goals yet<br>
            <small>Create one to start saving</small>
        </div>`;
        return;
    }

    container.innerHTML = "";

    goals.forEach(goal => {

        if (goal.completed) return;

        let percent = (goal.saved / goal.target) * 100;
        if (percent > 100) percent = 100;

        let monthly = Math.ceil((goal.target - goal.saved) / 12);

        let card = `
        <div class="card">

            <h3>${goal.name}</h3>
            <p>Target: ₹${goal.target}</p>

            <p class="hint">
                💡 Save ₹${monthly}/month to reach goal
            </p>

            <div class="progress-bar">
                <div class="progress-fill" style="width:${percent}%"></div>
            </div>

            <p>${percent.toFixed(0)}% • ₹${goal.saved} saved</p>

            <button onclick="addMoney(${goal.id})">💰 Add Money</button>

        </div>
        `;

        container.innerHTML += card;
    });
}

function addMoney(id) {

    let amount = prompt("Enter amount:");
    if (!amount || isNaN(amount)) return;

    amount = parseFloat(amount);

    let goal = goals.find(g => g.id === id);
    goal.saved += amount;

    // SOUND
    let sound = document.getElementById("coinSound");
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }

    if (goal.saved >= goal.target) {

        goal.completed = true;

        celebrate();

        document.getElementById("goalList").innerHTML =
        `<div class="card">
            🎉 Goal Completed: ${goal.name}
            <button onclick="removeGoal(${goal.id})">Create New Goal</button>
        </div>`;
    }

    saveGoals();
    renderGoals();
}

function removeGoal(id) {
    goals = goals.filter(g => g.id !== id);
    saveGoals();
    renderGoals();
}

function saveGoals() {

    const user = auth.currentUser;
    if (!user) return;

    db.collection("users").doc(user.uid).set({
        goals: goals
    }, { merge: true });
}

function celebrate() {
    confetti({
        particleCount: 120,
        spread: 70
    });
}

function goHome() {
    window.location.href = "index.html";
}

function logout() {

    auth.signOut().then(() => {

        localStorage.clear(); 

        window.location.href = "login.html";
    });
}