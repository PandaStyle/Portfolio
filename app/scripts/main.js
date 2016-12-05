/* !
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  let isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          let installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here
  // Project-Menu | Toggle -active //


    var pages_container = $('.pages-container'),
      full_page_wrap = $('.full-page-wrap'),
      P1_wrap = $('#P1-wrap'),
      ProjectMenu = $('#Project-Menu-Wrap'),
      Project_Desc_Wrap = $('#Project-Desc-Wrap'),
      projectCenter = $('.project-center-wrap'),
      projectCategory = $('.project-category'),
      ProjectUL = $('#Project-UL-List'),
      XitTri = $('#Xit-Triangle'),
      XitPlus = $('#XitPlus'),
      inset_img = $('.inset-image'),
      Project_BG = $('#Project-Desc-BG'),
      active_desc = $('.project-desc-body');

    // /// GLOBAL TARGET VARIABLES
    let targetProject,
      This_Expand_a,
      targetExpand;
    let thisPicker_li,
      pickerParent,
      picker_li_TargetSlide;
    let img1050_Height;
    let scrollTop_Var;
    let scrollValue_init,
      scrollValue_img_l0,
      scrollValue_img_l1,
      scrollOpacity_img_l0;
    // / GLOBAL Timeline instances
    let desc_tl,
      Expand_Down_tl;
    // // Tri-Menu-Button Color Animation
    //  TweenMax.to(XitTri, 6,  {backgroundColor: 'hsl( +=30, -=35%, +=20% )', repeat:-1, yoyo:true, overwrite:true, ease:Power4.easeInOut});

    let menu_tl = new TimelineLite({
      paused: true,
      force3D: true,
      immediateRender: true,
    });

    menu_tl
      .set(ProjectUL, {
        autoAlpha: 0,
      }, 'label--0')
      .set(Project_Desc_Wrap, {
        autoAlpha: 1,
        transformOrigin: "0 100",
      }, 'label--0')
      .set(active_desc.find('.h4-HR'), {
        scaleX: 1,
        transformOrigin: '0 0',
      }, 'label--0')
      .set(active_desc.find('a'), {
        autoAlpha: 0,
      }, 'label--0')
      .set(XitPlus, {
        color: 'rgb(61,61,70)',
      }, 'label--0')
      // .set(active_desc.find('.h3-HR'),  {autoAlpha:0.1, y:'-10em', transformOrigin: '0 0'}, "label--0")

      // .to(pages_container, 0.3, { boxShadow: '2px 15px 30px 4px rgba(0,3,12, 0.1), 12px 30px 12px -22px rgba(0,3,12, 0.1), 4px 5px 6px -2px rgba(0,0,0, 0.06), -0px 75px 70px -50px rgba(10,20,50, 0.2)', ease:Quad.easeInOut, force3D:true}, "label--2")

      .to(ProjectMenu, 0.4, {
        width: '83.333%',
        bottom: 0,
        backgroundColor: 'rgb(38,38,42)',
        ease: Quad.easeInOut,
        force3D: true,
      }, 'label--2')
      .to(ProjectMenu, 0.8, {
        left: '16.666%',
        height: '100%',
        ease: Quint.easeInOut,
        force3D: true,
      }, 'label--2+=0.0')
      .addLabel('tri-inMark', '-=0.5')
      .addLabel('li-inMark', '-=0.35')
      .to(XitTri, 0.9, {
        top: '-9%',
        right: '-11.25%',
        rotation: '-45',
        transformOrigin: '50,50',
        backgroundColor: 'rgba(33,33,38,1.0)',
        ease: Quint.easeInOut,
        force3D: false,
      }, 'tri-inMark-=0.5')
      .to(XitPlus, 0.7, {
        color: 'rgba(255,255,255,0.85)',
        fontSize: '0.6em',
        top: '4%',
        right: '5.5%',
        rotation: '-135',
        ease: Quad.easeInOut,
        force3D: true,
      }, 'label--2')
      .from(projectCenter, 1.35, {
        scaleY: 0,
        transformOrigin: '0% 100%',
        ease: Quint.easeInOut,
        force3D: true,
      }, 'label--2-=0.2')
      .from(Project_Desc_Wrap, 1.35, {
        yPercent: 100,
        ease: Quint.easeInOut,
        force3D: true,
      }, 'label--2-=0.1')
      .from(projectCategory, 0.4, {
        autoAlpha: 0,
        ease: Cubic.easeOut,
        force3D: true,
      }, 'label--2+=0.6')
      .to(ProjectUL, 0, {
        autoAlpha: 1,
      }, 'li-inMark+=0.15')
      .staggerFrom('.project-li.upper', 0.4, {
        autoAlpha: 0,
        y: '100%',
        scale: 1,
        transformOrigin: '36.67% 100%',
        ease: Back.easeOut,
        force3D: true,
      }, -0.03, 'li-inMark+=0.15')
      .staggerFrom('.project-li.lower', 0.4, {
        autoAlpha: 0,
        y: '100%',
        scale: 1,
        transformOrigin: '36.67% 0%',
        ease: Back.easeOut,
        force3D: true,
      }, -0.03, 'li-inMark')
      .addLabel('label--3', '+=0.3')
      .from(active_desc.find('h1'), 0.6, {
        autoAlpha: 0,
        y: '100%',
        ease: Expo.easeOut,
        force3D: true,
      }, 'label--3-=0.35')
      .from(active_desc.find('h3'), 0.6, {
        y: '-225%',
        ease: Expo.easeOut,
        force3D: true,
      }, 'label--3-=0.55')
      .from(active_desc.find('h4'), 0.3, {
        x: ' 510%',
        ease: Expo.easeOut,
        force3D: true,
      }, 'label--3-=0.3')
      .from(active_desc.find('.h4-HR'), 0.5, {
        x: ' 75%',
        ease: Expo.easeInOut,
        force3D: true,
      }, 'label--3-=0.7')
      .to(active_desc.find('.h4-HR'), 0.9, {
        scaleX: 0.25,
        ease: Expo.easeOut,
        force3D: true,
      }, 'label--3-=0.3')
      .from(active_desc.find('a'), 0.4, {
        y: ' 200%',
        height: '12.5%',
        autoAlpha: 0,
        ease: Circ.easeOut,
        force3D: true,
      }, 'label--3+=0.05')
      .from(active_desc.find('h2'), 0.4, {
        autoAlpha: 0,
        y: 20,
        ease: Circ.easeOut,
        force3D: false,
      }, 'label--3-=0.15')
      .staggerFrom(active_desc.find('.pSpan_1 span'), 0.5, {
        top: '8em',
        ease: Quart.easeOut,
        force3D: true,
      }, 0.075, 'label--3-=0.3')
      .staggerFrom(active_desc.find('.pSpan_1 span'), 0.45, {
        autoAlpha: 0,
        ease: Power2.easeInOut,
        force3D: true,
      }, 0.075, 'label--3-=0.3')
      /* //.staggerFrom(active_desc.find(".pSpan_2 span"), 0.5, {top: '8em', ease:Quart.easeOut}, 0.075, "label--3-=0.3")
       //.staggerFrom(active_desc.find(".pSpan_2 span"), 0.45, {autoAlpha: 0, ease:Power2.easeInOut}, 0.075, "label--3-=0.3")

       //.staggerFrom(active_desc.find(".pSpan_3 span"), 0.5, {top: '8em', ease:Quart.easeOut}, 0.075, "label--3-=0.3")
       //.staggerFrom(active_desc.find(".pSpan_3 span"), 0.45, {autoAlpha: 0, ease:Power2.easeInOut}, 0.075, "label--3-=0.3")

       //.staggerFrom(active_desc.find(".pSpan_4 span"), 0.5, {top: '8em', ease:Quart.easeOut}, 0.075, "label--3-=0.3")
       //.staggerFrom(active_desc.find(".pSpan_4 span"), 0.45, {autoAlpha: 0, ease:Power2.easeInOut}, 0.075, "label--3-=0.3")

       //.staggerFrom(active_desc.find(".pSpan_5 span"), 0.5, {top: '8em', ease:Quart.easeOut}, 0.075, "label--3-=0.3")
       //.staggerFrom(active_desc.find(".pSpan_5 span"), 0.45, {autoAlpha: 0, ease:Power2.easeInOut}, 0.075, "label--3-=0.3")
       */
      .to(active_desc.find('p'), 0.9, {
        autoAlpha: 1,
        ease: Circ.easeOut,
        force3D: true,
      }, 'label--3+=0.00') // opacity fade in for all p's, instead of staggering all. (project#1 staggers, others simply fade in.)
      .staggerFrom(active_desc.find('h5'), 0.5, {
        y: ' 200%',
        autoAlpha: 0,
        ease: Expo.easeOut,
        force3D: true,
      }, 0.1, 'label--3+=0.1')

      .addLabel('snappy-reverse', '-=1.3');

    XitTri.click(function() {
      // GLOBAL Target defined [Inital // First Project on.Open]
      targetProject = $($(this).attr('data-target-project'));

      ProjectMenu.toggleClass('active');
      projectCenter.addClass('active');
      Project_Desc_Wrap.toggleClass('active');
      $('.First').addClass('active');
      inset_img.toggleClass('active');

      if (ProjectMenu.hasClass('active')) {
        menu_tl.play().timeScale(1.0);
      } else {
        menu_tl.reverse('-=1.6');
      }
    }); // Project Open Menu  -END

    // /// Project-Desc-BG + Menu-Li | Hover-Li Toggle -active /////

    var project_li = $('.project-li'),
      Project_BG = $('#Project-Desc-BG');

    let relRand = '+=' + Math.random() * 100;

    // Split h1 into characters for Stagger anim.
    active_desc.each(function() {
      $(this).find('h1').html($(this).find('h1').html().replace(/./g, '<span>$&</span>').replace(/\s/g, '&nbsp;'));
    });

    project_li.mouseenter(function() {
      // GLOBAL Target defined
      targetProject = $($(this).attr('data-target-project'));

      desc_tl = new TimelineLite({
        paused: true,
        onCompleteParams: [targetProject.find('*')],
        onComplete: endFix,
      });
      //  console.log(desc_tl);

      desc_tl

        .set(targetProject.find('.h4-HR'), {
          autoAlpha: 0.2,
          scaleX: 1,
          transformOrigin: '0 0',
        })
        .set(targetProject.find('h1 span'), {
          transformPerspective: '300',
          transformOrigin: '50% 150%',
          force3D: true,
          transformStyle: "preserve-3d",
        })

        .addLabel('label-0X', '+=0.0')

        .staggerFrom(targetProject.find('h1 span'), 0.4, {
          top: '-1em',
          force3D: true,
          transformStyle: 'preserve-3d',
          ease: Power1.easeOut,
          onCompleteParams: ['{self}'],
        }, 0.02, 'label--1+=0.0')
        .staggerFrom(targetProject.find('h1 span'), 0.55, {
          rotationX: 90,
          ease: Power4.easeOut,
          force3D: true,
          transformStyle: "preserve-3d",
        }, 0.025, 'label--1+=0.1')

        .from(targetProject.find('.desc-h1-cont'), 0.95, {
          y: '-100%',
          ease: Power3.easeOut,
        }, 'label--2-=0.85')
        .from(targetProject.find('h4'), 0.4, {
          y: ' 100%',
          ease: Power3.easeOut,
          force3D: true,
        }, 'label--2-=0.55')
        .from(targetProject.find('h3'), 0.4, {
          x: ' 206.7%',
          ease: Expo.easeInOut,
        }, 'label--2-=1')
        .from(targetProject.find('.h4-HR'), 0.3, {
          autoAlpha: 0.6,
          x: ' 78%',
          ease: Expo.easeOut,
          force3D: true,
        }, 'label--2-=0.6')
        .to(targetProject.find('.h4-HR'), 0.6, {
          scaleX: 0.25,
          ease: Expo.easeOut,
          force3D: true,
        }, 'label--2-=0.4')
        .from(targetProject.find('h2'), 0.6, {
          width: '0%',
          left: '+=8.333%',
          ease: Expo.easeOut,
          force3D: false,
        }, 'label--2-=0.65')
        .staggerFrom(targetProject.find('p > span'), 0.34, {
          top: '6em',
          ease: Sine.easeOut,
          force3D: true,
        }, 0.06, 'label--2-=0.8')
        .staggerFrom(targetProject.find('p > span'), 0.34, {
          autoAlpha: 0,
          ease: Power2.easeInOut,
        }, 0.06, 'label--2-=0.8')
      // //Particle Menu-Desc.
      /*
       .fromTo($('#Particle-1'), 0.5, {top: '+=0', opacity: 0.1, },
       {scale: [Math.random() * 0.8 + 0.5], top: [Math.random() * 600], opacity: [Math.random() * 0.2 + 0.15], ease:Sine.easeInOut}, "label-0X")
       .fromTo($('#Particle-2'), 0.5, {top: '+=0', opacity: 0.1, },
       {scale: [Math.random() * 0.8 + 0.5], top:[Math.random() * 600], opacity: [Math.random() * 0.2 + 0.15], ease:Sine.easeOut}, "label-0X")
       .fromTo($('#Particle-3'),  0.5, {top: '+=0', opacity: 0.1, },
       {scale: [Math.random() * 0.8 + 0.5], top:[Math.random() * 600], opacity: [Math.random() * 0.2 + 0.15], ease:Sine.easeOut}, "label-0X")
       .fromTo($('#Particle-4'),  0.5, {top: '+=0', opacity: 0.1, },
       {top:[Math.random() * 600], opacity: [Math.random() * 0.2 + 0.15], ease:Sine.easeOut}, "label-0X")
       .fromTo($('#Particle-5'), Math.random() * 0.6 + 0.3, {top: '+=0', opacity: 0.1, },
       {top:[Math.random() * 600], opacity: [Math.random() * 0.2 + 0.15], ease:Power0.easeOut}, "label-0X")
       .fromTo($('#Particle-6'), Math.random() * 0.6 + 0.3, {top: '+=0', opacity: 0.1, },
       {top:[Math.random() * 600], opacity: [Math.random() * 0.2 + 0.15], ease:Power4.easeOut}, "label-0X")
       .fromTo($('#Particle-7'), Math.random() * 0.6 + 0.3, {top: '+=0', opacity: 0.1, },
       {top:[Math.random() * 600], opacity: [Math.random() * 0.2 + 0.15], ease:Power4.easeOut}, "label-0X")
       */
      ;

      if ($(this).hasClass('active')) {
        desc_tl.progress(1.0);
      } else {
        $(this).addClass('active').siblings('li').removeClass('active');

        $($(this).attr('data-target-project')).addClass('active').siblings().removeClass('active');
        desc_tl.restart().timeScale(1.0);
        Project_BG.css({
          'background-color': $(this).attr('data-target-bg'),
        });
        XitPlus.css({
          'color': $(this).attr('data-target-bg'),
          'opacity': '0.8',
        });

        //  $('.outer-expand').css({'background-color' : $(this).attr("data-target-bg")});
        //  $('.project-Nav').css({'background-color' : $(this).attr("data-target-bg")});
        /*  function randomParticles(){
         TweenMax.to('.BG-particle', 2.5, {top: Math.random(), opacity: Math.random(), onComplete:randomParticles});
         }
         randomParticles(); */
      }

      function endFix(x) {
        TweenMax.set(x, {
          clearProps: "all",
        });
        /*  x.each(function(index, param) {
         $('body').append("<p style='pointer-events: none; position: relative; top: -500px; font-size: 24%; font-family: monospace;'>"
         + "no. " + index  + " " + $(this).prop("tagName") + " " + $(this).prop("className") + " Props Cleared</p>"); //Logs Tag name of cleared tweens selector (aka param:)
         // $("#msg").html($(x).attr("id")+" onComplete fired");
         //console.log(o);
         }); */
      };
    }); // Li-desc mouseenter END

    // /// EXPAND Project Timeline & Functions /////

    let pNav = $('.project-Nav'),
      pNav_item = $('.p-Nav-item'),
      pNav_button = $('.p-Nav-menuButton');

    active_desc.each(function() {
      let this_desc = $(this),
        Expand_a = $('.project-desc-body a, #Project-UL-List a'),
        Expand_Cont = $('#Expand-Container'),
        project_ID_wrap = $('.project-ID-wrap'),
        project_expand_wrap = $('.project-expand-wrap'),
        expand_content_wrap = $('.expand-content-wrap'),
        inner_expand = $('.inner-expand'),
        outer_expand = $('.outer-expand');

      Expand_a.on('click', function() {
        // event.preventDefault();

        // GLOBAL Target defined
        This_Expand_a = $(this); // ''expand-a_button''
        targetExpand = $($(this).attr('data-target-expand-project'));

        let Expand_tl = new TimelineLite({
          paused: true,
          onReverseCompleteParams: ['#Project-Menu-Center-Over', '.project-center-wrap', '.page-left-half', targetProject],
          onReverseComplete: endFix_Expand,
          onComplete: defineScrollVars,
        });

        Expand_tl
          .set(targetProject, {
            scale: 1,
            transformOrigin: '50% 33%',
          })
          .set('#Project-Menu-Center-Over, .project-center-wrap', {
            opacity: 1,
            transformOrigin: '100% 50%',
          })
          .set(inner_expand, {
            autoAlpha: 1,
            scaleX: 0,
            transformOrigin: '0% 100%',
          })
          // .set(Expand_Cont, {autoAlpha: 0, display: 'none',}, 'label-0X')
          // .set(targetExpand, {autoAlpha: 0, display: 'none',}, 'label-0X')
          // .set(outer_expand, {autoAlpha: 1.0, scale:0, transformOrigin:'50% 50%', immediateRender: false,})
          .set(pNav, {
            autoAlpha: 0,
          })
          .set(targetExpand.find('.xpnd-header').find('h1 span'), {
            transformPerspective: '50',
            background: 'transparent',
          })
          .set(targetExpand.find('.xpnd-header').find('#Mixin-PlayButton').find('svg #Circle-Outline'), {
            opacity: 0.25,
          })

          .set(targetExpand.find('.xpnd-header').find('#Mixin-PlayButton').find('i'), {
            opacity: 0,
          })

          .addLabel('label-0X', '+=0.25') // initial delay for .inkAnimate

          .fromTo(Expand_Cont, 0.05, {
            autoAlpha: 0,
            display: 'none',
          }, {
            autoAlpha: 1,
            display: 'block',
          }, 'label-0X+=0.0')
          .fromTo(targetExpand, 0.05, {
            autoAlpha: 0,
            display: 'none',
          }, {
            autoAlpha: 1,
            display: 'block',
            top: '50vh',
            marginTop: '-4em',
            paddingBottom: '50vh',
            transformOrigin: '50% 0%',
          }, 'label-0X+=0.0')

          .fromTo('#LogoMark_DE', 0.9, {
            yPercent: 0,
            autoAlpha: 1,
          }, {
            yPercent: 105,
            autoAlpha: 0,
            ease: Power4.easeInOut,
          }, 'label-0X+=0.0')
          // .set('#Project-Menu-Wrap', {zIndex:1000,}, 'label-0X+=0.0')
          // .set('.project-center-wrap', {zIndex:999, overflow:'hidden',}, 'label-0X+=0.0')
          .fromTo('.page-left-half', 0.6, {
            width: '50.1%',
          }, {
            width: '100%',
            ease: Quint.easeIn,
          }, 'label-0X+=0.0') // <--Expo-in-out or Quint-in ?? /
          .fromTo('#Project-Menu-Wrap', 0.9, {
            x: '0px',
          }, {
            x: '460px',
            ease: Quint.easeInOut,
            force3D: true,
          }, 'label-0X+=0.2')
          .fromTo(ProjectUL, 0.6, {
            autoAlpha: 1,
            ease: Power3.easeIn,
          }, {
            autoAlpha: 0,
          }, 'label-0X+=0.35')
          .fromTo('.project-center-wrap', 0.9, {
            x: '0px',
          }, {
            x: '548px',
            ease: Quint.easeInOut,
            force3D: true,
          }, 'label-0X+=0.15')
          .fromTo('#Project-Menu-Center-Over', 0.25, {
            scaleX: 1,
            opacity: 1,
            transformOrigin: '100% 50%',
          }, {
            scaleX: 0,
            opacity: 0,
            ease: Quint.easeIn,
            force3D: true,
          }, 'label-0X+=0.175')
          .fromTo('#P1-Social-Links', 0.6, {
            x: 0,
          }, {
            x: '110%',
            ease: Expo.easeIn,
          }, 'label-0X+=0.0')

          .fromTo(inner_expand, 0.9, {
            scaleX: 0,
          }, {
            scaleX: 1,
            ease: Expo.easeInOut,
          }, 'label-0X+=0.25')
          .fromTo(targetProject, 1.2, {
            scale: 1,
            autoAlpha: 1,
            force3D: false,
          }, {
            scale: 0.5,
            autoAlpha: 0,
            ease: Expo.easeIn,
            force3D: false,
          }, 'label-0X+=0.0')
          /*
           //.to(active_desc, 0.85, {y: -200, autoAlpha: 0, ease:Expo.easeInOut}, 'label-0X+=0.4')
           //.to('body', 1.2, {backgroundColor:'rgb(252,252,252)', ease:Power3.easeInOut}, 'label-0X+=0.6')
           //.to(outer_expand, 2.0, {scaleY:1, autoAlpha: 1.0, ease:Expo.easeInOut}, 'label-0X+=0.0')
           //.to(pages_container, 2.0, {y:'-0%', scale:0.8, transformOrigin:'50% 75%', autoAlpha:0.5, ease:Power3.easeInOut}, 'label-0X+=0.0')
           //.to(pages_container, 1.0, {y:-300, ease:Power3.easeInOut}, 'label-0X+=1.0') */
          .set(['#P1-Right', '#P1-Left'], {
            autoAlpha: '1',
          })

          .addLabel('Header-Start', '-=0.175') // Right-After: white scales/covers
          // .set(Expand_Cont, {y: 5,}, 'Content-Start+=0.0')

          .set(targetExpand.find('expand_content_wrap'), {
            autoAlpha: 0,
          }, 'Header-Start+=0.0')
          .fromTo(inner_expand, 0.01, {
            boxShadow: 'inset 0px 0px 0px 0px rgba(255,255,255, 0.0)',
          }, {
            boxShadow: 'inset 0px 0px 0px 0.4444em rgba(255,255,255, 0.5)',
            /*ease:Back.easeOut.config(4)*/
          }, 'Header-Start-=0.5')
          .to(pages_container, 1.2, {
            boxShadow: '1px 50px 75px -30px rgba(0,0,0, 0.1), 2px 6px 18px -4px rgba(0,0,0, 0.0471), 0px 0px 0px 0px rgba(0,0,0, 0.08), -0px 175px 110px -160px rgba(10,20,50, 0.12), -2px -10px 6px -6px rgba(255,255,255, 1.0)',
            ease: Power2.easeInOut,
          }, 'Header-Start-=0.2')
          /* // .set(targetExpand, {autoAlpha: 1, top:'50vh', marginTop:'-180px', transformOrigin:'50% 0%', force3D:true}, 'Content-Start+=0.0')
           // .fromTo(targetExpand, 1, {opacity: 0.0, scale:1.0,}, {opacity: 1, scale:1.0 , ease:Power4.easeOut}, 'Content-Start+=0.0')
           //.staggerFromTo(targetExpand.find('.xpnd-header').find("h1 > span:nth-child(even)"), 0.8, {scaleY: 0, autoAlpha:0, top: '-0.334em', force3D:true},
           //                                                          {scaleY: 1, autoAlpha:1, top: 0, ease:Expo.easeOut, force3D:true},-0.06, "Content-Start+=0.0")
           //.staggerFromTo(targetExpand.find('.xpnd-header').find("h1 > span:nth-child(odd)"), 0.8, {scaleY: 0, autoAlpha:0, top: '0.334em', force3D:true},
           //                                                          {scaleY: 1, autoAlpha:1, top: 0, ease:Expo.easeOut, force3D:true},-0.06, "Content-Start+=0.06") */
          // .fromTo(pages_container, 1.6, {scale:1, force3D:true}, {scale:0.9, ease:Power2.easeInOut},"Header-Start-=0.8")
          // .fromTo(targetExpand.find('.xpnd-header'), 3.0, { scale:0.9, force3D:true}, {scale:1.0, ease:Power3.easeOut},"Header-Start-=0.06") // H-Grow
          .staggerFromTo(targetExpand.find('.xpnd-header').find('h1 > span'), 1.15, {
            scaleY: 0.0,
            autoAlpha: 0.0,
            yPercent: 60,
            transformOrigin: '50% 100%',
            force3D: true,
          }, {
            scaleY: 1,
            autoAlpha: 1,
            yPercent: 0,
            ease: Expo.easeInOut,
          }, 0.045, 'Header-Start-=0.6')
          // .fromTo(targetExpand.find('.xpnd-header').find("h1"), 1.6, {letterSpacing:'0.4em'}, {letterSpacing:'0.25em', ease:Power1.easeInOut}, "Header-Start-=0.5")
          .fromTo(targetExpand.find('.xpnd-header').find('h2'), 1.2, {
            autoAlpha: 0,
            top: '0',
            letterSpacing: '0.75em',
            force3D: true,
          }, {
            autoAlpha: 1,
            top: '0',
            letterSpacing: '0.25em',
            ease: Power4.easeOut,
          }, 'Header-Start+=0.15')
          .fromTo(targetExpand.find('.xpnd-header').find('h3, h3:after'), 1.2, {
            autoAlpha: 0,
            top: '-2em',
            force3D: true,
          }, {
            autoAlpha: 1,
            top: '0em',
            ease: Power4.easeOut,
          }, 'Header-Start+=0.3')
          .fromTo(targetExpand.find('.xpnd-header').find('h4'), 1.2, {
            autoAlpha: 0,
            top: '2em',
            force3D: true,
          }, {
            autoAlpha: 1,
            top: '0em',
            ease: Power4.easeOut,
          }, 'Header-Start+=0.45')
          /* .staggerFromTo(targetExpand.find('.xpnd-header').find("h1 > span"), 1.0, {force3D:true, textShadow:'0px 0px 0px 0px rgba(0,0,0, 0.1), 0px 0px 0px 0px rgba(0,0,0, 0.1), 0px 0px 0px 0px rgba(0,0,0, 0.1)'},
           {ease:Power2.easeInOut, textShadow:'0px 1px 2px  rgba(0,0,0,0.125), 1px 3px 4px rgba(0,0,0,0.125), 1px 7px 9px rgba(0,0,0,0.125)'},  -0.025, "Content-Start+=0.15") */ // Text-shadow H1 Stagger

          /*
           //.to(outer_expand, 0.8, {scale: '1', ease:Quint.easeInOut, force3D:true}, 'After-Title+=0.0')
           //.to(inner_expand, 0.8, {scale: '2', ease:Quint.easeInOut, force3D:true}, 'After-Title+=0.0')
           //.to(targetExpand, 1.1, {top: '0', marginTop:'0px', background:'rgb(250,251,252)',  ease:Expo.easeInOut, force3D:true}, 'After-Title+=0.0')
           */
          .addLabel('After-Header', '-=1.2')

          // scroll-expand down TL-Test
          .set('body', {
            overflowY: 'hidden',
          }, 'After-Header') // /////////// BODY SCROLL LOCK ////////////

          .to(targetExpand.find('.xpnd-header').find('.Video-PlayButton').find('svg .Circle-Outline'), 1.2, {
            opacity: 0.1,
            strokeDasharray: '264% 264%',
            strokeDashoffset: '528%',
            ease: Power4.easeInOut,
          }, 'After-Header-=0.3')

          .fromTo(targetExpand.find('.xpnd-header').find('.Video-PlayButton').find('i'), 0.5, {
            scale: 0,
            ease: Power4.easeInOut,
          }, {
            scale: 1,
            ease: Back.easeInOut,
          }, 'After-Header+=0.15')
          .fromTo(targetExpand.find('.xpnd-header').find('.Video-PlayButton').find('i'), 1, {
            opacity: 0.25,
            ease: Power4.easeInOut,
          }, {
            opacity: 1,
            ease: Power1.easeOut,
          }, 'After-Header+=0.15')
          .fromTo(targetExpand.find('.xpnd-header').find('.svg-down-arrow'), 0.5, {
            autoAlpha: 0,
            y: 250,
          }, {
            autoAlpha: 1,
            y: 0,
            ease: Power0.easeInOut,
          }, 'After-Header+=0')

          /*
           .set(targetExpand.find('.xpnd-header').find('#Mixin-PlayButton').find('#Circle-gsap'), {opacity: 0})
           .fromTo(targetExpand.find('.xpnd-header').find('#Mixin-PlayButton').find('#Circle-gsap'), 1.2, { opacity: 0.15}, {opacity: 0, ease:Power2.easeOut}, "After-Zoom+=0.13")
           .fromTo(targetExpand.find('.xpnd-header').find('#Mixin-PlayButton').find('#Circle-gsap'), 0.8, {attr:{r:0} }, {attr:{r:'42%'}, ease:Expo.easeOut}, "After-Zoom+=0.2")
           */
          .set(pNav, {
            autoAlpha: 1,
          }, 'After-Header')
          .staggerFromTo(pNav_item, 0.3, {
            top: '-50%',
            opacity: '0',
          }, {
            top: '0%',
            opacity: '1',
            ease: Power4.easeOut,
          }, 0.05, 'After-Header+=0.6')
          .fromTo(pNav_button, 0.4, {
            scale: 0,
            autoAlpha: 1,
          }, {
            scale: 1,
            ease: Power4.easeOut,
            force3D: true,
          }, 'After-Header+=0.9')

          .addLabel('Content-Body', '-=0.0')

          /* content-body label section useless w/ Expand_Down.tl ((( MOVE TO Expand_Down.tl ??? )))
           .staggerFromTo(targetExpand.find('.content-section'), 0.6, {y:'100px', autoAlpha: 0,}, {y:0, autoAlpha: 1, ease:Power2.easeOut, force3D:true}, 0.9, 'Content-Body+=0.0')
           .fromTo(targetExpand.find('.expand-brief-wrap'), 0.6, {y:'100px', autoAlpha: 0,}, {y:0, autoAlpha: 1, ease:Power2.easeOut, force3D:true}, 'Content-Body+=0.0')
           */

          /*
           //.staggerFromTo($('.xpnd-header').find("h1 > span:nth-child(-n+7)"), 0.9, {autoAlpha:0, top: '2em', force3D:true},
           // {autoAlpha:1, top: 0, ease:Quint.easeOut, force3D:true},-0.06, "Content-Start+=0.0")
           //.staggerFromTo($('.xpnd-header').find("h1 > span:nth-child(n+7)"), 0.9, {autoAlpha:0, top: '2em', force3D:true},
           //  {autoAlpha:1, top: 0, ease:Quint.easeOut, force3D:true},0.06, "Content-Start+=0.0")
           // .from('#Expand-Container', 1.5, {height:0, left: 500, ease:Expo.easeInOut, force3D: true})
           // .fromTo(targetExpand.find('.project-expand-wrap'), 1.5, {height: '0px', ease:Expo.easeInOut}, {height: '100px', ease:Expo.easeInOut},'label-0X')
           //.to(this_desc, 2.5, {scale:0.5, transformOrigin:'100% 40%', autoAlpha: 0.5, ease:Quint.easeInOut}, 'label-0X+=0.3')
           */
          .set(targetExpand.find('expand_content_wrap'), {
            autoAlpha: 1,
          }, 'Content-Body')
          .set(['#P1-Right', '#P1-Left'], {
            autoAlpha: 0,
          }, 'Content-Body')
          .set(inner_expand, {
            autoAlpha: 1,
            scaleY: 1,
            transformOrigin: '0% 100%',
          }, 'Content-Body');

        Expand_tl.play().timeScale(1);
        //  desc_tl.reverse('-=0.3').timeScale(0.5);
        Expand_Cont.addClass('active');
        targetExpand.addClass('active').siblings().removeClass('active');

        // scrollClosure(targetExpand);

        // /temp exit proj-xpnd ****** T E M P  ((()))   *******   ((())) * *
        $('#X-it').on('click', function() {
          //    Expand_tl.reverse().eventCallback("onReverseComplete", function(){
          //     TweenLite.set(this.target,{clearProps:'all'});
          //  });
          Expand_Down_tl.reverse();
          Expand_tl.reverse().timeScale(1);
          //  desc_tl.play(0).timeScale(2);
          Expand_Cont.removeClass('active');
          targetExpand.removeClass('active');
        });

        // // Expand Continue Downwards ARROW ////
        $('.svg-down-arrow').on('click', function() {
          Expand_Down_tl = new TimelineLite({
            paused: true,
            onComplete: defineScrollVars,
            onReverseCompleteParams: [pages_container],
            onReverseComplete: endFix_Expand,
          });
          Expand_Down_tl

            .set('body', {
              overflowY: 'scroll',
            }, 'label--0') // //// BODY SCROLL UN-LOCK ///////
            .set(pages_container, {
              autoAlpha: 1,
              z: 0,
              y: 0,
              rotationX: 0,
              scale: 1,
              transformOrigin: '50% 50%',
              transformPerspective: '2000px',
            }, 'label--0')
            /* // .set(targetExpand.find('.expand-brief-wrap'),   { marginTop:'calc(50vh - 6em)',  ease:Power4.easeInOut}, 'label--0')
             //.set(targetProject, { scale:1, transformOrigin:'50% 33%'})
             // .set(outer_expand, {autoAlpha: 1.0, scale:0, transformOrigin:'50% 50%', immediateRender: false,})

             // .to(outer_expand, 0.8, {scale: '1', ease:Quint.easeInOut, force3D:true}, 'label--1')
             //  .to(inner_expand, 0.8, {scale: '2', ease:Quint.easeInOut, force3D:true}, 'label--1')
             */

            .to(pages_container, 1.5, {
              rotation: '20',
              scaleX: 0.425,
              scaleY: 0.4,
              ease: Expo.easeInOut,
              force3D: true,
            }, 'label--1')
            .fromTo(pages_container, 1.45, {
              skewY: '0',
              skewX: '0',
              force3D: true,
            }, {
              skewY: '-15',
              skewX: '17',
              ease: Expo.easeInOut,
              force3D: true,
            }, 'label--1+=0.05')
            .fromTo([pages_container, targetExpand.find('.xpnd-header').find('.Video-PlayButton, .svg-down-arrow')], 1.05, {
              autoAlpha: 1,
            }, {
              autoAlpha: 0,
              ease: Power1.easeInOut,
              force3D: true,
            }, 'label--1+=0.35')

            .addLabel('label--2', '-=0.9')
            .to(targetExpand, 0.75, {
              top: '1.3333em',
              marginTop: 0,
              paddingBottom: 0,
              ease: Power2.easeInOut,
              force3D: true,
            }, 'label--2+=0.0')
            .fromTo(targetExpand.find('.expand-brief-wrap'), 0.75, {
              marginTop: '0em',
              autoAlpha: 0.0,
            }, {
              marginTop: '-2em',
              autoAlpha: 1,
              ease: Power2.easeInOut,
            }, 'label--2+=0.0')
            .fromTo(targetExpand.find('.section_1'), 0.75, {
              y: 60,
              autoAlpha: 0,
            }, {
              y: 0,
              autoAlpha: 1,
              ease: Power2.easeInOut,
            }, 'label--2+=0.3')
            // .fromTo(targetExpand.find('.xpnd-header'), 0.9, { }, { ease:Power4.easeInOut}, 'label--2+=0.0')

            .set(pages_container, {
              autoAlpha: 0,
            }, 'label--3');

          //    Expand_tl.reverse().eventCallback("onReverseComplete", function(){
          //     TweenLite.set(this.target,{clearProps:'all'});
          //  });
          Expand_Down_tl.play(0).timeScale(1);
        }); // Expand_Down_tl Svg-arrow Click -END
      }); // Expand-a onClick -END
    }); // Expand Project (each.activeDesc) -END
    function endFix_Expand(y) {
      TweenMax.set(y, {
        clearProps: "all",
      });
      /*  y.each(function (index, param) {
       $('html').append("<p style='pointer-events: none; position: relative; top: -500px; font-size: 24%; font-family: monospace;'>"
       + "no. " + index  + " " + $(this).prop("tagName") + " " + $(this).prop("className") + " Props Cleared</p>"); //Logs Tag name of cleared tweens selector (aka param:)
       //  $("#consoleMSG").html(+ "no. " + index  + " " + $(this).prop("tagName") + " " + $(this).prop("className") + " Props Cleared");
       //  console.log(y);
       }); */
    };

    function defineScrollVars() {
      img1050_Height = $('.img_1050').height();
      scrollTop_Var = targetExpand.find('.section_1').offset().top;
      return;
    };

    $(function() {
 // /// Project-NAV-igation  ScrollTop Animation /////

      //  var $scrollPercentText = $("#scroll-percent");
      let $window = $(window);
      let documentHeight = 320;
      let windowHeight = $(window).height();
      //  var headerHeight = ($('.xpnd-header').height() / 2 );
      let scrollTop = $(window).scrollTop();

      // add into TimelineMax
      let p_Nav_tl = new TimelineLite({
        paused: true,
        immediateRender: false,
      });

      let scrollEase = Power4.easeIn;

      p_Nav_tl
      // .addLabel('50-prog', '')
        .set('#pN-Icon-1', {
          transformOrigin: '34% 100%',
        })
        .set('#pN-Icon-3', {
          transformOrigin: '34% 0%',
        })
        .set('#pN-Icon-2', {
          transformOrigin: '0% 50%',
        })
        .set('.project-Nav', {
          perspective: '1000px',
        })

        .addLabel('label--2', '+=0')

        //  .to( '.project-Nav', 0.5,  {height:0, ease:Power0.easeIn}, 'label--1' )
        //  .to( $('.xpnd-header'), 1,  {filter:'url(SVGblur---Use ATTR Plugin)', ease:Power0.easeIn}, 'label--1' )
        .staggerFromTo(pNav_item, 1, {
          opacity: '-=0',
          x: 0,
        }, {
          opacity: '0.33',
          x: '300',
          force3D: true,
          ease: scrollEase,
        }, 0.03, 'label--1')
        .fromTo(pNav_item, 1, {
          rotationY: 0,
          transformOrigin: '100% 0%',
          z: 0,
        }, {
          rotationY: 40,
          force3D: true,
          ease: scrollEase,
        }, 'label--1')
        //  .add( TweenMax.to(targetExpand.find('.xpnd-header h1'), 1,  {webkitFilter: "blur(" + 10 + "px)", filter: "blur(" + 10 + "px)", ease:scrollEase}, 'label--1'))

        // //// BLUR HEADER vvv //////
        // .to(blurElement, 2, {a:4, onUpdate:applyBlur, ease:Power1.easeIn}, 'label--1' )

        // .to(pages_container, 2, {/* width: '100vw', top:'0',*/ boxShadow: '0px 0px 0px 0px rgba(0,0,0, 0.1), 0px 0px 0px 0px rgba(0,0,0, 0.0471), 0px 0px 0px 0px rgba(0,0,0, 0.08), 0px 0px 0px 0px rgba(10,20,50, 0.12), 0px 0px 0px 0px rgba(255,255,255, 1.0)',  ease:Power1.easeOut}, 'label--1')

        .to('#pN-Icon-1', 1, {
          rotation: '+=90',
          left: '+=0px',
          scaleX: 0.5,
          ease: scrollEase,
        }, 'label--2')
        .to('#pN-Icon-3', 1, {
          rotation: '+=-90',
          left: '+=0px',
          scaleX: 0.5,
          ease: scrollEase,
        }, 'label--2')
        .to('#pN-Icon-2', 1, {
          left: '+=3px',
          scaleX: 1.0,
          ease: scrollEase,
        }, 'label--2')

        //  .fromTo( '.xpnd-header h1', 0.75, {color:'rgba(35,35,35, 0.85)',   }, { textShadow: '0px 0px 4px rgba(0,0,0,0.25), 0px 0px 12px rgba(0,0,0,0.35), 0px 0px 16px rgba(0,0,0,0.25)', color:'rgba(35,35,35, 0.0)', ease:scrollEase}, 'label--1' )
        //   .fromTo( pNav_button, 0.5, {rotation:'+=0',   }, {rotation:'+=180', ease:Circ.easeIn}, 'label--1' )

        .addLabel('end');

      $window.on('resize', function() {
        windowHeight = $(window).height();
        1;
      }).resize();

      $(window).on('scroll', function() {
        scrollTop = $(window).scrollTop();
        let headerHeight = ($('.xpnd-header').height() / 1);

        if (scrollTop >= headerHeight && scrollTop <= (headerHeight + 10)) {
          pNav_button.removeClass('opened');
          // scrollPercent = 1.0;
        } else if (scrollTop <= (headerHeight * 1.5)) {
          // pNav_button.toggleClass('opened');
          let scrollPercent = (scrollTop / headerHeight);
          p_Nav_tl.progress(scrollPercent).pause();

          // //// ! ! ! ! EXPAND-DOWN-TL Scroll Animation TEST
          //    Expand_Down_tl.progress(scrollPercent).pause();
        }
        ;
      }); // Project-NAV-igation scroll -END

      pNav_button.on('click', function() {
        if ($(this).hasClass('opened')) {
          p_Nav_tl.progress(0.01).play().timeScale(2);
        } else {
          p_Nav_tl.progress(1).reverse('-=0.0').timeScale(2);
        }
        $(this).toggleClass('opened');
      });
    }); // P-NAV function END

    // Expand H1 Blur from P-Nav's TL
    let blurElement = {
      a: 0,
    }; // start the blur at 0 pixels
    function applyBlur() {
      // TweenMax.set([targetExpand.find('.xpnd-header').find('h2, h3, h4')], {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)", force3D:true} );
      // TweenMax.set(['#Mixin-PlayButton'], {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)"});
      // TweenMax.set([pages_container, targetExpand.find('.xpnd-header .center-button')], {webkitFilter:"blur(" + blurElement.a * 2 + "px)",filter:"blur(" + blurElement.a * 2 + "px)"});
    };

    $(function() {
 // /// Paralax-Delayed-Motion [Expand Header] /////

      //  var $scrollPercentText = $("#scroll-percent");
      let $window = $(window);
      let headerHeight = ($('.xpnd-header').height());
      let windowHeight = $(window).height();
      //  var img1050_Height;
      //   var scrollTop_Var;
      let scrollTop = $(window).scrollTop();

      // // EXPAND Header SCROLL Anim.
      $window.on('resize', function() {
        scrollTop_Var = $('.expand-content-wrap').offset().top;
        scrollTop = $(window).scrollTop() - scrollTop_Var;
        windowHeight = $(window).height();
      }).resize();

      $(window).on('scroll', function() {
        scrollTop = ($(window).scrollTop() / 2); // 1/2 factor

        if (scrollTop >= headerHeight && scrollTop <= (headerHeight + 10)) {
          defineScrollVars.call();
        } else if (targetExpand.hasClass('active') && scrollTop <= (headerHeight / 2)) {
 // Divide header height for the portion that the scroll animation is active during

          let scrollPercent = (scrollTop / headerHeight),
            scroll_InversePercent = ((((scrollTop + 1) / headerHeight) * -1) + 1), // 3.  Slow
            scroll_InversePercent_f = ((((scrollTop + 1) / (headerHeight / 1.5)) * -1) + 1), // 3.  Faat
            scroll_InversePercent_delay20 = (((((scrollTop - 20) + 1) / (headerHeight / 1.5)) * -1) + 1), // 3.  Faat
            scrollValue_4 = (scrollTop / 5), // 4.  Wild Card
            scrollValue_3 = (scrollTop / 6), // 3.  Far / Slow
            scrollValue_2 = (scrollTop / 2.25), // 2.  Mid
            scrollValue_1 = (scrollTop / 2.5), // 1.  Near / Fast

            scrollValue_blurString = 'blur(' + (scrollTop / 50) + 'px)'; // 1.  Near / Fast

          TweenMax.to(targetExpand.find('.xpnd-header h1'), 1, {
            y: (-1 * scrollValue_1),
            /* scale:(scroll_InversePercent * 0.15 + 0.85), opacity:(scroll_InversePercent_f * 0.25 + 0.75),*/
            ease: Power1.easeOut,
          });
          TweenMax.to(targetExpand.find('.xpnd-header h2'), 1, {
            y: (-1 * scrollValue_2),
            scale: (scroll_InversePercent * 0.5 + 0.5),
            opacity: (scroll_InversePercent_f * 1),
            ease: Power1.easeOut,
          });
          TweenMax.to(targetExpand.find('.xpnd-header h3'), 1, {
            y: (-1 * scrollValue_3),
            scale: (scroll_InversePercent * 0.4 + 0.6),
            opacity: (scroll_InversePercent_f * 1),
            ease: Power1.easeOut,
          });
          TweenMax.to(targetExpand.find('.xpnd-header h4'), 1, {
            y: (-1 * scrollValue_4),
            scale: (scroll_InversePercent * 0.25 + 0.75),
            opacity: (scroll_InversePercent_f * 1),
            ease: Power1.easeOut,
          });
          /*   if( scrollTop >= 20) {
           TweenMax.to([pages_container, targetExpand.find('.xpnd-header .center-button')], 1, {y:((-1 * (scrollValue_1 - 20)) / 2), scale:(scroll_InversePercent_delay20 * 0.25 + 0.75), opacity:(scroll_InversePercent_delay20 * 2 - 1.0), ease:Power1.easeOut, force3D:false});
           } */

          //         TweenMax.to( ['.expand-content-wrap', '.expand-brief-wrap'] , 1, {y:(-6 * scrollValue_1), ease:Power1.easeOut, force3D:true});
          //  TweenMax.to( targetExpand.find('.xpnd-header'), 1, {paddingBottom:(scroll_InversePercent * 8 - 5.5 + "em"), ease:Power1.easeOut});
          // defineScrollVars.call();
          //  TweenMax.to( targetExpand.find('.xpnd-header h1'), 1,  {webkitFilter: scrollValue_blurString, filter: scrollValue_blurString, ease:Power1.easeOut, force3D:true});
        }
        ;
      });

      // // Expand FLEX-section Img Scroll
      $(window).on('scroll', function(a) {
        scrollTop = $(window).scrollTop();

        if (targetExpand.hasClass('active') && targetExpand.find('.section_1').find('.slide_flex.active').length > 0 && windowHeight + scrollTop >= scrollTop_Var + (img1050_Height / 2) && scrollTop <= scrollTop_Var + (img1050_Height * 0.9)) {
          // Orig. equation starts when top of page is 50px above sec1//  if(scrollTop >= -50 && scrollTop <= (img1050_Height + 0)) {
          // scrollPercent = (scrollTop / img1050_Height ),
          // scroll_InversePercent = ((((scrollTop + 1) / headerHeight ) * -1) + 1),    // 3.  Far / Slow
          scrollValue_img_l0 = ((((scrollTop - scrollTop_Var) / 9) * -1) + 5); // 1.  Near / Fast
          scrollValue_img_l1 = (((scrollTop - scrollTop_Var) / 6) * -1);
          scrollOpacity_img_l0 = (((scrollTop - scrollTop_Var) / -600) + 1);

          let flexS01_scroll_layer0 = targetExpand.find('.section_1').find(picker_li_TargetSlide).find('img.layer0'),
            flexS01_scroll_layer1 = targetExpand.find('.section_1').find(picker_li_TargetSlide).find('img.layer1');

          TweenMax.to(flexS01_scroll_layer0, 1.5, {
            y: scrollValue_img_l0, // //--> SCALE-SHADOW —Test  scaleY:((scrollOpacity_img_l0 * -0.1) + 1.05), <--\\\\
            filter: ['blur(' + (scrollValue_img_l1 * -0.2) + 'px)'],
            webkitFilter: ['blur(' + (scrollValue_img_l1 * -0.2) + 'px)'],
            opacity: scrollOpacity_img_l0,
            ease: Power2.easeOut,
            force3D: true,
          });
          TweenMax.to(flexS01_scroll_layer1, 1.5, {
            y: scrollValue_img_l1,
            opacity: 1,
            ease: Power3.easeOut,
            force3D: true,
          });
          // TweenMax.to(targetExpand.find('.section_1').find('.img-blend'), 0.8, {y:(20 * scrollValue_img),  ease:Power1.easeOut});
        }
        ;

        // Initiate Slide_01 cond. //
        if (targetExpand.hasClass('active') && targetExpand.find('.section_1').find('.slide_flex').hasClass('active') && targetExpand.find('.section_1').find('.slide_flex.active').length === 1) {
          return null;
        } else if (targetExpand.find('.section_1').find('.slide_flex.active').length === 0 && windowHeight + scrollTop >= scrollTop_Var + (img1050_Height / 1)) {
          //  targetExpand.find('.section_1').find('.slide_01').addClass('active');

          //  targetExpand.find('.section_1').find('.s1-li_3').addClass('active');
          targetExpand.find('.section_1').find('.s1-li_2').click();

          // targetExpand.find('.section_1').find('.slide_01').find('h2.active').css({'color' : thisPicker_li.attr("data-slide-color")});

          //   scrollValue_init = ((((scrollTop - scrollTop_Var) / 4 ) + 150) * -1) ;
        }
        ;
      });
    }); // Paralax-Delay TEST ScrollTop END
    //  TweenMax.set('.img_1050', {y: (560 / 2 ), opacity:0, ease:Power1.easeOut}); //Set Img when first scrolled to

    // ///// EXPAND  –  h1 RegEx (SplitText)  //////
    $('.project-expand-wrap').each(function() {
      let thisHeader = $(this).find('.xpnd-header');
      thisHeader.find('h1').html(thisHeader.find('h1').html().replace(/./g, '<span>$&</span>').replace(/\s/g, '&nbsp;'));
    });

    //* ***** Flex-IMG-Slider Toggle Anim -active ********//

    let flex_section = $('.flex-section'),
      flex_picker = $('.flex-picker'),
      flex_img = $('.flex_img'),
      flex_txt = $('.flex_txt'),
      flex_picker_li = $('.flex-picker li');

    /*   $(".slide-desc").each(function(){
     var thisHeader = $(this);
     thisHeader.find("h1").html( thisHeader.find("h1").html().replace(/\w+/g, "<span>$&</span>"));
     }); */

    flex_picker_li.on('click', function() {
      thisPicker_li = $(this);
      pickerParent = $(this).parents(':eq(2)');
      picker_li_TargetSlide = $($(this).attr('data-target-slide'));
      let picker_li_Prev = picker_li_TargetSlide.prev('.slide_flex');

      let flexSlider_tl = new TimelineLite({
        paused: true,
        immediateRender: false,
        /* onCompleteParams:[pickerParent.find(picker_li_TargetSlide).find("h1, h2, p")], onComplete: endFix,*/
      });

      flexSlider_tl

      //   .set(pickerParent.find(picker_li_TargetSlide).find("*"), { transformPerspective:'300', transformOrigin: '50% 50%', force3D:true, transformStyle: "preserve-3d"} )
        .set(pickerParent.find(picker_li_TargetSlide).find('img.layer0'), {
          y: [scrollValue_img_l0 + 20],
          scaleY: 1.1,
          scaleX: 1.15,
          transformOrigin: '50% 75%',
          opacity: 0,
          filter: ['blur(' + (scrollValue_img_l1 * -0.2) + 'px)'],
          webkitFilter: ['blur(' + (scrollValue_img_l1 * -0.2) + 'px)'],
        }, 'label--0')
        .set(pickerParent.find(picker_li_TargetSlide).find('img.layer1'), {
          y: [scrollValue_img_l1 - 30],
          opacity: 0,
        }, 'label--0')
        .set(pickerParent.find(picker_li_TargetSlide).find('img.layer1.iPhone'), {
          rotation: -3,
          transformOrigin: '40% 80%',
        }, 'label--0')
        .set(pickerParent.find(picker_li_TargetSlide).find('img.layer0.iPhone'), {
          rotation: 6,
          transformOrigin: '50% 82%',
        }, 'label--0')

        .addLabel('IMG', '+=0.15')
        .addLabel('label--1', '+=0.3')

        .staggerFromTo(pickerParent.find(picker_li_TargetSlide).find('h1 span'), 0.75, {
          x: -25,
          opacity: 0,
        }, {
          x: 0,
          opacity: 1,
          force3D: false,
          ease: Power2.easeOut,
        }, -0.075, 'label--1+=0.0')
        .staggerFromTo(pickerParent.find(picker_li_TargetSlide).find('h2'), 0.6, {
          opacity: 0,
          x: -25,
        }, {
          opacity: 1,
          x: 0,
          ease: Power2.easeOut,
        }, -0.075, 'label--1+=0.15')
        .staggerFromTo(pickerParent.find(picker_li_TargetSlide).find('p'), 0.5, {
          y: 0,
          x: -25,
        }, {
          y: 0,
          x: 0,
          ease: Power2.easeOut,
        }, 0.1, 'label--1+=0.3')
        .staggerFromTo(pickerParent.find(picker_li_TargetSlide).find('p'), 0.4, {
          opacity: 0,
        }, {
          opacity: 1,
          ease: Power1.easeOut,
        }, 0.1, 'label--1+=0.3')
        .fromTo(pickerParent.find(picker_li_TargetSlide).find('h6'), 0.9, {
          opacity: 0,
          xPercent: -50,
        }, {
          opacity: 0.02,
          xPercent: 0,
          ease: Power2.easeOut,
        }, 'label--1+=0.45')

        .to(pickerParent.find(picker_li_TargetSlide).find('img.layer0'), 1.0, {
          y: [scrollValue_img_l0 + 0],
          scaleY: 1,
          scaleX: 1,
          ease: Expo.easeOut,
        }, 'IMG+=0.0')
        .to(pickerParent.find(picker_li_TargetSlide).find('img.layer0'), 1.5, {
          opacity: scrollOpacity_img_l0,
          ease: Power4.easeOut,
        }, 'IMG+=0.0')
        .to(pickerParent.find(picker_li_TargetSlide).find('img.layer1'), 0.9, {
          y: [scrollValue_img_l1 + 0],
          ease: Expo.easeOut,
        }, 'IMG+=0.0')
        .to(pickerParent.find(picker_li_TargetSlide).find('img.layer1'), 0.3, {
          opacity: 1,
          ease: Power4.easeOut,
        }, 'IMG+=0.0')
        .to(pickerParent.find(picker_li_TargetSlide).find('img.layer1.iPhone, img.layer0.iPhone'), 1.5, {
          rotation: 0,
          ease: Expo.easeOut,
        }, 'IMG+=0.0')
        .addLabel('END', '+=0');

      // DUPLICATE TIMELINE with different IMG-'.SET' for Instantiation
      let flexSlider_Init_tl = new TimelineLite({
        paused: true,
        immediateRender: true,
      });
      flexSlider_Init_tl
      // .set(pickerParent.find(picker_li_TargetSlide).find("*"), { transformPerspective:'300', transformOrigin: '50% 50%', force3D:true, transformStyle: "preserve-3d"} )
        .set(pickerParent.find(picker_li_TargetSlide).find('img.layer0'), {
          scaleY: 0.9,
          scaleX: 0.75,
          transformOrigin: '70% 80%',
          opacity: 0,
        }, 'label--0')
        .set(pickerParent.find(picker_li_TargetSlide).find('img.layer1'), {
          top: -40,
          opacity: 0,
        }, 'label--0')
        // No iPhone rotate
        .addLabel('IMG', '+=0.15')
        .addLabel('label--1', '+=0.45')

        .staggerFromTo(pickerParent.find(picker_li_TargetSlide).find('h1 span'), 0.75, {
          x: -25,
          opacity: 0,
        }, {
          x: 0,
          opacity: 1,
          force3D: false,
          ease: Power2.easeOut,
        }, -0.075, 'label--1+=0.0')
        .staggerFromTo(pickerParent.find(picker_li_TargetSlide).find('h2'), 0.6, {
          opacity: 0,
          x: -25,
        }, {
          opacity: 1,
          x: 0,
          ease: Power2.easeOut,
        }, -0.075, 'label--1+=0.15')
        .staggerFromTo(pickerParent.find(picker_li_TargetSlide).find('p'), 0.5, {
          y: 0,
          x: -25,
        }, {
          y: 0,
          x: 0,
          ease: Power2.easeOut,
        }, 0.1, 'label--1+=0.3')
        .staggerFromTo(pickerParent.find(picker_li_TargetSlide).find('p'), 0.4, {
          opacity: 0,
        }, {
          opacity: 1,
          ease: Power1.easeOut,
        }, 0.1, 'label--1+=0.3')
        .fromTo(pickerParent.find(picker_li_TargetSlide).find('h6'), 0.9, {
          opacity: 0,
          xPercent: -50,
        }, {
          opacity: 0.02,
          xPercent: 0,
          ease: Power2.easeOut,
        }, 'label--1+=0.45')

        .to(pickerParent.find(picker_li_TargetSlide).find('img.layer0'), 0.9, {
          scaleY: 1,
          scaleX: 1,
          ease: Power2.easeOut,
        }, 'IMG+=0.15')
        .to(pickerParent.find(picker_li_TargetSlide).find('img.layer0'), 0.6, {
          opacity: 1,
          ease: Power1.easeOut,
        }, 'IMG+=0.15')
        .to(pickerParent.find(picker_li_TargetSlide).find('img.layer1'), 1.05, {
          top: 0,
          ease: Power2.easeOut,
        }, 'IMG+=0.0')
        .to(pickerParent.find(picker_li_TargetSlide).find('img.layer1'), 0.3, {
          opacity: 1,
          ease: Power1.easeOut,
        }, 'IMG+=0.0')
        .addLabel('END', '+=0');

      if ($(this).hasClass('active')) { // more specific?-> "if (pickerParent.find(picker_li_TargetSlide).hasClass('active')) {"
        // flexSlider_tl.progress(1);
        // flexSlider_tl.restart();
        flexSlider_tl.pause('END');
        // return null;
      } else if ($(this).hasClass('initial')) { //
        $(this).removeClass('initial');
        flexSlider_Init_tl.play().timeScale(1);
      } else {
        flexSlider_tl.play();
      }
      ;

      $(this).addClass('active').siblings('li').removeClass('active');
      pickerParent.find(picker_li_TargetSlide).addClass('active').siblings().removeClass('active');
      pickerParent.find(picker_li_TargetSlide).find('h2.active').css({
        'color': thisPicker_li.attr('data-slide-color'),
      });

      function endFix(z) {
        TweenLite.set(z, {
          clearProps: "x, y, top, opacity, lineHeight",
        });
      };
    }); // Flex-picker -END

    // // Ink-Ripple onCLick <a>
    let parent, ink, d, x, y,
      AnchorClick = $('.inkAnchor');

    AnchorClick.on('mousedown', function(e) {
      parent = $(this); // OR $(this).parent(); if I contain the a, but a is already display block, so place .ink inside of a's box

      // create .ink element if it doesn't exist
      if (parent.find('.ink').length == 0)
        parent.prepend('<span class=\'ink\'></span>');

      ink = parent.find('.ink');
      // incase of quick double clicks stop the previous animation
      ink.removeClass('animateInk');

      // set size of .ink
      if (!ink.height() && !ink.width()) {
        // use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
        // d = Math.max(parent.outerWidth(), parent.outerHeight());
        // ink.css({height: d, width: d});
        ink.css({
          'height': '12em',
          'width': '12em',
        });
      }

      // get click coordinates
      // logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
      x = e.pageX - parent.offset().left - ink.width() / 2;
      y = e.pageY - parent.offset().top - ink.height() / 2;

      // set the position and add class .animate
      ink.css({
        top: y + 'px',
        left: x + 'px',
      }).addClass('animateInk');
    });

    // // X-Overflow debug
    /*
     var docWidth = document.documentElement.offsetWidth;

     [].forEach.call(
     document.querySelectorAll('*'),
     function(el) {
     if (el.offsetWidth > docWidth) {
     console.log(el);
     }
     }
     );
     */

})();
