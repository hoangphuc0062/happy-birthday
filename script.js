"use strict";

const TARGET_NAME = "Trần Ngọc Dạ Thảo";
const BIRTH_YEAR = 2007;
const BIRTH_MONTH = 9; // October, zero-based for JavaScript dates.
const BIRTH_DAY = 28;
const YEAR_STORY_DURATION = 2300;
// Each theme produces a distinct annual bouquet. Future years continue cycling
// through the palettes while the arrangement and flower families also change.
const YEAR_THEMES = [
  { petals: ["#ffdee9", "#fa8db5", "#fff0f6"], accents: ["#ffc0d6", "#ffc5eb", "#f5a7c7"], center: "#ffe9a2" },
  { petals: ["#e5d2ff", "#c8a6ed", "#f5edff"], accents: ["#f2b4dc", "#fff4ff", "#aa81de"], center: "#ffe7a7" },
  { petals: ["#ffe1ba", "#ffb6a2", "#fff6da"], accents: ["#ffb8d2", "#ffcfae", "#f9d384"], center: "#eeac70" },
  { petals: ["#c6eaf4", "#a0cae8", "#f3feff"], accents: ["#fff0fa", "#afd9e6", "#d2b9ef"], center: "#fff5bc" },
  { petals: ["#fff9e2", "#f5f1bb", "#ffffff"], accents: ["#e8ffd1", "#ffe9c8", "#d3e8b4"], center: "#f4bc67" },
  { petals: ["#ff9da7", "#ffc6d6", "#ffdde1"], accents: ["#fff0d4", "#f77f9a", "#ffb1bc"], center: "#ffec95" },
  { petals: ["#c7e4b1", "#e8f4cc", "#f7fff0"], accents: ["#ffe1e8", "#d0eec1", "#b4daa3"], center: "#ffc978" },
  { petals: ["#efa4d9", "#f9d7f1", "#d7ace8"], accents: ["#f3b2c6", "#ffe8fa", "#f0c0fb"], center: "#f9dc92" }
];
const YEAR_WISHES = [
  "Một tuổi đầu đời, mong mọi điều quanh em đều ấm áp và dịu dàng như nắng sớm.",
  "Tuổi 2, mong mỗi ngày của em đều đầy ắp tiếng cười và những cái ôm thật êm.",
  "Tuổi 3, chúc cô bé nhỏ luôn tò mò trước những điều đẹp đẽ của thế giới.",
  "Tuổi 4, mong những câu chuyện cổ tích luôn khép lại bằng nụ cười của em.",
  "Tuổi 5, chúc em lớn lên trong sự yêu thương và những mùa hoa rực rỡ.",
  "Tuổi 6, mong những bước chân đầu tiên đến lớp đều tràn ngập niềm vui.",
  "Tuổi 7, chúc em luôn giữ được ánh mắt lấp lánh khi khám phá điều mới.",
  "Tuổi 8, mong mỗi ước mơ bé xíu đều có chỗ để nảy mầm và vươn cao.",
  "Tuổi 9, chúc em có thật nhiều bạn tốt và những ngày thơ ấu an nhiên.",
  "Tuổi 10, mong hành trình đầu tiên của một tuổi hai chữ số thật rạng rỡ.",
  "Tuổi 11, chúc em đủ can đảm để thử điều mới và đủ vui để là chính mình.",
  "Tuổi 12, mong em tìm được niềm vui trong những điều giản dị nhất mỗi ngày.",
  "Tuổi 13, chúc những năm tháng tuổi teen nhẹ nhàng như cánh hoa đang hé nở.",
  "Tuổi 14, mong em luôn tự tin bước đi theo cách riêng thật đáng yêu của mình.",
  "Tuổi 15, chúc em có những người bạn tốt và thật nhiều ký ức trong trẻo.",
  "Tuổi 16, mong ước mơ của em lớn thêm một chút và nỗi buồn thì nhỏ lại.",
  "Tuổi 17, chúc em vững vàng trước thử thách và luôn biết mỉm cười với bản thân.",
  "Tuổi 18, mong những lựa chọn đầu tiên của tuổi trưởng thành đều nhiều hy vọng.",
  "Tuổi 19, mong em được bình an, hạnh phúc và gặp thật nhiều điều dịu dàng. 🌷"
];
const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const PALETTES = [
  { petal: "#fff9eb", secondary: "#ffebbf", center: "#f5bd51" },
  { petal: "#f8b1d1", secondary: "#ffd9e9", center: "#f5d06c" },
  { petal: "#ff86b1", secondary: "#ffc0d6", center: "#ffe68e" },
  { petal: "#fff4fa", secondary: "#ffd1e6", center: "#f3ba58" },
  { petal: "#ffcade", secondary: "#f3a4c5", center: "#fff1ae" },
  { petal: "#e9d8ff", secondary: "#ffbee0", center: "#ffdc8d" }
];

