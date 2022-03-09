var menu = document.querySelector('.sandwich');
var SandwichMenu__menu_wrapper = document.querySelector('.SandwichMenu__menu-wrapper');
var sandwich_menu__link = document.querySelector('.sandwich-menu__link');
var sandwich_menu_overlay = document.getElementById('sandwich-menu__overlay');
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
