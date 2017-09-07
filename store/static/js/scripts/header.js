window.onload = function() {
    let mobileInput = $("#headerSearchMobile");
    let desktopInput = $("#headerSearch");
    let desktopSearchResults = $("#headerSearchResults");
    let mobileSearchResults = $("#headerSearchResultsMobile");

    $.ajaxSetup({ cache: true });

    $("#searchIconCont").on("click", function () {
        $("#hiddenSearchMobile").removeClass("hide");
        mobileInput.focus();
    });

    mobileInput.keyup(function(k) {
        if (k.which === 27) {  // ESC
            clearAndCloseMobileSearch();
        } else {
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => searchApp($(this).val()), 400);
        }
    });
    mobileInput.blur(function() {
        setTimeout(() => clearAndCloseMobileSearch(), 100);
    });

    function clearAndCloseMobileSearch() {
        $("#hiddenSearchMobile").addClass("hide");
        hideMobileResults();
    }

    function hideDesktopResults() {
        if (desktopSearchResults.hasClass("searchResultsExpanded")) {
            desktopSearchResults.removeClass("searchResultsExpanded");
        }
    }

    function hideMobileResults() {
        if (mobileSearchResults.hasClass("searchResultsExpanded")) {
            mobileSearchResults.removeClass("searchResultsExpanded");
        }
    }

    desktopInput.blur(function() {
        hideDesktopResults();
    });

    desktopInput.on("webkitTransitionEnd otransitionend msTransitionEnd transitionend", function() {
        let searchVal = desktopInput.val();
        if (desktopInput.is(":focus")) {
            if (searchVal !== null) {
                searchApp(searchVal);
            }
        } else {
            hideDesktopResults();
        }
    });

    let timeoutID = null;

    function searchApp(str) {
        if (str !== null && str.length > 2) {
            $.getJSON("/api/1/search?q=" + str, function (r) {
                /** @namespace r
                 *  @type {Object}
                 *  @property {Array} results
                 * */
                parseSearchResults(r.results);
            });
        }
    }

    function parseSearchResults(rArray) {
        let isMobile = $("#searchIconCont").css("display") !== "none";

        let searchResults;

        if (isMobile) {
            searchResults = mobileSearchResults;
        } else {
            searchResults = desktopSearchResults;
        }
        searchResults.empty();

        $.each(rArray, function (i, result) {
            /** @namespace result
             *  @type {Object}
             *  @property {string} title
             *  @property {float} avg_rating
             *  @property {string} package_name
             */
            searchResults.append(
              `<div class="row searchResultsRow"
                    onclick="launchSearch('${result.package_name}')">
                <span>${result.title}</span>
                <div class="searchStar">
                  <span class="orange-text">&#x2605;</span>'
                   ${result.avg_rating.toFixed(1)}
                 </div>
               </div>`)
        });

        searchResults.delay(100).addClass("searchResultsExpanded");
    }

    desktopInput.keyup(function() {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => searchApp($(this).val()), 250);
    });

};

function launchSearch(s) {
    window.location.href = "/store/app/" + s;
}
