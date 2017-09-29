const categoryUrl = "/store/recent/";
const appUrl = "/store/app/";

function openApp(s) {
  window.location.href = appUrl + s
}
function openCategory(i) {
    window.location.href = categoryUrl + i
}

$(".category-item").on("click", function(e) {
    openCategory($(this).data("index"))
    e.stopPropagation()
})

$(".app-item").on("click", function() {
    let packageName = $(this).closest(".app-parent").data("packageName")
    openApp(packageName)
})

function getLang() {
    if (navigator.languages !== undefined) {
        return navigator.languages[0];
    } else {
        return navigator.language;
    }
}

function fetchDevData(userid) {
    $.getJSON("https://api.xda-developers.com/v2/user/userinfo?userid=" + userid, function (r) {
        /** @namespace r
         *  @type {Object}
         *  @property {string} post_thanks_thanked_times
         *  @property {string} joindate
         *  @property {string} usertitle
         *  @property {string} posts
         */

        if (r === null || r.username === "") {
            apiError();
            return;
        }

        console.log(r);

        let join_date = new Date(r.joindate * 1000);
        let join_day = (join_date.getDate() < 10 ? ("0" + join_date.getDate()) : join_date.getDate());
        let join_string = join_day + " " + join_date.toLocaleString(getLang(), { month: "short" })
            + " " + " " + join_date.getFullYear();

        $("#details_thanks").text(r.post_thanks_thanked_times);
        $("#details_posts").text(r.posts);
        $("#details_signup_date").text(join_string);
        $("#dev-title").text(r.usertitle);
        $("#dev-title").removeClass("hide");

        $("#dev-loading").addClass("hide");

        $("#dev-details-details").slideDown(500);

    }).error(function () {
        apiError();
    });

    function apiError() {
        $("#dev-loading").slideUp();
    }
}