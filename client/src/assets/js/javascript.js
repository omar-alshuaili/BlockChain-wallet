var menu = document.querySelector('.sandwich');
var SandwichMenu__menu_wrapper = document.querySelector('.SandwichMenu__menu-wrapper');
var sandwich_menu__link = document.querySelector('.sandwich-menu__link');
var sandwich_menu_overlay = document.getElementById('sandwich-menu__overlay');

var closeButton = document.querySelector('#closeButton')

var cookie = document.querySelector('.cookie-button')

if(cookie !=null){
  cookie.addEventListener('click',()=>{
    var over_cookie = document.querySelector('.over')
    var body_container = document.querySelector('.body-container')
    var cookie_container = document.querySelector('.cookie-container')
    over_cookie.classList.toggle('hide')
    body_container.classList.toggle('scrole')
  
    setTimeout(() => {
    
      // 👇️ removes element from DOM
      cookie_container.style.display = "none";
  
    }, 1000); // 👈️ time in milliseconds
  
  
  })
}


  //copy address 
  function copyAdress() {

    /* Get the text field */
    var copyText = document.querySelector(".address");

     /* Copy the text*/
     var elem = document.createElement("textarea");
     document.body.appendChild(elem);
     elem.value = copyText.textContent;
     elem.select();
     document.execCommand("copy");
     document.body.removeChild(elem);
  }

menu.addEventListener('click', event => {

    menu.classList.toggle('sandwich_opened')
    SandwichMenu__menu_wrapper.classList.toggle('enter-done')
    event.preventDefault();
    if(menu.classList.contains('sandwich_opened')){
        sandwich_menu_overlay.style.opacity = 1;
        sandwich_menu_overlay.style.visibility = 'visible';
        sandwich_menu_overlay.style.transition = 'transition: visibility .3s .3s,opacity .3s;';
    }
    else{
      sandwich_menu_overlay.style.opacity = 0;
      sandwich_menu_overlay.style.visibility = 'hidden';
    }
  });
  sandwich_menu__link.addEventListener('click',event=>{
      menu.classList.toggle('sandwich_opened');
    console.log(1);

  })







  