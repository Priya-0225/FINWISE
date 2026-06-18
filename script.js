let cachedName = localStorage.getItem("user_name");

if (cachedName) {
    document.getElementById("welcomeUser").innerText =
        "Welcome back, " + cachedName + " 👋";
}

auth.onAuthStateChanged(user => {

    if (user) {

        db.collection("users").doc(user.uid).get()
        .then(doc => {

            if (doc.exists) {

                let name = doc.data().name || "User";  

                document.getElementById("welcomeUser").innerText =
                    "Welcome back, " + name + " 👋";

         
                localStorage.setItem("user_name", name);
            } 
            else {
                document.getElementById("welcomeUser").innerText =
                    "Welcome back, User 👋";
            }

        })
        .catch(err => {
            console.error(err);
            document.getElementById("welcomeUser").innerText =
                "Welcome back, User 👋";
        });

    } 
    else {
        window.location.href = "login.html";
    }
});

const quotes = [
"Do not save what is left after spending; spend what is left after saving.",
"An investment in knowledge pays the best interest.",
"Beware of little expenses; a small leak will sink a great ship.",
"Financial freedom is available to those who learn about it and work for it.",
"Do not put all your eggs in one basket."
];

function showQuote() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote").innerText =
        "💡 " + quotes[randomIndex];
}

showQuote();

function startAssessment() {
    window.location.href = "assessment.html";
}

function goToGoal() {
    window.location.href = "goal.html";
}

function goToPurchase() {
    window.location.href = "advisor.html";
}

function logout() {

    auth.signOut().then(() => {

        localStorage.clear(); 

        window.location.href = "login.html";
    });
}