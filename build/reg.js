$(() => {
  $('.form').find('input, textarea').on('keyup blur focus', function (e) {

    var $this = $(this),
      label = $this.prev('label');

    if (e.type === 'keyup') {
      if ($this.val() === '') {
        label.removeClass('active highlight');
      } else {
        label.addClass('active highlight');
      }
    } else if (e.type === 'blur') {
      if ($this.val() === '') {
        label.removeClass('active highlight');
      } else {
        label.removeClass('highlight');
      }
    } else if (e.type === 'focus') {

      if ($this.val() === '') {
        label.removeClass('highlight');
      }
      else if ($this.val() !== '') {
        label.addClass('highlight');
      }
    }

  });

  let isActive = true;

  $('.tab a').on('click', function (e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $('.tabn a').parent().addClass('active');

    $(this).parent().siblings().removeClass('active');

    if (isActive) {
      $('.tabp').removeClass('active');
      isActive = false;
    }
    else { isActive = true }

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

  });



  $('#submit_btn')[0].onclick = () => {
    if ($('#pass')[0].value == $('#conPass')[0].value) { }
    else {
      alert("Confirm Password should not be same as Password ")
    }
  }




})