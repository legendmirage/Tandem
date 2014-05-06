$(document).ready(function () {
    var students = ["Adams, Sophie", "Baker, Mike", "Brown, Ashley", "Clark, Leslie",
        "Cook, Linda", "Craig, Yinfu", "Farr, Nike", "Faust, Ben", "Fox, Johnny",
        "Hans, Peter", "He, Sally", "Hung, Jackie", "Kardashian, Kim", "Moon, Jason",
        "Weaver, Joanie", "Xavier, Tom", "Yoon, Charles", "Zakarian, Sylvia"
    ];

    // for updating contact parent name in message
    var contactJames = function () {
        $('#contactparent').text('James Fox');
    };
    var contactSusan = function () {
        $('#contactparent').text('Susan Fox');
    };
    var top_offset = 150;
    var left_offset = 200;
    var name_top_offset = 200;
    var name_left_offset = 200;

    var desks = $(".desk");

    for (i = 0; i < desks.length; i++) {
        var desk = desks[i];
        desk.style.position = "absolute";
        desk.style.top = "" + top_offset + "px";
        desk.style.left = "" + left_offset + "px";
        left_offset = left_offset + 110;
        if ((i + 1) % 2 == 0) {
            left_offset += 20;
        }
        if ((i + 1) % 6 == 0) {
            left_offset = 200;
            top_offset += 110;
        }
    }

    $(".student").popover({
        trigger: 'hover',
        title: 'Student',
        content: 'N/A',
        delay: {
            show: 200,
            hide: 200
        },
    })
    $("#jfox").popover({
        trigger: 'hover',
        html: true,
        title: '<h3>Jonathon Fox (Johnny)</h3>',
        content: '<div class="container"><img src="images/johnny_fox_prof.jpeg" alt="Johnny Fox profile image" class="prof"><div class="column-right"><h4>Parents / Guardians</h4> <div><span class="parent">James Fox </span> <div class="icon-wrapper"> <div id="jfoxclick" onclick="contactJames();" data-toggle="modal" data-target="#newMessageModal" style="display:inline"><img src="images/mailicon.png" alt="Send a message" class="contacticons"></div> <a href=""><img src="images/callicon.png" alt="Call with Google Voice" width="30" height="30"></a> </div></div><br/><div> <span class="parent">Susan Fox </span> <div class="icon-wrapper"> <div id="sfoxclick" onclick="contactSusan();" data-toggle="modal" data-target="#newMessageModal" style="display:inline"><img src="images/mailicon.png" alt="Send a message" class="contacticons"></div> <a href=""><img src="images/callicon.png" alt="Call with Google Voice" width="30" height="30"></a> </div></div></div></div><a class="profile-link" href="profile.html">View Profile</a>',
        container: '#jfox',
        delay: {
            show: 200,
            hide: 200
        },
    }).on({ //from http://jsfiddle.net/L4Hc2/
        show: function (e) {
            var $this = $(this);

            // Currently hovering popover
            $this.data("hoveringPopover", true);

            // If it's still waiting to determine if it can be hovered, don't allow other handlers
            if ($this.data("waitingForPopoverTO")) {
                e.stopImmediatePropagation();
            }
        },
        hide: function (e) {
            var $this = $(this);

            // If timeout was reached, allow hide to occur
            if ($this.data("forceHidePopover")) {
                $this.data("forceHidePopover", false);
                return true;
            }

            // Prevent other `hide` handlers from executing
            e.stopImmediatePropagation();

            // Reset timeout checker
            clearTimeout($this.data("popoverTO"));

            // No longer hovering popover
            $this.data("hoveringPopover", false);

            // Flag for `show` event
            $this.data("waitingForPopoverTO", true);

            // In 1500ms, check to see if the popover is still not being hovered
            $this.data("popoverTO", setTimeout(function () {
                // If not being hovered, force the hide
                if (!$this.data("hoveringPopover")) {
                    $this.data("forceHidePopover", true);
                    $this.data("waitingForPopoverTO", false);
                    $this.popover("hide");
                }
            }, 1500));

            // Stop default behavior
            return false;
        }
    }).on({
        show: function () {
            console.log("shown");
        },
        hide: function () {
            console.log("hidden");
        }
    });
    var drag = false;
    desks.draggable();
    desks.draggable('disable');
    $(".common:checkbox").switchbutton();

    $(".ui-switchbutton").click(function () {
        
        if(drag==false){
            drag = true;
            desks.draggable({
                'disabled':false,
                'snapMode':'outter'});
        }else{
            drag=false;
            desks.draggable('disable');
        }
    });
    //list of students
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
    var src = []
    for (var i = 0; i < students.length; i++) {
        var s = {};
        s['value'] = students[i];
        s['label'] = students[i];
        s['link'] = "profile.html";
        src.push(s);
    }

    $("#tags").autocomplete({
        source: src,
        messages: {
            noResults: '',
            results: function () {}
        },
        select: function (event, ui) {
            window.location.href = ui.item.link;
        }
    });

});