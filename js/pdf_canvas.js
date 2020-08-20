
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

	db.collection("Rational Number Operations")
	.get()
	.then(function(querySnapshot) {
			var count = 0;
			var displacement = 0;
			var displacementFactor = 18;

			var blockCounter = 0;

			var leftLim = 9;
			var rightLim = 18;
			
	        querySnapshot.forEach(function(doc) {
	        	//alert(count);
	        	//var question = "<p>" + doc.data()["problem"] + "</p><br>"
	        	//var answer = "<p>" + doc.data()["answer"] + "</p><br>"

				//'<div>  <div style= "float:left; left:0%;"><p>1) </p></div> <div style = "width:20%; float:left;"><p>$$\sqrt{19}$$</p></div>  </div><br><br><br><br>'
				//'<div>  <div style= "float:left; left:0%;"><p>1) </p></div> <div style = "width:20%; float:left;"><p>' +  + '</p></div>  </div><br><br><br><br>'

				//The LaTeX parts need space from one another. Achieve this by adding many line breaks
				
				//if ((count + displacement) > 30){alert(count+displacement);}
				
				

				if (count < leftLim){
					//alert("lqb" + (Math.floor((count+displacement)/18)));
	            	document.getElementById("lqb" + blockCounter).innerHTML += '<div>  <div style= "float:left; left:0%;"><p>' + (count+displacement+1) + ')' + ' ' + '</p></div> <div style = "width:80%; float:left;"><p>' + doc.data()["problem"] + '</p></div>  </div><br><br><br><br>';
	            	document.getElementById("lab" + blockCounter).innerHTML += '<div>  <div style= "float:left; left:0%;"><p>' + (count+displacement+1) + ')' + ' ' + '</p></div> <div style = "width:80%; float:left;"><p>' + doc.data()["answer"] + '</p></div>  </div><br><br><br><br>';
	            	}

	            else if (count < rightLim){
	            	//alert("rqb" + (Math.floor((count+displacement)/18)));
	            	document.getElementById("rqb" + blockCounter).innerHTML += '<div>  <div style= "float:left; left:0%;"><p>' + (count+displacement+1) + ')' + ' ' + '</p></div> <div style = "width:80%; float:left;"><p>' + doc.data()["problem"] + '</p></div>  </div><br><br><br><br>';
	            	document.getElementById("rab" + blockCounter).innerHTML += '<div>  <div style= "float:left; left:0%;"><p>' + (count+displacement+1) + ')' + ' ' + '</p></div> <div style = "width:80%; float:left;"><p>' + doc.data()["answer"] + '</p></div>  </div><br><br><br><br>';
	            	}
	            
	            else if (count >= rightLim){
	            	//make a new page
	            	//	add div blocks for questions and answers
	            	//alert("alo");
	            	blockCounter+= 1;
	            	
	            	document.getElementById("question_block").innerHTML += `		
	            	<div id = "page">		
			            <div id = ` + ("lqb" + blockCounter) + ` style = "float:left; width:50%;">
						</div>

						<div id = ` + ("rqb" + blockCounter) + ` style = "float:left; width:50%;">
						</div>

						<footer>Footer</footer>
					</div>
					`;

					document.getElementById("answer_block").innerHTML += `			
					<div id = "page">	
			            <div id = ` + ("lab" + blockCounter) + ` style = "float:left; width:50%;">
						</div>

						<div id = ` + ("rab" + blockCounter) + ` style = "float:left; width:50%;">
						</div>

						<footer>Footer</footer>
					</div>
					`;

	            	count = -1; //to offset the upcoming count += 1;
	            	displacement += displacementFactor;

	            	//with the info part out of the way, we can fit more questions into the page!
	            	leftLim = 13;
	            	rightLim = 26;
	            	displacementFactor = 26;
	            }
	            

	            count += 1;

	        });
	    });
}
