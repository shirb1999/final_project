// $(document).ready(function() {

//     let arr = ["London", "15 May", "17 May", "33"];
//     let whatToTake = ["glasses", "sun glasses", "Tefilin", "Swimsuit", "credit Card", "suit", "Tanning lotion", "shampoo", "Linen", "Towels"];
//     let whatToTake1 = [{id:'swimming',value:["glasses", "sun glasses", "Tefilin", "Swimsuit", "credit Card", "suit", "Tanning lotion", "shampoo", "Linen", "Towels"]}, 
//                         {id:'runing',value:["running shoes"]}];
//     whatToTake1.push({id:"runing",value:["nieto.label"]});
//     console.log(whatToTake1);
//     initValues();

//     function initValues() {
//         $("#destination").html(arr[0]);
//         $("#start_date").html(arr[1]);
//         $("#end_date").html(arr[2]);
//         $("#temperature").html("temperature in your destination: " + arr[3] + "°");


//         var list = "<ul class='taking-list'>";
//         var checkbox = '<input type="checkbox">'
//         whatToTake.forEach(function(item) {
//             list += "<li>" + checkbox + item + "</li>";
//         });
//         list += "</ul>";
//         document.getElementById("what-to-take").innerHTML = list;


//     }
// });