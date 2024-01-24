const email = document.getElementById("email")
const ResetPasswordHandler = () => {
    firebase.auth().sendPasswordResetEmail(email.value)
        .then(() => {
            // Password reset email sent!
            // ..
            console.log("Password reset email sent!")
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log("errorMessage", errorMessage)
        });

}