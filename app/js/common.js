$(function () {

    // Subscribe modal
    $('.subscribe-wrapper').on('click', function () {
        $('body').addClass('hidden');
        $('.subscribe-modal-wrapper').addClass('show');
        $('.subscribe-mask').addClass('show');
        $('.subscribe-modal-dialog').addClass('show');
    });
    $('.subscribe-mask').on('click', function () {
        $('body').removeClass('hidden');
        $('.subscribe-modal-wrapper').removeClass('show');
        $('.subscribe-mask').removeClass('show');
        $('.subscribe-modal-dialog').removeClass('show');
    });
    $('.subscribe-modal-close').on('click', function () {
        $('body').removeClass('hidden');
        $('.subscribe-modal-wrapper').removeClass('show');
        $('.subscribe-mask').removeClass('show');
        $('.subscribe-modal-dialog').removeClass('show');
    });


    // Alert close
    $('.alert-close').on('click', function () {
        $(this).closest('.alert-modal').removeClass('show');
    });


    // Fixed header
    let mainHeader = $('.main-header'),
        secondaryNavigation = $('.cd-secondary-nav'),
        belowNavHeroContent = $('.sub-nav-hero'),
        headerHeight = mainHeader.height();

    let scrolling = false,
        previousTop = 0,
        currentTop = 0,
        scrollDelta = 10,
        scrollOffset = 150;

    mainHeader.on('click', '.nav-trigger', function (event) {
        // open primary navigation on mobile
        event.preventDefault();
        mainHeader.toggleClass('nav-open');
    });

    $(window).on('scroll', function () {
        if (!scrolling) {
            scrolling = true;
            (!window.requestAnimationFrame)
                ? setTimeout(autoHideHeader, 250)
                : requestAnimationFrame(autoHideHeader);
        }
    });

    $(window).on('resize', function () {
        headerHeight = mainHeader.height();
    });

    function autoHideHeader() {
        let currentTop = $(window).scrollTop();

        (belowNavHeroContent.length > 0)
            ? checkStickyNavigation(currentTop) // secondary navigation below intro
            : checkSimpleNavigation(currentTop);

        previousTop = currentTop;
        scrolling = false;
    }

    function checkSimpleNavigation(currentTop) {
        //there's no secondary nav or secondary nav is below primary nav
        if (previousTop - currentTop > scrollDelta) {
            //if scrolling up...
            mainHeader.removeClass('is-hidden');
        } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
            //if scrolling down...
            mainHeader.addClass('is-hidden');
        }
    }

    function checkStickyNavigation(currentTop) {
        //secondary nav below intro section - sticky secondary nav
        let secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();

        if (previousTop >= currentTop) {
            //if scrolling up...
            if (currentTop < secondaryNavOffsetTop) {
                //secondary nav is not fixed
                mainHeader.removeClass('is-hidden');
                secondaryNavigation.removeClass('fixed slide-up');
                belowNavHeroContent.removeClass('secondary-nav-fixed');
            } else if (previousTop - currentTop > scrollDelta) {
                //secondary nav is fixed
                mainHeader.removeClass('is-hidden');
                secondaryNavigation.removeClass('slide-up').addClass('fixed');
                belowNavHeroContent.addClass('secondary-nav-fixed');
            }

        } else {
            //if scrolling down...
            if (currentTop > secondaryNavOffsetTop + scrollOffset) {
                //hide primary nav
                mainHeader.addClass('is-hidden');
                secondaryNavigation.addClass('fixed slide-up');
                belowNavHeroContent.addClass('secondary-nav-fixed');
            } else if (currentTop > secondaryNavOffsetTop) {
                //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset
                mainHeader.removeClass('is-hidden');
                secondaryNavigation.addClass('fixed').removeClass('slide-up');
                belowNavHeroContent.addClass('secondary-nav-fixed');
            }

        }
    }


    // Selects
    $('.select-lang').selectric();
    $('.select-bottle').selectric();
    $('.select-city').selectric({
        maxHeight: 400
    });


    // Header actions
    $('.menu-toggle').on('click', function (e) {
        $(this).toggleClass('active');
        $('.main-nav').toggleClass('show');
        $('.toggle-mask').show();
    });

    $('.login-link').on('click', function (e) {
        $('.nav-right-slide-click').toggleClass('open');
        $('.toggle-mask3').show();
    });

    $('.basket-toggle-2').on('click', function () {
        $('.nav-right-slide-click').toggleClass('open');
        $('.toggle-mask3').show();
    });

    $('.toggle-mask3').on('click', function (e) {
        $(this).hide();
        $('.nav-right-slide-click').removeClass('open');
    });

    $('.toggle-mask').on('click', function () {
        $(this).hide();
        $('.menu-toggle').removeClass('active');
        $('.main-nav').removeClass('show');
    });

    if ($(window).width() <= 768) {
        $('.basket-toggle').on('click', function () {
            $('.basket-wrapper').toggleClass('show');
            $('.toggle-mask2').show();
        });

        $('.toggle-mask2').on('click', function () {
            $(this).hide();
            $('.basket-wrapper').removeClass('show');
        });
    } else {
        $('.basket-wrapper').on('mouseenter', function () {
            $(this).addClass('show');
        });

        $('.basket-wrapper').on('mouseleave', function () {
            $(this).removeClass('show');
        });
    }


    // Input counter
    $('.quantity-arrow-minus').click(function () {
        let $input = $(this).parent().find('input');
        var count = parseFloat($input.val()) - 0.5;
        count = count < 0.5 ? 0.5 : count;
        $input.val(count.toFixed(1) + 'Л');
        $input.change();
        return false;
    });
    $('.quantity-arrow-plus').click(function () {
        let $input = $(this).parent().find('input');
        $input.val((parseFloat($input.val()) + 0.5).toFixed(1) + 'Л');
        $input.change();
        return false;
    });

    // Input focus
    $('.input-material input, .input-material textarea').on('change', function () {
        if ($(this).val()) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

    // Textarea dynamic height
    $('.autoheight textarea').each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
        this.style.height = '41px';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Sliders init
    let addProductsSlider = new Swiper('.additional-products-slider', {
        loop: true,
        navigation: {
            nextEl: '.swiper-arrow-next',
            prevEl: '.swiper-arrow-prev',
        },
    });

    let heroSlider = new Swiper('.hero-slider', {
        loop: true,
        speed: 700,
        fadeEffect: {crossFade: true},
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        slidersPerView: 1,
        effect: "fade",
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    let popularProductsSlider = new Swiper('.popular-products-slider', {
        loop: true,
        speed: 700,
        slidesPerView: 1,
        spaceBetween: 16,
        autoHeight: true,
        navigation: {
            nextEl: '.swiper-arrow-next',
            prevEl: '.swiper-arrow-prev',
        },
        breakpoints: {
            319: {
                loop: true,
                speed: 700,
                slidesPerView: 1,
                spaceBetween: 16,
                autoHeight: true,
            },
            1200: {
                autoHeight: false,
                slidesPerView: 3,
                spaceBetween: 0,
            },
            1600: {
                autoHeight: false,
                slidesPerView: 4,
                spaceBetween: 0,
            },
        }
    });

    let reviewsSlider = new Swiper('.reviews-slider', {
        loop: true,
        speed: 700,
        autoHeight: true,
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    let newsSlider = new Swiper('.news-slider', {
        loop: true,
        speed: 700,
        autoHeight: true,
        fadeEffect: {crossFade: true},
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        slidersPerView: 1,
        effect: "fade",
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    if ($(window).width() <= 991) {
        let suppliersSlider = new Swiper('.suppliers-slider', {
            loop: true,
            navigation: {
                nextEl: '.swiper-arrow-next',
                prevEl: '.swiper-arrow-prev',
            },
        });

        let productReviewsSlider = new Swiper('.product-reviews-slider', {
            loop: true,
            autoHeight: true,
            navigation: {
                nextEl: '.swiper-arrow-next',
                prevEl: '.swiper-arrow-prev',
            },
        });
    }

    $('#basket-modal').on('shown.bs.modal', function (e) {
        let addProductsSlider2 = new Swiper('.additional-products-slider2', {
            loop: true,
            slidesPerView: 1,
            navigation: {
                nextEl: '.swiper-arrow-next',
                prevEl: '.swiper-arrow-prev',
            },
            breakpoints: {
                767: {
                    slidesPerView: 3,
                },
            }
        });
    });

    /*if ($(window).width() <= 575) {
        $('.product-card-desc .title').on('click', function () {
            $('.desc-wrapper').toggle();
        });
    }*/

    // Shop toggle
    $('.shop-arrow').on('click', function () {
        $(this).closest('.shop-item').toggleClass('active');
    });

    // Contact form
    $('.contact-form-btn').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.contact-col-left').find('.form-wrap').addClass('hide');
        $(this).closest('.contact-col-left').find('.successfully-message').addClass('show');
    });

    // Vacancy form
    $('.vacancy-form-btn').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.form-wrapper').find('.form-wrapper-vacancy').addClass('hide');
        $(this).closest('.form-wrapper').find('.successfully-message').addClass('show');
    });

    // Review form
    $('.review-form-btn').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.reviews-form-wrapper').find('.form-wrapper-reviews').addClass('hide');
        $(this).closest('.reviews-form-wrapper').find('.successfully-message').addClass('show');
    });

    // Play/Pause video btn
    $('.video').parent().click(function () {
        if ($(this).children(".video").get(0).paused) {
            $(this).children(".video").get(0).play();
            $(this).children(".playpause").hide();
        } else {
            $(this).children(".video").get(0).pause();
            $(this).children(".playpause").show();
        }
    });

    // Phone mask
    $("#tel").inputmask({"mask": "+380 (99) 999-99-99"});
    $("#tel2").inputmask({"mask": "+380 (99) 999-99-99"});
    $("#time").inputmask({"mask": "99:99"});
});
