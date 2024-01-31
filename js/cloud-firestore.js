const input = document.getElementById("input")
const addData = () => {
    // firebase.firestore().collection("testing/").doc("testing-2").set({
    //     todo: input.value
    // }).then(() => {
    //     console.log("Document successfully written!");
    //     input.value = ""
    // })
    //     .catch((error) => {
    //         console.error("Error writing document: ", error);
    //     });

    firebase.firestore().collection("testing/").add({
        todo: input.value,
        verified: false,
    }).then(() => {
        console.log("Document successfully written!");
        input.value = ""
    })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}



// firebase.firestore().collection("testing/").doc("4oCy2fZrukSVpgCAR76x").get().then((doc) => {
//     console.log("res>>>>>>>>>>>>", doc)
//     console.log("res>>>>>>>>>>>>", doc.data())
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });

// firebase.firestore().collection("testing/").get().then((doc) => {
//     doc.forEach((val, index) => {
//         console.log(val.data())
//     })
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });

// firebase.firestore().collection("testing/").get().then((doc) => {
//     doc.forEach((val, index) => {
//         console.log(val.data());
//         if(val.data().todo === 'iHunar'){
//             console.log("iHunar>>>>>>>>>>>>>>>",val.data());

//         }
//     })
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });
// firebase.firestore().collection("testing/").where("todo", "==", "iHunar").get().then((doc) => {
//     doc.forEach((val, index) => {
//         console.log("data>>>>>>>>>>>>>>>", val.data());

//     })
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });

firebase.firestore().collection("testing/").where("verified", "==", true).get().then((doc) => {
    doc.forEach((val, index) => {
        console.log("data>>>>>>>>>>>>>>>", val.data());

    })
}).catch((error) => {
    console.log("Error getting document:", error);
});