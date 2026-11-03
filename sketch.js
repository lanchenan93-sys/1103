// ==========================================
// 全局關卡狀態管理 (gameState)
// 1: 水果連連看 | 2: 交通工具選擇題 | 3: 第三關動物拼圖 | 4: 第三關結算 | 5: 第四關迷宮 | 6: 全遊戲總結算
// ==========================================
let gameState = 1; 

// ------------------------------------------
// 第一關：水果連連看資料與變數
// ------------------------------------------
const FRUIT_ITEMS = [
  { id: 'apple',      name: 'Apple',      zh: '蘋果' },
  { id: 'banana',     name: 'Banana',     zh: '香蕉' },
  { id: 'strawberry', name: 'Strawberry', zh: '草莓' },
  { id: 'grape',      name: 'Grape',      zh: '葡萄' },
  { id: 'orange',     name: 'Orange',     zh: '柳橙' },
  { id: 'watermelon', name: 'Watermelon', zh: '西瓜' }
];

let fruitCards = [];
let fruitLabels = [];
let fruitSlots = [null, null, null, null, null, null];
let fruitDraggedLabel = null;
let fruitSelectedLabel = null;
let fruitPointerStartX = 0, fruitPointerStartY = 0;
let fruitIsDragging = false;
let fruitStartTime = 0, fruitTimeSpent = 0;
let fruitIsSubmitted = false;
let fruitScore = 0, fruitResults = [];
let fruitSubmitBtn = { x: 0, y: 0, w: 180, h: 50 };
let fruitNextLevelBtn = { x: 0, y: 0, w: 160, h: 46 };

// ------------------------------------------
// 第二關：交通工具選擇題資料與變數
// ------------------------------------------
const VEHICLE_POOL = [
  { id: 'car',      name: 'Car',      zh: '汽車' },
  { id: 'airplane', name: 'Airplane', zh: '飛機' },
  { id: 'truck',    name: 'Truck',    zh: '卡車' },
  { id: 'scooter',  name: 'Scooter',  zh: '機車' },
  { id: 'bicycle',  name: 'Bicycle',  zh: '腳踏車' }
];

let vQuestions = [];     
let vCurrentIndex = 0;   
let vOptions = [];       
let vSelectedOption = null;
let vWrongAttempts = 0;  
let vFirstTryCorrect = 0;
let vIsCurrentFailed = false; 
let vFeedbackMsg = "";   
let vOptButtons = [];    
let vNextLevelBtn = { x: 0, y: 0, w: 180, h: 50 };

// ------------------------------------------
// 第三關：動物 3x3 凹凸拼圖資料與變數
// ------------------------------------------
const ANIMAL_POOL = [
  { id: 'lion',   name: 'LION',   zh: '獅子' },
  { id: 'cat',    name: 'CAT',    zh: '貓咪' },
  { id: 'rabbit', name: 'RABBIT', zh: '兔子' },
  { id: 'cow',    name: 'COW',    zh: '乳牛' }
];

let pQuestions = [];      
let pCurrentIndex = 0;    
let pGridSlots = [];      
let pPieces = [];         
let pDraggedPiece = null;
let pSelectedPiece = null;
let pPointerStartX = 0, pPointerStartY = 0;
let pIsDragging = false;
let pStartTime = 0, pTotalTimeSpent = 0;
let pIsSingleQuestionDone = false;

let pResetBtn = { x: 0, y: 0, w: 130, h: 38 };
let pContinueQuestionBtn = { x: 0, y: 0, w: 180, h: 48 };
let pNextLevelBtn = { x: 0, y: 0, w: 180, h: 50 };

const JIGSAW_EDGES = [1, -1, -1, 1, 1, -1];

// ------------------------------------------
// 第四關：低飽和寬闊樹叢迷宮 (14x11 大地圖)
// ------------------------------------------
const MAZE_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let mCellSize = 44;
let mMazeX = 0, mMazeY = 0;

let mPlayer = { gridX: 1, gridY: 1, x: 0, y: 0, isWalking: false, lastChestTouch: null };

const ALL_VOCABULARY = [
  { name: 'Apple', zh: '蘋果' }, { name: 'Banana', zh: '香蕉' },
  { name: 'Strawberry', zh: '草莓' }, { name: 'Grape', zh: '葡萄' },
  { name: 'Orange', zh: '柳橙' }, { name: 'Watermelon', zh: '西瓜' },
  { name: 'Car', zh: '汽車' }, { name: 'Airplane', zh: '飛機' },
  { name: 'Truck', zh: '卡車' }, { name: 'Scooter', zh: '機車' },
  { name: 'Bicycle', zh: '腳踏車' }, { name: 'Lion', zh: '獅子' },
  { name: 'Cat', zh: '貓咪' }, { name: 'Rabbit', zh: '兔子' }, { name: 'Cow', zh: '乳牛' }
];

let mChests = [
  { 
    id: 1, gridX: 4, gridY: 1, opened: false, title: '第一關 水果單字 🍓',
    items: [
      { name: 'Apple', zh: '蘋果', id: 'apple' }, { name: 'Banana', zh: '香蕉', id: 'banana' },
      { name: 'Strawberry', zh: '草莓', id: 'strawberry' }, { name: 'Grape', zh: '葡萄', id: 'grape' },
      { name: 'Orange', zh: '柳橙', id: 'orange' }, { name: 'Watermelon', zh: '西瓜', id: 'watermelon' }
    ]
  },
  { 
    id: 2, gridX: 12, gridY: 1, opened: false, title: '第二關 交通工具 🚗',
    items: [
      { name: 'Car', zh: '汽車', id: 'car' }, { name: 'Airplane', zh: '飛機', id: 'airplane' },
      { name: 'Truck', zh: '卡車', id: 'truck' }, { name: 'Scooter', zh: '機車', id: 'scooter' },
      { name: 'Bicycle', zh: '腳踏車', id: 'bicycle' }
    ]
  },
  { 
    id: 3, gridX: 1, gridY: 9, opened: false, title: '第三關 動物單字 🦁',
    items: [
      { name: 'Lion', zh: '獅子', id: 'lion' }, { name: 'Cat', zh: '貓咪', id: 'cat' },
      { name: 'Rabbit', zh: '兔子', id: 'rabbit' }, { name: 'Cow', zh: '乳牛', id: 'cow' }
    ]
  }
];

let mEnemies = [];
let mActiveEnemyModal = null;
let mEnemyQuestion = null;
let mEnemyFeedbackMsg = "";
let mIsEnemyProcessing = false;

let mActiveChestModal = null;
let mModalCloseBtn = { x: 0, y: 0, w: 190, h: 48 };
let mFinalRestartBtn = { x: 0, y: 0, w: 180, h: 50 };

let mDpad = { up: {}, down: {}, left: {}, right: {} };

let bgClouds = [], bgStars = [];
let confettiParticles = []; // 通關噴撒彩帶粒子庫

// ==========================================
// setup & windowResized
// ==========================================
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Helvetica, Arial, sans-serif');
  initBackgroundElements();
  initFruitLevel();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initBackgroundElements();
  if (gameState === 1) {
    let currentShuffled = fruitLabels.map(l => FRUIT_ITEMS.find(it => it.id === l.id));
    calculateFruitLayout(currentShuffled);
  } else if (gameState === 2) {
    calculateVehicleLayout();
  } else if (gameState === 3) {
    calculatePuzzleLayout();
  } else if (gameState === 5) {
    calculateMazeLayout();
  }
}

function initBackgroundElements() {
  bgClouds = [
    { x: width * 0.1, y: 70, scale: 0.8, speed: 0.3 },
    { x: width * 0.5, y: 110, scale: 1.1, speed: 0.2 },
    { x: width * 0.85, y: 55, scale: 0.9, speed: 0.4 }
  ];
  bgStars = [];
  for (let i = 0; i < 15; i++) {
    bgStars.push({
      x: random(width), y: random(height * 0.7),
      size: random(6, 12), phase: random(TWO_PI)
    });
  }
}

// 初始化全螢幕彩帶
function initConfetti() {
  confettiParticles = [];
  let colors = ['#FF70A6', '#FF9770', '#FFDC5E', '#70D6FF', '#A8FBDD', '#C77DFF'];
  for (let i = 0; i < 100; i++) {
    confettiParticles.push({
      x: random(width),
      y: random(-height, 0),
      size: random(8, 14),
      color: random(colors),
      speedY: random(2.5, 5.5),
      speedX: random(-1.5, 1.5),
      rot: random(TWO_PI),
      rotSpeed: random(-0.08, 0.08)
    });
  }
}

// ==========================================
// draw 主畫布循環
// ==========================================
function draw() {
  drawRichBackground();

  if (gameState === 1) {
    drawFruitLevel();
  } else if (gameState === 2) {
    drawVehicleLevel();
  } else if (gameState === 3) {
    drawPuzzleLevel();
  } else if (gameState === 4) {
    drawPuzzleResultModal();
  } else if (gameState === 5) {
    updateMazePlayer();
    updateMazeEnemies();
    drawMazeLevel();
  } else if (gameState === 6) {
    drawGameCompleteModal();
  }
}

function drawRichBackground() {
  for (let y = 0; y < height; y += 4) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color('#F7F5F0'), color('#EBF3ED'), inter);
    stroke(c); strokeWeight(4); line(0, y, width, y);
  }

  noStroke();
  fill('#E1EFE6'); ellipse(width * 0.2, height + 80, width * 0.7, 300);
  fill('#DCEBE1'); ellipse(width * 0.8, height + 100, width * 0.8, 320);

  for (let s of bgStars) {
    let alpha = map(sin(frameCount * 0.05 + s.phase), -1, 1, 60, 180);
    fill(245, 222, 179, alpha);
    push(); translate(s.x, s.y); rotate(frameCount * 0.01 + s.phase);
    rect(-s.size / 2, -s.size / 2, s.size, s.size, 2); pop();
  }

  for (let cloud of bgClouds) {
    cloud.x += cloud.speed;
    if (cloud.x - 100 > width) cloud.x = -100;
    push(); translate(cloud.x, cloud.y); scale(cloud.scale);
    fill('rgba(255, 255, 255, 0.75)'); noStroke();
    ellipse(0, 0, 60, 40); ellipse(-20, 5, 40, 30); ellipse(20, 5, 45, 30);
    pop();
  }
}

// ==========================================
// 第一關：水果連連看邏輯
// ==========================================
function initFruitLevel() {
  fruitCards = []; fruitLabels = [];
  fruitSlots = [null, null, null, null, null, null];
  fruitDraggedLabel = null; fruitSelectedLabel = null;
  fruitIsDragging = false; fruitIsSubmitted = false;
  fruitScore = 0; fruitResults = [];
  fruitStartTime = millis();
  calculateFruitLayout(shuffle([...FRUIT_ITEMS]));
}