const POSITIONS = [
  [213, 120], [174, 158], [259, 130], [132, 188], [292, 174],
  [176, 91], [233, 85], [322, 211], [106, 233], [202, 189],
  [272, 227], [145, 273], [308, 278], [215, 257], [245, 44],
  [118, 139], [340, 160], [180, 306], [257, 309], [345, 252]
];

const bouquetBlooms = document.getElementById("bouquetBlooms");
const bouquetRibbon = document.getElementById("bouquetRibbon");
const flowerStage = document.querySelector(".flower-stage");
const flowerScene = document.getElementById("flowerScene");
const yearsScene = document.getElementById("yearsScene");
const birthdayScene = document.getElementById("birthdayScene");
const yearBouquetBlooms = document.getElementById("yearBouquetBlooms");
const yearNumber = document.getElementById("yearNumber");
const yearAge = document.getElementById("yearAge");
const yearWish = document.getElementById("yearWish");
const yearCount = document.getElementById("yearsCount");
const yearsProgress = document.getElementById("yearsProgress");
const yearsProgressFill = document.getElementById("yearsProgressFill");
const pauseYearsButton = document.getElementById("pauseYearsButton");
const birthdayCountdown = document.getElementById("birthdayCountdown");
const birthdayYearLabel = document.getElementById("birthdayYearLabel");
const birthdayMessage = document.getElementById("birthdayMessage");
const birthdayCake = document.getElementById("birthdayCake");
const ageCandleText = document.getElementById("ageCandleText");
const promptArea = document.querySelector(".input-area");
const typedName = document.getElementById("typedName");
const keyboard = document.getElementById("flowerKeyboard");
const animationStatus = document.getElementById("animationStatus");
const musicButton = document.getElementById("musicButton");
const cakeWrap = document.getElementById("cakeWrap");
const blowCandlesButton = document.getElementById("blowCandlesButton");
const wishReveal = document.getElementById("wishReveal");
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let letters = [];
let typingTimer = null;
let nextSceneTimer = null;
let yearTimer = null;
let yearStep = 0;
let yearStoryPaused = false;
let celebrationYear = 2026;
let confetti = [];
let animationFrame = null;
let candlesBlown = false;
let audioContext = null;
let musicTimer = null;
let musicPlaying = false;
let pianoWave = null;
let hammerBuffer = null;
const activeNotes = new Set();

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function paletteFor(letter) {
  return PALETTES[(letter.charCodeAt(0) * 7 + 3) % PALETTES.length];
}

// Each letter gets a repeatable, hand-drawn SVG flower family.
function makeFlowerHead(letter, size = 1, colors = paletteFor(letter), familyChoice = null) {
  const id = letter.charCodeAt(0) - 65;
  const family = familyChoice === null ? id % 5 : familyChoice;
  let flower = "";

  if (family === 0 || family === 3) {
    const petals = family === 0 ? 9 : 6;
    for (let i = 0; i < petals; i++) {
      const angle = (360 / petals) * i;
      flower += `<ellipse cx="0" cy="-12" rx="${family === 0 ? 6 : 8}" ry="${family === 0 ? 14 : 12}" transform="rotate(${angle})" fill="${i % 3 === 0 ? colors.secondary : colors.petal}" />`;
    }
    flower += `<circle r="${family === 0 ? 8 : 6.8}" fill="${colors.center}" /><circle cx="-2" cy="-2" r="2" fill="#fffbd6" opacity=".7" />`;
  } else if (family === 1) {
    for (let i = 0; i < 5; i++) {
      flower += `<circle cx="0" cy="-10.5" r="10" transform="rotate(${i * 72})" fill="${i % 2 ? colors.secondary : colors.petal}" />`;
    }
    flower += `<circle r="6" fill="${colors.center}" />`;
  } else if (family === 2) {
    flower = `<path d="M-16 6 Q-19 -15 -8 -19 Q-4 -25 0 -11 Q7 -26 12 -17 Q20 -6 15 6 Q3 16 -16 6Z" fill="${colors.petal}" />
      <path d="M0 -11 Q-7 -18 -8 -19 M0 -11 Q8 -20 12 -17" stroke="${colors.secondary}" stroke-width="2.5" fill="none" />
      <path d="M-16 5 Q0 14 15 5" stroke="${colors.secondary}" stroke-width="2" fill="none" />`;
  } else {
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const cx = Math.cos(angle) * 13;
      const cy = Math.sin(angle) * 13;
      flower += `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="7.7" fill="${i % 2 ? colors.secondary : colors.petal}" />`;
    }
    flower += `<circle r="6" fill="${colors.center}" />`;
  }

  return `<g transform="scale(${size})">${flower}</g>`;
}

