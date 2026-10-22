/*jslint browser */
/*global $ */

$(function () {
    $(".slider").slick({
        dots: true,
        nextArrow: $(".next"),
        prevArrow: $(".prev"),
        responsive: [{
            breakpoint: 768,
            settings: {slidesToScroll: 1, slidesToShow: 1}
        }],
        slidesToScroll: 3,
        slidesToShow: 3
    });
});