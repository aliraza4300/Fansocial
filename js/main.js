function buildThresholds() {
  const steps = 20;
  const thresholds = [];

  for (let i = 0; i <= steps; i++) {
    let ratio = i / steps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

function blur(items, observer) {
  items.forEach((item) => {
    if (item.target.id == "banner") {
      item.target.style.opacity = item.intersectionRatio - 0.1;
      if (item.intersectionRatio > 0.7) {
        item.target.style.opacity = 1;
      }
    }
    console.log(item.target);
    if (item.target.id == "content") {
      console.log(item.intersectionRatio);
      let blur = (item.intersectionRatio - 0.4) * 60;
      document.documentElement.style.setProperty("--_blur", `${blur}px`);
      item.target.style.opacity = item.intersectionRatio - 0.1;
      if (item.intersectionRatio > 0.5) {
        item.target.style.opacity = 1;
      }
    }
  });
}

function scrollBlur() {
  const elems = document.querySelectorAll(".to-track");
  const options = {
    root: null,
    rootMargin: "-25px",
    threshold: buildThresholds(),
  };

  const observer = new IntersectionObserver(blur, options);

  for (let elem of elems) {
    observer.observe(elem);
  }
}

document.addEventListener("DOMContentLoaded", scrollBlur);

function scrollTracker() {
  let blur = 0;
  let opacity = 1.0;
  let headerPos = -50;
  document.addEventListener("scroll", (e) => {
    let y = window.scrollY; /* get current page scroll position */

    /*
     * Get main elements for the feature
     * overlay - black screen
     * img - blur section
     * banner section = where the carousel is located
     */
    let overlay = document.querySelector(".overlay");
    let img = document.querySelector(".blur");
    let mainSlider = document.querySelector("#main-slider");
    let banner = document.querySelector("#banner");
    let content = document.querySelector("#content");

    // Once hit 200px
    if (y < content.clientHeight - 100) {
      overlay.style = `opacity: 0`; /* force hide overlay */

      // set blur property on css to 0
      // document.documentElement.style.setProperty('--_blur', 0);
      // document.documentElement.style.setProperty('--_blur', `45px`);
    }
    if (y > content.clientHeight) {
      document.documentElement.style.setProperty("--_blur", `45px`);
    }
    if (y > 200) {
      let colorPercent = (
        (1 - (img.clientHeight - y) / img.clientHeight) * 0.7 +
        0.1
      ).toFixed(2);

      console.log(colorPercent);

      //if the opacity achive the limit keep the number
      if (colorPercent >= 0.85) {
        colorPercent = 0.85;
      }
      // opacity adjustments
      opacity = opacity - colorPercent;
      overlay.style = `opacity: ${colorPercent + 10}`;
    }
  });
}

scrollTracker();
