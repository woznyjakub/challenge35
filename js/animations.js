$window = $(window)
$document = $(document)

/* nav, header buttons */

$(".nav .company-logo, .nav-list-item, .header .btn-learn-more").on('click', function () {
    const destination = '.' + $(this).attr('data-destination')
    if (window.innerWidth < 1200) showMenu()
    $('html, body').animate({
        scrollTop: $(destination).offset().top - 69, //It's constant value of nav's height (not active), problem with long transition on nav-list
        easing: 'swing'
    }, 1200)
})

/* hamburger */

function showMenu() {
    $('.nav').toggleClass('active')
}
$('.hamburger').on('click', showMenu)

/* header */

// header slider initialization
new Glide('.header-slider', {
    type: 'carousel',
    animationDuration: 800,
    autoplay: 9000,
    hoverpause: false,
    dragThreshold: false,
    swipeThreshold: false
}).mount()

let progressElemCounter = 1
const progressBarAnim = function (elem) {
    $(`.progress-bar[data-id="${elem}"]`).animate({
        value: 100
    }, {
        duration: 9000,
        easing: 'linear',
        step: function (now) {
            $(`.progress-bar[data-id="${elem}"]`).attr("value", now);
        }
    })
    progressElemCounter++
    setTimeout(() => {
        $('.progress-bar').attr('value', 0)
    }, 100)
    if (progressElemCounter > 4) {
        progressElemCounter = 1
    }
    setTimeout(() => {
        progressBarAnim(progressElemCounter)
    }, 9000);
}
progressBarAnim(progressElemCounter)

/* section 1 'about' */

$('.about-image-wrapper').on('click', function () {
    if (window.innerWidth < 1200) $(this).toggleClass('active')
})

let countingExecuted = false
const $aboutCounter = $('.counter')
$(window).on('scroll', function () {
    if ($window.scrollTop() > $aboutCounter.offset().top - $window.height() + $aboutCounter.height() / 2 && $window.scrollTop() < $aboutCounter.offset().top + $aboutCounter.height()) {
        $aboutCounter.addClass('active')
        if (!countingExecuted) {
            $('.counter-number').each(function () {
                $(this).prop('countTo', 0).animate({
                    countTo: $(this).attr('data-destination')
                }, {
                    duration: 5500,
                    easing: 'swing',
                    step: function (number) {
                        $(this).text(Math.ceil(number));
                    }
                })
            })
            countingExecuted = true
        }
    }
})

/* section 4 'services-2' */

let $lastActiveElem = $('.services-2-heading-wrapper:first-of-type .fa-angle-up')
let $serv2Item = $('.services-2-content-item[data-id="1"]')
const serv2SwitchDescription = function () {
    $lastActiveElem.on('click', serv2SwitchDescription)
    $(this).unbind('click', serv2SwitchDescription)
    $('.services-2 .fa-angle-up').removeClass('active')
    $(this).addClass('active')
    $lastActiveElem = $(this)

    $serv2Item.removeClass('active')
    $serv2Item = $(`.services-2-content-item[data-id="${$(this).attr('data-id')}"]`)
    $serv2Item.addClass('active')
}
$('.services-2-content-item:not(:first-of-type) .fa-angle-up').on('click', serv2SwitchDescription)

// services-2 slider initalization
new Glide('.services-2-slider', {
    type: 'carousel',
    animationDuration: 800
}).mount()

/* section 5 'team' */

$('.team-item').on('click', function () {
    if (window.innerWidth < 1200) $(this).toggleClass('active')
})

/* section 6 'work' */

$('.work-image-item').on('click', function () {
    if (window.innerWidth < 1200) $(this).toggleClass('active')
})

// work-slider slider initalization
new Glide('.work-slider', {
    type: 'carousel',
    animationDuration: 800
}).mount()

/* last section */

$('.map').on('click', function () {
    $(this).addClass('active')
})
setTimeout(() => {
    $('iframe').addClass('height0')
}, 2000);

$('.map-close').on('click', function () {
    $('.map').removeClass('active')
})