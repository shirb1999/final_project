var Id;
let activities = [];
let result;
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
    $("#Add_User_Form").submit(function(event) {
        if (!$("#Add_User_Form").valid()) return;
        $.ajax({
            type: "POST",
            // url: "http://localhost:3001/User",
            url: "https://kvudaweb.herokuapp.com/User",
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
                window.location.href = "first_qestion"; //Go to the page question
            },
            error: function(jqXhr, textStatus, errorThrown) { //When the data is incorrect
                alert("failed to add user");
            },
        });
        event.preventDefault();
    });
}

function send_mail() {
    Id = localStorage.getItem('idUser')
    $("#contact").submit(function(event) {
        if (!$("#contact").valid()) return;
        $.ajax({
            type: "POST",
            // url: "http://localhost:3001/send_mail/" + Id,
            url: "https://kvudaweb.herokuapp.com/send_mail/" + Id,
            contentType: "application/json",
            data: JSON.stringify({
                name: $("#name").val(),
                email: $("#email").val(),
                phone: $("#phone").val(),
                message: $("#message").val(),
            }),
            processData: false,
            encode: true,
            success: function(data, textStatus, jQxhr) {
                alert(data);
                window.location.href = "home";
            },
            error: function(jqXhr, textStatus, errorThrown) {
                alert("failed");

            },
        });
        event.preventDefault();
    });
}

function addTrip() {
    Id = localStorage.getItem('idUser')
    let value = [];
    let id = [];
    id.push(Id);
    value = id.concat(activities)
    const rbs = document.querySelectorAll('input[name="laundry"]');
            let selectedValue;
            for (const rb of rbs) {
                if (rb.checked) {
                    selectedValue = rb.value;
                    break;
                }
            }
    // alert(selectedValue);
    $("#new_trip").submit(function(event) {
        if (!$("#new_trip").valid()) return;
        $.ajax({
            type: "POST",
            // url: "http://localhost:3001/trip/" + value ,
            url: "https://kvudaweb.herokuapp.com/trip/" + value ,
            contentType: "application/json",
            data: JSON.stringify({
                where: $("#where").val(),
                date: $("#date").val(),
                laundry: selectedValue,
                dayes: $("#daysRange").val(),
                
            }),
            processData: false,
            encode: true,
            success: function(data, textStatus, jQxhr) {
                localStorage.setItem('result_arr', JSON.stringify(data))
                result = JSON.parse(localStorage.getItem('result_arr'))
                window.location.href = "output"; //Go to the page question
            },
            error: function(jqXhr, textStatus, errorThrown) {
                alert("Something wrong please try in a few minutes");

            },
        });
        event.preventDefault();
    });
}

function user_login() {
    $('#user_form').submit(function (event) {
        if(!$("#user_form").valid()) return;
        $.ajax({
            type: "GET", // define the type of HTTP verb we want to use ("GET" for our form)
            // url: 'http://localhost:3001/users_login/' + $("#password").val() + $("#id_field").val(), // the url where we want to POST
            url: 'https://kvudaweb.herokuapp.com/users_login/' + $("#password").val() + $("#id_field").val(),
            success: function( data, textStatus, jQxhr ){
                password = $("#password").val();
                if(data.localeCompare(password)==0){
                    localStorage.setItem('idUser', $("#id_field").val());
                    window.location.href="home"; //Go to the home page
                }
                   
            },
            error: function(errorThrown) { //When the data is incorrect
                console.log("way")
                alert("User dont exist or one or more parameters incorrect");
            }
        })
        // stop the form submitting the normal way and refreshing the page
        event.preventDefault();
      });
}