function makeKeyFlower(letter) {
  return `<svg class="key-flower" viewBox="0 0 56 72" aria-hidden="true" focusable="false">
    <path d="M28 74 L28 23" fill="none" stroke="#4e9a64" stroke-width="1.5" />
    <path d="M28 56 Q14 43 12 52 Q17 62 28 56 M28 45 Q41 32 43 40 Q40 50 28 45" fill="#4e9a64" />
    <g transform="translate(28 22)">${makeFlowerHead(letter, .83)}</g>
  </svg>`;
}

function createKeyboard() {
  ROWS.forEach((row, rowIndex) => {
    const holder = document.getElementById(["keyRowOne", "keyRowTwo", "keyRowThree"][rowIndex]);
    for (const letter of row) {
      const key = document.createElement("div");
      key.className = "flower-key";
      key.dataset.letter = letter;
      key.setAttribute("aria-hidden", "true");
      key.innerHTML = `${makeKeyFlower(letter)}<span class="key-label">${letter}</span>`;
      holder.appendChild(key);
    }

    if (rowIndex === 2) {
      const back = document.createElement("button");
      back.type = "button";
      back.className = "function-key back-key";
      back.dataset.action = "replay";
      back.setAttribute("aria-label", "Xem lại hiệu ứng kết hoa");
      back.textContent = "↻";
      holder.appendChild(back);

      const confirm = document.createElement("button");
      confirm.type = "button";
      confirm.className = "function-key ok-key";
      confirm.dataset.action = "confirm";
      confirm.textContent = "OK";
      confirm.setAttribute("aria-label", "Chuyển đến bánh sinh nhật");
      holder.appendChild(confirm);
    }
  });

  function fitKeyboard() {
    // A wide initial keyboard can temporarily enlarge mobile window.innerWidth.
    // clientWidth remains the actual visible viewport, so every key stays on screen.
    const viewportWidth = document.documentElement.clientWidth;
    const available = Math.min(viewportWidth - 16, 650);
    const gap = viewportWidth <= 380 ? 3 : viewportWidth <= 680 ? 4 : 5;
    const keyWidth = Math.min(54, (available - 9 * gap) / 10, (available - 8 * gap) / 10.1);
    keyboard.style.setProperty("--key-width", `${Math.floor(keyWidth * 10) / 10}px`);
    keyboard.style.setProperty("--key-height", `${Math.round(keyWidth * 1.29)}px`);
  }

  fitKeyboard();
  window.addEventListener("resize", fitKeyboard);
}

