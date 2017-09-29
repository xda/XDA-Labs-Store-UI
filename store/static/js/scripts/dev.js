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
