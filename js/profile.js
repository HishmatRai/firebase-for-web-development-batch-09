let uid;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid
        if (!user.emailVerified) {
            window.location.assign("./email-verification.html")
        } else {
            firebase.database().ref("users/" + user.uid).on("value", (res) => {
                console.log("current user >>>>>>>>>>>", res.val())
            })
        }
    } else {
        window.location.assign("./sign-in.html")
    }
});
// 