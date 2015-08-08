/**
 * Created by Andrew on 2015/8/7.
 */
$(function () {
    $(".nav-list li").click(function () {
        $("li[class='active']").removeAttr("class");
        $(this).addClass("active");
    });
});