# practice-Responsive (벽돌깨기)



 





 개요
  ===
<img src="https://res.cloudinary.com/yayayaya/image/upload/v1689581560/Mini2_dm2xta.png" />
js에서 canvas를 이용한 벽돌깨기 게임
<br> scss를 사용한 반응형 사이트

공이 다른 오브젝트에 충돌할 때 마다 속도가 빨라진다.


<br> localStorage에 저장 삭제가능한 Tip 작성란 / 클리어시 이름 등록





### link : https://mildmocha.github.io/practice-Responsive/

 기능
  ===

* Firebase를 이용해 로그인과 Realtime Database로 게시판 서버를 구현 <br>

 
* 벽돌깨기 (게임)
  *  start를 누르면 canvas 생성 
  *  paddle, brick, ballRadius 등을 변수로 선언해서 요소들의 크기, 위치 등 조정가능
  *  공의 위치를 x,y로 설정 dx, dy로 x,y 값을 변경해서 공을 움직임
  *  벽돌에 status값을 주어 공의 반경과 벽돌의 넓이와 x,y값이 같아지면 status 감소로 충돌을 감지하여 그 위치에 있는 벽돌이 없어짐 (생성되지 않음)
  *  벽돌과 충돌시 score +1 ,dx ,dy 값에 -를 부여해서 진행방향을 반대로 바꿈 , 한 번 충돌시 마다 공의 속도가 10%씩 증가 
  *  mouse움직임과, 방향키 함수로 paddle의 x값을 변경해 paddle 움직임 구현
  *  공이 바닥에 닿을시 종료
 
* Tip(게시판)
  * 아무 글이나 쓰고 작성버튼을 누르면 localstorage에 스트링리터럴 방식으로 ul.item에 저장
  * scrollIntoView로 새로 생성된 item으로 자동 스크롤
  * 삭제버튼 클릭시 item의 id값을 받아와 filter를 사용해 제거

* 중간에 디자인적 요소를 위해 스크롤위치값에 따른 opacity와 x값 변경으로 움직이는 이미지

* Winner(클리어명단)
  * 게임 클리어시 나오는 prompt창에 이름을 입력하면 localstorage에 저장되어 이름이 나타남
  * 기본적인 매커니즘은 Tip과 같음



 
 후기
  ===
게임을 만드는 것이 코딩실력향상에 여러방면으로 도움이 될 것 같아서 시작했다.
그러다 MDN에 있는 예제를 발견해 참고해 만들었다. 여러가지 요소를 추가하려 했지만 학원에서 만드는 프로젝트와 방향이 달라서 살짝 이도저도 아니게 된 느낌이 있는 프로젝트. 이런 식으로도 스크립트를 작성할 수 있구나라는 생각이 들게 해준 프로젝트였다. 
