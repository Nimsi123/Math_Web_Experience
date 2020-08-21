
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



function cutFat(){
	var pages = document.getElementsByClassName("page");

	var lastPage = pages[pages.length-1]

	var i;
	for(i = 0; i < pages.length; i++){
		var blocks = pages[i].getElementsByTagName("DIV");
		
		var secondLastB = blocks[blocks.length-2];
		var lastBlock = blocks[blocks.length-1];


		if (lastBlock.innerHTML == ""){
			lastBlock.remove();
			secondLastB.style = "float:left; width:100%;";
		}

	}

	/*
	var lastBlock = lastPage.getElementsByTagName("DIV");

	if (lastBlock[1].innerHTML == ""){
		lastBlock[1].remove();
		lastBlock[0].style = "float:left; width:100%;";
		alert(lastBlock[0].id);
		alert(lastBlock[0].style);
		alert("done");
	}
	*/

	/*
	var i;
	for(i = 0; i < pages.length; i++){
		var blocks = pages[i].getElementsByTagName("DIV");
		
		var lastBlock = blocks[blocks.length-1];
		alert("here");
		alert(lastBlock.innerHTML);
	}
	*/
}

function dynamicMathJax(){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";   // use the location of your MathJax

	var config = `MathJax.Hub.Config({ config: "MathJax.js",
										tex2jax: { inlineMath: [['$', '$'], ["\\(","\\)"]] }
							});`
							// + 'MathJax.Hub.Startup.onload();

	if (window.opera) {script.innerHTML = config}
	           else {script.text = config}

	document.getElementsByTagName("head")[0].appendChild(script);
	//alert("here");
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function dumpElement(blockIdentifier, questionNumber, data){

	document.getElementById(blockIdentifier).innerHTML += `<p style= "float:left; left:0%;">` + (questionNumber + '.') + `</p>`; 
	document.getElementById(blockIdentifier).innerHTML += `<p>` + data + `</p> <br><br><br>`;

}

function genPDF(){

	db.collection("Rational Number Operations Addition")
	.get()
	.then(function(querySnapshot) {
			var count = 0;
			var displacement = 0;
			var displacementFactor = 14;

			var blockCounter = 0;

			var leftLim = 7;
			var rightLim = 14;
			
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
	            	leftLim = 9;
	            	rightLim = 18;
	            	displacementFactor = 18;

	            	document.getElementById("question_block").innerHTML += `		
					<div class = "page">	
			            <div id = ` + ("lqb" + blockCounter) + ` style = "float:left; width:50%;"></div>
						<div id = ` + ("rqb" + blockCounter) + ` style = "float:left; width:50%;"></div>
						<div class="pagebreak"> </div>
					</div>

					`;

					document.getElementById("answer_block").innerHTML += `			
					<div class = "page">	
			            <div id = ` + ("lab" + blockCounter) + ` style = "float:left; width:50%;"></div>
						<div id = ` + ("rab" + blockCounter) + ` style = "float:left; width:50%;"></div>
						<div class="pagebreak"> </div>
					</div>
					`;
	            }
	            

	            count += 1;

	        });
	    });

}
