window.addEventListener('DOMContentLoaded', function () {
  const subscription = document.querySelector('.section-hero__btn');

  //smooth scrolling on anchors
  document.querySelectorAll('.header-top__list a[href*="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (eventAnchor) {
      eventAnchor.preventDefault();
      const IDblock = anchor.getAttribute('href').substring(1);
      smoothScroll(IDblock)
    })
  });

  document.querySelectorAll('.header-top-menu-adaptive__list a[href*="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (eventAnchor) {
      eventAnchor.preventDefault();
      const IDblock = anchor.getAttribute('href').substring(1);
      smoothScroll(IDblock);
    })
  });

  subscription.addEventListener('click', function (eventAnchor) {
      eventAnchor.preventDefault();
      const IDlink = subscription.getAttribute('href').substring(1);
      smoothScroll(IDlink);
    })

  function smoothScroll(IDblock) {
    document.getElementById(IDblock).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  //menu
  const burger = document.querySelector('.header-top__burger');
  const closeBurger = document.querySelector('.header-top-menu-adaptive__close');
  const closeLink = document.querySelectorAll('.header-top-menu-adaptive-item__link');

  burger.addEventListener('click', function (burgerEvent) {
    document.querySelector('.header-top__menu-adaptive').classList.add('header-top__menu-adaptive--active');
  });

  closeBurger.addEventListener('click', function (closeBurgerEvent) {
    document.querySelector('.header-top__menu-adaptive').classList.remove('header-top__menu-adaptive--active');
  });

  closeLink.forEach(function (elemLink) {
    elemLink.addEventListener('click', function (eventLink) {
      eventLink.stopPropagation();
      document.querySelector('.header-top__menu-adaptive').classList.remove('header-top__menu-adaptive--active');
    })
  })

  //header search
  document.querySelector('.header-top__search').addEventListener('click', function (searchEvent) {
    document.querySelector('.header-top__form').classList.add('header-top__form--active');
    setTimeout(function () {
      document.querySelector('.header-top__form').classList.add('opacity');
    }, 300);

    document.querySelector('.header-top-form__close').addEventListener('click', function (closeEvent) {
      setTimeout(function () {
        document.querySelector('.header-top__form').classList.remove('header-top__form--active');
      }, 300);
      document.querySelector('.header-top__form').classList.remove('opacity');
    })
  });


  //lover menu
  const links = document.querySelectorAll('.header-bottom__box');

  links.forEach(function (link) {
    link.addEventListener('click', function (linkEvent) {
      linkEvent.stopPropagation();

      if (link.nextElementSibling.classList.contains('header-bottom__scroll--active')) {
        link.nextElementSibling.classList.remove('header-bottom__scroll--active');
        link.querySelector('.header-bottom__pic').classList.remove('header-bottom__pic--active');
      } else {
        document.querySelectorAll('.header-bottom__box').forEach(function (link) {
          link.nextElementSibling.classList.remove('header-bottom__scroll--active');
          link.querySelector('.header-bottom__pic').classList.remove('header-bottom__pic--active');
        });

        link.nextElementSibling.classList.add('header-bottom__scroll--active');
        link.querySelector('.header-bottom__pic').classList.add('header-bottom__pic--active');

        const linktwo = link.nextElementSibling.querySelectorAll('.header-bottom-sublist__link');

        linktwo.forEach(function (i) {
          i.addEventListener('click', function (ev) {
            ev.preventDefault();
            document.querySelectorAll('.header-bottom__box').forEach(function (link) {
              link.nextElementSibling.classList.remove('header-bottom__scroll--active');
              link.querySelector('.header-bottom__pic').classList.remove('header-bottom__pic--active');
            });
          })
        })
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('header-bottom__scroll')) {
      return;
    } else {
      links.forEach(function (i) {
        i.nextElementSibling.classList.remove('header-bottom__scroll--active');
        i.querySelector('.header-bottom__pic').classList.remove('header-bottom__pic--active');
      })
    };
  });

  //hero
  new Swiper('.section-hero__swiper', {
    slidesPerView: 1,
    touchEventsTarget: 'section-hero__swiper',
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 4000,
    },
  });

  //gallery
  const element = document.querySelector('#block-select__custom');
  new Choices(element, {
    searchEnabled: false,
    position: 'bottom',
    classNames: {
      containerOuter: 'choices header_choices',
    },
  });

  new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 50,
    slidesPerGroup: 3,

    navigation: {
      nextEl: '.section-gallery__btn--right',
      prevEl: '.section-gallery__btn--left',
    },

    pagination: {
      el: '.section-gallery__pogination',
      type: 'fraction',
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },

      576: {
        slidesPerView: 2,
        spaceBetween: 38,
        slidesPerGroup: 2,
      },

      1024: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2,
      },

      1150: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2,

      },

      1199: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
      }
    }
  });

  //modal window in the section gallery
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal__content');
  const btnClose = document.querySelector('.modal__btn-close');
  const lockPadding = document.querySelectorAll('.lock-padding');
  const slideGallery = document.querySelectorAll('.section-gallery__slide');

  slideGallery.forEach(function (slide, number) {

    number++;
    slide.setAttribute('aria-label', number + '/' + slideGallery.length + ' ' + 'Изображение картины художника');

    slide.addEventListener('click', function (slideEvent) {
      slideEvent.preventDefault();
      let modaLeftBackground = document.querySelector('.modal__left');
      modaLeftBackground.style.backgroundImage = slide.style.backgroundImage;
      modalOpen(modal);
    })
  });

  btnClose.addEventListener('click', function (modalEvent) {
    modalClose(modal);
  });

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal') || event.target.classList.contains('modal__box')) {
      modalClose(modal);
    }
  });

  function modalOpen(modal) {
    if (modal.classList.contains('modal-open')) {
      modalClose(modal);
    } else {
      blockPadding();
    }

    modal.classList.add('modal-open');
    setTimeout(function () {
      modal.classList.add('opacity');
      modalContent.classList.add('modal__content--active');
    }, 400);
  }

  function modalClose(modal) {
    if (modal.classList.contains('modal-open')) {
      modalContent.classList.remove('modal__content--active');
      modal.classList.remove('opacity');
      setTimeout(function () {
        modal.classList.remove('modal-open');
        unBlockPadding();
      }, 400);
    }
  }

  function blockPadding() {
    const scrollbar = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    lockPadding.forEach(function (elem) {
      elem.style.paddingRight = scrollbar;
    });

    document.body.style.paddingRight = scrollbar;
    document.body.classList.add('lock');
  }

  function unBlockPadding() {
    lockPadding.forEach(function (elem) {
      elem.style.paddingRight = '0px';
    });

    document.body.style.paddingRight = '0px';
    document.body.classList.remove('lock');
  }

  //scroll artist
  const artistBtn = document.querySelectorAll('.section-catalog-accordion__btn');

  artistBtn.forEach(function (elem) {
    elem.addEventListener('click', function (ev) {
      if (window.innerWidth <= 576) {
        elem.setAttribute("href", "#artist-tabs");
        ev.preventDefault();
        const IDArtist = elem.getAttribute('href').substring(1);
        smoothScroll(IDArtist);
      } else {
        ev.preventDefault();
      }
    })
  });

  //catalog accordion
  $(".accordion").accordion({
    heightStyle: "content",
    collapsible: true,
    active: 0,
  });

  //tabs
  document.querySelectorAll('.section-catalog-accordion__btn').forEach(function (elem) {
    elem.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.section-catalog-accordion__btn').forEach(function (e) {
        e.classList.remove('section-catalog-accordion__btn--active');
        event.currentTarget.classList.add('section-catalog-accordion__btn--active');

        document.querySelectorAll('.section-catalog__tabs').forEach(function (el) {
          el.classList.remove('section-catalog__tabs--active');
        });

        document.querySelector(`[data-target="${path}"]`).classList.add('section-catalog__tabs--active');
      });
    })
  })

  //events swiper
  new Swiper('.section-events__swiper', {
    slidesPerView: 3,
    spaceBetween: 50,
    slidesPerGroup: 3,

    navigation: {
      nextEl: '.section-events__btn--right',
      prevEl: '.section-events__btn--left',
    },

    pagination: {
      el: '.section-events__pogination',
      clickable: true,
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 30,
        slidesPerGroup: 1,
      },

      515: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2,
      },

      907: {
        slidesPerView: 3,
        spaceBetween: 27,
        slidesPerGroup: 3,
      },

      1024: {
        slidesPerView: 3,
        spaceBetween: 27,
        slidesPerGroup: 3,
      },

      1499: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
      }
    },
  });

  //tooltip
  tippy('.section-projects__tooltip--one', {
    content: 'Пример современных тенденций - современная методология разработки',
    duration: 400,
    trigger: 'click',
  });

  tippy('.section-projects__tooltip--two', {
    content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
    duration: 400,
    trigger: 'click',
  });

  tippy('.section-projects__tooltip--three', {
    content: 'В стремлении повысить качество',
    duration: 400,
    trigger: 'click',
  });

  if (window.innerWidth <= 1024) {
    const btnTooltip = document.querySelectorAll('.section-projects__tooltip');

    btnTooltip.forEach(function (btn) {
      btn.addEventListener('click', function (btnEvent) {
        btnEvent.preventDefault();

        var svg = btn.querySelector('.section-projects__tooltip-pic');
        var svgClose = btn.querySelector('.section-projects__tooltip-close');
        svg.classList.toggle('section-projects__tooltip-pic--active');
        svgClose.classList.toggle('section-projects__tooltip-close--active');
      })
    });

    const closeBtn = document.querySelector('.section-projects__tooltip-close');

    document.addEventListener('click', (event) => {
      if (!event.target.classList.contains('section-projects-tooltip-pic__svg')) {
        btnTooltip.forEach(function (i) {
          i.querySelector('.section-projects__tooltip-pic').classList.remove('section-projects__tooltip-pic--active');
          i.querySelector('.section-projects__tooltip-close').classList.remove('section-projects__tooltip-close--active');
        })
      }
    });
  }

  //partners swiper
  new Swiper('.section-projects__swiper-partners', {
    slidesPerView: 3,
    spaceBetween: 50,
    slidesPerGroup: 3,

    navigation: {
      nextEl: '.section-projects__right',
      prevEl: '.section-projects__left',
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },

      690: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2,
      },

      1024: {
        slidesPerView: 2,
        spaceBetween: 50,
        slidesPerGroup: 2,
      },

      1499: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
      }
    }
  });

  //validate form
  var selector = document.querySelector("input[type='tel']");

  var im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);

  new JustValidate('.section-contacts__form', {
    colorWrong: '#D11616',
    rules: {
      name: {
        required: true,
        maxLength: 30,
        function: (name, value) => {
          if (/\d/.test(value) || /[@$!%*#?&^_-]/.test(value)) {
            return false;
          } else {
            return true;
          }
        },
      },
      phone: {
        required: true,
        function: (name, value) => {
          const ph = selector.inputmask.unmaskedvalue();
          return Number(ph) && ph.length === 10;
        }
      },
    },

    submitHandler: function(form) {
      let formData = new FormData(form);
      let xhr = new XMLHttpRequest();
      const loading = document.querySelector('.loading-form');
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
            alert('Отправлено');
          } else {
            alert('Ошибка');
          }
        }
      }

      xhr.open('POST', 'sendmail.php', true);
      xhr.send(formData);

      form.reset();
    },

    messages: {
      name: "Недопустимый формат",
      phone: "Недопустимый формат",
    }
  });

  //map
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.758468, 37.601088],
      zoom: 15,
      controls: [],
    });

    var myMapSm = new ymaps.Map("mapsm", {
      center: [55.758468, 37.601088],
      zoom: 15,
      controls: [],
    });

    var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
      iconLayout: 'default#image',
      iconImageHref: '../../img/mapmark.svg',
      iconImageHref: './img/mapmark.svg',
      iconImageSize: [20, 20],
    });

    var myPlacemarkSm = new ymaps.Placemark([55.758468, 37.601088], {}, {
      iconLayout: 'default#image',
      iconImageHref: '../../img/mapmark.svg',
      iconImageHref: './img/mapmark.svg',
      iconImageSize: [20, 20],
    });

    myMap.geoObjects.add(myPlacemark);
    myMapSm.geoObjects.add(myPlacemarkSm);

    myMap.controls.add('zoomControl', {
      float: 'none',
      position: {
        top: 300,
        right: 30,
      }
    });

    myMap.controls.add('geolocationControl', {
      float: 'none',
      position: {
        top: 250,
        right: 30,
      }
    });

    myMap.behaviors.disable('scrollZoom');
    myMapSm.behaviors.disable('scrollZoom');
  }
})