function calculateFruitLayout(shuffledItems) {
  let isMobile = width < 650;
  let cols = isMobile ? 2 : 3, rows = isMobile ? 3 : 2;
  let cardAreaW = min(width * 0.92, 900);
  let cardW = (cardAreaW - (cols - 1) * 16) / cols;
  let cardH = isMobile ? 120 : 135;
  let startX = (width - cardAreaW) / 2, startY = isMobile ? 90 : 100;

  fruitCards = [];
  for (let i = 0; i < FRUIT_ITEMS.length; i++) {
    let r = floor(i / cols), c = i % cols;
    let cx = startX + c * (cardW + 16), cy = startY + r * (cardH + 16);
    fruitCards.push({ item: FRUIT_ITEMS[i], x: cx, y: cy, w: cardW, h: cardH, slotY: cy + cardH - 34 });
  }

  let labelW = isMobile ? (cardAreaW - 12) / 2 : 135, labelH = 40;
  let trayY = startY + rows * (cardH + 16) + 15;
  let trayCols = isMobile ? 2 : 3;
  let trayStartX = (width - (trayCols * labelW + (trayCols - 1) * 12)) / 2;

  fruitLabels = [];
  for (let i = 0; i < shuffledItems.length; i++) {
    let item = shuffledItems[i];
    let r = floor(i / trayCols), c = i % trayCols;
    let lx = trayStartX + c * (labelW + 12), ly = trayY + r * (labelH + 12);
    let currentSlot = fruitSlots.indexOf(item.id);

    fruitLabels.push({
      id: item.id, text: item.name,
      x: currentSlot !== -1 ? fruitCards[currentSlot].x + (fruitCards[currentSlot].w - labelW) / 2 : lx,
      y: currentSlot !== -1 ? fruitCards[currentSlot].slotY : ly,
      origX: lx, origY: ly, w: labelW, h: labelH, placedSlot: currentSlot
    });
  }

  let lastTrayY = trayY + ceil(shuffledItems.length / trayCols) * (labelH + 12);
  fruitSubmitBtn.x = width / 2 - fruitSubmitBtn.w / 2;
  fruitSubmitBtn.y = min(lastTrayY + 15, height - 70);
}

function drawFruitLevel() {
  if (!fruitIsSubmitted) fruitTimeSpent = floor((millis() - fruitStartTime) / 1000);

  stroke('rgba(255, 255, 255, 0.85)'); strokeWeight(2); fill('rgba(255, 255, 255, 0.9)');
  rect(width / 2 - 190, 12, 380, 58, 30);
  fill('#4A5568'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text("第一關：水果單字連連看 🍓", width / 2, 20);
  textSize(13); textStyle(NORMAL); fill('#718096');
  let mins = nf(floor(fruitTimeSpent / 60), 2), secs = nf(fruitTimeSpent % 60, 2);
  text(`⏱️ 時間：${mins}:${secs}`, width / 2, 45);

  let t = frameCount * 0.05;
  for (let i = 0; i < fruitCards.length; i++) {
    let c = fruitCards[i];
    noStroke(); fill('rgba(0,0,0,0.03)'); rect(c.x + 3, c.y + 4, c.w, c.h, 16);
    stroke('#E2E8F0'); strokeWeight(1.5); fill('#FFFFFF'); rect(c.x, c.y, c.w, c.h, 16);

    push(); translate(c.x + c.w / 2, c.y + (c.h - 38) / 2);
    translate(0, sin(t + i) * 4); scale(c.w / 220);
    drawAnimatedFruit(c.item.id, t + i); pop();

    if (fruitSelectedLabel !== null && fruitSlots[i] === null) {
      stroke('#9AE6B4'); strokeWeight(2); fill('#F0FFF4');
    } else {
      stroke('#CBD5E1'); strokeWeight(1.5); fill('#F8FAFC');
    }
    rect(c.x + 8, c.slotY, c.w - 16, 28, 8);
    if (fruitSlots[i] === null) {
      noStroke(); fill('#A0AEC0'); textAlign(CENTER, CENTER); textSize(12); text("放入單字", c.x + c.w / 2, c.slotY + 14);
    }
  }

  for (let l of fruitLabels) {
    if (l === fruitDraggedLabel) continue;
    let isSelected = (l === fruitSelectedLabel);
    noStroke(); fill('rgba(0, 0, 0, 0.04)'); rect(l.x + 2, l.y + 3, l.w, l.h, 10);
    stroke(isSelected ? '#68D391' : '#E2E8F0'); strokeWeight(isSelected ? 2.5 : 1);
    fill(isSelected ? '#E6FFFA' : '#FFFFFF'); rect(l.x, l.y, l.w, l.h, 10);
    noStroke(); fill('#2D3748'); textAlign(CENTER, CENTER); textSize(15); textStyle(BOLD);
    text(l.text, l.x + l.w / 2, l.y + l.h / 2);
  }

  if (fruitDraggedLabel) {
    let l = fruitDraggedLabel;
    stroke('#68D391'); strokeWeight(2.5); fill('#FFFFFF'); rect(l.x, l.y, l.w, l.h, 10);
    noStroke(); fill('#2D3748'); textAlign(CENTER, CENTER); textSize(15); textStyle(BOLD);
    text(l.text, l.x + l.w / 2, l.y + l.h / 2);
  }

  if (!fruitIsSubmitted) {
    stroke('#48BB78'); fill('#68D391');
    rect(fruitSubmitBtn.x, fruitSubmitBtn.y, fruitSubmitBtn.w, fruitSubmitBtn.h, 25);
    noStroke(); fill('#FFFFFF'); textAlign(CENTER, CENTER); textSize(16); textStyle(BOLD);
    text("交卷看成績 🚀", fruitSubmitBtn.x + fruitSubmitBtn.w / 2, fruitSubmitBtn.y + fruitSubmitBtn.h / 2);
  } else {
    drawFruitResultModal();
  }
}

function drawFruitResultModal() {
  fill('rgba(45, 55, 72, 0.55)'); rect(0, 0, width, height);
  let modalW = min(width * 0.88, 420), modalH = 380;
  let mx = width / 2 - modalW / 2, my = height / 2 - modalH / 2;

  stroke('#E2E8F0'); fill('#FFFFFF'); rect(mx, my, modalW, modalH, 24);
  let finalScore = round((fruitScore / FRUIT_ITEMS.length) * 100);
  fill('#2D3748'); textAlign(CENTER, TOP); textSize(22); textStyle(BOLD);
  text(finalScore === 100 ? "🎉 第一關完美通關！" : "👏 第一關完成！", width / 2, my + 24);

  noStroke(); fill(finalScore >= 60 ? '#68D391' : '#F6AD55');
  ellipse(width / 2, my + 105, 76, 76);
  fill('#FFFFFF'); textSize(26); text(`${finalScore}分`, width / 2, my + 92);

  fruitNextLevelBtn.x = width / 2 - fruitNextLevelBtn.w / 2;
  fruitNextLevelBtn.y = my + modalH - 60;
  stroke('#38A169'); fill('#48BB78');
  rect(fruitNextLevelBtn.x, fruitNextLevelBtn.y, fruitNextLevelBtn.w, fruitNextLevelBtn.h, 24);
  fill('#FFFFFF'); textAlign(CENTER, CENTER); textSize(16); textStyle(BOLD);
  text("前往第二關 ➡️", fruitNextLevelBtn.x + fruitNextLevelBtn.w / 2, fruitNextLevelBtn.y + fruitNextLevelBtn.h / 2);
}

// ==========================================
// 第二關：交通工具選擇題邏輯
// ==========================================
function initVehicleLevel() {
  gameState = 2;
  vCurrentIndex = 0;
  vWrongAttempts = 0;
  vFirstTryCorrect = 0;
  vIsCurrentFailed = false;
  vFeedbackMsg = "";
  
  vQuestions = shuffle([...VEHICLE_POOL]).slice(0, 3);
  setupVehicleQuestion();
}

function setupVehicleQuestion() {
  vSelectedOption = null;
  vIsCurrentFailed = false;
  let currentQ = vQuestions[vCurrentIndex];

  let wrongPool = VEHICLE_POOL.filter(v => v.id !== currentQ.id);
  let pickedWrong = shuffle(wrongPool).slice(0, 3);
  vOptions = shuffle([currentQ, ...pickedWrong]);

  calculateVehicleLayout();
}

function calculateVehicleLayout() {
  let isMobile = width < 600;
  let optW = isMobile ? min(width * 0.88, 320) : 220;
  let optH = 50;

  let imgBoxH = isMobile ? 180 : 220;
  let startY = isMobile ? height * 0.58 : height * 0.62;

  vOptButtons = [];
  if (isMobile) {
    for (let i = 0; i < 4; i++) {
      vOptButtons.push({
        x: width / 2 - optW / 2,
        y: startY + i * (optH + 12),
        w: optW, h: optH, item: vOptions[i]
      });
    }
  } else {
    let colGap = 20, rowGap = 16;
    let startX = width / 2 - (optW * 2 + colGap) / 2;
    for (let i = 0; i < 4; i++) {
      let r = floor(i / 2), c = i % 2;
      vOptButtons.push({
        x: startX + c * (optW + colGap),
        y: startY + r * (optH + rowGap),
        w: optW, h: optH, item: vOptions[i]
      });
    }
  }
}

function drawVehicleLevel() {
  let currentQ = vQuestions[vCurrentIndex];

  stroke('rgba(255, 255, 255, 0.85)'); strokeWeight(2); fill('rgba(255, 255, 255, 0.9)');
  rect(width / 2 - 200, 12, 400, 58, 30);
  fill('#2D3748'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text("第二關：交通工具單字選選看 🚗", width / 2, 20);
  textSize(13); fill('#718096'); textStyle(NORMAL);
  text(`第 ${vCurrentIndex + 1} / 3 題`, width / 2, 45);

  let imgBoxW = min(width * 0.88, 480);
  let imgBoxH = width < 600 ? 180 : 220;
  let imgBoxX = width / 2 - imgBoxW / 2;
  let imgBoxY = 85;

  stroke('#E2E8F0'); strokeWeight(2); fill('#FFFFFF');
  rect(imgBoxX, imgBoxY, imgBoxW, imgBoxH, 20);

  push();
  translate(width / 2, imgBoxY + imgBoxH / 2);
  let floatY = sin(frameCount * 0.06) * 5;
  translate(0, floatY);
  scale(imgBoxH / 180);
  drawAnimatedVehicle(currentQ.id, frameCount * 0.06);
  pop();

  if (vFeedbackMsg !== "") {
    textAlign(CENTER, CENTER); textSize(16); textStyle(BOLD);
    fill(vFeedbackMsg.includes("答對") ? '#48BB78' : '#F56565');
    text(vFeedbackMsg, width / 2, imgBoxY + imgBoxH + 25);
  }

  for (let btn of vOptButtons) {
    let isSelected = (vSelectedOption === btn.item);
    noStroke(); fill('rgba(0,0,0,0.03)'); rect(btn.x + 2, btn.y + 3, btn.w, btn.h, 14);

    if (isSelected) {
      if (btn.item.id === currentQ.id) {
        stroke('#48BB78'); fill('#C6F6D5'); 
      } else {
        stroke('#F56565'); fill('#FED7D7'); 
      }
      strokeWeight(2.5);
    } else {
      stroke('#CBD5E1'); strokeWeight(1.5); fill('#FFFFFF');
    }

    rect(btn.x, btn.y, btn.w, btn.h, 14);
    noStroke(); fill('#2D3748'); textAlign(CENTER, CENTER); textSize(17); textStyle(BOLD);
    text(btn.item.name, btn.x + btn.w / 2, btn.y + btn.h / 2);
  }
}

function drawVehicleResultModal() {
  fill('rgba(45, 55, 72, 0.55)'); rect(0, 0, width, height);
  let modalW = min(width * 0.88, 420), modalH = 340;
  let mx = width / 2 - modalW / 2, my = height / 2 - modalH / 2;

  stroke('#E2E8F0'); fill('#FFFFFF'); rect(mx, my, modalW, modalH, 24);
  fill('#2D3748'); textAlign(CENTER, TOP); textSize(22); textStyle(BOLD);
  text("🎉 第二關順利完成！", width / 2, my + 28);

  fill('#F7FAFC'); stroke('#E2E8F0'); strokeWeight(1);
  rect(mx + 30, my + 75, modalW - 60, 140, 16);

  textAlign(CENTER, CENTER); textSize(15); textStyle(NORMAL); fill('#4A5568');
  text(`一次答對題數：${vFirstTryCorrect} / 3 題`, width / 2, my + 110);
  text(`重新選擇次數：${vWrongAttempts} 次`, width / 2, my + 145);
  text(`總點選次數：${3 + vWrongAttempts} 次`, width / 2, my + 180);

  vNextLevelBtn.x = width / 2 - vNextLevelBtn.w / 2;
  vNextLevelBtn.y = my + modalH - 65;

  stroke('#4299E1'); fill('#63B3ED');
  rect(vNextLevelBtn.x, vNextLevelBtn.y, vNextLevelBtn.w, vNextLevelBtn.h, 24);
  fill('#FFFFFF'); textAlign(CENTER, CENTER); textSize(16); textStyle(BOLD);
  text("前往第三關 ➡️", vNextLevelBtn.x + vNextLevelBtn.w / 2, vNextLevelBtn.y + vNextLevelBtn.h / 2);
}

// ==========================================
// 第三關：動物 3x3 凹凸拼圖邏輯
// ==========================================
function initPuzzleLevel() {
  gameState = 3;
  pCurrentIndex = 0;
  pStartTime = millis();
  pTotalTimeSpent = 0;

  pQuestions = shuffle([...ANIMAL_POOL]).slice(0, 2);
  setupPuzzleQuestion();
}

function setupPuzzleQuestion() {
  pGridSlots = [];
  pPieces = [];
  pDraggedPiece = null;
  pSelectedPiece = null;
  pIsSingleQuestionDone = false;
  calculatePuzzleLayout();
}

function calculatePuzzleLayout() {
  let isMobile = width < 650;
  let puzzleSize = isMobile ? min(width * 0.88, 320) : min(width * 0.45, 360);
  let pieceSize = puzzleSize / 3;

  let gridStartX = width / 2 - puzzleSize / 2;
  let gridStartY = isMobile ? 95 : 105;

  pGridSlots = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let idx = r * 3 + c;
      pGridSlots.push({
        id: idx, row: r, col: c,
        x: gridStartX + c * pieceSize, y: gridStartY + r * pieceSize,
        w: pieceSize, h: pieceSize, occupiedPieceId: null
      });
    }
  }

  pResetBtn.x = isMobile ? width / 2 - pResetBtn.w / 2 : gridStartX + puzzleSize + 15;
  pResetBtn.y = isMobile ? gridStartY + puzzleSize + 8 : gridStartY;

  let trayStartY = isMobile ? gridStartY + puzzleSize + 52 : gridStartY + puzzleSize + 25;
  let trayCols = 5; 
  let pieceTrayW = isMobile ? (width * 0.9) / 5 - 6 : min((puzzleSize * 1.1) / 5 - 8, 70);
  let trayW = trayCols * pieceTrayW + (trayCols - 1) * 8;
  let trayStartX = width / 2 - trayW / 2;

  let shuffledIndices = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]);

  pPieces = [];
  for (let i = 0; i < 9; i++) {
    let pieceId = i;
    let origRow = floor(i / 3);
    let origCol = i % 3;

    let trayPosIdx = shuffledIndices[i];
    let tr = floor(trayPosIdx / trayCols);
    let tc = trayPosIdx % trayCols;

    let tx = trayStartX + tc * (pieceTrayW + 8);
    let ty = trayStartY + tr * (pieceTrayW + 8);

    pPieces.push({
      id: pieceId, origRow: origRow, origCol: origCol,
      currentSlot: -1, x: tx, y: ty, origX: tx, origY: ty,
      w: pieceSize, h: pieceSize, displayW: pieceTrayW, displayH: pieceTrayW
    });
  }
}

