// $(document).ready(function() {

//     // TODO: Send these activities to server

//     // Add Activity Function
//     let activities = [];
//     $(".activities-item:not(.choose-type)").click(function() {
//         let id = $(this).attr("id");
//         // alert(id);
//         if ($(this).is(".checked-activity")) {
//             $(this).removeClass("checked-activity");
//             removeElement(id);

//         } else {
//             $(this).addClass("checked-activity");
//             activities.push(id);
//         }

//     });


//     // Select Type Of Trip Function
//     $(".choose-type").click(function() {
//         $(".activities-container").show();
//         let id = $(this).attr("id");
//         if (id == "finance_choose") {
//             $(this).addClass("checked-activity");
//             $("#leisure_choose").removeClass("checked-activity");
//             $(".leisure-activities").hide();
//             $(".buisness-activities").show();
//         } else {
//             $(this).addClass("checked-activity");
//             $("#finance_choose").removeClass("checked-activity");
//             $(".buisness-activities").hide();
//             $(".leisure-activities").show();
//         }
//     });

//     // Remove Activity From Array
//     function removeElement(id) {
//         // TODO: Delete All ConsoleLogs, Now they are here for dubugging
//         console.log("before");
//         console.log(activities);
//         const index = activities.indexOf(id);
//         if (index > -1) {
//             activities.splice(index, 1);
//         }
//         console.log("after");
//         console.log(activities);
//     }

    

// });