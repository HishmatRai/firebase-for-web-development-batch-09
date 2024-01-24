const email = document.getElementById("email")
const password = document.getElementById("password");
const message = document.getElementById("message")
const signInHandler = () => {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            console.log(res.user);
            message.innerHTML = "Success";
            message.style.color = "green";
            if (res.user.emailVerified) {
                setTimeout(() => {
                    window.location.assign("./home.html")
                }, 2000);
            } else {
                setTimeout(() => {
                    window.location.assign("./email-verification.html")
                }, 2000);
            }
            console.log(res.user)
        })
        .catch((err) => {
            console.log(err)
            // message.innerHTML = err.message;
            // message.style.color = "red"
        })
}


const siginWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log(result)
        }).catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });
}