// 第三關畫布：頂部放大顯示目標題目單字
function drawPuzzleLevel() {
  let currentQ = pQuestions[pCurrentIndex];

  // 放大題目單字卡
  stroke('rgba(255, 255, 255, 0.85)'); strokeWeight(2); fill('rgba(255, 255, 255, 0.95)');
  rect(width / 2 - 220, 10, 440, 68, 30);

  fill('#2B6CB0'); textAlign(CENTER, TOP); textSize(24); textStyle(BOLD);
  text(`🧩 題目：${currentQ.name} (${currentQ.zh})`, width / 2, 18);
  textSize(13); fill('#718096'); textStyle(NORMAL);
  text(`拖動下方 9 個拼圖碎片，拼出${currentQ.zh}吧！`, width / 2, 48);

  if (pGridSlots.length > 0) {
    let pSize = pGridSlots[0].w * 3;
    let gx = pGridSlots[0].x;
    let gy = pGridSlots[0].y;

    fill('#FFFFFF'); stroke('#CBD5E1'); strokeWeight(2);
    rect(gx, gy, pSize, pSize, 8);
    drawJigsawGridLines(gx, gy, pGridSlots[0].w);
  }

  noStroke(); fill('rgba(0,0,0,0.03)');
  rect(pResetBtn.x + 2, pResetBtn.y + 3, pResetBtn.w, pResetBtn.h, 16);
  stroke('#E2E8F0'); strokeWeight(1.5); fill('#FFFFFF');
  rect(pResetBtn.x, pResetBtn.y, pResetBtn.w, pResetBtn.h, 16);
  noStroke(); fill('#4A5568'); textAlign(CENTER, CENTER); textSize(13); textStyle(BOLD);
  text("🔄 全部重置", pResetBtn.x + pResetBtn.w / 2, pResetBtn.y + pResetBtn.h / 2);

  for (let p of pPieces) {
    if (p === pDraggedPiece) continue;
    drawJigsawPiece(p, currentQ.id);
  }

  if (pDraggedPiece) {
    drawJigsawPiece(pDraggedPiece, currentQ.id, true);
  }

  if (pIsSingleQuestionDone) {
    drawSingleQuestionDoneModal();
  }
}

function drawJigsawGridLines(gx, gy, w) {
  stroke('#CBD5E1'); strokeWeight(1.5); noFill();
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      push(); translate(gx + c * w, gy + r * w);
      beginShape();
      drawJigsawEdgePath(0, 0, w, 0, getEdgeType(r, c, 'top'));
      drawJigsawEdgePath(w, 0, w, w, getEdgeType(r, c, 'right'));
      drawJigsawEdgePath(w, w, 0, w, getEdgeType(r, c, 'bottom'));
      drawJigsawEdgePath(0, w, 0, 0, getEdgeType(r, c, 'left'));
      endShape(CLOSE);
      pop();
    }
  }
}

function drawJigsawPiece(p, animalId, isDraggingPiece = false) {
  let isSelected = (p === pSelectedPiece);
  let isPlaced = (p.currentSlot !== -1);
  let renderW = isPlaced || isDraggingPiece ? p.w : p.displayW;
  let scaleRatio = renderW / p.w;

  push();
  translate(p.x, p.y);
  scale(scaleRatio);

  drawingContext.save();
  drawingContext.beginPath();

  drawJigsawEdgePath(0, 0, p.w, 0, getEdgeType(p.origRow, p.origCol, 'top'), drawingContext);
  drawJigsawEdgePath(p.w, 0, p.w, p.w, getEdgeType(p.origRow, p.origCol, 'right'), drawingContext);
  drawJigsawEdgePath(p.w, p.w, 0, p.w, getEdgeType(p.origRow, p.origCol, 'bottom'), drawingContext);
  drawJigsawEdgePath(0, p.w, 0, 0, getEdgeType(p.origRow, p.origCol, 'left'), drawingContext);
  drawingContext.closePath();
  drawingContext.clip();

  fill('#FFFFFF'); noStroke(); rect(-20, -20, p.w + 40, p.w + 40);

  push();
  translate(-p.origCol * p.w + (p.w * 3) / 2, -p.origRow * p.w + (p.w * 3) / 2);
  scale((p.w * 3) / 210); 
  drawAnimalIllustration(animalId);
  pop();

  drawingContext.restore();

  stroke(isDraggingPiece || isSelected ? '#4299E1' : '#A0AEC0');
  strokeWeight((isDraggingPiece || isSelected ? 3 : 1.5) / scaleRatio);
  noFill();
  beginShape();
  drawJigsawEdgePath(0, 0, p.w, 0, getEdgeType(p.origRow, p.origCol, 'top'));
  drawJigsawEdgePath(p.w, 0, p.w, p.w, getEdgeType(p.origRow, p.origCol, 'right'));
  drawJigsawEdgePath(p.w, p.w, 0, p.w, getEdgeType(p.origRow, p.origCol, 'bottom'));
  drawJigsawEdgePath(0, p.w, 0, 0, getEdgeType(p.origRow, p.origCol, 'left'));
  endShape(CLOSE);

  pop();
}

function getEdgeType(r, c, side) {
  if (side === 'top') return r === 0 ? 0 : JIGSAW_EDGES[r - 1];
  if (side === 'bottom') return r === 2 ? 0 : -JIGSAW_EDGES[r];
  if (side === 'left') return c === 0 ? 0 : JIGSAW_EDGES[2 + c - 1];
  if (side === 'right') return c === 2 ? 0 : -JIGSAW_EDGES[2 + c];
  return 0;
}

