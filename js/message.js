var students = ["Adams, Sophie", "Baker, Mike", "Brown, Ashley", "Clark, Leslie",
    "Cook, Linda", "Craig, Yinfu", "Farr, Nike", "Faust, Ben", "Fox, Johnny",
    "Hans, Peter", "He, Sally", "Hung, Jackie", "Kardashian, Kim", "Moon, Jason",
    "Weaver, Joanie", "Xavier, Tom", "Yoon, Charles", "Zakarian, Sylvia"
];

var msg1 = "Hi, </br> My kid seems to had a fight with another kid in the class.  He came back with a lot of bruises and he wouldn't tell me what exactly happened. Could you please explain what happened at school today? My son is very shy and introvert and I don't believe that he will start a fight with another kid with not proper reason. Please also include the parents of the other kid if necessary. </br>Thank you.";

var msg2 = "Hi Ms. Smith, </br> My son is sick with a fever and cannot attend school today. Please send me any assignments. Thanks.";

var msg3 = "Hello, </br> Yinfu has a doctor's appointment today and will be late to school.";

var msg4 = "Hello, </br> Sophie had a fever so she can't attend school today.";


var messages = {
    "Johnny's Fight": ['4/1 12:00', msg1],
    "Ben Sick": ['4/2 12:00', msg2],
    "Yinfu Absent": ['4/5 12:44', msg3],
    "Sophie Fever": ['4/6 12:44', msg4]
};

var messageMap = {};

var hilightStudent = function (elem) {
    $(".student-label").removeClass("btn-success");
    $(elem).addClass("btn-success");

    $("#messages-panel").empty();

    //only render msg if exists for student
    var stud = $(elem).text();
    stud = stud.replace(/[0-9]/g, '');
    if (stud in messageMap) {

        var len = messageMap[stud].length - 1;
        for (var i = len; i > -1; i--) {
            $("#messages-panel").append("<div class='message-label btn btn-block row' onclick=hilightMessage(this)><div class='col-md-6'>" + messageMap[stud][i][0] + "</div><div class='col-md-4'>" + messageMap[stud][i][1] + "</div>");
        }
    }

    $(".message-label").removeClass("btn-success");
    $("#message-detail").hide();
}

var hilightMessage = function (elem) {
    $(".message-label").removeClass("btn-success");
    $(elem).addClass("btn-success");
    var stud = $(elem.firstChild).text();
    $("#actual-msg").html(messages[stud][1]);
    $("#message-header").html(stud);
    $("#message-detail").show()
}

var loadAllMessages = function () {
    $("#messages-panel").empty();
    for (var msg in messages) {
        $("#messages-panel").prepend("<div class='message-label btn btn-block row' onclick=hilightMessage(this)><div class='col-md-6'>" + msg + "</div><div class='col-md-4'>" + messages[msg][0] + "</div>");
    };
    $(".student-label").removeClass("btn-success");
    $(".message-label").removeClass("btn-success");
    $("#message-detail").hide();
    $("#all-messages-label").addClass("btn-success");
}

//convert js date object to our date time format
var convertDate = function (d) {
    var month = d.getMonth() + 1;
    var dateTime = month + "/" + d.getDate() + " " + d.getHours() + ":";
    if (d.getMinutes() < 10) {
        dateTime = dateTime + "0" + d.getMinutes();
    } else {
        dateTime = dateTime + d.getMinutes();
    }
    return dateTime;
}


var newMessage = function () {
    var subject = $('#subject').val();
    var details = $('#details').val();
    var recipient = $('#recipient').val();
    var d = new Date();
    var dateTime = convertDate(d);
    messages[subject] = [dateTime, details];
    console.log(recipient);
    if (typeof messageMap[recipient] != 'undefined'){
        messageMap[recipient].push([subject, dateTime, details]);
    }else{
        messageMap[recipient] = [[subject, dateTime, details]];
    }
    
    $("#messages-panel").prepend("<div class='message-label btn btn-block row' onclick=hilightMessage(this)><div class='col-md-6'>" + subject + "</div><div class='col-md-4'>" + dateTime + "</div>");

}

$(document).ready(function () {
    messageMap['Fox, Johnny'] = [
        ["Johnny's Fight", '4/1 12:00', msg1, 0], //0 = read
        ["Johnny sick", '4/2 1:10', msg2, 0]
    ];
    messageMap["Faust, Ben"] = [
        ["Ben Sick", '4/2 12:00', msg2, 1]
    ];
    messageMap["Craig, Yinfu"] = [
        ["Yinfu Absent", '4/5 12:44', msg3, 0]
    ];
    messageMap["Adams, Sophie"] = [
        ["Sophie Fever", '4/12 2:14', msg4, 0]
    ];

    //appending each student to the student panel
    for (var i = 0; i < students.length; i++) {
        if (messageMap[students[i]] != null) {

            var student = "<div class='student-label btn btn-block' onclick=hilightStudent(this)>" + students[i] + "<span class='badge pull-right'>" + messageMap[students[i]].length + "</span></div>";
        } else {
            var student = "<div class='student-label btn btn-block' onclick=hilightStudent(this)>" + students[i] + "</div>";
        }
        $("#students-panel").append(student);

    };

    loadAllMessages();


    //initialize messages panel and message details to be hidden
    $("#message-detail").hide();

    $('#sendBTN').click(function (e) {
        e.preventDefault();
        newMessage();
        $("#newMessageModal").modal('hide');

    });

    $('#sendResponse').click(function (e) {
        e.preventDefault();
        $('#message-data').append("<div class='row'><div class='col-md-2'>Me:</div><div class='col-md-10'>" + $('#responseText').val() + "</div></div></div>");
        $('#responseText').val('');

    });

    var select = document.getElementById("recipient");
    for (var i = 0; i < students.length; i++) {
        var opt = students[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
    $("#recipient").select2();
});