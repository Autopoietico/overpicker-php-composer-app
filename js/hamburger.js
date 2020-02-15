let width677 = window.matchMedia('screen and (max-width: 677px)');
let headerNav = document.querySelector('.header-nav');
let burgerButton = document.getElementById('burger-menu');

function validation(event){
    if(event.matches){
        burgerButton.addEventListener('click', hideShow);
    }else{
        burgerButton.removeEventListener('click',hideShow);
    }
}

width677.addListener(validation);

validation(width677);

function hideShow(){
    if(headerNav.classList.contains('is-active')){
        headerNav.classList.remove('is-active');
    }else{
        headerNav.classList.add('is-active');
    }
}