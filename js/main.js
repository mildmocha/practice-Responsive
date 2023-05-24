
        
        const startBtn = document.querySelector('.start')
        //캔버스 

        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");

        let displayWidth = window.innerWidth
        let displayHeight = window.innerHeight
        
     
       
        // 공 속도
        let dx = displayWidth/180;
        let dy = displayWidth/180;
  
        let ballRadius = displayWidth/50;
  
        //패들 설정
        let paddleHeight = displayHeight/40;
        let paddleWidth = displayWidth/ 8   
        let paddleX = (canvas.width+paddleWidth-300); //패들위치
   //공 위치
   let x = canvas.width / 2;
   let y = canvas.height +260;
   console.log (y)
        //좌우
        let rightPressed = false;
        let leftPressed = false;
        let spaceBar = false;
  
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
      

       
  
  //벽돌 선언
  let brickRowCount =2 ; //열
  let brickColumnCount =9; //행
  let brickWidth = displayWidth/11;
  let brickHeight= displayHeight/25 ;
  let brickPadding = displayWidth/190;
  let brickOffsetTop = displayHeight/10;
  let brickOffsetLeft = displayWidth/15;
  
  
  
  
  
  let bricks = [];
  for(let c= 0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(let r=0; r<brickRowCount; r++){
          bricks[c][r] = {x:0,y:0, status:1};
      }
  }
  
  let score= 0;
  
  //점수함수
  function drawScore(){
      ctx.font =  `${displayWidth/25}px arial`;
      ctx.fillStyle = "#0095dd";
      ctx.fillText("Score: " +score,8,60);
  }
  
  //벽돌그리는 함수
  function drawBricks(){
      
      
      for(let c=0; c<brickColumnCount; c++){
          for(let r=0; r<brickRowCount; r++){
              if(bricks[c][r].status==1){
              let brickX= ( c*(brickWidth+brickPadding))+brickOffsetLeft;
  let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
  
              bricks[c][r].x = brickX;
              bricks[c][r].y = brickY;
              ctx.beginPath();
              ctx.rect(brickX,brickY, brickWidth, brickHeight);
              ctx.fillStyle = "#0095dd";
              ctx.fill()
              ctx.closePath();
              }
          }
      }
  }
  



  //충돌감지함수
  function collisionDetection(){
      for(let c=0; c<brickColumnCount; c++) {
          for (let r=0; r<brickRowCount; r++){
              let b= bricks[c][r];
              if(b.status==1){
              if(x > b.x && x< b.x+ballRadius+brickWidth && y > b.y && y < b.y+brickHeight+ballRadius){
                  dy=-dy;
                  b.status=0;
                  score ++;
                  if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();}
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
          }
          else if (e.keyCode ==32){
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
          ctx.arc(x,y, ballRadius, 0, Math.PI * 2);
          
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
        function drawPaddle() {
          ctx.beginPath();
          ctx.rect(
            paddleX,
            canvas.height - paddleHeight,
            paddleWidth,
            paddleHeight
          );
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
  function canvasSize() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = displayWidth ;
    canvas.height = displayHeight;
   
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

        
  //함수실행 함수

        function draw() {
         
          canvasSize()
        
          ctx.clearRect(0, 0, canvas.width+100, canvas.height);
          
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
          if ( y + dy < ballRadius) {
            dy = -dy;
          } else if ( y + dy > canvas.height-ballRadius){
                  if( x > paddleX  && x < paddleX + paddleWidth +ballRadius){
                      dy = -dy ;
                  }
                  else {
            
  
                  
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
  
        
          
        window.addEventListener('resize', () => {  
          canvas.height = window.innerHeight 
          canvas.width = window.innerWidth 
        })
        startBtn.addEventListener("click",()=>{
          setInterval(draw,10)})