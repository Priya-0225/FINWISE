function generatePlan() {

    let income = document.getElementById("income").value;

    if (income === "" || income <= 0) {
        alert("Please enter a valid income");
        return;
    }

    income = parseInt(income);

    let profile = localStorage.getItem("profile");

    let needs, wants, savings;

    if (profile === "Aggressive") {
        needs = income * 0.5;
        wants = income * 0.2;
        savings = income * 0.3;
    } 
    else if (profile === "Moderate") {
        needs = income * 0.5;
        wants = income * 0.3;
        savings = income * 0.2;
    } 
    else {
        needs = income * 0.6;
        wants = income * 0.2;
        savings = income * 0.2;
    }

 document.getElementById("plan").innerHTML = `
    <div class="plan-box">
        Needs<br>₹${Math.round(needs)}
    </div>

    <div class="plan-box">
        Wants<br>₹${Math.round(wants)}
    </div>

    <div class="plan-box">
        Savings<br>₹${Math.round(savings)}
    </div>
`;
}
