const title = document.getElementById("title")
const details = document.getElementById("details");
// generateID
function generateID(length) {
    let text = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}

// upload file
let imageUrl;
const fileUpload = (e) => {
    const imageId = generateID(24);
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child(`blog-images/${imageId}`).put(e.target.files[0]);
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
                imageUrl = downloadURL
            });
        }
    );
}
const createBlog = () => {
    // const blog = {
    //     title: title.value,
    //     details: details.value,
    //     imageUrl: imageUrl
    // }
    // Add a new document with a generated id.
    firebase.firestore().collection("blogs/").add({
        title: title.value,
        details: details.value,
        imageUrl: imageUrl
    })


}




firebase.firestore().collection("blogs/")
    .onSnapshot((querySnapshot) => {
        // container.innerHTML = ""
        var blogs = [];
        querySnapshot.forEach((doc) => {
            blogs.push(doc.data());

        });
        console.log("blogs",blogs)
    })