function makeBouquetFlower(letter, index, year = null) {
  const variant = year === null ? 0 : year - BIRTH_YEAR;
  const placement = year === null ? index : (index * [3, 5, 9, 11][variant % 4] + variant * 2) % 14;
  const [baseX, baseY] = POSITIONS[placement];
  const x = baseX + (year === null ? 0 : Math.sin(variant * 1.7 + index) * 14);
  const y = baseY + (year === null ? 0 : Math.cos(variant * .9 + index) * 11);
  const startX = 216 + ((index % 5) - 2) * 3;
  const startY = 426 + (index % 3) * 2;
  const curveX = (startX + x) / 2 + (index % 2 ? 15 : -15);
  const curveY = (startY + y) / 2 + 32;
  const pointOnStem = t => ({
    x: (1 - t) ** 2 * startX + 2 * (1 - t) * t * curveX + t ** 2 * x,
    y: (1 - t) ** 2 * startY + 2 * (1 - t) * t * curveY + t ** 2 * y
  });
  const lowerLeaf = pointOnStem(.31 + index % 3 * .035);
  const upperLeaf = pointOnStem(.54 + index % 4 * .022);
  const leafPath = (point, side, width) => {
    const { x: lx, y: ly } = point;
    return `M${lx} ${ly} Q${lx + side * width * .48} ${ly - width * .88} ${lx + side * width} ${ly - width * .72} Q${lx + side * width * .9} ${ly - width * .12} ${lx} ${ly} Z`;
  };
  const side = index % 2 ? 1 : -1;
  const theme = year === null ? null : YEAR_THEMES[(variant - 1) % YEAR_THEMES.length];
  const colors = theme && {
    petal: theme.petals[index % 3],
    secondary: theme.accents[(index + variant) % 3],
    center: theme.center
  };
  const family = year === null ? null : (letter.charCodeAt(0) - 65 + variant + index) % 5;
  const size = year === null ? .94 : .85 + (index + variant) % 4 * .065;
  const cssClass = year === null ? "bouquet-flower" : "year-bouquet-flower";
  const gradient = year === null ? "stemGradient" : "yearStemGradient";
  return `<g class="${cssClass}" data-letter="${escapeHtml(letter)}" style="--bloom-delay:${index * .065}s">
    <path class="stem" pathLength="105" d="M${startX} ${startY} Q${curveX} ${curveY} ${x} ${y}" fill="none" stroke="url(#${gradient})" stroke-width="2.6" stroke-linecap="round" />
    <g class="stem-leaves" fill="#4e9e62">
      <path d="${leafPath(lowerLeaf, side, 26)}" />
      <path d="${leafPath(upperLeaf, -side, 22)}" fill="#66ac75" />
    </g>
    <g class="bloom-head"><g transform="translate(${x} ${y})">${makeFlowerHead(letter, size, colors || undefined, family)}</g></g>
  </g>`;
}

function renderTypedName() {
  typedName.innerHTML = letters.map(letter => letter === " "
    ? '<span class="letter-space"> </span>'
    : `<span class="letter">${letter}</span>`).join("");
  const count = letters.filter(letter => letter !== " ").length;
  promptArea.classList.toggle("is-typing", letters.length > 0);
  flowerStage.classList.toggle("has-flowers", count > 0);
  bouquetRibbon.classList.toggle("visible", count === TARGET_NAME.replaceAll(" ", "").length);
}

function addLetter(letter) {
  const normalized = letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "D").toUpperCase();
  if (!/^[A-Z]$/.test(normalized)) return;
  letters.push(letter);
  const bloomIndex = bouquetBlooms.children.length;
  bouquetBlooms.insertAdjacentHTML("beforeend", makeBouquetFlower(normalized, bloomIndex));
  renderTypedName();
  const key = keyboard.querySelector(`[data-letter="${normalized}"]`);
  if (key) {
    key.classList.add("is-active");
    clearTimeout(key.activeTimer);
    key.activeTimer = setTimeout(() => key.classList.remove("is-active"), 400);
  }
}

function addSpace() {
  letters.push(" ");
  renderTypedName();
}

function stopSequence() {
  clearTimeout(typingTimer);
  clearTimeout(nextSceneTimer);
  typingTimer = null;
  nextSceneTimer = null;
}

function getCelebrationYear(now = new Date()) {
  const hasPassed = now.getMonth() > BIRTH_MONTH ||
    (now.getMonth() === BIRTH_MONTH && now.getDate() > BIRTH_DAY);
  return Math.max(BIRTH_YEAR + 1, now.getFullYear() + (hasPassed ? 1 : 0));
}

function getYearWish(age) {
  if (age <= YEAR_WISHES.length) return YEAR_WISHES[age - 1];
  const wishes = [
    "Mong em có thêm thật nhiều lý do để mỉm cười và luôn được là chính mình.",
    "Chúc em bình yên trong tim, vững vàng trên đường đi và dịu dàng với bản thân.",
    "Mong tuổi mới mang đến những cuộc gặp gỡ đẹp và những cơ hội xứng đáng.",
    "Chúc những ước mơ em đang giữ sẽ dần trở thành những điều có thật.",
    "Mong mọi ngày trong tuổi mới của em đều có chút nắng, chút hoa và thật nhiều niềm vui."
  ];
  return `Tuổi ${age}, ${wishes[(age - YEAR_WISHES.length - 1) % wishes.length]}`;
}

