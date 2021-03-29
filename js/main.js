$(document).ready(function() {

  $('.mobile-wrap').on('click', function() {
    $('.line-burger').toggleClass('line-active');
    $('.main-header__list').slideToggle();
  });

  $(window).resize(function() {
    if ($(window).width() >= 840) {
      $('.main-header__list').attr('style', '');
      $('.line-burger').removeClass('line-active');
    }

  });

  $('a[href^="#"]').click(function() {
    var target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 800);
    return false;
  });

  $('.btn--request').on('click', function() {
    $('html,body').animate({
      scrollTop: $('.contacts').offset().top + "px"
    });
  });

  let elem = $('#ac_distance');
  elem.on('keypress', function() {
    return (event.charCode >= 48 && event.charCode <= 57 && /^\d{0,14}$/.test(this.value));
  })

  const fleet = $('.fleet__wrap');

  fleet.slick({
    infinite: true,
    // speed: 600,
    slidesToShow: 1,
    // autoplay: true,
    //autoplaySpeed:5000,
    draggable: true,
    fade: false,
    arrows: false,
    dots: false,
    dotsClass: 'fleet__dots-list',
    responsive: [{
      breakpoint: 781,
      settings: {
        dots: true,
      }
    }]
  });

  $('.fleet__arrow--dir_right').on('click', function() {
    $('.fleet__wrap').slick('slickNext');
  });


  function validate(input, length, regExp, error, phone) {

    $(input).on('blur keyup', function() {
      var value = $(this).val();
      var that = $(this);

      regExp = regExp == '' ? /./ : regExp;

      if (phone === true) {
        bool_reg = !regExp.test(value);
      } else {
        bool_reg = regExp.test(value);
      }

      if (value.length > length && value !== '' && bool_reg) {
        that.removeClass('form-fail').addClass('form-done');
        $(error).slideUp();
      } else {
        that.removeClass('form-done').addClass('form-fail');
        $(error).slideDown();
      }
    });

  }

  // деакцивация кнопки если есть поле с ошибкой

  function disBtn(input, btn, bool) {
    var input = $(input);
    input.on('blur keyup', function() {

      if (input.hasClass('form-fail') || bool == true) {
        $(btn).attr('disabled', 'disabled');
      } else {
        $(btn).removeAttr('disabled');
      }

    });

  }

  // для проверки при нажатии

  function valClick(input, length, regExp, error, btn, phone) {
    var value = $(input).val();

    regExp = regExp == '' ? /./ : regExp;

    if (phone === true) {
      bool_reg = regExp.test(value);
    } else {
      bool_reg = !regExp.test(value);
    }

    if (value.length < length && value === '' && bool_reg) {
      $(input).addClass('form-fail');
      $(error).slideDown();
    }
  }

  //  деакцивация кнопки при нажатии

  function disBtnClick(input, btn) {
    var input = $(input);

    if (input.hasClass('form-fail')) {
      $(btn).attr('disabled', 'disabled');
      return false;
    } else {
      return true;
    }

  }

  function validateCheck(input) {
    $(input).on('change', function() {
      var check = $(this).prop('checked');
      var that = $(this);

      if (check) {
        that.removeClass('input-fail').addClass('input-done');
      } else {
        that.removeClass('input-done').addClass('input-fail');
      }
    });
  }

  $('input[type="tel"]').mask("+38 (999) 999-99-99");

  var regName = /^[a-zA-Zа-яА-ЯёЁ]+/;
  var regPhone = /[_]/i;
  var regEmail = /.+@.+\..+/i;
  var regNumber = /^\d{1,}$/;

  validate('#c_name', 1, regName, '.contacts .contacts__fail--name');

  validate('#c_phone', 1, regPhone, '.contacts .contacts__fail--phone', true);

  validate('#c_email', 1, regEmail, '.contacts .contacts__fail--email');

  disBtn('#c_name, #c_email, #c_phone', '#btn--contact');

});