function drawJigsawEdgePath(x1, y1, x2, y2, type, ctx = null) {
  if (type === 0) {
    if (ctx) ctx.lineTo(x2, y2); else vertex(x2, y2);
    return;
  }

  let dx = x2 - x1, dy = y2 - y1;
  let len = dist(x1, y1, x2, y2);
  let nx = -dy / len * type, ny = dx / len * type;

  let p1x = x1 + dx * 0.38, p1y = y1 + dy * 0.38;
  let p2x = x1 + dx * 0.62, p2y = y1 + dy * 0.62;

  let tabR = len * 0.18;
  let cx = x1 + dx * 0.5 + nx * tabR * 1.1;
  let cy = y1 + dy * 0.5 + ny * tabR * 1.1;

  if (ctx) {
    ctx.lineTo(p1x, p1y);
    ctx.bezierCurveTo(p1x + nx * tabR, p1y + ny * tabR, cx - dx * 0.15, cy, cx, cy);
    ctx.bezierCurveTo(cx + dx * 0.15, cy, p2x + nx * tabR, p2y + ny * tabR, p2x, p2y);
    ctx.lineTo(x2, y2);
  } else {
    vertex(p1x, p1y);
    bezierVertex(p1x + nx * tabR, p1y + ny * tabR, cx - dx * 0.15, cy, cx, cy);
    bezierVertex(cx + dx * 0.15, cy, p2x + nx * tabR, p2y + ny * tabR, p2x, p2y);
    vertex(x2, y2);
  }
}

function checkPuzzleComplete() {
  let allCorrect = true;
  for (let slot of pGridSlots) {
    if (slot.occupiedPieceId === null) {
      allCorrect = false; break;
    }
    let piece = pPieces.find(p => p.id === slot.occupiedPieceId);
    if (piece.origRow !== slot.row || piece.origCol !== slot.col) {
      allCorrect = false; break;
    }
  }

  if (allCorrect) {
    setTimeout(() => { pIsSingleQuestionDone = true; }, 300);
  }
}

// 拼圖完成彈窗：再次顯示題目單字與中文
function drawSingleQuestionDoneModal() {
  fill('rgba(45, 55, 72, 0.55)'); rect(0, 0, width, height);
  let modalW = min(width * 0.85, 380), modalH = 280;
  let mx = width / 2 - modalW / 2, my = height / 2 - modalH / 2;

  stroke('#E2E8F0'); fill('#FFFFFF'); rect(mx, my, modalW, modalH, 24);
  fill('#2D3748'); textAlign(CENTER, TOP); textSize(24); textStyle(BOLD);
  text("🎉 完成 1/2 ！", width / 2, my + 30);

  // 再次顯示此題英文與中文單字
  let currentQ = pQuestions[pCurrentIndex];
  fill('#EBF8FF'); stroke('#BEE3F8'); strokeWeight(1.5);
  rect(mx + 30, my + 70, modalW - 60, 52, 14);
  fill('#2B6CB0'); textAlign(CENTER, CENTER); textSize(20); textStyle(BOLD);
  text(`${currentQ.name} (${currentQ.zh})`, width / 2, my + 96);

  fill('#718096'); textSize(14); textStyle(NORMAL);
  text("太棒了！準備好挑戰下一題了嗎？", width / 2, my + 145);

  pContinueQuestionBtn.x = width / 2 - pContinueQuestionBtn.w / 2;
  pContinueQuestionBtn.y = my + modalH - 65;

  stroke('#38A169'); fill('#48BB78');
  rect(pContinueQuestionBtn.x, pContinueQuestionBtn.y, pContinueQuestionBtn.w, pContinueQuestionBtn.h, 24);
  fill('#FFFFFF'); textAlign(CENTER, CENTER); textSize(16); textStyle(BOLD);
  text(pCurrentIndex === 0 ? "繼續下一題 ➡️" : "查看成績 🚀", pContinueQuestionBtn.x + pContinueQuestionBtn.w / 2, pContinueQuestionBtn.y + pContinueQuestionBtn.h / 2);
}

function resetCurrentPuzzle() {
  for (let slot of pGridSlots) slot.occupiedPieceId = null;
  for (let p of pPieces) {
    p.currentSlot = -1; p.x = p.origX; p.y = p.origY;
  }
  pSelectedPiece = null; pDraggedPiece = null;
}

function drawPuzzleResultModal() {
  fill('rgba(45, 55, 72, 0.55)'); rect(0, 0, width, height);
  let modalW = min(width * 0.88, 420), modalH = 320;
  let mx = width / 2 - modalW / 2, my = height / 2 - modalH / 2;

  stroke('#E2E8F0'); fill('#FFFFFF'); rect(mx, my, modalW, modalH, 24);
  fill('#2D3748'); textAlign(CENTER, TOP); textSize(22); textStyle(BOLD);
  text("🎉 恭喜完成第三關拼圖挑戰！", width / 2, my + 28);

  fill('#F7FAFC'); stroke('#E2E8F0'); strokeWeight(1);
  rect(mx + 30, my + 80, modalW - 60, 120, 16);

  let mins = floor(pTotalTimeSpent / 60);
  let secs = pTotalTimeSpent % 60;

  textAlign(CENTER, CENTER); textSize(16); textStyle(BOLD); fill('#4299E1');
  text(`⏱️ 拼圖總耗時：${mins > 0 ? mins + '分' : ''}${secs}秒`, width / 2, my + 120);
  fill('#4A5568'); textSize(14); textStyle(NORMAL);
  text("你已經成功拼出所有的動物插圖囉！", width / 2, my + 155);

  pNextLevelBtn.x = width / 2 - pNextLevelBtn.w / 2;
  pNextLevelBtn.y = my + modalH - 65;

  stroke('#38A169'); fill('#48BB78');
  rect(pNextLevelBtn.x, pNextLevelBtn.y, pNextLevelBtn.w, pNextLevelBtn.h, 24);
  fill('#FFFFFF'); textAlign(CENTER, CENTER); textSize(16); textStyle(BOLD);
  text("前往第四關 ➡️", pNextLevelBtn.x + pNextLevelBtn.w / 2, pNextLevelBtn.y + pNextLevelBtn.h / 2);
}

// ==========================================
// 第四關：低飽和柔和迷宮與巡邏反派 (14x11)
// ==========================================
function initMazeLevel() {
  gameState = 5;
  mActiveChestModal = null;
  mActiveEnemyModal = null;
  mEnemyFeedbackMsg = "";
  mIsEnemyProcessing = false;

  for (let c of mChests) c.opened = false;

  mPlayer.gridX = 1;
  mPlayer.gridY = 1;
  mPlayer.lastChestTouch = null;

  mEnemies = [
    { id: 1, gridX: 6, gridY: 1, dir: 1, isHorizontal: true },
    { id: 2, gridX: 7, gridY: 7, dir: 1, isHorizontal: false },
    { id: 3, gridX: 1, gridY: 5, dir: 1, isHorizontal: true }
  ];

  calculateMazeLayout();
}

function calculateMazeLayout() {
  let isMobile = width < 700;
  let rows = MAZE_MAP.length;
  let cols = MAZE_MAP[0].length;

  mCellSize = isMobile ? min((width * 0.95) / cols, 38) : min((width * 0.65) / cols, 48);

  mMazeX = width / 2 - (cols * mCellSize) / 2;
  mMazeY = isMobile ? 75 : 80;

  mPlayer.x = mMazeX + mPlayer.gridX * mCellSize + mCellSize / 2;
  mPlayer.y = mMazeY + mPlayer.gridY * mCellSize + mCellSize / 2;

  let btnS = isMobile ? 50 : 54;
  let padCenterX = width / 2;
  let padCenterY = mMazeY + rows * mCellSize + 85;

  mDpad.up    = { x: padCenterX - btnS / 2, y: padCenterY - btnS - 6, w: btnS, h: btnS, label: '▲', color: '#F6AD55' };
  mDpad.down  = { x: padCenterX - btnS / 2, y: padCenterY + 6,        w: btnS, h: btnS, label: '▼', color: '#FC8181' };
  mDpad.left  = { x: padCenterX - btnS * 1.5 - 6, y: padCenterY - btnS / 2, w: btnS, h: btnS, label: '◄', color: '#F6E05E' };
  mDpad.right = { x: padCenterX + btnS / 2 + 6,   y: padCenterY - btnS / 2, w: btnS, h: btnS, label: '►', color: '#63B3ED' };
}

function drawMazeLevel() {
  stroke('rgba(255, 255, 255, 0.9)'); strokeWeight(2); fill('rgba(255, 255, 255, 0.92)');
  rect(width / 2 - 220, 10, 440, 58, 30);
  fill('#2D3748'); textAlign(CENTER, TOP); textSize(19); textStyle(BOLD);
  text("第四關：溫馨迷宮單字大冒險 🌳", width / 2, 16);
  textSize(12); fill('#718096'); textStyle(NORMAL);
  let allOpened = mChests.every(c => c.opened);
  text(allOpened ? "✨ 封印已解除！快前往右下角黃金門通關！" : "開啟 3 個寶箱解除封印，避開或消滅小怪！", width / 2, 41);

  let rows = MAZE_MAP.length;
  let cols = MAZE_MAP[0].length;

  fill('#F2F9F4'); stroke('#CBD5E1'); strokeWeight(2);
  rect(mMazeX - 6, mMazeY - 6, cols * mCellSize + 12, rows * mCellSize + 12, 18);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let cx = mMazeX + c * mCellSize;
      let cy = mMazeY + r * mCellSize;

      if (MAZE_MAP[r][c] === 1) {
        drawSoftBushWall(cx, cy, mCellSize);
      } else {
        fill('#FAFCF9'); stroke('#E2E8F0'); strokeWeight(1);
        rect(cx, cy, mCellSize, mCellSize);
      }
    }
  }

  let startX = mMazeX + 1 * mCellSize, startY = mMazeY + 1 * mCellSize;
  let exitX = mMazeX + 11 * mCellSize, exitY = mMazeY + 8 * mCellSize;

  fill('#E6FFFA'); stroke('#319795'); strokeWeight(2);
  rect(startX + 2, startY + 2, mCellSize - 4, mCellSize - 4, 10);
  fill('#234E52'); textAlign(CENTER, CENTER); textSize(14); textStyle(BOLD);
  text("START", startX + mCellSize / 2, startY + mCellSize / 2);

  // 繪製出口與旁邊圍牆下的提示說明
  drawCleanGoalZone(exitX, exitY, mCellSize * 2, allOpened);

  // 繪製寶箱（開啟後顯示開啟蓋子的圖示，不顯示文字說明）
  for (let chest of mChests) {
    let chX = mMazeX + chest.gridX * mCellSize + mCellSize / 2;
    let chY = mMazeY + chest.gridY * mCellSize + mCellSize / 2;

    push(); translate(chX, chY);
    if (chest.opened) {
      drawOpenedChestIcon(0, 0, mCellSize * 0.7);
    } else {
      textSize(mCellSize * 0.65); textAlign(CENTER, CENTER);
      text("🎁", 0, 0);
    }
    pop();
  }

  for (let enemy of mEnemies) {
    let ex = mMazeX + enemy.gridX * mCellSize + mCellSize / 2;
    let ey = mMazeY + enemy.gridY * mCellSize + mCellSize / 2;
    drawPixelMonsterEnemy(ex, ey, mCellSize);
  }

  drawPixelGirlPlayer(mPlayer.x, mPlayer.y, mCellSize);
  drawSoftVirtualDpad();

  if (mActiveChestModal) {
    drawChestWordReviewModal(mActiveChestModal);
  } else if (mActiveEnemyModal) {
    drawEnemyQuizModal();
  }
}

