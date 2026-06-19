let currentUser = localStorage.getItem("currentUser") || "guest";

let score = 0;
let emergencyFund = 0;
let debt = 0;

let prevScore = null;

auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user.uid;

        db.collection("users").doc(user.uid).get()
        .then(doc => {
            if (doc.exists) {
                score = doc.data().score || 0;
                emergencyFund = doc.data().emergencyFund || 0;
                debt = doc.data().debt || 0;

                prevScore = parseInt(localStorage.getItem(currentUser + "_score"));

                loadResult();
            }
        });
    }
});

function loadResult() {

    document.getElementById("loader").style.display = "none";
    document.getElementById("mainContent").style.display = "block";

    let profile = "";
    let emoji = "";
    let summaryText = "";

    if (score >= 70) {
        profile = "Aggressive";
        emoji = "🚀";
        summaryText = "Strong financial position. Focus on wealth growth.";
    } 
    else if (score >= 40) {
        profile = "Moderate";
        emoji = "⚖️";
        summaryText = "Stable but needs improvement.";
    } 
    else {
        profile = "Conservative";
        emoji = "🛡️";
        summaryText = "Improve financial habits.";
    }

    document.getElementById("score").innerText = score + " / 100";
    document.getElementById("profile").innerHTML = emoji + " " + profile + " Investor";
    document.getElementById("summary").innerText = summaryText;

    let progressText = "";

    if (prevScore === null || isNaN(prevScore)) {
        progressText = "This is your first assessment.";
    } 
    else if (score > prevScore) {
        progressText = `Improved from ${prevScore} → ${score}`;
    } 
    else if (score < prevScore) {
        progressText = `Dropped from ${prevScore} → ${score}`;
    } 
    else {
        progressText = "No change in score.";
    }

    localStorage.setItem(currentUser + "_score", score);
    document.getElementById("progressText").innerText = progressText;

    let insights = "";

    insights += emergencyFund === 20 ? "✔ Strong emergency fund\n" :
                emergencyFund === 10 ? "⚠ Moderate emergency fund\n" :
                "❌ No emergency fund\n";

    insights += debt === 20 ? "✔ No debt\n" :
                debt === 10 ? "⚠ Manageable debt\n" :
                "❌ High debt";

    document.getElementById("insights").innerText = insights;

    let nextStep = [];

    if (score >= 70) {
        nextStep.push("Focus on investments");
    }
    else if (score >= 40) {
        nextStep.push("Increase savings");
        nextStep.push("Reduce expenses");
    }
    else {
        nextStep.push("Control spending");
        nextStep.push("Build savings habit");
    }

    if (debt === 0) nextStep.push("Reduce debt");
    if (emergencyFund === 0) nextStep.push("Build emergency fund");

    document.getElementById("nextStep").innerText = nextStep.join("\n");

    document.getElementById("progressBar").innerHTML =
        `<div style="width:${score}%;height:10px;background:#00ffcc;"></div>`;
}

function calculateBudget(){
    let income = parseFloat(document.getElementById("income").value);
    if(!income) return alert("Enter income");

    let needs = Math.round(income * 0.5);
    let wants = Math.round(income * 0.3);
    let savings = Math.round(income * 0.2);

    document.getElementById("budgetResult").innerText = 
`Needs (Survival): ₹${needs}
Wants (Lifestyle): ₹${wants}
Savings (Future): ₹${savings}`;
}

function goHome(){ window.location.href="dashboard.html"; }
function goToPurchase(){ window.location.href="advisor.html"; }

function flipCard(){
    document.getElementById("flipCard").classList.toggle("flipped");
}

function logout() {
    auth.signOut().then(() => {
        localStorage.clear();
        window.location.href = "login.html";
    });
}