function updateBirthdayInfo() {
  celebrationYear = getCelebrationYear();
  const age = celebrationYear - BIRTH_YEAR;
  birthdayYearLabel.textContent = `MỘT NGÀY THẬT ĐẶC BIỆT · 28.10.${celebrationYear}`;
  birthdayCake.setAttribute("aria-label", `Bánh sinh nhật màu hồng với nến số ${age}`);
  ageCandleText.textContent = age;
  birthdayMessage.textContent = age === 19
    ? "Chúc em tuổi 19 luôn vui vẻ, bình an, được yêu thương thật nhiều và gặp toàn những điều dịu dàng nhất. 🌷"
    : `Chúc mừng sinh nhật tuổi ${age}, Dạ Thảo! ${getYearWish(age).replace(/^Tuổi \d+,?\s*/, "")} ♡`;
  updateCountdown();
}

function updateCountdown(now = new Date()) {
  if (now.getMonth() === BIRTH_MONTH && now.getDate() === BIRTH_DAY) {
    birthdayCountdown.textContent = `✧ Hôm nay là sinh nhật tuổi ${now.getFullYear() - BIRTH_YEAR} của em!`;
    return;
  }
  const targetYear = getCelebrationYear(now);
  const birthday = new Date(targetYear, BIRTH_MONTH, BIRTH_DAY);
  const seconds = Math.max(0, Math.floor((birthday - now) / 1000));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor(seconds / 3600) % 24;
  const minutes = Math.floor(seconds / 60) % 60;
  const secs = seconds % 60;
  const pad = value => String(value).padStart(2, "0");
  birthdayCountdown.textContent = `♡ Còn ${days} ngày · ${pad(hours)} giờ · ${pad(minutes)} phút · ${pad(secs)} giây đến sinh nhật tuổi ${targetYear - BIRTH_YEAR}`;
}

function stopYearStory() {
  clearTimeout(yearTimer);
  yearTimer = null;
  yearStoryPaused = false;
  yearsScene.classList.remove("is-paused");
  pauseYearsButton.textContent = "Ⅱ Tạm dừng";
  pauseYearsButton.setAttribute("aria-pressed", "false");
}

function scheduleNextYear() {
  clearTimeout(yearTimer);
  if (yearStoryPaused) return;
  yearTimer = setTimeout(() => {
    yearStep++;
    if (yearStep >= celebrationYear - BIRTH_YEAR) showBirthday();
    else showYearStep();
  }, prefersReducedMotion.matches ? 600 : YEAR_STORY_DURATION);
}

function showYearStep() {
  const year = celebrationYear - yearStep;
  const age = year - BIRTH_YEAR;
  const total = celebrationYear - BIRTH_YEAR;
  yearNumber.textContent = year;
  yearAge.textContent = `✧ Tuổi ${age}`;
  yearWish.textContent = getYearWish(age);
  yearCount.textContent = `Mùa hoa ${yearStep + 1} / ${total} · Đang trở về những năm tháng đầu đời`;
  const percent = Math.round((yearStep + 1) / total * 100);
  yearsProgress.setAttribute("aria-valuenow", percent);
  yearsProgressFill.style.width = `${percent}%`;

  const normalizedName = Array.from(TARGET_NAME).filter(char => char !== " ")
    .map(char => char.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "D").toUpperCase());
  yearBouquetBlooms.innerHTML = normalizedName.map((letter, index) =>
    makeBouquetFlower(letter, index, year)).join("");
  // Replacing the content retriggers each flower's bloom animation for this year.
  const caption = document.getElementById("yearCaption");
  caption.classList.remove("year-entering");
  void caption.offsetWidth;
  caption.classList.add("year-entering");
  scheduleNextYear();
}

function showYears() {
  stopSequence();
  stopYearStory();
  updateBirthdayInfo();
  yearStep = 0;
  document.getElementById("yearsIntro").textContent =
    `Từ ${celebrationYear} ngược về ${BIRTH_YEAR + 1} — mỗi năm một bó hoa và một lời chúc dành riêng cho em.`;
  flowerScene.hidden = true;
  birthdayScene.hidden = true;
  yearsScene.hidden = false;
  document.body.classList.remove("showing-birthday");
  document.body.classList.add("showing-years");
  showYearStep();
}

