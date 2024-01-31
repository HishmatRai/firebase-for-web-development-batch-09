let uid;
const email = document.getElementById("email")
const password = document.getElementById("password");
const message = document.getElementById("message")
const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const phone = document.getElementById("phone");
const image = document.getElementById("image")
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid
        if (!user.emailVerified) {
            window.location.assign("./email-verification.html")
        } else {
            firebase.database().ref("users/" + user.uid).on("value", (res) => {
                console.log("current user >>>>>>>>>>>",);
                firstName.value = res.val().firstName
                lastName.value = res.val().lastName
                phone.value = res.val().phone
                email.value = res.val().email;
                email.readOnly = true;
                if (res.val().profileImage !== undefined) {
                    image.src = res.val().profileImage
                }
            })
        }
    } else {
        window.location.assign("./sign-in.html")
    }
});
// 

// file upload
const fileUploadHandler = (event) => {
    var file = event.target.files[0];
    console.log(file)
    var storageRef = firebase.storage().ref();

    var uploadTask = storageRef.child(`profile-images/${uid}`).put(file);
    uploadTask.on('state_changed',
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                firebase.database().ref("users/" + uid).update({
                    profileImage: downloadURL
                })
            });
        }
    );
}

// var a = 10;
// var b = 20;
// console.log(">>>> a >>"+a + ">>>>>>>>>>--------"+ b + ">>>>>>>>>>>=");
// console.log(`abc ${a} >>>>>>>>>>> ${b}`)


const todos  = document.getElementById("todos");
firebase.database().ref("todos/").on("value", (res) => {
    res.forEach((v,i)=>{
        // 1 ......
        if(v.val().uid === uid){
            console.log(v.val());
        }
    })
})



