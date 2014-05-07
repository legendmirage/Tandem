$(document).ready(function () {
    /*
	var announcements = {
	"Diversity Celebration": ["You are cordially invited to attend the 8th annual district wide DIVERSITY CELEBRATION at Central York Elementary School on Thursday, April 17, 2013 from 5:30-8:00PM.  The Celebration will once again feature entertainment, food, and cultural workshops for children. Our keynote speaker this year is Miss America !", "4/7, 14:12"],
	"Roundtown Field Day": ["Save the date for our annual Roundtown Field Day. Field day will be on Monday, June 2 rain or shine. Please consider volunteering some time to help out with the many games and activities on that day.  Please note all field day volunteers MUST have appropriate volunteer clearances! Stay tuned for more information about a parent volunteer meeting coming soon.", "4/8 15:15"] ,
	"Second Grade Talent Show": ["Come on out for our annual Second Grade Talent Show!  Wednesday, April 16 at 6:30 PM kicks off a night of fun and amazing talents!  We have singers, dancers, tumblers, jugglers, joke tellers, and just about every other talent you can think of!  You are cordially invited to come out and celebrate the talented Roundtown third grade students who will assemble for this traditionally favorite program!", "4/11 12:00"]
	};

	var i = 0;
	//appending announcements from hardcoded data
	
	for (var subject in announcements) {
		
		var announce_box = "<div id='announcement" + i + "'' class='panel panel-default'></div>";
		$("#announcements-wrapper").prepend(announce_box);

		var announce_subject = "<div row=" + i + " class='panel-heading'> <h4 class='panel-title'> <a data-toggle='collapse' data-parent='#accordion' href='#collapse"+ i +"'>" + subject + "</a></h4><div class='date-time'>" + announcements[subject][1] +"</div></div>";
		var announce_content = "<div id='collapse" + i + "'' class='panel-collapse collapse in'> <div class='panel-body'>" + announcements[subject][0] + "</div></div>";

		$("#announcement" + i).append(announce_subject);
		$("#announcement" + i).append(announce_content);
		
		$("#content" + i).hide();

		i++;

	};*/

    var toggleDisplay = function (elem) {
        //$(".announcement-content").hide();
        var content = "#content" + $(elem).attr('row');
        $(content).toggle();
    }

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

    var newAnnouncement = function (e) {
        var subject = $('#subject').val();
        var details = $('#details').val();
        var d = new Date();
        var dateTime = convertDate(d);
        var i = announcements.length;

        announcements[subject] = [details, dateTime];
        var announce_box = "<div id='announcement" + i + "'' class='panel panel-default'></div>";
        $("#announcements-wrapper").prepend(announce_box);

        var announce_subject = "<div row=" + i + " class='panel-heading'> <h4 class='panel-title'> <a data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "'>" + subject + "</a></h4><div class='date-time'>" + announcements[subject][1] + "</div></div>";
        var announce_content = "<div id='collapse" + i + "'' class='panel-collapse collapse in'> <div class='panel-body'>" + announcements[subject][0] + "</div></div>";

        $("#announcement" + i).append(announce_subject);
        $("#announcement" + i).append(announce_content);

        $("#content" + i).hide();

        $('#subject').val('');
        $('#details').val('');

    }

    $('#announceBTN').click(function (e) {
        e.preventDefault();
        newAnnouncement();
        $("#newAnnouncementModal").modal('hide');

    });

});