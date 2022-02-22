var menu = document.querySelector('.sandwich');
var SandwichMenu__menu_wrapper = document.querySelector('.SandwichMenu__menu-wrapper');
var sandwich_menu__link = document.querySelector('.sandwich-menu__link');
menu.addEventListener('click', event => {
    menu.classList.toggle('sandwich_opened')
    if(!SandwichMenu__menu_wrapper.classList.contains('exit-done')){
        SandwichMenu__menu_wrapper.classList.toggle('enter-done')

    }
    else{
        SandwichMenu__menu_wrapper.classList.toggle('exit-done')
    }
    console.log(1);
  });
  sandwich_menu__link.addEventListener('click',event=>{
      menu.classList.toggle('sandwich_opened');
  })