// 繪製開啟的箱子像素圖示（不帶文字）
function drawOpenedChestIcon(cx, cy, size) {
  push();
  translate(cx, cy);
  let s = size / 32; scale(s);
  noStroke();

  // 箱子底部箱體
  fill('#8D6E63'); rect(-12, -2, 24, 14, 2);
  fill('#5D4037'); rect(-12, 10, 24, 2);
  fill('#FFD54F'); rect(-3, 2, 6, 6, 1); // 金屬鎖扣

  // 打開的箱蓋
  fill('#A1887F');
  quad(-12, -2, 12, -2, 15, -12, -15, -12);

  // 開箱閃爍的光芒星點
  let glow = sin(frameCount * 0.2) * 2 + 3;
  fill(255, 235, 59, 210);
  ellipse(0, -7, glow * 2, glow * 2);
  ellipse(-7, -5, glow, glow);
  ellipse(7, -5, glow, glow);

  pop();
}

function drawSoftBushWall(x, y, size) {
  fill('#68D391'); noStroke();
  rect(x, y, size, size, 6);
  fill('#9AE6B4');
  rect(x + 4, y + 4, size - 8, size - 8, 4);
  fill('#C6F6D5');
  rect(x + 6, y + 6, size / 2 - 4, size / 2 - 4, 3);
  fill('#48BB78');
  rect(x + size / 2, y + size / 2, size / 2 - 4, size / 2 - 4, 3);
}

// 清新出口區域：將說明文字位置移到出口左側圍牆下方/旁邊空白處，不重疊任何物件
function drawCleanGoalZone(x, y, size, isUnlocked) {
  let cx = x + size / 2;
  let cy = y + size / 2;

  if (isUnlocked) {
    let glow = sin(frameCount * 0.1) * 20 + 235;
    fill(255, 215, 0, glow); stroke('#D97706'); strokeWeight(2);
    ellipse(cx, cy, size * 0.85, size * 0.85);
    noStroke(); fill('#B45309'); textAlign(CENTER, CENTER); textSize(15); textStyle(BOLD);
    text("🌟 GOAL", cx, cy);

    // 出口旁左側空白通道顯示文字
    textAlign(RIGHT, CENTER); textSize(12); fill('#D97706'); textStyle(BOLD);
    text("✨ 出口已開啟 ➡️", x - 10, cy);
  } else {
    fill('rgba(160, 174, 192, 0.2)'); stroke('#A0AEC0'); strokeWeight(1.5);
    ellipse(cx, cy, size * 0.8, size * 0.8);
    noStroke(); fill('#718096'); textAlign(CENTER, CENTER); textSize(14); textStyle(BOLD);
    text("🔒", cx, cy);

    // 出口旁左側空白通道顯示文字
    textAlign(RIGHT, CENTER); textSize(11); fill('#718096'); textStyle(NORMAL);
    text("🔒 找到三個寶箱\n即可開啟出口", x - 10, cy);
  }
}

function drawPixelMonsterEnemy(ex, ey, size) {
  push(); translate(ex, ey);
  let floatY = sin(frameCount * 0.15 + ex) * 3;
  translate(0, floatY);

  let s = size / 40; scale(s);
  noStroke();

  fill('#B794F4'); ellipse(0, 0, 26, 26);
  fill('#9F7AEA'); ellipse(-10, -10, 8, 12); ellipse(10, -10, 8, 12);
  fill('#FFFFFF'); ellipse(-5, -2, 7, 7); ellipse(5, -2, 7, 7);
  fill('#2D3748'); ellipse(-5, -2, 3, 3); ellipse(5, -2, 3, 3);
  fill('#E53E3E'); triangle(-3, 4, 3, 4, 0, 8);

  pop();
}

function drawPixelGirlPlayer(px, py, size) {
  push(); translate(px, py);
  let s = size / 40; scale(s);

  let walkOffsetY = (mPlayer.isWalking && frameCount % 12 < 6) ? -2 : 0;
  translate(0, walkOffsetY);
  noStroke();

  fill('#FC8181'); rect(-10, -22, 8, 8, 2); rect(2, -22, 8, 8, 2); rect(-3, -20, 6, 6, 1);
  fill('#B7791F'); rect(-12, -15, 24, 14, 4); rect(-14, -8, 28, 8, 2);
  fill('#FBD38D'); rect(-9, -10, 18, 12, 3);
  fill('#2D3748'); rect(-6, -6, 3, 5); rect(3, -6, 3, 5);
  fill('#F6E05E'); rect(-10, 2, 20, 8, 2);
  fill('#63B3ED'); rect(-7, 4, 14, 12, 2);
  fill('#FC8181'); rect(-6, 4, 3, 3); rect(3, 4, 3, 3);
  fill('#4299E1'); rect(-7, 14, 6, 6); rect(1, 14, 6, 6);
  fill('#F56565'); rect(-8, 18, 7, 4, 1); rect(1, 18, 7, 4, 1);

  pop();
}

function drawSoftVirtualDpad() {
  let btns = [mDpad.up, mDpad.down, mDpad.left, mDpad.right];
  for (let b of btns) {
    if (!b.x) continue;
    fill('rgba(0,0,0,0.06)'); noStroke();
    rect(b.x, b.y + 4, b.w, b.h, 16);
    stroke('#FFFFFF'); strokeWeight(2); fill(b.color);
    rect(b.x, b.y, b.w, b.h, 16);
    fill('#FFFFFF'); noStroke(); textAlign(CENTER, CENTER);
    textSize(20); textStyle(BOLD);
    text(b.label, b.x + b.w / 2, b.y + b.h / 2);
  }
}

function updateMazePlayer() {
  if (mActiveChestModal || mActiveEnemyModal || gameState !== 5) return;

  let moveX = 0, moveY = 0;
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) moveX = -1;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) moveX = 1;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) moveY = -1;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) moveY = 1;

  if (moveX !== 0 || moveY !== 0) {
    if (frameCount % 6 === 0) {
      moveMazePlayer(moveX, moveY);
    }
  } else {
    mPlayer.isWalking = false;
  }
}

function moveMazePlayer(dirX, dirY) {
  let targetGridX = mPlayer.gridX + dirX;
  let targetGridY = mPlayer.gridY + dirY;

  if (MAZE_MAP[targetGridY] && MAZE_MAP[targetGridY][targetGridX] === 0) {
    mPlayer.gridX = targetGridX;
    mPlayer.gridY = targetGridY;
    mPlayer.x = mMazeX + mPlayer.gridX * mCellSize + mCellSize / 2;
    mPlayer.y = mMazeY + mPlayer.gridY * mCellSize + mCellSize / 2;
    mPlayer.isWalking = true;

    let currentChest = mChests.find(c => c.gridX === mPlayer.gridX && c.gridY === mPlayer.gridY);
    if (currentChest) {
      if (mPlayer.lastChestTouch !== currentChest.id) {
        currentChest.opened = true;
        mActiveChestModal = currentChest;
        mPlayer.lastChestTouch = currentChest.id;
      }
    } else {
      mPlayer.lastChestTouch = null;
    }

    for (let enemy of mEnemies) {
      if (enemy.gridX === mPlayer.gridX && enemy.gridY === mPlayer.gridY) {
        triggerEnemyQuiz(enemy);
        break;
      }
    }

    let allOpened = mChests.every(c => c.opened);
    if (allOpened && mPlayer.gridX >= 11 && mPlayer.gridY >= 8) {
      gameState = 6;
      initConfetti(); // 進入結算畫面觸發噴撒彩帶
    }
  }
}

function updateMazeEnemies() {
  if (mActiveChestModal || mActiveEnemyModal || gameState !== 5) return;

  if (frameCount % 45 === 0) {
    for (let enemy of mEnemies) {
      let nextX = enemy.gridX + (enemy.isHorizontal ? enemy.dir : 0);
      let nextY = enemy.gridY + (!enemy.isHorizontal ? enemy.dir : 0);

      if (MAZE_MAP[nextY] && MAZE_MAP[nextY][nextX] === 0) {
        enemy.gridX = nextX;
        enemy.gridY = nextY;
      } else {
        enemy.dir *= -1;
      }

      if (enemy.gridX === mPlayer.gridX && enemy.gridY === mPlayer.gridY) {
        triggerEnemyQuiz(enemy);
        break;
      }
    }
  }
}

function triggerEnemyQuiz(enemy) {
  mActiveEnemyModal = enemy;
  mEnemyFeedbackMsg = "";
  mIsEnemyProcessing = false;

  let correctItem = random(ALL_VOCABULARY);
  let wrongPool = ALL_VOCABULARY.filter(v => v.name !== correctItem.name);
  let pickedWrong = shuffle(wrongPool).slice(0, 3);
  let options = shuffle([correctItem, ...pickedWrong]);

  mEnemyQuestion = {
    target: correctItem,
    options: options
  };
}

