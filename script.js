function replace(entry){
  while (true){
    newEntry = entry.replace(" ", "_");
    if (newEntry == entry){
      break;
    }
    else{
      entry = newEntry;
      continue;
    }
  }
  return entry;
}


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function toggleFunc(dropMenuID) {
  //alert("toggleFunc");
  document.getElementById(dropMenuID).classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  //alert("window.onclick");
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function updateMenu(ID, titulo){
  //alert("updateMenu");
  document.getElementById(ID).innerHTML = titulo;

  var list = [];

  if (titulo == "Algebra 1"){
    list = ["Factoring"];
  }
  else if (titulo == "Algebra 2"){
    list = ["Exponents"];
  }
  else if (titulo == "Calculus A"){
    list = ["Differentiating"];
  }
  else if (titulo == "Calculus B"){
    list = ["Integrating"];
  }

  displayItems(list);

}

function simpleHTMLChange(ID, ropa){
  //returns the function for a button
  return function(){
    document.getElementById(ID).innerHTML = ropa;
  }
}

function displayItems(itemList){
  //make the buttons to be displayed in the drop down menu
  var element = document.getElementById("categoryDependent");
  element.innerHTML = "";

  var i;
  for(i = 0; i < itemList.length; i++){
    var ropa = itemList[i];

    var para = document.createElement("button");

    para.onclick = simpleHTMLChange('topicButton', ropa);
    para.id = "dropOption";
    para.innerHTML = ropa;

    document.getElementById("categoryDependent").appendChild(para);

  }

}

function generatePDF(){
  //get the first and last names
  /*
  var firstName = document.getElementById("fname").value;
  var lastName = document.getElementById("lname").value;
  */
  var fullName = document.getElementById("fname").value + document.getElementById("lname").value;

  //get the class, topic, and number of question selections
  var className = document.getElementById("classButton");
  var topicName = document.getElementById("topicButton");
  var numQuestions = document.getElementById("questionButton");

  //display data
  alert('Generate PDF');
}