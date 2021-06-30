


$(document).ready(function () {
    
    $("form[name='user_form']").validate({
        // Specify validation rules
        rules: {
          id_field: {
            required: true,
            digits: true
          }
        },
        // Specify validation error messages
        messages: {         
          field_id:"Please enter only digits"
        }
      });

    // process the form
    $('#user_form').submit(function (event) {
        if(!$("#user_form").valid()) return;
        
        // process the form
        $.ajax({
            type: "GET", // define the type of HTTP verb we want to use ("GET" for our form)
            url: 'http://localhost:3001/users/' + $("#id_field").val() + $("#username").val(), // the url where we want to POST
            success: function( data, textStatus, jQxhr ){
                console.log(data); 
                   
            },
            error: function(errorThrown) {
              document.getElementById("demo").innerHTML = "One or more of the details are incorrect"

            }
        })
          
        // stop the form submitting the normal way and refreshing the page
        event.preventDefault();
    });
});