function drawEnemyQuizModal() {
  fill('rgba(45, 55, 72, 0.7)'); rect(0, 0, width, height);

  let modalW = min(width * 0.88, 420), modalH = 360;
  let mx = width / 2 - modalW / 2, my = height / 2 - modalH / 2;

  stroke('#E2E8F0'); fill('#FFFFFF'); rect(mx, my, modalW, modalH, 24);

  fill('#2D3748'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text("👾 遇到反派小怪！請回答單字：", width / 2, my + 22);

  fill('#EDF2F7'); stroke('#CBD5E1'); strokeWeight(1.5);
  rect(mx + 30, my + 60, modalW - 60, 58, 16);
  fill('#2B6CB0'); textAlign(CENTER, CENTER); textSize(24); textStyle(BOLD);
  text(mEnemyQuestion.target.name, width / 2, my + 89);

  let optW = (modalW - 70) / 2;
  let optH = 46;
  let startY = my + 135;

  for (let i = 0; i < mEnemyQuestion.options.length; i++) {
    let opt = mEnemyQuestion.options[i];
    let r = floor(i / 2), c = i % 2;
    let ox = mx + 25 + c * (optW + 20);
    let oy = startY + r * (optH + 12);

    fill('#F7FAFC'); stroke('#E2E8F0'); strokeWeight(1.5);
    rect(ox, oy, optW, optH, 12);

    fill('#2D3748'); textAlign(CENTER, CENTER); textSize(16); textStyle(BOLD);
    text(opt.zh, ox + optW / 2, oy + optH / 2);
  }

  if (mEnemyFeedbackMsg !== "") {
    textAlign(CENTER, CENTER); textSize(16); textStyle(BOLD);
    fill(mEnemyFeedbackMsg.includes("答對") ? '#38A169' : '#E53E3E');
    text(mEnemyFeedbackMsg, width / 2, my + modalH - 32);
  }
}

function checkEnemyAnswer(selectedOpt) {
  if (mIsEnemyProcessing) return;
  mIsEnemyProcessing = true;

  if (selectedOpt.name === mEnemyQuestion.target.name) {
    mEnemyFeedbackMsg = "✨ 答對了！成功消滅反派小怪！";
    setTimeout(() => {
      mEnemies = mEnemies.filter(e => e !== mActiveEnemyModal);
      mActiveEnemyModal = null;
      mEnemyQuestion = null;
      mIsEnemyProcessing = false;
    }, 800);
  } else {
    mEnemyFeedbackMsg = "❌ 答錯了！小精靈被彈回起點！";
    setTimeout(() => {
      mPlayer.gridX = 1;
      mPlayer.gridY = 1;
      mPlayer.x = mMazeX + mPlayer.gridX * mCellSize + mCellSize / 2;
      mPlayer.y = mMazeY + mPlayer.gridY * mCellSize + mCellSize / 2;
      mActiveEnemyModal = null;
      mEnemyQuestion = null;
      mIsEnemyProcessing = false;
    }, 800);
  }
}

function drawChestWordReviewModal(chest) {
  fill('rgba(45, 55, 72, 0.65)'); rect(0, 0, width, height);
  let modalW = min(width * 0.9, 440), modalH = 380;
  let mx = width / 2 - modalW / 2, my = height / 2 - modalH / 2;

  stroke('#E2E8F0'); fill('#FFFFFF'); rect(mx, my, modalW, modalH, 24);
  fill('#2D3748'); textAlign(CENTER, TOP); textSize(20); textStyle(BOLD);
  text(chest.title, width / 2, my + 22);

  let startY = my + 65;
  let cols = 2;
  let wordW = (modalW - 50) / cols;

  for (let i = 0; i < chest.items.length; i++) {
    let item = chest.items[i];
    let r = floor(i / cols);
    let c = i % cols;
    let wx = mx + 20 + c * (wordW + 10);
    let wy = startY + r * 46;

    fill('#F7FAFC'); stroke('#E2E8F0'); strokeWeight(1);
    rect(wx, wy, wordW, 40, 10);

    push();
    translate(wx + 18, wy + 20);
    if (gameState === 5) {
      if (chest.id === 1) { scale(0.24); drawAnimatedFruit(item.id, frameCount * 0.05); }
      else if (chest.id === 2) { scale(0.24); drawAnimatedVehicle(item.id, frameCount * 0.05); }
      else if (chest.id === 3) { scale(0.20); drawAnimalIllustration(item.id); }
    }
    pop();

    fill('#2D3748'); textAlign(LEFT, CENTER); textSize(13); textStyle(BOLD);
    text(item.name, wx + 38, wy + 13);
    fill('#718096'); textSize(11); textStyle(NORMAL);
    text(item.zh, wx + 38, wy + 27);
  }

  mModalCloseBtn.x = width / 2 - mModalCloseBtn.w / 2;
  mModalCloseBtn.y = my + modalH - 58;

  stroke('#4299E1'); fill('#63B3ED');
  rect(mModalCloseBtn.x, mModalCloseBtn.y, mModalCloseBtn.w, mModalCloseBtn.h, 24);
  fill('#FFFFFF'); textAlign(CENTER, CENTER); textSize(15); textStyle(BOLD);
  text("掌握單字，繼續探索 🚀", mModalCloseBtn.x + mModalCloseBtn.w / 2, mModalCloseBtn.y + mModalCloseBtn.h / 2);
}

// 結算畫面：全螢幕動態噴撒彩帶
function drawGameCompleteModal() {
  fill('rgba(45, 55, 72, 0.75)'); rect(0, 0, width, height);

  // 繪製與更新全螢幕彩帶粒子
  for (let p of confettiParticles) {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rot += p.rotSpeed;
    if (p.y > height) {
      p.y = -20;
      p.x = random(width);
    }
    push();
    translate(p.x, p.y);
    rotate(p.rot);
    fill(p.color); noStroke();
    rect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6, 2);
    pop();
  }

  let modalW = min(width * 0.9, 450), modalH = 450;
  let mx = width / 2 - modalW / 2, my = height / 2 - modalH / 2;

  stroke('#E2E8F0'); fill('#FFFFFF'); rect(mx, my, modalW, modalH, 24);

  fill('#38A169'); textAlign(CENTER, TOP); textSize(24); textStyle(BOLD);
  text("🎉 恭喜成功通關！大獲全勝！ 🎊", width / 2, my + 20);
  fill('#718096'); textSize(13); textStyle(NORMAL);
  text("太棒了！你已順利解開所有單字關卡與迷宮挑戰！", width / 2, my + 48);

  let boxY = my + 80;
  let boxH = 64;

  // 第一關
  fill('#F0FFF4'); stroke('#C6F6D5'); strokeWeight(1);
  rect(mx + 20, boxY, modalW - 40, boxH, 14);
  fill('#22543D'); textAlign(LEFT, TOP); textSize(14); textStyle(BOLD);
  text("🍓 第一關：水果單字連連看", mx + 35, boxY + 10);
  fill('#4A5568'); textSize(12); textStyle(NORMAL);
  let fScorePercent = round((fruitScore / FRUIT_ITEMS.length) * 100);
  text(`答對得分：${fScorePercent}分 | 耗時：${fruitTimeSpent}秒`, mx + 35, boxY + 34);

  // 第二關
  boxY += boxH + 8;
  fill('#EBF8FF'); stroke('#BEE3F8');
  rect(mx + 20, boxY, modalW - 40, boxH, 14);
  fill('#2B6CB0'); textAlign(LEFT, TOP); textSize(14); textStyle(BOLD);
  text("🚗 第二關：交通工具選選看", mx + 35, boxY + 10);
  fill('#4A5568'); textSize(12); textStyle(NORMAL);
  text(`一次答對：${vFirstTryCorrect}/3 題 | 重新選擇次數：${vWrongAttempts} 次`, mx + 35, boxY + 34);

  // 第三關
  boxY += boxH + 8;
  fill('#FEFCBF'); stroke('#FAF089');
  rect(mx + 20, boxY, modalW - 40, boxH, 14);
  fill('#744210'); textAlign(LEFT, TOP); textSize(14); textStyle(BOLD);
  text("🧩 第三關：動物 3×3 拼圖", mx + 35, boxY + 10);
  fill('#4A5568'); textSize(12); textStyle(NORMAL);
  text(`完成題數：2/2 題 | 拼圖總耗時：${pTotalTimeSpent}秒`, mx + 35, boxY + 34);

  // 第四關
  boxY += boxH + 8;
  fill('#FAF5FF'); stroke('#E9D8FD');
  rect(mx + 20, boxY, modalW - 40, boxH, 14);
  fill('#553C9A'); textAlign(LEFT, TOP); textSize(14); textStyle(BOLD);
  text("🌳 第四關：溫馨迷宮單字大冒險", mx + 35, boxY + 10);
  fill('#4A5568'); textSize(12); textStyle(NORMAL);
  let openedCount = mChests.filter(c => c.opened).length;
  text(`寶箱開啟：${openedCount}/3 個 | 成功避開反派走出迷宮！`, mx + 35, boxY + 34);

  mFinalRestartBtn.x = width / 2 - mFinalRestartBtn.w / 2;
  mFinalRestartBtn.y = my + modalH - 58;

  stroke('#38A169'); fill('#48BB78');
  rect(mFinalRestartBtn.x, mFinalRestartBtn.y, mFinalRestartBtn.w, mFinalRestartBtn.h, 24);
  fill('#FFFFFF'); textAlign(CENTER, CENTER); textSize(16); textStyle(BOLD);
  text("再玩一次 🔄", mFinalRestartBtn.x + mFinalRestartBtn.w / 2, mFinalRestartBtn.y + mFinalRestartBtn.h / 2);
}

// ==========================================
// 互動事件處理 (Pointer Events)
// ==========================================
function mousePressed() { pointerDown(mouseX, mouseY); }
function touchStarted() { pointerDown(touches[0].x, touches[0].y); return false; }
function mouseDragged() { pointerMove(mouseX, mouseY); }
function touchMoved() { pointerMove(touches[0].x, touches[0].y); return false; }
function mouseReleased() { pointerUp(); }
function touchEnded() { pointerUp(); return false; }

