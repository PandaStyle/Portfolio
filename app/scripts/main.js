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
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js').then(function(registration) {
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
                throw new Error('The installing ' + 'service worker became redundant.');
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
  let pages_container = $('.pages-container'),
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
    active_desc = $('.project-desc-body'),
    ctaViewProjects = $('.ctas a');
  //GLOBAL TARGET VARIABLES
  let targetProject,
    //GLOBAL Timeline instances
    desc_tl,
    Expand_Down_tl;
  let menu_tl = new TimelineLite({
    paused: true,
    force3D: true,
    immediateRender: true,
  }).set(ProjectUL, {
    autoAlpha: 0,
  }, 'label--0').set(Project_Desc_Wrap, {
    autoAlpha: 1,
    transformOrigin: "0 100",
  }, 'label--0').set(active_desc.find('.h4-HR'), {
    scaleX: 1,
    transformOrigin: '0 0',
  }, 'label--0').set(active_desc.find('a'), {
    autoAlpha: 0,
  }, 'label--0').set(XitPlus, {
    color: 'rgb(61,61,70)',
  }, 'label--0').to(ProjectMenu, 0.4, {
    width: '83.333%',
    bottom: 0,
    backgroundColor: 'rgb(255,255,255)',
    ease: Quad.easeInOut,
    force3D: true,
  }, 'label--2').to(ProjectMenu, 0.8, {
    left: '16.666%',
    height: '100%',
    ease: Quint.easeInOut,
    force3D: true,
  }, 'label--2+=0.0').addLabel('tri-inMark', '-=0.5').addLabel('li-inMark', '-=0.35').to(XitTri, 0.9, {
    top: '-9%',
    right: '-11.25%',
    rotation: '-45',
    transformOrigin: '50,50',
    backgroundColor: 'rgba(33,33,38,1.0)',
    ease: Quint.easeInOut,
    force3D: false,
  }, 'tri-inMark-=0.5').to(XitPlus, 0.7, {
    color: 'rgba(255,255,255,0.85)',
    fontSize: '0.6em',
    top: '4%',
    right: '5.5%',
    rotation: '-135',
    ease: Quad.easeInOut,
    force3D: true,
  }, 'label--2').from(projectCenter, 1.35, {
    scaleY: 0,
    transformOrigin: '0% 100%',
    ease: Quint.easeInOut,
    force3D: true,
  }, 'label--2-=0.2').from(Project_Desc_Wrap, 1.35, {
    yPercent: 100,
    ease: Quint.easeInOut,
    force3D: true,
  }, 'label--2-=0.1').from(projectCategory, 0.4, {
    autoAlpha: 0,
    ease: Cubic.easeOut,
    force3D: true,
  }, 'label--2+=0.6').to(ProjectUL, 0, {
    autoAlpha: 1,
  }, 'li-inMark+=0.15').staggerFrom('.project-li.upper', 0.4, {
    autoAlpha: 0,
    y: '100%',
    scale: 1,
    transformOrigin: '36.67% 100%',
    ease: Back.easeOut,
    force3D: true,
  }, -0.03, 'li-inMark+=0.15').staggerFrom('.project-li.lower', 0.4, {
    autoAlpha: 0,
    y: '100%',
    scale: 1,
    transformOrigin: '36.67% 0%',
    ease: Back.easeOut,
    force3D: true,
  }, -0.03, 'li-inMark').addLabel('label--3', '+=0.3').from(active_desc.find('h1'), 0.6, {
    autoAlpha: 0,
    y: '100%',
    ease: Expo.easeOut,
    force3D: true,
  }, 'label--3-=0.35').from(active_desc.find('h3'), 0.6, {
    y: '-225%',
    ease: Expo.easeOut,
    force3D: true,
  }, 'label--3-=0.55').from(active_desc.find('h4'), 0.3, {
    x: ' 510%',
    ease: Expo.easeOut,
    force3D: true,
  }, 'label--3-=0.3').from(active_desc.find('.h4-HR'), 0.5, {
    x: ' 75%',
    ease: Expo.easeInOut,
    force3D: true,
  }, 'label--3-=0.7').to(active_desc.find('.h4-HR'), 0.9, {
    scaleX: 0.25,
    ease: Expo.easeOut,
    force3D: true,
  }, 'label--3-=0.3').from(active_desc.find('a'), 0.4, {
    y: ' 200%',
    height: '12.5%',
    autoAlpha: 0,
    ease: Circ.easeOut,
    force3D: true,
  }, 'label--3+=0.05').from(active_desc.find('h2'), 0.4, {
    autoAlpha: 0,
    y: 20,
    ease: Circ.easeOut,
    force3D: false,
  }, 'label--3-=0.15').staggerFrom(active_desc.find('.pSpan_1 span'), 0.5, {
    top: '8em',
    ease: Quart.easeOut,
    force3D: true,
  }, 0.075, 'label--3-=0.3').staggerFrom(active_desc.find('.pSpan_1 span'), 0.45, {
    autoAlpha: 0,
    ease: Power2.easeInOut,
    force3D: true,
  }, 0.075, 'label--3-=0.3').to(active_desc.find('p'), 0.9, {
    autoAlpha: 1,
    ease: Circ.easeOut,
    force3D: true,
  }, 'label--3+=0.00') // opacity fade in for all p's, instead of staggering all. (project#1 staggers, others simply fade in.)
    .staggerFrom(active_desc.find('h5'), 0.5, {
      y: ' 200%',
      autoAlpha: 0,
      ease: Expo.easeOut,
      force3D: true,
    }, 0.1, 'label--3+=0.1').addLabel('snappy-reverse', '-=1.3');
  let openProjects = () => {
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
  }
  XitTri.click(openProjects)
  ctaViewProjects.click(openProjects)
  $('.social-flag').click(openProjects)
  var project_li = $('.project-li');
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
    desc_tl.set(targetProject.find('.h4-HR'), {
      autoAlpha: 0.2,
      scaleX: 1,
      transformOrigin: '0 0',
    }).set(targetProject.find('h1 span'), {
      transformPerspective: '300',
      transformOrigin: '50% 150%',
      force3D: true,
      transformStyle: "preserve-3d",
    }).addLabel('label-0X', '+=0.0').staggerFrom(targetProject.find('h1 span'), 0.4, {
      top: '-1em',
      force3D: true,
      transformStyle: 'preserve-3d',
      ease: Power1.easeOut,
      onCompleteParams: ['{self}'],
    }, 0.02, 'label--1+=0.0').staggerFrom(targetProject.find('h1 span'), 0.55, {
      rotationX: 90,
      ease: Power4.easeOut,
      force3D: true,
      transformStyle: "preserve-3d",
    }, 0.025, 'label--1+=0.1').from(targetProject.find('.desc-h1-cont'), 0.95, {
      y: '-100%',
      ease: Power3.easeOut,
    }, 'label--2-=0.85').from(targetProject.find('h4'), 0.4, {
      y: ' 100%',
      ease: Power3.easeOut,
      force3D: true,
    }, 'label--2-=0.55').from(targetProject.find('h3'), 0.4, {
      x: ' 206.7%',
      ease: Expo.easeInOut,
    }, 'label--2-=1').from(targetProject.find('.h4-HR'), 0.3, {
      autoAlpha: 0.6,
      x: ' 78%',
      ease: Expo.easeOut,
      force3D: true,
    }, 'label--2-=0.6').to(targetProject.find('.h4-HR'), 0.6, {
      scaleX: 0.25,
      ease: Expo.easeOut,
      force3D: true,
    }, 'label--2-=0.4').from(targetProject.find('h2'), 0.6, {
      width: '0%',
      left: '+=8.333%',
      ease: Expo.easeOut,
      force3D: false,
    }, 'label--2-=0.65').staggerFrom(targetProject.find('p > span'), 0.34, {
      top: '6em',
      ease: Sine.easeOut,
      force3D: true,
    }, 0.06, 'label--2-=0.8').staggerFrom(targetProject.find('p > span'), 0.34, {
      autoAlpha: 0,
      ease: Power2.easeInOut,
    }, 0.06, 'label--2-=0.8');
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
    }

    function endFix(x) {
      TweenMax.set(x, {
        clearProps: "all",
      });
    };
  }); // Li-desc mouseenter END
})();
