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
  const opacity =  scaleFactor * (scrollPosition )/29000000;

  // 이미지 크기를 적용합니다.
  image.style.opacity = opacity;
  image.style.transform = `translateX(${scrollPosition-4400}px)`;
 console.log (scrollPosition)
  console.log('opa',opacity)
  

  
}

// 스크롤 이벤트 리스너를 등록합니다.
window.addEventListener('scroll', handleScroll);
