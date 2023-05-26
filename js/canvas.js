const items = document.querySelector('.items')   //ul
const input = document.querySelector('.footer_input')  
const addBtn = document.querySelector('.footerAdd_Btn')  
//let id = 0;
let products = []  //입력할 내용들 넣을 배열


//localStorage에 입력한 내용 저장
const save= () => {
  localStorage.setItem('products',JSON.stringify(products))
}


//클릭하면(input에 입력후 엔터치면) 발생할 함수 정의
function onAdd(){  
  const product = {
   // id:id,  //아이디값이 중복되는 상황이 발생되는 것을 막아주기 위해
   id:Date.now(),
    text:input.value
  } 
  products.push(product);
  // 배열 products안에 오브젝트 product(입력한 내용과 id)를 집어넣는다
  save(); //save함수 실행

  



  
  if(product.text == ''){
    input.focus();
    return;    
  }  
  //새로운 아이템을 만듦 (li.item_row)
 createItem(product);   //createItem실행



 



  //5.input 초기화
  input.value='';
  input.focus();
}


//li.item_row를 만들어주는 함수
function createItem(product){
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class','item_row');
  itemRow.setAttribute('data-id',product.id);







  //스트링 리터럴 방식으로 추가
  itemRow.innerHTML = `  
    <div class="item">
      <span class="item_name">${product.text}</span>
      <button class="itemDelete_btn">
        <i data-id=${product.id}>X</i>
      </button>
    </div>
    <div class="item_divider"></div>
    <hr></hr>`;
  //id++;

  //ul.items에 만든 아이템 추가
  items.appendChild(itemRow)
  //4. 새로 추가된 아이템이 화면에 보이게(자동으로 스크롤)
  itemRow.scrollIntoView();


  return items;  
  //최종적으로 만들어준 items(ul)를 리턴해줌  
}
//초기화 해주는 함수
function init() {
  const userProducts =JSON.parse(localStorage.getItem('products'))
  
  if(userProducts){
    userProducts.forEach(aa => createItem(aa)
    );
    products = userProducts
  }
}
init()



addBtn.addEventListener('click', onAdd);
input.addEventListener('keypress', event =>{
  event.key === "Enter" && onAdd()
});

input.addEventListener('focus',()=>{
  input.removeAttribute('placeholder')
})

//삭제
items.addEventListener('click',(e)=>{  
  const idc = e.target.dataset.id;  //쓰레기통을 눌렀을때만 id값 받아옴
  if(idc) {
    const toBeDeleted = document.querySelector(`.item_row[data-id="${idc}"]`)
    toBeDeleted.remove()

    //localstorage삭제
    products = products.filter((aa) => aa.id !== parseInt(idc)) ; // == parseInt
    save();
  }
})