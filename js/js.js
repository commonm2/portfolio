/* 네비게이션 */
const $navBtn = document.querySelector(".navBtn");
const menu = document.querySelector("nav ul");
$navBtn.addEventListener("click", function () {
  this.classList.toggle("active");
  if (menu.classList.contains("slide-down")) {
    menu.classList.remove("slide-down");
  } else {
    menu.classList.add("slide-down");
  }
});

/* 풀페이지 스크롤 */
// fullpage
$("#fullpage").fullpage({
  anchors: ["sec1", "sec2", "sec3"],
  menu: "#menu",
  scrollingSpeed: 1000,
  // scrollBar: true,
  onLeave: function (origin, destination, direction) {
    // 빠른전환으로 이벤트중복시 fullpage와 swiper전환시점 분리막기
    $("#fullpage").on("scroll touchmove mousewheel", function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    });
    swiper.mousewheel.disable();
  },
  afterLoad: function (anchorLink, index) {
    // 전환이 끝난후 이벤트풀기
    $("#fullpage").off("scroll mousewheel");
    if (!$(".fp-completely .swiper-wrapper").length > 0)
      $("#fullpage").off("touchmove"); // 모바일분기
    if (swiper) swiper.mousewheel.enable();
    if (!$(".sec2").hasClass("active")) $.fn.fullpage.setAllowScrolling(true); // 슬라이드 섹션을 벗어나면 휠풀어주기
  },
});

// swiper
var length = $(".sec2 .swiper-slide").length;
var startY = 0;
var swiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  spaceBetween: 0,
  freeMode: false,
  speed: 1000,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  on: {
    slideChange: function () {
      var idx = this.activeIndex;
      // 처음과 마지막 슬라이드가 아닐경우 fullpage전환 막기
      if (this.activeIndex != 0 && idx != length)
        $.fn.fullpage.setAllowScrolling(false);
      if (length == 2 && idx == 0) $.fn.fullpage.setAllowScrolling(false); //슬라이드가 2개밖에 없을때
      // console.log('즉시 : ' + idx);
    },
    slideChangeTransitionEnd: function () {
      var idx = this.activeIndex;
      // 처음과 마지막 슬라이드일 경우 fullpage전환 풀기
      if (idx == 0 || idx >= length - 1) $.fn.fullpage.setAllowScrolling(true);
      // console.log('전환후 : ' + idx);
    },
    touchStart: function (e) {
      startY = e.touches.startY;
    },
    touchEnd: function (e) {
      if (startY - 10 > e.touches.currentY) {
        swiper.slideNext();
      } else if (startY + 10 < e.touches.currentY) {
        swiper.slidePrev();
      }
      console.log(startY, e.touches.currentY);
    },
    /*
      touchMove: function(e) {       
        var startY = e.touches.startY;
        setTimeout(function(){
          if(startY > e.touches.currentY) swiper.slideNext();  
          else swiper.slidePrev();
        },100);        
      },
      */
  },
});

$(document).on("keydown", function (e) {
  if (e.key === "ArrowRight") {
    swiper.slideNext(); // 오른쪽 화살표: 다음 슬라이드
  } else if (e.key === "ArrowLeft") {
    swiper.slidePrev(); // 왼쪽 화살표: 이전 슬라이드
  }
});

/* 메인화면 애니메이션 */
const targets = gsap.utils.toArray(".mainVisual h1");

targets.forEach((target) => {
  let SplitClient = new SplitType(target, { type: "lines, words, chars" });
  let lines = SplitClient.lines;
  let words = SplitClient.words;
  let chars = SplitClient.chars;

  gsap.from(chars, {
    yPercent: 100,
    autoAlpha: 0,
    duration: 2,
    ease: "circ.out",
    stagger: {
      amount: 1,
      from: "random",
    },
    scrollTrigger: {
      trigger: target,
      start: "top bottom",
      end: "+=400",
      markers: false,
    },
  });
});

/* 커서 이미지 */

document.addEventListener("mousemove", (e) => {
  let mouseX = e.pageX + 20; // document의 x좌표값
  let mouseY = e.pageY + 20; // document의 y좌표값

  let cursor = document.querySelector(".mainVisual .cursor");
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});
document.addEventListener("mousemove", (e) => {
  let mouseX = e.pageX + 20; // document의 x좌표값
  let mouseY = e.pageY + 20; // document의 y좌표값

  let cursor = document.querySelector(".projects .cursor");
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});
document.addEventListener("mousemove", (e) => {
  let mouseX = e.pageX + 20; // document의 x좌표값
  let mouseY = e.pageY + 20; // document의 y좌표값

  let cursor = document.querySelector(".procon .cursor");
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});
/* sec2 모달팝업 */

const items = document.querySelectorAll(".project");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modalClose");

for (const aa of items) {
  aa.addEventListener("click", function (e) {
    const img = e.currentTarget.querySelector("figure img").getAttribute("src");
    const title = e.currentTarget.querySelector(".text h2").innerText;
    const p1 = e.currentTarget.querySelector(".text .p1").innerText;
    const p2 = e.currentTarget.querySelector(".text .p2").innerText;
    const web = e.currentTarget.querySelector(".web").getAttribute("href");
    const github = e.currentTarget
      .querySelector(".github")
      .getAttribute("href");

    modal.querySelector("figure img").setAttribute("src", img);
    modal.querySelector(".text h2").innerText = title;
    modal.querySelector(".text .p1").innerText = p1;
    modal.querySelector(".text .p2").innerText = p2;
    modal.querySelector(".web").setAttribute("href", web);
    modal.querySelector(".github").setAttribute("href", github);
    modal.classList.add("on");
  });
}
modalClose.addEventListener("click", function (ee) {
  ee.preventDefault();
  modal.classList.remove("on");
});