function pointerDown(px, py) {
  if (gameState === 1) {
    if (fruitIsSubmitted) {
      if (px >= fruitNextLevelBtn.x && px <= fruitNextLevelBtn.x + fruitNextLevelBtn.w &&
          py >= fruitNextLevelBtn.y && py <= fruitNextLevelBtn.y + fruitNextLevelBtn.h) {
        initVehicleLevel();
      }
      return;
    }

    if (px >= fruitSubmitBtn.x && px <= fruitSubmitBtn.x + fruitSubmitBtn.w &&
        py >= fruitSubmitBtn.y && py <= fruitSubmitBtn.y + fruitSubmitBtn.h) {
      checkFruitAnswers(); return;
    }

    for (let l of fruitLabels) {
      if (px >= l.x && px <= l.x + l.w && py >= l.y && py <= l.y + l.h) {
        fruitDraggedLabel = l; fruitPointerStartX = px; fruitPointerStartY = py;
        fruitIsDragging = false; return;
      }
    }

    if (fruitSelectedLabel) {
      for (let i = 0; i < fruitCards.length; i++) {
        let c = fruitCards[i];
        if (px >= c.x && px <= c.x + c.w && py >= c.y && py <= c.y + c.h) {
          placeFruitLabel(fruitSelectedLabel, i);
          fruitSelectedLabel = null; return;
        }
      }
      fruitSelectedLabel = null;
    }
  }

  else if (gameState === 2) {
    let currentQ = vQuestions[vCurrentIndex];

    for (let btn of vOptButtons) {
      if (px >= btn.x && px <= btn.x + btn.w && py >= btn.y && py <= btn.y + btn.h) {
        vSelectedOption = btn.item;
        if (btn.item.id === currentQ.id) {
          vFeedbackMsg = "✨ 答對了！太棒了！";
          if (!vIsCurrentFailed) vFirstTryCorrect++;
          setTimeout(() => {
            vFeedbackMsg = "";
            vCurrentIndex++;
            if (vCurrentIndex >= 3) {
              initPuzzleLevel();
            } else {
              setupVehicleQuestion();
            }
          }, 600);
        } else {
          vWrongAttempts++;
          vIsCurrentFailed = true;
          vFeedbackMsg = "❌ 再試一次看看喔！";
        }
        return;
      }
    }
  }

  else if (gameState === 3) {
    if (pIsSingleQuestionDone) {
      if (px >= pContinueQuestionBtn.x && px <= pContinueQuestionBtn.x + pContinueQuestionBtn.w &&
          py >= pContinueQuestionBtn.y && py <= pContinueQuestionBtn.y + pContinueQuestionBtn.h) {
        pCurrentIndex++;
        if (pCurrentIndex >= 2) {
          pTotalTimeSpent = floor((millis() - pStartTime) / 1000);
          gameState = 4;
        } else {
          setupPuzzleQuestion();
        }
      }
      return;
    }

    if (px >= pResetBtn.x && px <= pResetBtn.x + pResetBtn.w &&
        py >= pResetBtn.y && py <= pResetBtn.y + pResetBtn.h) {
      resetCurrentPuzzle();
      return;
    }

    for (let p of pPieces) {
      let renderW = p.currentSlot !== -1 ? p.w : p.displayW;
      if (px >= p.x && px <= p.x + renderW && py >= p.y && py <= p.y + renderW) {
        pDraggedPiece = p;
        pPointerStartX = px;
        pPointerStartY = py;
        pIsDragging = false;
        return;
      }
    }

    if (pSelectedPiece) {
      for (let slot of pGridSlots) {
        if (px >= slot.x && px <= slot.x + slot.w && py >= slot.y && py <= slot.y + slot.h) {
          tryPlacePuzzlePiece(pSelectedPiece, slot.id);
          pSelectedPiece = null;
          return;
        }
      }
      pSelectedPiece = null;
    }
  }

  else if (gameState === 4) {
    if (px >= pNextLevelBtn.x && px <= pNextLevelBtn.x + pNextLevelBtn.w &&
        py >= pNextLevelBtn.y && py <= pNextLevelBtn.y + pNextLevelBtn.h) {
      initMazeLevel();
    }
  }

  else if (gameState === 5) {
    if (mActiveChestModal) {
      if (px >= mModalCloseBtn.x && px <= mModalCloseBtn.x + mModalCloseBtn.w &&
          py >= mModalCloseBtn.y && py <= mModalCloseBtn.y + mModalCloseBtn.h) {
        mActiveChestModal = null;
      }
      return;
    }

    if (mActiveEnemyModal && mEnemyQuestion) {
      let modalW = min(width * 0.88, 420);
      let mx = width / 2 - modalW / 2;
      let optW = (modalW - 70) / 2;
      let optH = 46;
      let startY = height / 2 - 360 / 2 + 135;

      for (let i = 0; i < mEnemyQuestion.options.length; i++) {
        let opt = mEnemyQuestion.options[i];
        let r = floor(i / 2), c = i % 2;
        let ox = mx + 25 + c * (optW + 20);
        let oy = startY + r * (optH + 12);

        if (px >= ox && px <= ox + optW && py >= oy && py <= oy + optH) {
          checkEnemyAnswer(opt);
          return;
        }
      }
      return;
    }

    if (px >= mDpad.up.x && px <= mDpad.up.x + mDpad.up.w && py >= mDpad.up.y && py <= mDpad.up.y + mDpad.up.h) moveMazePlayer(0, -1);
    if (px >= mDpad.down.x && px <= mDpad.down.x + mDpad.down.w && py >= mDpad.down.y && py <= mDpad.down.y + mDpad.down.h) moveMazePlayer(0, 1);
    if (px >= mDpad.left.x && px <= mDpad.left.x + mDpad.left.w && py >= mDpad.left.y && py <= mDpad.left.y + mDpad.left.h) moveMazePlayer(-1, 0);
    if (px >= mDpad.right.x && px <= mDpad.right.x + mDpad.right.w && py >= mDpad.right.y && py <= mDpad.right.y + mDpad.right.h) moveMazePlayer(1, 0);
  }

  else if (gameState === 6) {
    if (px >= mFinalRestartBtn.x && px <= mFinalRestartBtn.x + mFinalRestartBtn.w &&
        py >= mFinalRestartBtn.y && py <= mFinalRestartBtn.y + mFinalRestartBtn.h) {
      gameState = 1;
      initFruitLevel();
    }
  }
}

function pointerMove(px, py) {
  if (gameState === 1 && fruitDraggedLabel) {
    if (dist(px, py, fruitPointerStartX, fruitPointerStartY) > 6) {
      fruitIsDragging = true; fruitSelectedLabel = null;
    }
    if (fruitIsDragging) {
      fruitDraggedLabel.x = px - fruitDraggedLabel.w / 2;
      fruitDraggedLabel.y = py - fruitDraggedLabel.h / 2;
    }
  } else if (gameState === 3 && pDraggedPiece) {
    if (dist(px, py, pPointerStartX, pPointerStartY) > 6) {
      pIsDragging = true; pSelectedPiece = null;
    }
    if (pIsDragging) {
      let renderW = pDraggedPiece.currentSlot !== -1 ? pDraggedPiece.w : pDraggedPiece.displayW;
      pDraggedPiece.x = px - renderW / 2;
      pDraggedPiece.y = py - renderW / 2;
    }
  }
}

function pointerUp() {
  if (gameState === 1 && fruitDraggedLabel) {
    if (!fruitIsDragging) {
      fruitSelectedLabel = (fruitSelectedLabel === fruitDraggedLabel) ? null : fruitDraggedLabel;
    } else {
      let targetIndex = -1;
      for (let i = 0; i < fruitCards.length; i++) {
        let c = fruitCards[i];
        let cx = fruitDraggedLabel.x + fruitDraggedLabel.w / 2;
        let cy = fruitDraggedLabel.y + fruitDraggedLabel.h / 2;
        if (cx >= c.x && cx <= c.x + c.w && cy >= c.y && cy <= c.y + c.h) {
          targetIndex = i; break;
        }
      }
      if (targetIndex !== -1) {
        placeFruitLabel(fruitDraggedLabel, targetIndex);
      } else {
        if (fruitDraggedLabel.placedSlot !== -1) {
          fruitSlots[fruitDraggedLabel.placedSlot] = null;
          fruitDraggedLabel.placedSlot = -1;
        }
        fruitDraggedLabel.x = fruitDraggedLabel.origX;
        fruitDraggedLabel.y = fruitDraggedLabel.origY;
      }
    }
    fruitDraggedLabel = null; fruitIsDragging = false;

  } else if (gameState === 3 && pDraggedPiece) {
    if (!pIsDragging) {
      pSelectedPiece = (pSelectedPiece === pDraggedPiece) ? null : pDraggedPiece;
    } else {
      let targetSlotId = -1;
      let renderW = pDraggedPiece.currentSlot !== -1 ? pDraggedPiece.w : pDraggedPiece.displayW;
      let cx = pDraggedPiece.x + renderW / 2;
      let cy = pDraggedPiece.y + renderW / 2;

      for (let slot of pGridSlots) {
        if (cx >= slot.x && cx <= slot.x + slot.w && cy >= slot.y && cy <= slot.y + slot.h) {
          targetSlotId = slot.id; break;
        }
      }

      if (targetSlotId !== -1) {
        tryPlacePuzzlePiece(pDraggedPiece, targetSlotId);
      } else {
        bounceBackPiece(pDraggedPiece);
      }
    }
    pDraggedPiece = null; pIsDragging = false;
  }
}

function tryPlacePuzzlePiece(pieceObj, slotId) {
  let targetSlot = pGridSlots.find(s => s.id === slotId);

  if (pieceObj.origRow === targetSlot.row && pieceObj.origCol === targetSlot.col) {
    if (pieceObj.currentSlot !== -1) {
      let oldSlot = pGridSlots.find(s => s.id === pieceObj.currentSlot);
      if (oldSlot) oldSlot.occupiedPieceId = null;
    }
    targetSlot.occupiedPieceId = pieceObj.id;
    pieceObj.currentSlot = slotId;
    pieceObj.x = targetSlot.x;
    pieceObj.y = targetSlot.y;

    checkPuzzleComplete();
  } else {
    bounceBackPiece(pieceObj);
  }
}

function bounceBackPiece(pieceObj) {
  if (pieceObj.currentSlot !== -1) {
    let oldSlot = pGridSlots.find(s => s.id === pieceObj.currentSlot);
    if (oldSlot) oldSlot.occupiedPieceId = null;
    pieceObj.currentSlot = -1;
  }
  pieceObj.x = pieceObj.origX;
  pieceObj.y = pieceObj.origY;
}

function placeFruitLabel(labelObj, slotIndex) {
  let oldSlot = labelObj.placedSlot;
  let existingId = fruitSlots[slotIndex];
  if (existingId !== null && existingId !== labelObj.id) {
    let existingLabel = fruitLabels.find(l => l.id === existingId);
    if (oldSlot !== -1) {
      fruitSlots[oldSlot] = existingLabel.id;
      existingLabel.placedSlot = oldSlot;
      existingLabel.x = fruitCards[oldSlot].x + (fruitCards[oldSlot].w - existingLabel.w) / 2;
      existingLabel.y = fruitCards[oldSlot].slotY;
    } else {
      existingLabel.placedSlot = -1;
      existingLabel.x = existingLabel.origX; existingLabel.y = existingLabel.origY;
    }
  } else if (oldSlot !== -1) {
    fruitSlots[oldSlot] = null;
  }
  fruitSlots[slotIndex] = labelObj.id;
  labelObj.placedSlot = slotIndex;
  labelObj.x = fruitCards[slotIndex].x + (fruitCards[slotIndex].w - labelObj.w) / 2;
  labelObj.y = fruitCards[slotIndex].slotY;
}

function checkFruitAnswers() {
  fruitScore = 0; fruitResults = [];
  for (let i = 0; i < fruitCards.length; i++) {
    let isCorrect = (fruitCards[i].item.id === fruitSlots[i]);
    fruitResults.push(isCorrect);
    if (isCorrect) fruitScore += 1;
  }
  fruitIsSubmitted = true;
}

