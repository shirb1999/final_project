var Id;
$('#exampleModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
})
function addUser() { //Add new users
    $("form[name='Add_User_Form']").validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
            }
        },
        messages: {},
    });

    $("#Add_User_Form").submit(function(event) {
        if (!$("#Add_User_Form").valid()) return;
        $.ajax({
            type: "POST",
            url: "http://localhost:3001/User",
            contentType: "application/json",
            data: JSON.stringify({
                name: $("#user_name").val(),
                id: $("#user_id").val(),
                birth_year: $("#birth_year").val(),
                password: $("#password").val(),
                rpassword: $("#rpassword").val(),
                email: $("#email").val(),
                questions: [],
            }),
            processData: false,
            encode: true,
            success: function(data, textStatus, jQxhr) {
                localStorage.setItem('idUser', $("#user_id").val()); //craete global argument
                window.location.href="first_qestion"; //Go to the page question
            },
            error: function(jqXhr, textStatus, errorThrown) { //When the data is incorrect
                alert("failed to add user");
            },
        });
        event.preventDefault();
    });
}

function listTake(){
    // // create a JSON object
    // const user = {
    //     "id": 1,
    //     "name": "John Doe",
    //     "age": 22
    // };
    // // convert JSON object to string
    // const data = JSON.stringify(user);

    

    // // write JSON string to a file
    // fs.writeFile('user.json', data, (err) => {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log("JSON data is saved.");
    // });
        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: 'http://localhost:3001/list', // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({
                
                "songs":["רישיון נהיגה","דרכון"]
                
            }),
            processData: false,            
           // dataType: 'json', // what type of data do we expect back from the server
            encode: true,
            success: function( data, textStatus, jQxhr ){
                console.log("data");
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        })
          
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
}

function addTrip(){
    Id = localStorage.getItem('idUser')
    console.log("id:"+ Id);
    $("#new_trip").submit(function(event) {
        if (!$("#new_trip").valid()) return;
        $.ajax({
            type: "POST",
            url: "http://localhost:3001/trip/" + Id,
            contentType: "application/json",
            data: JSON.stringify({
                where: $("#where").val(),
                date: $("#date").val(),
                dayes: $("#dayes").val(),
                type: $("#type").val(),
            }),
            processData: false,
            encode: true,
            success: function(data, textStatus, jQxhr) {
                window.location.href="trip_qestion"; //Go to the page question
            },
            error: function(jqXhr, textStatus, errorThrown) {
                alert("failed to add song");

            },
        });
        event.preventDefault();
    });
}

function addQuestion() {
    let list = []
    Id = localStorage.getItem('idUser')
    console.log("id:"+ Id);
    $("#user_form").submit(function(event) {
        if (!$("#user_form").valid()) return;
        $.ajax({
            type: "POST",
            url: "http://localhost:3001/question/" + Id,
            contentType: "application/json",
            data: JSON.stringify({
                genus: $("#genus").val(),
                navigation: $("#navigation").val(),
                cosher: $("#cosher").val(),
                disability: $("#disability").val(),
                hearing: $("#hearing").val(),
                license: $("#license").val(),
                glasses: $("#glasses").val(),
                lenses: $("#lenses").val(),
                drug: $("#drug").val()
            }),
            processData: false,
            encode: true,
            success: function(data, textStatus, jQxhr) {
                if(genus)
                    list.push('Willy');
                window.location.href="home"; //Go to the page question
            },
            error: function(jqXhr, textStatus, errorThrown) {
                alert("failed to add song");

            },
        });
        event.preventDefault();
    });
        
}
function AddTable() {
    Id = localStorage.getItem('idUser')
$.ajax({
    type: 'get', // define the type of HTTP verb we want to use (POST for our form)
    url: 'http://localhost:3001/User/' + Id, // the url where we want to POST
    contentType: 'application/json',
    success: function (data) {
       $.each(data, function( index, value ) {
            var column = $("<tr><th>" + value +
            '<button type="button" id="Id" href=Id class="btn btn-outline-primary" onClick="Update(\'' + Id+ '\')" /"> Update</button>'+"</td></tr>");
            // '<button type="button" class="btn btn-outline-primary" onClick="Update(${Id},${index})"> Update</button>'+"</td></tr>");
            $("#productTable").append(column);
            
         });
         
    },
    error: function (err) {
      console.log("err", err);
    }

    
});
}

function Update(id, index) {
    console.log('id:'+ id)
    console.log('index'+ index)

    $.ajax({
        type: "POST",
        url: "http://localhost:3001/Update" +id + index,
        
        success: function(data, textStatus, jQxhr) {
            location.reload();
        },
        error: function(jqXhr, textStatus, errorThrown) { //When the data is incorrect
            alert("failed to add user");
        },
    });
    event.preventDefault();
}



function ViewSong(id) {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3001/User/' + id,
        success: function(data) {
            let Table = `<table id=Songs class="table" style="width:100%">
                    <thead  class="thead-dark">
                       
                    </thead>
                    <tbody>`
            $.each(data, function(index, key) {
                Table +=
                    `<tr>
                        <th scope="col">${data[index]}</th>
                        <td ><button type="button" class="btn btn-outline-primary" onClick="deleteUserSong(${id},${index})"> Delete Song</button></td>
                    </tr>`;
            });
            Table += ` </tbody></table>`;
            
            $("#ViewSongs").replaceWith(`<div id="ViewSongs">${Table}</div>`);
        },
        error: function(errorThrown) {
            alert("failed to view Songs in this user");

        }
    })


}


function addUserSong(id) {
    $("form[name='Add_Song_Form']").validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
            }
        },
        messages: {},
    });
    $("#Add_Song_Form").submit(function(event) {
        if (!$("#Add_Song_Form").valid()) return;
        $.ajax({
            type: "POST",
            url: "http://localhost:3001/User/" + id,
            contentType: "application/json",
            data: JSON.stringify({
                name: $("#name_song").val()
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


function deleteUser(id) {
    if (confirm("Are you sure you want to delete this user?")) {
        $.ajax({
            url: "http://localhost:3001/User/" + id,
            type: "DELETE",
            success: function(data) {
                location.reload();
            },
            error: function() {
                alert("failed to delete user");
            }
        })
    }
}

function deleteUserSong(id, name_song) {
    console.log("id: "+id);
    console.log("id song "+name_song);
    if (confirm("Are you sure you want to delete this user?")) {
        $.ajax({
            url: "http://localhost:3001/Song/" + id + name_song,
            type: "DELETE",
            success: function(data) {
                console.log("kkkkkk "+data)
                location.reload();
            },
            error: function() {
                alert("failed to delete user song");
            }
        })
    }
}


onLoad = function() {
    AddTable();
}

$(document).ready(onLoad);