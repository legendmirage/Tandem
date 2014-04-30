var students = ["Adams, Sophie", "Baker, Mike", "Brown, Ashley", "Clark, Leslie",
    "Cook, Linda", "Craig, Yinfu", "Farr, Nike", "Faust, Ben", "Fox, Johnny",
    "Hans, Peter", "He, Sally", "Hung, Jackie", "Kardashian, Kim", "Moon, Jason",
    "Weaver, Joanie", "Xavier, Tom", "Yoon, Charles", "Zakarian, Sylvia"
];

var msg1 = "Hi, </br> My kid seems to had a fight with another kid in the class.  He came back with a lot of bruises and he wouldn't tell me what exactly happened. Could you please explain what happened at school today? My son is very shy and introvert and I don't believe that he will start a fight with another kid with not proper reason. Please also include the parents of the other kid if necessary. </br>Thank you.";
var msg2 = "Hi Ms. Smith, </br> My son is sick with a fever and cannot attend school today. Please send me any assignments. Thanks.";
var msg3 = "Hello, </br> Yinfu has a doctor's appointment today and will be late to school.";
var msg4 = "Hello, </br> Sophie had a fever so she can't attend school today.";

function Message(student, subject, time, content, isRead, receive){
    this.student = student;
    this.subject = subject;
    this.time = time;
    this.content = content;
    this.isRead = isRead;
    this.receive = receive;
}

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
            var m = messageMap[stud][i];
            var item = document.createElement("div");
            item.innerHTML = "<div class='col-md-6'>"
                + m.subject + "</div><div class='col-md-4'>" + m.time;
            $(item).addClass("message-label btn btn-block row");
            $(item).data("mes", m);
            item.onclick=function(){
                hilightMessage(this, $(this).data("mes"));
            }
            $("#messages-panel").prepend(item);
        }
    }

    $(".message-label").removeClass("btn-success");
    $("#message-detail").fadeOut();
}

var hilightMessage = function (elem, m) {
    $(".message-label").removeClass("btn-success");
    $(elem).addClass("btn-success");
    document.getElementById("student-name").innerHTML = m.student;
    $("#actual-msg").html(m.content);
    $("#message-header").html(m.subject);
    $("#message-detail").fadeIn()
}

var loadAllMessages = function () {
    $("#messages-panel").empty();

    for (var key in messageMap) {
        var ms = messageMap[key];
        for(var i=0;i<ms.length;i++){
            var m = ms[i];
            var item = document.createElement("div");
            item.innerHTML = "<div class='col-md-6'>"
                + m.subject + "</div><div class='col-md-4'>" + m.time;
            $(item).addClass("message-label btn btn-block row");
            $(item).data("mes", m);
            item.onclick=function(){
                hilightMessage(this, $(this).data("mes"));
            }
            $("#messages-panel").prepend(item);

       }
    }

    $(".student-label").removeClass("btn-success");
    $(".message-label").removeClass("btn-success");
    $("#message-detail").fadeOut();
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

    if (typeof messageMap[recipient] == 'undefined'){
        messageMap[recipient] = [];
    }
    var m = new Message(recipient, subject, dateTime, details, true, false);
    messageMap[recipient].push(m);
    var item = document.createElement("div");
    item.innerHTML = "<div class='col-md-6'>"
        + m.subject + "</div><div class='col-md-4'>" + m.time;
    $(item).addClass("message-label btn btn-block row");
    $(item).data("mes", m);
    item.onclick=function(){
        hilightMessage(this, $(this).data("mes"));
    }
    $("#messages-panel").prepend(item);
}

$(document).ready(function () {
    messageMap['Fox, Johnny'] = [
        new Message("Fox, Johnny", "Johnny's Fight", '4/1 12:00', msg1, true, true),
        new Message("Fox, Johnny", "Johnny sick", '4/2 1:10', msg2, true, true)
    ];
    messageMap["Faust, Ben"] = [
        new Message("Faust, Ben", "Ben Sick", '4/2 12:00', msg2, false, true)
    ];
    messageMap["Craig, Yinfu"] = [
        new Message("Craig, Yinfu", "Yinfu Absent", '4/5 12:44', msg3, true, true)
    ];
    messageMap["Adams, Sophie"] = [
        new Message("Adams, Sophie", "Sophie Fever", '4/12 2:14', msg4, true, true)
    ];

    //appending each student to the student panel
    for (var i = 0; i < students.length; i++) {
        if (typeof messageMap[students[i]] == undefined) {
            //no message
            var student = "<div class='student-label btn btn-block' onclick=hilightStudent(this)>" + students[i] + "<span class='badge pull-right'>" + messageMap[students[i]].length + "</span></div>";
        } else {
            var student = "<div class='student-label btn btn-block' onclick=hilightStudent(this)>" + students[i] + "</div>";
        }
        $("#students-panel").append(student);

    };

    loadAllMessages();


    //initialize messages panel and message details to be hidden
    $("#message-detail").fadeOut();

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

    //modal recipeints select dropdown
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