function addQuestion() {
    Id = localStorage.getItem('idUser')
    console.log("id:" + Id);
    $("#user_form").submit(function(event) {
        if (!$("#user_form").valid()) return;
        $.ajax({
            type: "POST",
            // url: "http://localhost:3001/question/" + Id,
            url: "https://kvudaweb.herokuapp.com/question/" + Id,
            contentType: "application/json",
            data: JSON.stringify({
                genus: $("#genus").val(),
                navigation: $("#navigation").val(),
                disability: $("#disability").val(),
                hearing: $("#hearing").val(),
                license: $("#license").val(),
                glasses: $("#glasses").val(),
                lenses: $("#lenses").val(),
                drug: $("#drug").val(),
                cosher: $("#cosher").val(),
                religion: $("#religion").val()
            }),
            processData: false,
            encode: true,
            success: function(data, textStatus, jQxhr) {
                window.location.href = "home"; //Go to the page home
            },
            error: function(jqXhr, textStatus, errorThrown) {
                alert("Something wrong please try in a few minutes");

            },
        });
        event.preventDefault();
    });

}

function update_data() {
    Id = localStorage.getItem('idUser')
    $.ajax({
            type: "POST",
            // url: "http://localhost:3001/update_data/" + Id ,
            url: "https://kvudaweb.herokuapp.com/update_data/" + Id ,
            contentType: "application/json",
            data: JSON.stringify({
                genus: $("#genus").val(),
                navigation: $("#navigation").val(),
                disability: $("#disability").val(),
                hearing: $("#hearing").val(),
                license: $("#license").val(),
                glasses: $("#glasses").val(),
                lenses: $("#lenses").val(),
                drug: $("#drug").val(),
                cosher: $("#cosher").val(),
                religion: $("#religion").val()
            }),
            processData: false,
            encode: true,
            success: function(data, textStatus, jQxhr) {
                alert("Your data has been updated in the system");
                window.location.href = "home"; 
            },
            error: function(jqXhr, textStatus, errorThrown) {
                alert("failed");

            },
        });
        event.preventDefault();
}

function checkedCheckBox() {
    let newlist = [];
    const checkboxes = document.querySelectorAll(`input[type='checkbox']`);
    result = JSON.parse(localStorage.getItem('result_arr'))
    console.log("result "+result.find(a=>a.id==="data").value);
    var data = result.find(a=>a.id==="data").value
    newlist.push({
        id: "data",
        value: data
    });
    let values = [];
    var word;
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked == true)
            values.push(checkbox.id);
        });
        console.log(values)
        for (let i = 0; i < values.length; i++) {
            item = values[i].split(",");
            console.log(item);
            word = item[1]
                for (let j = 2; j < item.length; j++) {
                    word += ' '+item[j];      
                }
                if (newlist.find(a=>a.id===item[0]) == null ){   
                    newlist.push({id: item[0],value:[word] }); 
                } 
                else{ 
                    newlist.find(a=>a.id===item[0]).value.push(word);
                }
            }
            localStorage.setItem('result_arr', JSON.stringify(newlist))
            window.location.href = "output"; 
  }


function openPopup() {
    const rbs = document.querySelectorAll('input[name="item"]');
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }
    console.log(selectedValue)
    var item = $("#item").val();
    console.log(item)
    addToList(item);
}
function addToList(item) {
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = item;
    var ul = document.getElementById("takingList");
    var li = document.createElement("li");
    ulLength = ul.getElementsByTagName("li").length;
    li.appendChild(input);
    li.appendChild(document.createTextNode(item));
    ul.insertBefore(li, ul.children[ulLength - 1]);
}

