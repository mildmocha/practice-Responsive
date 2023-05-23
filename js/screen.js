//window.addEventListener('scroll',()=>{
//console.log (window.scrollY)})
// 이미지 요소를 선택합니다.
const image = document.querySelector('.arc');

// 이미지를 확대 또는 축소할 수 있는 최대 크기와 최소 크기를 지정합니다.
const maxOpacity = 1;
const minOpacity = 0 ;

// 스크롤 이벤트를 처리하는 함수를 정의합니다.
function handleScroll() {
  // 현재 스크롤 위치를 가져옵니다.
  const scrollPosition = window.scrollY;

  // 이미지 크기를 계산합니다.
  const scaleFactor =  (document.documentElement.scrollHeight - window.innerHeight);
  const opacity =  scaleFactor * (scrollPosition )/45000000;

  // 이미지 크기를 적용합니다.
  image.style.opacity = opacity;
  image.style.transform = `translateX(${scrollPosition-4400}px)`;

  

  
}

// 스크롤 이벤트 리스너를 등록합니다.
window.addEventListener('scroll', handleScroll);
 

//header
const header = document.querySelector('header')

let pos = {y:0, oy:0, status:true}
window.onscroll = function(){  
    pos.y = window.scrollY;   //현재 스크롤값
    
    pos.status = pos.oy < pos.y;  
    //현재 스크롤값이 과거 스크롤 값보다 컸을때 true
    
    pos.oy = pos.y; 
    if(pos.status){ console.log('scr')
    header.classList.add('scr')
}else { 
  header.classList.remove('scr')
  } }