function animateName() {
  stopSequence();
  letters = [];
  bouquetBlooms.innerHTML = "";
  renderTypedName();
  animationStatus.textContent = "✦ Từng chữ đang nở thành hoa...";
  let index = 0;
  const typeNext = () => {
    if (index >= TARGET_NAME.length) {
      animationStatus.textContent = "♡ Một bó hoa dành riêng cho em đã hoàn thành";
      nextSceneTimer = setTimeout(showYears, prefersReducedMotion.matches ? 1200 : 2700);
      return;
    }
    const char = TARGET_NAME[index++];
    if (char === " ") addSpace();
    else addLetter(char);
    typingTimer = setTimeout(typeNext, prefersReducedMotion.matches ? 40 : char === " " ? 250 : 435);
  };
  typingTimer = setTimeout(typeNext, prefersReducedMotion.matches ? 80 : 650);
}

function showBirthday() {
  stopSequence();
  stopYearStory();
  updateBirthdayInfo();
  flowerScene.hidden = true;
  yearsScene.hidden = true;
  birthdayScene.hidden = false;
  document.body.classList.remove("showing-years");
  document.body.classList.add("showing-birthday");
  launchConfetti(95);
}

function showFlowers() {
  stopYearStory();
  birthdayScene.hidden = true;
  yearsScene.hidden = true;
  flowerScene.hidden = false;
  document.body.classList.remove("showing-birthday");
  document.body.classList.remove("showing-years");
  resizeCanvas();
}

function resetEverything() {
  stopSequence();
  candlesBlown = false;
  cakeWrap.classList.remove("candles-out");
  wishReveal.classList.remove("visible");
  blowCandlesButton.disabled = false;
  blowCandlesButton.textContent = "✦ Thổi nến & ước một điều";
  showFlowers();
  stopConfetti();
  animateName();
}

// A softly accompanied piano arrangement of Happy Birthday, played with Web Audio.
// Audio starts on a tap/click because mobile browsers block sound on page load.
const MELODY = [
  ["G4", .5], ["G4", .5], ["A4", 1], ["G4", 1], ["C5", 1], ["B4", 2],
  ["G4", .5], ["G4", .5], ["A4", 1], ["G4", 1], ["D5", 1], ["C5", 2],
  ["G4", .5], ["G4", .5], ["G5", 1], ["E5", 1], ["C5", 1], ["B4", 1], ["A4", 2],
  ["F5", .5], ["F5", .5], ["E5", 1], ["C5", 1], ["D5", 1], ["C5", 2]
];
const NOTE_FREQUENCIES = {
  G2: 98, B2: 123.47, C3: 130.81, D3: 146.83, E3: 164.81,
  F3: 174.61, G3: 196, A3: 220, B3: 246.94, C4: 261.63,
  E4: 329.63, G4: 392, A4: 440, B4: 493.88, C5: 523.25,
  D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99
};

// Gentle, slightly detuned strings plus a short hammer transient approximate
// the percussive attack and natural decay of an acoustic piano without MP3 files.
function preparePiano() {
  if (pianoWave) return;
  const real = new Float32Array(9);
  const imaginary = new Float32Array([0, 1, .48, .22, .12, .07, .04, .025, .015]);
  pianoWave = audioContext.createPeriodicWave(real, imaginary);

  const size = Math.floor(audioContext.sampleRate * .035);
  hammerBuffer = audioContext.createBuffer(1, size, audioContext.sampleRate);
  const data = hammerBuffer.getChannelData(0);
  for (let i = 0; i < size; i++) {
    const fade = Math.exp(-i / (audioContext.sampleRate * .008));
    data[i] = (Math.random() * 2 - 1) * fade;
  }
}