$(document).ready(function() {
    questionsFunctions();
    newTravelFunctions();
    outputFunctions();

    function outputFunctions() {
        if ($("body").is(".output-page")) {
            let arr = ["London", "15 May", "17 May", "33"];
            let whatToTake = ["glasses", "sun glasses", "Tefilin", "Swimsuit", "credit Card", "suit", "Tanning lotion", "shampoo", "Linen", "Towels"];
            result = JSON.parse(localStorage.getItem('result_arr'))
            console.log("hhh*********"+result);
            initValues();
            function initValues() {
                $("#destination").html(result[0].value[0]);
                $("#start_date").html(result[0].value[1]);
                // $("#end_date").html(result[0].value[1]);
                $("#temperature").html("temperature in your destination: " + result[0].value[2] + "°");


                var list = "<ul id = 'takingList' class='taking-list'>";
                var checkbox;
                var id; 
                var array
                for (let i = 1; i < result.length; i++) {
                    item = result[i];
                    title_item = result[i].id;
                    list += "<li class = 'inner-title'>" + title_item + "</li>";
                    for (let j = 0; j < item.value.length; j++) {
                        id="";
                        array = item.value[j].split(' ');
                        for(let l = 0; l<array.length; l++){
                            id += array[l];
                            if(l!=array.length-1)
                                id+=","
                        }
                        // console.log("id,",id);
                        checkbox= '<input type="checkbox" id ='+title_item+","+id+' >';
                        list += "<li >" + checkbox + item.value[j] + "</li>";
                    }
                }
                list += "<li class = 'inner-title'> Your List </li>";
                list += "<li class = 'add-item'> <i ></i>               </li>";
                list += "</ul>";
                // console.log(list);
                document.getElementById("what-to-take").innerHTML = list;


            }
        }
    }

    function questionsFunctions() {
        if ($("body").is(".updata-data")) {
            Id = localStorage.getItem('idUser')
            let arr = [];
            $.ajax({
                type: "GET",
                // url: "http://localhost:3001/read_question/" + Id ,
                url: "https://kvudaweb.herokuapp.com/read_question/" + Id ,
                contentType: "application/json",
                processData: false,
                encode: true,
                success: function(data, textStatus, jQxhr) {
                    // console.log(data)
                    for (var i=0;i<10;i++){
                        // console.log(data[i]);
                        if(data[i].localeCompare('Male')==0 || data[i].localeCompare('Yes')==0)
                            arr.push(0)
                        else
                            arr.push(1)
                    }
                    // console.log(arr);
                    var selectArr = $("select");
                    selectArr.each(function(index) {
                    selectedItem = ($(this)).children("option")[arr[index]];
                    // console.log(selectedItem);
                    $(selectedItem).prop("selected", true);
                });
                    
                },
                error: function(jqXhr, textStatus, errorThrown) {
                    alert("failed");
    
                },
            });
        }
    }

    function newTravelFunctions() {
        if ($("body").is(".new-travel-page")) {
            let range = document.querySelector("#daysRange");
            let bubble = document.querySelector("#bubble");
            bubble.innerHTML = 1 + "<i class='fa'>&#xf186</i>";

            range.addEventListener("input", () => {
                setBubble(range, bubble);
            });

            function setBubble(range, bubble) {
                const val = range.value;
                const min = range.min ? range.min : 0;
                const max = range.max ? range.max : 94;
                const newVal = Number(((val - min) * 94) / (max - min));
                bubble.innerHTML = val + "<i class='fa'>&#xf186</i>";

                bubble.style.left = newVal + "%";
            }
        }
        
        $(".activities-item:not(.choose-type)").click(function() {
            let id = $(this).attr("id");
            // alert(id);
            if ($(this).is(".checked-activity")) {
                $(this).removeClass("checked-activity");
                removeElement(id);
    
            } else {
                $(this).addClass("checked-activity");
                activities.push(id);
            }
    
        });
    
    
        // Select Type Of Trip Function
        $(".choose-type").click(function() {
            $(".activities-container").show();
            let id = $(this).attr("id");
            activities = [];
            $(".activities-item:not(.choose-type)").removeClass("checked-activity");
            $("button#submitNewTravel").prop('disabled', false);
            if (id == "finance_choose") {
                $(this).addClass("checked-activity");
                $("#leisure_choose").removeClass("checked-activity");
                $(".leisure-activities").hide();
                $(".buisness-activities").show();
            } else {
                $(this).addClass("checked-activity");
                $("#finance_choose").removeClass("checked-activity");
                $(".buisness-activities").hide();
                $(".leisure-activities").show();
            }
        });
    
        // Remove Activity From Array
        function removeElement(id) {
            // TODO: Delete All ConsoleLogs, Now they are here for dubugging
            console.log("before");
            console.log(activities);
            const index = activities.indexOf(id);
            if (index > -1) {
                activities.splice(index, 1);
            }
            console.log("after");
            console.log(activities);
        }
    }
})