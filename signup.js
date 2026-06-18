function signup() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        document.getElementById("msg").innerText = "Enter all fields";
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {

        let user = userCredential.user;

        return user.updateProfile({
            displayName: name
        }).then(() => {

            return db.collection("users").doc(user.uid).set({
                name: name,
                email: email,
                score: 0,
                createdAt: new Date()
            });

        });

    })
    .then(() => {

        localStorage.setItem("user_name", name);
        localStorage.setItem("currentUser", auth.currentUser.uid);

        window.location.href = "index.html";

    })
    .catch((err) => {
        console.error(err);
        document.getElementById("msg").innerText = err.message;
    });
}