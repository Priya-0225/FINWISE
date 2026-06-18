let currentStep = 0;
const steps = document.querySelectorAll(".step");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let isCalculated = false;
showStep(currentStep);

function showStep(n) {

    steps.forEach(step => step.classList.remove("active"));
    steps[n].classList.add("active");

    prevBtn.style.display = n === 0 ? "none" : "inline-block";

    if (n === steps.length - 1) {
        nextBtn.innerText = "Analyze";
    } else {
        nextBtn.innerText = "Next";
    }

    let progress = ((n + 1) / steps.length) * 100;
    document.getElementById("progressFill").style.width = progress + "%";
}

nextBtn.addEventListener("click", () => {

    if (!validateStep()) return;

    if (currentStep === steps.length - 1) {
        calculateScore(); 
        return;
    }

    currentStep++;
    showStep(currentStep);
});

prevBtn.addEventListener("click", () => {
    currentStep--;
    showStep(currentStep);
});

function validateStep() {
    const selected = steps[currentStep].querySelector("input:checked");
    if (!selected) {
        alert("Please select an option before continuing.");
        return false;
    }
    return true;
}

function calculateScore() {

    if (isCalculated) return;
    isCalculated = true;

    let form = document.forms["assessmentForm"];

    let q1 = parseInt(form["q1"].value);
    let q2 = parseInt(form["q2"].value);
    let q3 = parseInt(form["q3"].value);
    let q4 = parseInt(form["q4"].value);
    let q5 = parseInt(form["q5"].value);

    let total = q1 + q2 + q3 + q4 + q5;

    console.log("Score:", total);

    auth.onAuthStateChanged(user => {

        if (!user) {
            alert("User not logged in");
            return;
        }

        db.collection("users").doc(user.uid).set({
            score: total,
            emergencyFund: q3,
            debt: q4
        }, { merge: true })
        .then(() => {

            console.log("✅ Saved successfully");
            window.location.href = "result.html";
        })
        .catch(err => {
            console.error("ERROR:", err);
            alert("Error saving data");
        });

    });
}
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", function() {
        let sound = document.getElementById("clickSound");
        if (sound) {
            sound.currentTime = 0;
            sound.play();
        }
    });
});