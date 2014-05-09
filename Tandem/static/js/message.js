var studentNames = ["Adams, Sophie", "Baker, Mike", "Brown, Ashley", "Clark, Leslie",
    "Cook, Linda", "Craig, Yinfu", "Farr, Nike", "Faust, Ben", "Fox, Johnny",
    "Hans, Peter", "He, Sally", "Hung, Jackie", "Kardashian, Kim", "Moon, Jason",
    "Weaver, Joanie", "Xavier, Tom", "Yoon, Charles", "Zakarian, Sylvia"
];

var msg1 = "Hi, </br> My kid seems to had a fight with another kid in the class.  He came back with a lot of bruises and he wouldn't tell me what exactly happened. Could you please explain what happened at school today? My son is very shy and introvert and I don't believe that he will start a fight with another kid with not proper reason. Please also include the parents of the other kid if necessary. </br>Thank you.";
var msg2 = "Hi Ms. Smith, </br> My son is sick with a fever and cannot attend school today. Please send me any assignments. Thanks.";
var msg3 = "Hello, </br> Yinfu has a doctor's appointment today and will be late to school.";
var msg4 = "Hello, </br> Sophie had a fever so she can't attend school today.";

var id = 1;
var currentThread = null;

function MessageThread(student, subject, messages, time, unRead){
    this.student = student;
    this.subject = subject;
    this.messages = messages;
    this.time = time;
    this.unRead = unRead;
}

function Message(id, messageThreadId, student, subject, time, content, receive){
    this.id = id;
    this.messageThreadId = messageThreadId;
    this.student = student;
    this.subject = subject;
    this.time = time;
    this.content = content;
    this.receive = receive;
}

function Student(name, numOfUnread){
    this.name = name;
    this.numOfUnread = numOfUnread;
}

var threadMap = {};
var studentMap = {};

var hilightStudent = function (elem) {
    $(".student-label").removeClass("btn-success");
    $(elem).addClass("btn-success");

    $("#messages-panel").empty();

    //only render msg if exists for student
    var stud = $(elem).text();
    stud = stud.replace(/[0-9]/g, ''); //remove badge num

    if (stud in threadMap) {
        //from new to old (reverse)
        var len = threadMap[stud].length - 1;
        for (var i = len; i > -1; i--) {
            var t = threadMap[stud][i];

            var item = document.createElement("div");
            item.innerHTML = "<div class='col-md-6'>"
                + t.subject + "</div><div class='col-md-4'>" + t.time;
            $(item).addClass("message-label btn btn-block row");
            $(item).data("thread", t);
            //associate div with thread obj
            item.onclick=function(){
                hilightThread(this, $(this).data("thread"));
            }
            $("#messages-panel").prepend(item);
        }
    }

    $(".message-label").removeClass("btn-success");
    $("#message-detail").fadeOut();
}

var hilightThread = function (elem, t) {
    currentThread = t;
    if (t.unRead==true){
        studentMap[t.student].numOfUnread -= 1;
        t.unRead = false;
        updateBadge(t.student);
    }
    
    $(".message-label").removeClass("btn-success");
    $(elem).addClass("btn-success");
    document.getElementById("student-name").innerHTML = t.student;
    var tmp = "";
    for(var i=0;i<t.messages.length;i++){

        m = t.messages[i];
        if(m.receive==true){
            tmp += "<div class='row'><div class='col-md-2'><b>Parent:</b></div>"
            +"<div id='actual-msg' class='col-md-10' style='margin-bottom:20px;'>"
            + m.content + "</br></br><i><font color='#AAAAAA'>"
            + m.time + "</font></i></br></br>"
            + "</div></div>";
        }else{
            tmp += "<div style='background:#DDDDDD; padding-top:10px;' class='row'><div class='col-md-2'><b>Me:</b></div>"
            +"<div id='actual-msg' class='col-md-10' style='margin-bottom:20px;'>"
            + m.content + "</br></br><i><font color='#AAAAAA'>"
            + m.time + "</font></i></br>"
            + "</div></div>";
        }
    }
    // $("#actual-msg").html(tmp);
    $("#message-data").html(tmp);
    $("#message-header").html(t.subject);
    $("#message-detail").fadeIn()

}

var refreshThread = function (t) {
    currentThread = t;
    
    document.getElementById("student-name").innerHTML = t.student;
    var tmp = "";
    for(var i=0;i<t.messages.length;i++){
         m = t.messages[i];
        if(m.receive==true){
            tmp += "<div class='row'><div class='col-md-2'><b>Parent:</b></div>"
            +"<div id='actual-msg' class='col-md-10' style='margin-bottom:20px;'>"
            + m.content + "</br></br><i><font color='#AAAAAA'>"
            + m.time + "</font></i></br></br>"
            + "</div></div>";
        }else{
            tmp += "<div style='background:#DDDDDD; padding-top:10px;' class='row'><div class='col-md-2'><b>Me:</b></div>"
            +"<div id='actual-msg' class='col-md-10' style='margin-bottom:20px;'>"
            + m.content + "</br></br><i><font color='#AAAAAA'>"
            + m.time + "</font></i></br>"
            + "</div></div>";
        }
    }
    $("#message-data").html(tmp);
    $("#message-header").html(t.subject);
    $("#message-detail").fadeIn()

}