function playPianoNote(note, time, duration, volume = 1) {
  const frequency = NOTE_FREQUENCIES[note];
  const release = .24;
  const endTime = time + duration + release;
  const envelope = audioContext.createGain();
  const peak = .095 * volume;
  envelope.gain.setValueAtTime(.0001, time);
  envelope.gain.exponentialRampToValueAtTime(peak, time + .006);
  envelope.gain.exponentialRampToValueAtTime(peak * .42, time + Math.min(.13, duration * .6));
  envelope.gain.exponentialRampToValueAtTime(peak * .23, time + duration);
  envelope.gain.exponentialRampToValueAtTime(.0001, endTime);
  envelope.connect(audioContext.destination);

  const sources = [];
  for (const [detune, level] of [[-1.4, .58], [1.4, .42]]) {
    const string = audioContext.createOscillator();
    const stringGain = audioContext.createGain();
    string.setPeriodicWave(pianoWave);
    string.frequency.value = frequency;
    string.detune.value = detune;
    stringGain.gain.value = level;
    string.connect(stringGain);
    stringGain.connect(envelope);
    string.start(time);
    string.stop(endTime + .01);
    sources.push([string, stringGain]);
  }

  // Higher harmonics fade much faster than the string's main tone.
  const attack = audioContext.createOscillator();
  const attackGain = audioContext.createGain();
  attack.type = "sine";
  attack.frequency.value = frequency * 2.008;
  attackGain.gain.setValueAtTime(.0001, time);
  attackGain.gain.exponentialRampToValueAtTime(.014 * volume, time + .004);
  attackGain.gain.exponentialRampToValueAtTime(.0001, time + .18);
  attack.connect(attackGain);
  attackGain.connect(audioContext.destination);
  attack.start(time);
  attack.stop(time + .19);
  sources.push([attack, attackGain]);

  const hammer = audioContext.createBufferSource();
  const hammerFilter = audioContext.createBiquadFilter();
  const hammerGain = audioContext.createGain();
  hammer.buffer = hammerBuffer;
  hammerFilter.type = "lowpass";
  hammerFilter.frequency.value = 2600;
  hammerGain.gain.value = .018 * volume;
  hammer.connect(hammerFilter);
  hammerFilter.connect(hammerGain);
  hammerGain.connect(audioContext.destination);
  hammer.start(time);
  sources.push([hammer, hammerFilter, hammerGain]);

  let remaining = sources.length;
  for (const [source, ...connections] of sources) {
    activeNotes.add(source);
    source.onended = () => {
      activeNotes.delete(source);
      source.disconnect();
      connections.forEach(node => node.disconnect());
      if (--remaining === 0) envelope.disconnect();
    };
  }
}

function scheduleMelody() {
  if (!musicPlaying || !audioContext || audioContext.state !== "running") return;
  const start = audioContext.currentTime + .08;
  let time = start;
  const beat = .44;
  for (const [index, [note, beats]] of MELODY.entries()) {
    const duration = beats * beat;
    playPianoNote(note, time, duration * .88, index % 6 === 0 ? 1.08 : .94);
    time += duration;
  }

  // Left hand: quiet root + chord tones, placed at each phrase's changes.
  const accompaniment = [
    [0, ["C3", "G3", "E4"]], [4, ["G2", "D3", "B3"]],
    [6, ["C3", "G3", "E4"]], [10, ["G2", "D3", "B3"]],
    [12, ["C3", "G3", "E4"]], [16, ["F3", "A3", "C4"]],
    [19, ["F3", "A3", "C4"]], [21, ["G2", "D3", "B3"]],
    [23, ["C3", "G3", "E4"]]
  ];
  for (const [beatOffset, chord] of accompaniment) {
    chord.forEach((note, index) => {
      playPianoNote(note, start + beatOffset * beat + index * .07, beat * 1.6, index === 0 ? .64 : .32);
    });
  }
  musicTimer = setTimeout(scheduleMelody, Math.round((time - start + .8) * 1000));
}

function stopMusic() {
  musicPlaying = false;
  clearTimeout(musicTimer);
  musicTimer = null;
  for (const oscillator of activeNotes) {
    try { oscillator.stop(); } catch { /* The note has already finished. */ }
  }
  activeNotes.clear();
  musicButton.setAttribute("aria-pressed", "false");
  musicButton.setAttribute("aria-label", "Bật nhạc piano Happy Birthday");
  musicButton.innerHTML = '♫ <span>Bật piano</span>';
  musicButton.classList.remove("is-playing");
}

