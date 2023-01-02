const slider = document.querySelector(".slider");
const leftBtn = document.querySelector(".btn--left");
const rightBtn = document.querySelector(".btn--right");
const sliderMarker = document.querySelector(".slider--marker");

let sliderIndex = 2;
let markerIndex = 0;
let flag = true;
let timerId;
let sliderItems = [];
let markerItems = [];

const INTERVAL = 3000;
const IMAGES = 5;

function createSliderItems() {
  let firstNode, lastNode;
  for (let i = 1; i <= IMAGES; i++) {
    const img = document.createElement("img");
    img.src = `images/img_${i}.jpg`;
    img.classList.add("slider--item");
    slider.append(img);
    sliderItems.push(img);

    const span = document.createElement("span");
    span.classList.add("slider--marker--items");
    sliderMarker.append(span);
    markerItems.push(span);
    span.addEventListener("click", () => {
      handleJumpToSlide(i - 1);
    });

    if (i === 1) {
      firstNode = img.cloneNode(true);
      span.classList.add("selected");
    }
    if (i === IMAGES) {
      lastNode = img.cloneNode(true);
    }
  }
  slider.prepend(lastNode);
  slider.append(firstNode);
  sliderItems = [lastNode, ...sliderItems, firstNode];
}

function moveLeft() {
  if (flag) {
    ++markerIndex;
    handleTransition(sliderIndex++, true);
    flag = false;
  }
}

function moveRight() {
  if (flag) {
    --markerIndex;
    handleTransition(sliderIndex - 2, true);
    sliderIndex--;
    flag = false;
  }
}

function handleJumpToSlide(idx) {
  if (flag) {
    markerIndex = idx;
    let curr = markerIndex + 1;
    handleTransition(curr, false);
    sliderIndex = curr + 1;
    markerItems.forEach((item, i) => {
      if (i === markerIndex) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    });
    flag = false;
    createTimer();
  }
}

function handleTransition(moveValue, toAnimate) {
  slider.style.transform = `translateX(-${moveValue * 100}%)`;
  slider.style.transition = toAnimate ? `1000ms ease-in-out` : `none`;
}

function createTimer() {
  clearInterval(timerId);
  flag = true;
  timerId = setInterval(() => {
    moveLeft();
  }, INTERVAL);
}

function initiateSlider() {
  createSliderItems();
  createTimer();
}

slider.addEventListener("transitionend", () => {
  if (sliderIndex === sliderItems.length) {
    markerIndex = 0;
    handleTransition(1, false);
    sliderIndex = 2;
  }
  if (sliderIndex === 1) {
    markerIndex = markerItems.length - 1;
    handleTransition(sliderItems.length - 2, false);
    sliderIndex = sliderItems.length - 1;
  }

  markerItems.forEach((item, i) => {
    if (i === markerIndex) {
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
  });

  flag = true;
});

leftBtn.addEventListener("click", () => {
  moveLeft();
  createTimer();
});

rightBtn.addEventListener("click", () => {
  moveRight();
  createTimer();
});

window.onload = initiateSlider;
