$(document).ready(function () {
    var students = ["Adams, Sophie", "Baker, Mike", "Brown, Ashley", "Clark, Leslie",
        "Cook, Linda", "Craig, Yinfu", "Farr, Nike", "Faust, Ben", "Fox, Johnny",
        "Hans, Peter", "He, Sally", "Hung, Jackie", "Kardashian, Kim", "Moon, Jason",
        "Weaver, Joanie", "Xavier, Tom", "Yoon, Charles", "Zakarian, Sylvia"
    ];

    // var studentList = document.getElementById("student-list");

    // for (var i = 0; i < students.length; i++) {
    //     var s = students[i];
    //     console.log(s);
    //     var li = document.createElement("li");
    //     li.textContent = s;
    //     li.value = s;
    //     li.className = "list-group-item";
    //     studentList.appendChild(li);
    // }

//split into two columns
/*
    var size = 9,
        $ul = $("#student-list"),
        $lis = $ul.children().filter(':gt(' + (size - 1) + ')'),
        loop = Math.ceil($lis.length / size),
        i = 0;

    $ul.css('float', 'left').wrap("<div style='overflow: hidden'></div>");

    for (; i < loop; i = i + 1) {
        $ul = $("<ul />").css('float', 'left').append($lis.slice(i * size, (i * size) + size)).insertAfter($ul);
    }
*/
    //search
    var availableTags = students;
    
    $( "#tags" ).autocomplete({
      source: availableTags,
      messages: {
        noResults: '',
        results: function() {}
    }
    });

});