async function toggleMusic() {
  if (musicPlaying) { stopMusic(); return; }
  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) {
    musicButton.setAttribute("aria-label", "Trình duyệt không hỗ trợ phát nhạc");
    return;
  }
  try {
    if (!audioContext) audioContext = new Context();
    await audioContext.resume();
    preparePiano();
    musicPlaying = true;
    musicButton.setAttribute("aria-pressed", "true");
    musicButton.setAttribute("aria-label", "Tắt nhạc piano Happy Birthday");
    musicButton.innerHTML = '♫ <span>Tắt piano</span>';
    musicButton.classList.add("is-playing");
    scheduleMelody();
  } catch (error) {
    console.warn("Không thể phát nhạc:", error);
  }
}

function createAmbientSpecks() {
  const specks = document.getElementById("ambientSpecks");
  for (let i = 0; i < 40; i++) {
    const dot = document.createElement("span");
    dot.className = "speck";
    const x = (i * 67.23 + 16) % 100;
    const y = (i * 38.51 + 9) % 100;
    const size = 1 + (i % 4) * .55;
    dot.style.cssText = `left:${x}%;top:${y}%;width:${size}px;height:${size}px;--duration:${3 + i % 5}s;--delay:${-(i % 7)}s;--opacity:${.1 + (i % 5) * .11}`;
    specks.appendChild(dot);
  }
}

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * pixelRatio);
  canvas.height = Math.floor(window.innerHeight * pixelRatio);
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function stopConfetti() {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  animationFrame = null;
  confetti = [];
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

function launchConfetti(quantity = 100) {
  if (prefersReducedMotion.matches) return;
  resizeCanvas();
  const colors = ["#ffe5a3", "#ffb1cf", "#fff5f6", "#f584bb", "#c5e5aa", "#e7c0ff"];
  for (let i = 0; i < quantity; i++) {
    confetti.push({
      x: window.innerWidth / 2 + (Math.random() - .5) * 150,
      y: window.innerHeight * .45 + (Math.random() - .5) * 90,
      vx: (Math.random() - .5) * 12,
      vy: -(Math.random() * 9 + 3),
      gravity: .13 + Math.random() * .1,
      size: Math.random() * 5 + 3,
      angle: Math.random() * Math.PI,
      spin: (Math.random() - .5) * .22,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1
    });
  }
  if (!animationFrame) animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  confetti = confetti.filter(particle => particle.opacity > .02 && particle.y < window.innerHeight + 30);
  confetti.forEach(particle => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += particle.gravity;
    particle.vx *= .993;
    particle.angle += particle.spin;
    particle.opacity -= .005;
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.angle);
    ctx.globalAlpha = Math.max(0, particle.opacity);
    ctx.fillStyle = particle.color;
    ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 1.6);
    ctx.restore();
  });
  if (confetti.length) animationFrame = requestAnimationFrame(animateConfetti);
  else { animationFrame = null; ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); }
}

keyboard.addEventListener("click", event => {
  const key = event.target.closest("button");
  if (!key) return;
  if (key.dataset.action === "replay") resetEverything();
  else if (key.dataset.action === "confirm") showYears();
});

document.getElementById("skipYearsButton").addEventListener("click", showBirthday);
pauseYearsButton.addEventListener("click", () => {
  yearStoryPaused = !yearStoryPaused;
  yearsScene.classList.toggle("is-paused", yearStoryPaused);
  pauseYearsButton.setAttribute("aria-pressed", String(yearStoryPaused));
  pauseYearsButton.textContent = yearStoryPaused ? "▷ Tiếp tục" : "Ⅱ Tạm dừng";
  if (yearStoryPaused) {
    clearTimeout(yearTimer);
    yearTimer = null;
  } else scheduleNextYear();
});

musicButton.addEventListener("click", toggleMusic);
document.getElementById("resetButton").addEventListener("click", resetEverything);
document.getElementById("backToFlowersButton").addEventListener("click", resetEverything);
blowCandlesButton.addEventListener("click", () => {
  if (candlesBlown) return;
  candlesBlown = true;
  cakeWrap.classList.add("candles-out");
  wishReveal.classList.add("visible");
  blowCandlesButton.textContent = "♡ Điều ước đã được gửi đi";
  blowCandlesButton.disabled = true;
  launchConfetti(170);
});
window.addEventListener("resize", resizeCanvas);

createKeyboard();
createAmbientSpecks();
renderTypedName();
resizeCanvas();
updateBirthdayInfo();
setInterval(() => {
  if (getCelebrationYear() !== celebrationYear) updateBirthdayInfo();
  else updateCountdown();
}, 1000);
animateName();
