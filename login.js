function login() {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!email || !password) {
        document.getElementById("msg").innerText = "Enter email and password";
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {

        let user = userCredential.user;

        localStorage.setItem("currentUser", user.uid);

        db.collection("users").doc(user.uid).get()
        .then(doc => {
            if (doc.exists) {
                localStorage.setItem("user_name", doc.data().name);
            }
        })
        .catch(() => {
            console.log("No name found, continuing...");
        });

        window.location.href = "dashboard.html";

    })
    .catch((err) => {
        console.error(err);
        document.getElementById("msg").innerText = "Invalid login";
    });
}