var loadAllMessages = function () {
    $("#messages-panel").empty();

    for (var key in threadMap) {
        var student = new Student(key, 0);
        studentMap[key] = student;
        var ms = threadMap[key];
        for(var i=0;i<ms.length;i++){
            var m = ms[i];
            if(m.unRead==true){
                studentMap[key].numOfUnread += 1;
            }
            var item = document.createElement("div");
            item.innerHTML = "<div class='col-md-6'>"
                + m.subject + "</div><div class='col-md-4'>" + m.time;
            $(item).addClass("message-label btn btn-block row");
            $(item).data("mes", m);
            item.onclick=function(){
                hilightThread(this, $(this).data("mes"));
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

var updateBadge = function (name){
    var id = "#student-"+studentNames.indexOf(name);
    var num = studentMap[name].numOfUnread;
    if(num == 0){
        $(id).html(name);
    }else{
        $(id).html(name + "<span id='badge' class='badge pull-right'>" + num + "</span>");
    }
}   

var newMessage = function () {
    var subject = $('#subject').val();
    var details = $('#details').val();
    var recipient = $('#recipient').val();
    var d = new Date();
    var dateTime = convertDate(d);

    if (typeof threadMap[recipient] == 'undefined'){
        threadMap[recipient] = [];
    }

    id += 1;
    var m = new Message(id,id,recipient, subject, dateTime, details, true, false);
    threadMap[recipient].push(m);
    var item = document.createElement("div");
    item.innerHTML = "<div class='col-md-6'>"
        + m.subject + "</div><div class='col-md-4'>" + m.time;
    $(item).addClass("message-label btn btn-block row");
    $(item).data("mes", m);
    item.onclick=function(){
        hilightThread(this, $(this).data("mes"));
    }
    $("#messages-panel").prepend(item);
}

$(document).ready(function () {
    $("#message-detail").hide();
    var m1 = new Message(1,1,"Fox, Johnny", "Johnny's Fight", '4/1 12:00', msg1, true);
    var m2 = new Message(2,2,"Fox, Johnny", "Johnny sick", '4/2 1:10', msg2, true);
    var l1 = [];
    l1.push(m1);
    var l2 = [];
    l2.push(m2);
   
    threadMap['Fox, Johnny'] = [
        new MessageThread("Fox, Johnny", "Johnny's Fight", l1, '4/1 12:00', true),
        new MessageThread("Fox, Johnny", "Johnny sick", l2, '4/12 12:00', true)
    ];

    m2 = new Message(3,3,"Faust, Ben", "Ben Sick", '4/5 12:00', msg2, true);
    l2 = [];
    l2.push(m2);

    threadMap["Faust, Ben"] = [
        new MessageThread("Faust, Ben", "Ben Sick", l2, '4/5 12:00', true)
    ];

    m2 = new Message(4,4,"Craig, Yinfu", "Yinfu Absent", '4/5 12:44', msg3, true);
    l2 = [];
    l2.push(m2);
    threadMap["Craig, Yinfu"] = [
         new MessageThread("Craig, Yinfu", "Yinfu Absent",l2, '4/5 12:44', true)
    ];
    // threadMap["Adams, Sophie"] = [
    //     new Message(5,5,"Adams, Sophie", "Sophie Fever", '4/12 2:14', msg4, false, true)
    // ];

    id = 6;

    loadAllMessages();
    //appending each student to the student panel
    for (var i = 0; i < studentNames.length; i++) {
        if(studentNames[i] in studentMap){
            if (studentMap[studentNames[i]].numOfUnread>0){
                var student = "<div id='student-"+i+"' class='student-label btn btn-block' onclick=hilightStudent(this)>" + studentNames[i] + "<span id='badge' class='badge pull-right'>" + studentMap[studentNames[i]].numOfUnread + "</span></div>";

            }
        } else {
            var student = "<div id='student-"+i+"' class='student-label btn btn-block' onclick=hilightStudent(this)>" + studentNames[i] + "</div>";
        }
        
        $("#students-panel").append(student);
    };

    //initialize messages panel and message details to be hidden
    $("#message-detail").fadeOut();

    $('#sendBTN').click(function (e) {
        e.preventDefault();
        newMessage();
        $("#newMessageModal").modal('hide');

    });

    $('#sendResponse').click(function (e) {
        e.preventDefault();
        // $('#message-data').hide();
        // $('#message-data').append("<div style='background:#DDDDDD' class='row'><div class='col-md-2'><b>Me:</b></div><div class='col-md-10'>" + $('#responseText').val() + "</div></div></div>");
        // $('#message-data').fadeIn();
        // $('#responseText').val('');
        var d = new Date();
        var dateTime = convertDate(d);
        id += 1;
        currentThread.time = dateTime;
        var m = new Message(id, currentThread.id, currentThread.student, currentThread.subject,
            dateTime, $('#responseText').val(), false);
        $('#responseText').val('');
        currentThread.messages.push(m);
        refreshThread(currentThread);

    });

    //modal recipeints select dropdown
    var select = document.getElementById("recipient");
    for (var i = 0; i < studentNames.length; i++) {
        var opt = studentNames[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        console.log(select);
        select.appendChild(el);
    }
    $("#recipient").select2();

    //search for students---------start
    select = document.getElementById("search");
    select.appendChild(document.createElement("option"));
    for (var i = 0; i < studentNames.length; i++) {
        var opt = studentNames[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
    $("#search").select2({
        placeholder: "Click to search for a student"
    });
    $("#search").on("select2-selecting", function(e) {
        var id = studentNames.indexOf(e.val);
        var elem = document.getElementById("student-"+id);
        hilightStudent(elem);
    });
    //search for students---------end
});