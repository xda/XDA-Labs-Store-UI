// /store/<sort_slugname>/category_id/filter1/filter2/filter3

// 1) Popularity clicked
// 2) Category clicked
// 3) Filter clicked
// 4) Author clicked


const url = StoreUrl

function openApp(s) {
  window.location.href = "/store/app/" + s
}

loadIndexUrl = function() {
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
