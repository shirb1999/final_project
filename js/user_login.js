$(document).ready(function () {
  // process the form
$('#user_form').submit(function (event) {
  if(!$("#user_form").valid()) return;
  // process the form
  $.ajax({
      type: "GET", // define the type of HTTP verb we want to use ("GET" for our form)
      url: 'http://localhost:3001/users_login/' + $("#password").val() + $("#id_field").val(), // the url where we want to POST
      success: function( data, textStatus, jQxhr ){
          var x = document.getElementById("myDIV"); //Check if the password is equal to the password in the data
          x.style.display = "none";
          if(data == $("#password").val())
            window.location.href="home"; //Go to the home page
          else{
            document.getElementById("demo").innerHTML = "One or more of the details are incorrect"
          }   
      },
      error: function(errorThrown) { //When the data is incorrect
          alert("User dont exist or one or more parameters incorrect");

      }
  })
    
  // stop the form submitting the normal way and refreshing the page
  event.preventDefault();
});

function outputAlert() {
  
  
    document.getElementById("demo").innerHTML = "Default value and current value is the same: "
    
}



var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
  
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  
  // Validate length
  if(myInput.value.length == 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

});

