$('#exampleModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
})

function addArtist() {
    $("form[name='Add_Artist_Form']").validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
            }
        },
        messages: {},
    });
    $("#Add_Artist_Form").submit(function(event) {
        if (!$("#Add_Artist_Form").valid()) return;
        $.ajax({
            type: "POST",
            url: "http://localhost:3001/Artist",
            contentType: "application/json",
            data: JSON.stringify({
                name: $("#artist_name").val(),
                id: $("#artist_id").val(),
                birth_year: $("#birth_year").val(),
                password: $("#password").val(),
                rpassword: $("#rpassword").val(),
                email: $("#email").val(),
                questions: [],
            }),
            processData: false,
            encode: true,
            success: function(data, textStatus, jQxhr) {
                window.location.href="home";
            },
            error: function(jqXhr, textStatus, errorThrown) {
                alert("failed to add user");
            },
        });
        event.preventDefault();
    });
}

function sendMail() 
{ 
    console.log("hy send mail")
}

function ViewSong(id) {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3001/Artist/' + id,
        success: function(data) {
            let Table = `<table id=Songs class="table" style="width:100%">
                    <thead  class="thead-dark">
                       
                    </thead>
                    <tbody>`
            $.each(data, function(index, key) {
                Table +=
                    `<tr>
                        <th scope="col">${data[index]}</th>
                        <td ><button type="button" class="btn btn-outline-primary" onClick="deleteArtistSong(${id},${index})"> Delete Song</button></td>
                    </tr>`;
            });
            Table += ` </tbody></table>`;
            
            $("#ViewSongs").replaceWith(`<div id="ViewSongs">${Table}</div>`);
        },
        error: function(errorThrown) {
            alert("failed to view Songs in this artist");

        }
    })


}


function addArtistSong(id) {
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
            url: "http://localhost:3001/Artist/" + id,
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


function deleteArtist(id) {
    if (confirm("Are you sure you want to delete this artist?")) {
        $.ajax({
            url: "http://localhost:3001/Artist/" + id,
            type: "DELETE",
            success: function(data) {
                location.reload();
            },
            error: function() {
                alert("failed to delete artist");
            }
        })
    }
}

function deleteArtistSong(id, name_song) {
    console.log("id: "+id);
    console.log("id song "+name_song);
    if (confirm("Are you sure you want to delete this artist?")) {
        $.ajax({
            url: "http://localhost:3001/Song/" + id + name_song,
            type: "DELETE",
            success: function(data) {
                console.log("kkkkkk "+data)
                location.reload();
            },
            error: function() {
                alert("failed to delete artist song");
            }
        })
    }
}



// function AddTable() {
//     $.ajax({
//         url: 'http://localhost:3001/Artist',
//         success: function(data) {
//             var idLname = [];
//             $.each(data, function(index, key) {
//                 var arr = [];
//                 arr.push(data[index]);
//                 arr.push(index);
//                 idLname.push(arr);
//             });
//             let Table =
//                 `<table id=Artists class="table" style="width:100%">
//                     <thead  class="thead-dark">
                        
//                     </thead>
//                     <tbody>`;
//             for (let i = 0; i < Object.keys(data).length; i++) {

//                 Table +=
//                     `<tr>
//                         <th scope="col">name</th>
//                         <td scope="row">${idLname[i][0].name}</td>
//                     </tr>
//                     <tr>
//                         <th scope="col">id</th>
//                         <td >${idLname[i][0].id}</td>
//                     </tr>
//                     <tr>
//                         <th scope="col">birth year </th>
//                         <td >${idLname[i][0].birth_year}</td>
//                     </tr>
//                     <tr>
//                         <th scope="col">password </th>
//                         <td >${idLname[i][0].password}</td>
//                     </tr>
//                     <tr>
//                         <th scope="col">Action </th>
//                         <td>
//                             <button type="button" class="btn btn-outline-primary" onClick="ViewSong(${idLname[i][0].id})">View Songs List</button>
//                             <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal" onClick = "addArtistSong(${idLname[i][0].id})">Add Song</button>
//                             <button type="button" class="btn btn-outline-primary" onClick="deleteArtist(${idLname[i][0].id})"> Delete Artist</button>
//                          </td>
//                     </tr>`;
//             }
//             Table += ` </tbody></table>`;
//             $("#table").replaceWith(`<div id=ArtistTable>${Table}</div>`);
//         },
//         error: function() {
//             alert("error has happend")
//         }
//     });
// }

// onLoad = function() {
//     AddTable();
// }

// $(document).ready(onLoad);