
/** @namespace logged_in
 *  @type boolean
 * */

/** @namespace search_term
 *  @type string
 * */

/** @namespace StoreUrl
 *  @type Object
 *  @property {function} getSort
 *  @property {function} addCategory
 *  @property {function} addFilters
 *  @property {function} addQueryParams
 *  @property {function} getSort
 *  @property {function} newUrl
 *  @property {function} setSort
 *  @property {function} setCategory
 *  @property {function} setAuthor
 *  @property {function} setFilter
 * */

const url = StoreUrl

function openApp(s) {
  window.location.href = "/store/app/" + s
}

let loadIndexUrl = function() {
    window.location.href = url.getSort()
                           .addCategory()
                           .addFilters()
                           .addQueryParams()
                           .getUrl()
}

function openSort(s) {
    url.newUrl().setSort(s)
    loadIndexUrl()
}

function openCategory(i) {
    url.newUrl().setCategory(i)
    loadIndexUrl()
}

function openAuthor(i) {
    url.newUrl().setAuthor(i)
    loadIndexUrl()
}

function openFilter(s, b) {
    url.newUrl().setFilter(s, b)
    loadIndexUrl()
}

function openPage(s) {
    url.newUrl().setPage(s)
    loadIndexUrl()
}

$(".filter-item").on("click", function(e) {
    let filterName = $(this).data("slugName")
    if (!logged_in && (filterName === "watchlist" || filterName === "downloaded")) {
        return
    }
    if (filterName === "search") {
        search_term = ''
    } else if (filterName === "author") {
        this.author_pk = -1;
    } else if (filterName === "category") {
        openCategory(-1)
        e.stopPropagation()
        return
    }

    $(this).toggleClass("activeTag")

    let isFiltered = $(this).hasClass("activeTag")
    openFilter($(this).data("slugName"), isFiltered)
    e.stopPropagation()
})

$(".category-item").on("click", function(e) {
    openCategory($(this).data("index"))
    e.stopPropagation()
})

$(".author-item").on("click", function(e) {
    openAuthor($(this).data("devPk"))
    e.stopPropagation()
})

$(".sort-item").on("click", function(e) {
    openSort($(this).data("slugName"))
    e.stopPropagation()
})

$(".app-item").on("click", function() {
    let packageName = $(this).closest(".app-parent").data("packageName")
    openApp(packageName)
})

$(".page-link").on("click", function() {
    openPage($(this).data("page"))
})
