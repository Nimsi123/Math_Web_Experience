
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


function genPDF(){
	db.collection("Addition")
	.get()
	.then(function(querySnapshot) {
			var count = 0;
			
	        querySnapshot.forEach(function(doc) {
	        	//alert(count);
	        	//var question = "<p>" + doc.data()["problem"] + "</p><br>"
	        	//var answer = "<p>" + doc.data()["answer"] + "</p><br>"

				//'<div>  <div style= "float:left; left:0%;"><p>1) </p></div> <div style = "width:20%; float:left;"><p>$$\sqrt{19}$$</p></div>  </div><br><br><br><br>'
				//'<div>  <div style= "float:left; left:0%;"><p>1) </p></div> <div style = "width:20%; float:left;"><p>' +  + '</p></div>  </div><br><br><br><br>'

				
				if (count < 9){
	            	document.getElementById("lqb").innerHTML += '<div>  <div style= "float:left; left:0%;"><p>' + (count+1) + ')' + ' ' + '</p></div> <div style = "width:80%; float:left;"><p>' + doc.data()["problem"] + '</p></div>  </div><br><br><br><br>';
	            	document.getElementById("lab").innerHTML += '<div>  <div style= "float:left; left:0%;"><p>' + (count+1) + ')' + ' ' + '</p></div> <div style = "width:80%; float:left;"><p>' + doc.data()["answer"] + '</p></div>  </div><br><br><br><br>';
	            	}

	            else if (count < 18){
	            	document.getElementById("rqb").innerHTML += '<div>  <div style= "float:left; left:0%;"><p>' + (count+1) + ')' + ' ' + '</p></div> <div style = "width:80%; float:left;"><p>' + doc.data()["problem"] + '</p></div>  </div><br><br><br><br>';
	            	document.getElementById("rab").innerHTML += '<div>  <div style= "float:left; left:0%;"><p>' + (count+1) + ')' + ' ' + '</p></div> <div style = "width:80%; float:left;"><p>' + doc.data()["answer"] + '</p></div>  </div><br><br><br><br>';
	            	}
	            
	            else if (count >= 18){
	            	return;
	            }
	            

	            count += 1;

	        });
	    });
}
