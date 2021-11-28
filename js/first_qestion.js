
  
    function addQuestion() {
        console.log("id");
        
        $("#user_form").submit(function(event) {
            if (!$("#user_form").valid()) return;
            $.ajax({
                type: "POST",
                url: "http://localhost:3001/question/" + 14589899,
                // url: "https://kvudaweb.herokuapp.com/question/" + 14589899,
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
