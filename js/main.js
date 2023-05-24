 
const startBtn = document.querySelector(".start");
//캔버스

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let displayWidth = window.innerWidth;
let displayHeight = window.innerHeight;

// 공 속도
let dx = displayWidth / 180;
let dy = displayWidth / 180;

let ballRadius = displayWidth / 50;

//패들 설정
let paddleHeight = displayHeight / 40;
let paddleWidth = displayWidth / 8;
let paddleX = canvas.width + paddleWidth - 300; //패들위치
//공 위치
let x = canvas.width / 2;
let y = canvas.height + 260;
console.log(y);
//좌우
let rightPressed = false;
let leftPressed = false;
let spaceBar = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//벽돌 선언
let brickRowCount = 1; //열
let brickColumnCount = 1; //행
let brickWidth = displayWidth / 11;
let brickHeight = displayHeight / 25;
let brickPadding = displayWidth / 190;
let brickOffsetTop = displayHeight / 10;
let brickOffsetLeft = displayWidth / 15;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

let score = 0;

//점수함수
function drawScore() {
  ctx.font = `${displayWidth / 25}px arial`;
  ctx.fillStyle = "#0095dd";
  ctx.fillText("Score: " + score, 8, 60);
}

//벽돌그리는 함수
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095dd";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

//충돌감지함수
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + ballRadius + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight + ballRadius
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {onAddRedcord()
          }
        }
      }
    }
  }
}

//방향키 함수
function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  } else if (e.keyCode == 32) {
    spaceBar = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

//공 만드는 함수

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);

  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function canvasSize() {
  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = displayWidth;
  canvas.height = displayHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//함수실행 함수

function draw() {
  canvasSize();

  ctx.clearRect(0, 0, canvas.width + 100, canvas.height);

  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();

  // 공 화면 안에 가두기
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  //바닥에 닿으면 끝 ( gameover 나중에 추가)
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth + ballRadius) {
      dy = -dy;
    } else {
    }
  }

  // 좌우이동
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 15;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 15;
  }
  x += dx;
  y += dy;
}

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});
startBtn.addEventListener("click", () => {
  setInterval(draw, 10);
});

//-----------------------

const record = document.querySelector(".record-ul"); //ul

//let id = 0;
let records = []; //입력할 내용들 넣을 배열

//localStorage에 입력한 내용 저장
const save2 = () => {
  localStorage.setItem("records", JSON.stringify(records));
};


//클릭하면(input에 입력후 엔터치면) 발생할 함수 정의
function onAddRedcord() {
const name = prompt("이름등록", "");


  records.push(name);
  // 배열 products안에 오브젝트 product(입력한 내용과 id)를 집어넣는다
  save2(); //save함수 실행

  console.log("records ? ", records);

  if (name.text == "") {
    prompt.focus();
    return;
  }
  //새로운 아이템을 만듦 (li.item_row)
  createItem2(name); //createItem실행
}

//li.item_row를 만들어주는 함수
function createItem2(name) {
  const itemRow2 = document.createElement("li");
  itemRow2.setAttribute("class", "record2_row");
  

  //스트링 리터럴 방식으로 추가
  itemRow2.innerHTML = `  
    <div class="record-2">
      <span class="record_name">${name}</span>
      
    </div>
    <div class="record_divider"></div>
    <hr></hr>`;
  //id++;

  //ul.items에 만든 아이템 추가
  record.appendChild(itemRow2);
  //4. 새로 추가된 아이템이 화면에 보이게(자동으로 스크롤)
  itemRow2.scrollIntoView();

  return record;
  //최종적으로 만들어준 items(ul)를 리턴해줌
}
//초기화 해주는 함수
function init2() {
  const userRecords =JSON.parse(localStorage.getItem('records'))
  console.log(userRecords)
  if(userRecords){
    userRecords.forEach(aa => createItem2(aa)
    );
    records = userRecords
  }
}
init2()