// ==========================================
// 四大動物插圖繪製 (Lion, Cat, Rabbit, Cow)
// ==========================================
function drawAnimalIllustration(type) {
  noStroke();

  if (type === 'lion') {
    fill('#A0522D');
    for (let a = 0; a < TWO_PI; a += PI / 6) {
      ellipse(cos(a) * 75, sin(a) * 75 - 15, 55, 55);
    }
    fill('#FFD166');
    ellipse(0, 80, 110, 80);
    ellipse(0, -15, 120, 105);
    ellipse(-45, -50, 32, 32); ellipse(45, -50, 32, 32);
    fill('#FFF8E7'); ellipse(0, 0, 48, 38);
    fill('#2B2B2B');
    ellipse(-25, -12, 9, 11); ellipse(25, -12, 9, 11);
    fill('#8B4513'); ellipse(0, -8, 18, 13);
    stroke('#FFD166'); strokeWeight(12);
    noFill(); arc(55, 60, 40, 50, -HALF_PI, 0);
    noStroke(); fill('#A0522D'); ellipse(75, 55, 22, 22);

  } else if (type === 'cat') {
    fill('#FFF8E7');
    ellipse(0, 60, 95, 80);
    ellipse(0, -15, 120, 100);
    fill('#F4A261');
    triangle(-55, -45, -20, -75, -5, -40);
    triangle(55, -45, 20, -75, 5, -40);
    arc(-25, -30, 60, 50, PI, TWO_PI);
    fill('#FFB5A7');
    triangle(-48, -45, -24, -68, -12, -42);
    triangle(48, -45, 24, -68, 12, -42);
    fill('#2B2B2B');
    ellipse(-24, -12, 9, 11); ellipse(24, -12, 9, 11);
    stroke('#8D6E63'); strokeWeight(3.5);
    line(-50, -15, -28, -10); line(-50, 0, -28, -2);
    line(50, -15, 28, -10); line(50, 0, 28, -2);
    stroke('#F4A261'); strokeWeight(16); noFill();
    arc(45, 50, 50, 60, -HALF_PI, HALF_PI);

  } else if (type === 'rabbit') {
    fill('#FFF8E7'); noStroke();
    ellipse(-22, -75, 28, 85); ellipse(22, -75, 28, 85);
    fill('#FFB5A7');
    ellipse(-22, -75, 16, 65); ellipse(22, -75, 16, 65);
    fill('#FFF8E7');
    ellipse(0, 55, 95, 80);
    ellipse(0, -10, 115, 95);
    fill('#2B2B2B');
    ellipse(-22, -8, 9, 11); ellipse(22, -8, 9, 11);
    fill('#FFF8E7'); ellipse(52, 65, 26, 26);

  } else if (type === 'cow') {
    fill('#FFFFFF'); stroke('#E2E8F0'); strokeWeight(1.5);
    rect(-60, -10, 120, 85, 20);
    noStroke();
    fill('#4A4E69');
    ellipse(-35, 15, 45, 35); ellipse(40, 25, 55, 40);
    fill('#FFD166');
    ellipse(-25, -60, 16, 26); ellipse(25, -60, 16, 26);
    fill('#FFFFFF'); ellipse(0, -25, 110, 85);
    fill('#4A4E69');
    ellipse(-50, -35, 30, 18); ellipse(50, -35, 30, 18);
    fill('#FFC6FF'); ellipse(0, -10, 75, 48);
    fill('#8D6E63'); ellipse(-14, -10, 8, 8); ellipse(14, -10, 8, 8);
    fill('#2B2B2B'); ellipse(-24, -32, 8, 10); ellipse(24, -32, 8, 10);
    fill('#6C757D');
    rect(-50, 60, 20, 18, 4); rect(-20, 60, 20, 18, 4);
    rect(10, 60, 20, 18, 4); rect(40, 60, 20, 18, 4);
  }
}

// ==========================================
// 插圖風水果與交通工具向量圖案繪製
// ==========================================
function drawAnimatedFruit(type, t) {
  noStroke();
  if (type === 'apple') {
    fill('#FF5349'); ellipse(0, 3, 56, 50);
    stroke('#704214'); strokeWeight(3.5); line(-1, -22, -4, -30);
    noStroke(); fill('#8BC34A'); push(); translate(6, -26); rotate(0.4); ellipse(0, 0, 16, 8); pop();
    fill('#2B2B2B'); ellipse(-10, 4, 4.5, 5); ellipse(10, 4, 4.5, 5);
    fill('rgba(255, 255, 255, 0.6)'); ellipse(-16, -10, 10, 5);
  } else if (type === 'banana') {
    rotate(sin(t * 1.5) * 0.08);
    fill('#FDD835'); arc(5, 2, 55, 50, 0.1, PI - 0.1, CHORD);
    fill('#FFE082'); arc(-5, 0, 58, 48, 0.2, PI - 0.2, CHORD);
    fill('#8D6E63'); rect(-25, -2, 7, 7, 2); rect(20, 8, 5, 5, 1);
    fill('#2B2B2B'); ellipse(-8, 8, 4, 4.5); ellipse(6, 8, 4, 4.5);
  } else if (type === 'strawberry') {
    fill('#FF5252'); ellipse(0, 4, 52, 48); triangle(-25, 4, 25, 4, 0, 30);
    fill('#7CB342'); ellipse(0, -18, 36, 12); ellipse(-10, -16, 14, 8); ellipse(10, -16, 14, 8);
    fill('#2B2B2B'); ellipse(-8, 3, 4, 5); ellipse(8, 3, 4, 5);
    fill('#FFEBEE'); ellipse(-14, 12, 3, 5); ellipse(14, 12, 3, 5); ellipse(0, 20, 3, 5);
  } else if (type === 'grape') {
    fill('#B388FF'); ellipse(-12, -8, 20, 20); ellipse(12, -8, 20, 20);
    ellipse(-16, 8, 18, 18); ellipse(16, 8, 18, 18); ellipse(0, 4, 22, 22);
    ellipse(-8, 20, 16, 16); ellipse(8, 20, 16, 16); ellipse(0, 28, 14, 14);
    fill('#7CB342'); push(); translate(8, -20); rotate(-0.3); ellipse(0, 0, 24, 14); pop();
    fill('#2B2B2B'); ellipse(-5, 4, 4, 4.5); ellipse(5, 4, 4, 4.5);
  } else if (type === 'orange') {
    fill('#FF9800'); ellipse(0, 3, 54, 52);
    fill('#8BC34A'); push(); translate(6, -24); rotate(-0.3); ellipse(0, 0, 18, 9); pop();
    fill('#704214'); ellipse(0, -23, 4, 4);
    fill('#2B2B2B'); ellipse(-10, 5, 4.5, 5); ellipse(10, 5, 4.5, 5);
  } else if (type === 'watermelon') {
    rotate(sin(t * 1.5) * 0.05);
    fill('#66BB6A'); arc(0, 0, 68, 54, 0, PI);
    fill('#E8F5E9'); arc(0, 0, 60, 46, 0, PI);
    fill('#FF5252'); arc(0, 0, 54, 40, 0, PI);
    fill('#2B2B2B'); ellipse(-8, 7, 4, 4.5); ellipse(8, 7, 4, 4.5);
    fill('#2B2B2B'); ellipse(-15, 14, 3, 5); ellipse(15, 14, 3, 5); ellipse(-5, 20, 3, 5); ellipse(5, 20, 3, 5);
  }
}

function drawAnimatedVehicle(type, t) {
  noStroke();
  if (type === 'car') {
    fill('#FF5252'); rect(-42, -5, 84, 28, 14);
    fill('#FF5252'); arc(-5, -5, 52, 42, PI, 0);
    fill('#E0F7FA'); arc(-5, -5, 42, 32, PI, 0);
    stroke('#FF5252'); strokeWeight(3); line(-5, -20, -5, -5); noStroke();
    fill('#2B2B2B'); ellipse(-20, -3, 4, 5); ellipse(0, -3, 4, 5);
    fill('#FFEB3B'); ellipse(-38, 8, 12, 12);
    fill('#5D4037'); ellipse(-24, 22, 20, 20); ellipse(20, 22, 20, 20);
    fill('#D7CCC8'); ellipse(-24, 22, 8, 8); ellipse(20, 22, 8, 8);
  } else if (type === 'airplane') {
    rotate(sin(t * 1.2) * 0.05);
    fill('#42A5F5'); quad(-10, -12, 10, -12, 25, -30, 5, -30);
    fill('#FFFFFF'); stroke('#E0F7FA'); strokeWeight(1.5); ellipse(0, 0, 95, 36); noStroke();
    fill('#42A5F5'); arc(-36, 1, 22, 26, HALF_PI, PI + HALF_PI); quad(25, -8, 40, -8, 44, -24, 32, -24);
    quad(-8, 2, 12, 2, -2, 28, -20, 28);
    fill('#2B2B2B'); ellipse(-26, -3, 4, 5);
    fill('#B3E5FC'); ellipse(-10, -3, 8, 8); ellipse(4, -3, 8, 8); ellipse(18, -3, 8, 8);
  } else if (type === 'truck') {
    fill('#FFCA28'); rect(-42, -25, 48, 40, 6);
    fill('#FFA000'); rect(-30, -20, 4, 28, 2); rect(-18, -20, 4, 28, 2); rect(-6, -20, 4, 28, 2);
    fill('#42A5F5'); rect(4, -12, 38, 28, 6);
    fill('#E0F7FA'); rect(12, -8, 24, 14, 4);
    fill('#2B2B2B'); ellipse(18, -1, 4, 5); ellipse(30, -1, 4, 5);
    fill('#FFEB3B'); ellipse(40, 6, 8, 8);
    fill('#5D4037'); ellipse(-25, 18, 20, 20); ellipse(22, 18, 20, 20);
    fill('#D7CCC8'); ellipse(-25, 18, 8, 8); ellipse(22, 18, 8, 8);
  } else if (type === 'scooter') {
    fill('#FFCA28'); arc(-10, 8, 48, 26, PI, 0); rect(-5, 0, 25, 10, 3); rect(12, -18, 10, 25, 4);
    fill('#6D4C41'); rect(-22, -8, 32, 12, 6);
    fill('#FFFFFF'); ellipse(16, -22, 16, 16); fill('#FFEB3B'); ellipse(16, -22, 12, 12);
    fill('#2B2B2B'); ellipse(0, -6, 3.5, 4.5); ellipse(10, -6, 3.5, 4.5);
    fill('#5D4037'); ellipse(-22, 12, 20, 20); ellipse(18, 12, 20, 20);
    fill('#D7CCC8'); ellipse(-22, 12, 8, 8); ellipse(18, 12, 8, 8);
  } else if (type === 'bicycle') {
    stroke('#9CCC65'); strokeWeight(4); noFill();
    triangle(-18, 10, 2, -12, 18, 10); line(2, -12, -12, -12); line(18, 10, 16, -16);
    stroke('#5D4037'); strokeWeight(3.5); ellipse(-26, 10, 32, 32); ellipse(24, 10, 32, 32);
    stroke('#BCAAA4'); strokeWeight(1.5); line(-26, -6, -26, 26); line(-42, 10, -10, 10); line(24, -6, 24, 26); line(8, 10, 40, 10);
    noStroke(); fill('#FFE082'); rect(-24, -18, 16, 12, 2);
    fill('#6D4C41'); rect(10, -19, 16, 6, 3);
  }
}