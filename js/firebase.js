/*
// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyD3u8ClnrlQmWkuwIEfdPtVXiTBEF1FoyQ",
authDomain: "math-program.firebaseapp.com",
databaseURL: "https://math-program.firebaseio.com",
projectId: "math-program",
storageBucket: "math-program.appspot.com",
messagingSenderId: "841452449648",
appId: "1:841452449648:web:36560ddd8f91f52f6429b5",
measurementId: "G-JGSPK5H191"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

//alert("ok");

alert("ok");

db.collection("FOIL").where("number", ">", "3")
.get()
.then(function(querySnapshot) {
	questionMessage = "";
	answerMessage = "";
        querySnapshot.forEach(function(doc) {
            questionMessage += doc.data()["problem"];
            answerMessage += doc.data()["answer"];
        });
    alert(questionMessage);
    alert(answerMessage);
    });
*/