$(document).ready(function () {

  // Sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
    updateActiveSection();
  });

  // Smooth scroll nav links
  $(".header ul li a").click(function (e) {
    e.preventDefault();
    var target = $(this).attr("href");

    if (target === "#home") {
      $("html, body").animate({ scrollTop: 0 }, 500);
    } else {
      var offset = $(target).offset().top - 40;
      $("html, body").animate({ scrollTop: offset }, 500);
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");

    // Close mobile menu on link click
    if ($(window).width() <= 768) {
      $('.header ul').removeClass('active');
      $('.close-icon').hide();
      $('.open-icon').show();
    }
  });

  // ScrollReveal animations
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship",  { origin: "right" });
  ScrollReveal().reveal(".project-title, .contact-title", { origin: "top" });
  ScrollReveal().reveal(".projects, .contact",             { origin: "bottom" });

  // Contact form → Google Sheet
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet'];
  const msg  = document.getElementById("msg");

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(function () {
        msg.innerHTML = "Message sent successfully";
        setTimeout(function () { msg.innerHTML = ""; }, 5000);
        form.reset();
      })
      .catch(function (error) { console.error('Error!', error.message); });
  });

  // Mobile menu — open
  $('.open-icon').on('click', function () {
    $('.header ul').addClass('active');
    $('.open-icon').hide();
    $('.close-icon').show();
  });

  // Mobile menu — close
  $('.close-icon').on('click', function () {
    $('.header ul').removeClass('active');
    $('.close-icon').hide();
    $('.open-icon').show();
  });

});

// Active section highlight on scroll
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  $("section").each(function () {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}
