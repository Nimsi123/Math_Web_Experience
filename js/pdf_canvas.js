
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

function dumpElement(blockIdentifier, questionNumber, data){
	// style = "width:80%; float:left;"
	document.getElementById(blockIdentifier).innerHTML += `<p style= "float:left; left:0%;">` + (questionNumber + ')') + `</p> 
															<p id = "math">` + data + `</p> <br><br><br><br>`;
}

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

				//The LaTeX parts need space from one another. Achieve this by adding many line breaks

				if (count < leftLim){
					//alert("lqb" + (Math.floor((count+displacement)/18)));
	            	dumpElement( ("lqb" + blockCounter), (count+displacement+1), doc.data()["problem"]);
	            	dumpElement( ("lab" + blockCounter), (count+displacement+1), doc.data()["answer"]);
	            	}

	            else if (count < rightLim){
	            	//alert("rqb" + (Math.floor((count+displacement)/18)));
	            	dumpElement( ("rqb" + blockCounter), (count+displacement+1), doc.data()["problem"]);
	            	dumpElement( ("rab" + blockCounter), (count+displacement+1), doc.data()["answer"]);
	            	}
	            
	            else if (count >= rightLim){
	            	//make a new page
	            	//	add div blocks for questions and answers

	            	blockCounter+= 1;
	            	count = -1; //to offset the upcoming count += 1;
	            	displacement += displacementFactor;

	            	//with the info part out of the way, we can fit more questions into the page!
	            	leftLim = 13;
	            	rightLim = 26;
	            	displacementFactor = 26;


	            	document.getElementById("question_block").innerHTML += `		
	            	<div id = "page">		
			            <div id = ` + ("lqb" + blockCounter) + ` style = "float:left; width:50%;">
						</div>

						<div id = ` + ("rqb" + blockCounter) + ` style = "float:left; width:50%;">
						</div>

						<footer>Footer</footer>
						<p style = 'page-break-after:always;'>Page break</p>
					</div>
					`;

					document.getElementById("answer_block").innerHTML += `			
					<div id = "page">	
			            <div id = ` + ("lab" + blockCounter) + ` style = "float:left; width:50%;">
						</div>

						<div id = ` + ("rab" + blockCounter) + ` style = "float:left; width:50%;">
						</div>

						<footer>Footer</footer>
						<p style = 'page-break-after:always;'>Page break</p>
					</div>
					`;
	            }
	            

	            count += 1;

	        });
	    });
	//MathJax.Hub.Queue(["Typeset",MathJax.Hub, "math"]);
	//alert("done");
	alert("one");
	(function () {
		  var script = document.createElement("script");
		  script.type = "text/javascript";
		  script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";   // use the location of your MathJax

		  var config = `MathJax.Hub.Config({ config: "MathJax.js",
		  									tex2jax: { inlineMath: [['$', '$']] },
		    								elements: ['math']
		   									}); ` + 'MathJax.Hub.Startup.onload();';

		  if (window.opera) {script.innerHTML = config}
		               else {script.text = config}

		  document.getElementsByTagName("head")[0].appendChild(script);
		})();	
	alert("n");
	MathJax.Hub.Queue(["Typeset",MathJax.Hub, "math"]);
	alert("done");
}
