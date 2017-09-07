function parseUnixTimestamp(ts) {

    var d = new Date(ts * 1000);

    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    var day = ("0" + d.getDate()).slice(-2);
    var year = d.getFullYear();

    var time = formatAMPM(d);
    var result = month.toString() + "/" + day.toString() + "/" + year.toString();
    result += " " + time;

    return result;
}

function formatAMPM(date) {
    var hours = date.getHours();
    hours = hours + 5;
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + " " + ampm;
    return strTime;
}

function fetchForumData() {
    var thread_id = '{{ xda_thread_id }}';
    if (thread_id === '') return;

    $("#xda_thread_error").addClass("hide");
    $("#xda_thread_loading").removeClass("hide");

    $.getJSON("https://api.xda-developers.com/v2/threads/threadinfo?threadid=" + thread_id, function (r) {
        $("#xda_thread_data").removeClass("hide");
        $("#xda_thread_error").addClass("hide");
        $("#xda_thread_loading").addClass("hide");

        $(".xda-thread-title").html(r.title);

        // Last post
        $("#last_post").attr("href", "http://forum.xda-developers.com/showthread.php?p=" + r.lastpostid);
        $("#last_post").text(parseUnixTimestamp(r.lastpost.dateline));

        // Last post by
        $("#last_poster").attr("href", "http://forum.xda-developers.com/member.php?u=" + r.lastpost.userid);
        $("#last_poster").text(r.lastpost.username);

        // Reply count
        $("#reply_count").text(r.replycount);

        // View count
        $("#view_count").text(r.views);

    }).error(function (e) {
        $("#xda_thread_error").removeClass("hide");
        $("#xda_thread_loading").addClass("hide");
        $("#xda_thread_try_again").click(fetchForumData)
    });
}
