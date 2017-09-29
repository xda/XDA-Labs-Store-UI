
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
