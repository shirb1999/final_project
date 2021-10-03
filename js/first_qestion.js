

// $(document).ready(function () {


//     // process the form
//     $('#user_form').submit(function (event) {
//         if(!$("#user_form").valid()) return;
//         var gender;
//         $('#my_image').click(function() {
//             alert( "blabla" );
//        });
        
    //     $.ajax({
    //         type: "POST",
    //         url: "http://localhost:3001/Artist",
    //         contentType: "application/json",
    //         data: JSON.stringify({
    //             name: $("#artist_name").val(),
    //             id: $("#artist_id").val(),
    //             birth_year: $("#birth_year").val(),
    //             password: $("#password").val(),
    //             rpassword: $("#rpassword").val(),
    //             email: $("#email").val(),
    //             questions: [],
    //         }),
    //         processData: false,
    //         encode: true,
    //         success: function(data, textStatus, jQxhr) {
    //             window.location.href="home";
    //         },
    //         error: function(jqXhr, textStatus, errorThrown) {
    //             alert("failed to add user");
    //         },
    //     });
    //     event.preventDefault();
    // });
// }
  
    function addQuestion() {
        console.log("id");
        
        $("#user_form").submit(function(event) {
            if (!$("#user_form").valid()) return;
            $.ajax({
                type: "POST",
                url: "http://localhost:3001/question/" + 14589899,
                contentType: "application/json",
                data: JSON.stringify({
                    genus: $("#genus").val(),
                    cosher: $("#cosher").val()
                }),
                processData: false,
                encode: true,
                success: function(data, textStatus, jQxhr) {
                    location.reload();
                },
                error: function(jqXhr, textStatus, errorThrown) {
                    alert("failed to add song");
    
                },
            });
            event.preventDefault();
        });
            
    }
