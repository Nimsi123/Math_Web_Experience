
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


//sometimes, there will be a left over block with no questions in it
//this extra block messes up the PDF printing
//cut the fat!
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
}

//after the html is filled with the questions and answers from Firebase
//run this function to apply MathJax to the page!
//MathJax must be run AFTER the questions have been loaded.
function dynamicMathJax(){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";   // use the location of your MathJax

	var config = `MathJax.Hub.Config({ config: "MathJax.js",
										tex2jax: { inlineMath: [['$', '$'], ["\\(","\\)"]] }
							});`

	if (window.opera) {script.innerHTML = config}
	           else {script.text = config}

	document.getElementsByTagName("head")[0].appendChild(script);
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

//this is a helper method to genPDF
//dump the text from Firebase into the appropriate block
function dumpElement(blockIdentifier, questionNumber, data){

	//The LaTeX text needs space from one another. Achieve this by adding many line breaks
	document.getElementById(blockIdentifier).innerHTML += `<p style= "float:left; left:0%;">` + (questionNumber + '.') + `</p>`; 
	document.getElementById(blockIdentifier).innerHTML += `<p>` + data + `</p> <br><br><br>`;

}

function createBlocksForNewPage(flag, blockCounter, textType){
	//add blocks to this new page
	var block;
	if (textType == "problem") {
		block = "question_block";
	}
	else{
		block = "answer_block";
	}

	var blockName_left = "l" + flag + "b" + blockCounter;
	var blockName_right = "r" + flag + "b" + blockCounter;

	document.getElementById(block).innerHTML += `		
	<div class = "page">	
        <div id = ` + blockName_left + ` style = "float:left; width:50%;"></div>
		<div id = ` + blockName_right + ` style = "float:left; width:50%;"></div>
		<div class="pagebreak"> </div>
	</div>
	`;
}

function manageTextDump(blockCounter, displacement, count, lim, doc, textType){

	//determines which block we are working with
	var flag;
	if (textType == "problem"){
		flag = "q";
	}
	else{
		flag = "a";
	}

	
	if (count < lim[0]){
		//dump to the left blocks
		var blockName = "l" + flag + "b" + blockCounter;
		var question_number = count + displacement[0] + 1;

    	dumpElement( blockName, question_number, doc.data()[textType] );
    	}
    else if (count < lim[1]){
    	//dump to the right blocks
    	var blockName = "r" + flag + "b" + blockCounter;
    	var question_number = count + displacement[0] + 1;

    	dumpElement( blockName, question_number, doc.data()[textType]);
    	}
    else if (count >= lim[1]){
    	//make a new page
    	//	add div blocks for questions and answers

    	blockCounter+= 1;
    	count = -1; //to offset the upcoming count += 1;
    	displacement[0] += displacement[1];

    	//with the info part out of the way, we can fit more questions into the page!
    	lim[0] = 8;
    	lim[1] = 16;
    	displacement[1] = 16;

		createBlocksForNewPage(flag, blockCounter, textType);

    }

    //return updates to counters and stuff
    return [blockCounter, displacement, count, lim];
}

function genPDF(question_generator_name){

	db.collection(question_generator_name)
	.get()
	.then(function(querySnapshot) {
			var blockCounter_q = 0;
			var blockCounter_a = 0;

			var count_q = 0; //once count goes over the limit, make a new page and reset the count
			var count_a = 0;

			//[0] displacement, [1] displacement factor
			var displacement_q = [0, 14];
			var displacement_a = [0, 16];

			//[0] leftLim, [1] rightLim
			var lim_q = [7, 14];
			var lim_a = [8, 16];
			
	        querySnapshot.forEach(function(doc) {
	        	//doc represents the question data from firebase
	        	//put the doc's data to the html page
	        	
				var lil = [];

				lil = manageTextDump(blockCounter_q, displacement_q, count_q, lim_q, doc, "problem");
				//update changes to variables
				blockCounter_q = lil[0];
				displacement_q = lil[1];
				count_q = lil[2];
				lim_q = lil[3];

				lil = manageTextDump(blockCounter_a, displacement_a, count_a, lim_a, doc, "answer");
				//update changes to variables
				blockCounter_a = lil[0];
				displacement_a = lil[1];
				count_a = lil[2];
				lim_a = lil[3];

	            
	            //incremement the question number counter
	            count_q += 1;
	            count_a += 1;

	        });
	    });

}