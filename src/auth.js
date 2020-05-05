
const body = document.querySelector('body');

const headerLogin = document.querySelector('.header__login');
const headerLogout = document.querySelector('.header__logout');
const headerUserName = document.querySelector('.header__user-name');

const modal = document.querySelector('.modal');
const modalBackground = document.querySelector('.modal__background');

const authForm = document.querySelector('.modal__form');
const authFormInputs = authForm.querySelectorAll('.form-input');
const authPrompt = document.querySelector('.modal__prompt');

const mapPrompt = {
    "modal-login": "Пожалуйста, введите имя пользователя",
    "modal-pass": "Пожалуйста, введите пароль",
    "all": "Пожалуйста, введите логин и пароль"
};
const animationTime = 200;
const scrollWidth = 17;


const showUserInHeader = (name) => {
    headerUserName.textContent = name;
    headerLogin.classList.add('header__login--hidden');
    headerLogout.classList.remove('header__logout--hidden');
};

const hideUserInHeader = () => {
    headerUserName.textContent = '';
    headerLogin.classList.remove('header__login--hidden');
    headerLogout.classList.add('header__logout--hidden');
};


if (window.localStorage.getItem('userName')) {
    showUserInHeader(localStorage.getItem('userName'));
} else {
    showUserInHeader('Константин');
}


const showModal = () => {
    modal.classList.remove('modal--hidden');
    window.setTimeout(() => modal.classList.remove('modal--invisible'), 50);
};
const hideModal = () => {
    modal.classList.add('modal--invisible');
    window.setTimeout(() => modal.classList.add('modal--hidden'), animationTime);
};

const addAnimation = () => {
    authForm.classList.add('modal__form--animation');
    window.setTimeout(() => authForm.classList.remove('modal__form--animation'), animationTime); 
};

const getPromptId = () => {
    let counter = [];
    authFormInputs.forEach((el) => {
        !el.value ? counter.push(el.id) : null;
    });
    return counter.length <= 1 ? counter[0] : 'all';
};
const changePromptText = (id) => {
    authPrompt.textContent = mapPrompt[id];
};

const getUserName = () => {
    return authForm.querySelector('.modal__login').value;
};

const hideScroll = (scrollWidth) => {
    body.style.overflow = 'hidden';
    body.style.marginRight = `${ scrollWidth }px`;    
};
const showScroll = () => {
    window.setTimeout(() => {
        body.style.overflow = 'auto';
        body.style.marginRight = '0';
    }, animationTime)
};

const logIn = () => {
    const name = getUserName();
    const isRemember = authForm.querySelector('.modal__remember').checked;
    if (isRemember) {
        localStorage.setItem('userName', name);
    }
    showUserInHeader(name);
    hideModal();
    showScroll();
};



headerLogin.addEventListener('click', () => {
    showModal();
    let scrollWidth = window.innerWidth - document.documentElement.clientWidth;
    console.log(scrollWidth);
    hideScroll(scrollWidth);
});

modalBackground.addEventListener('click', () => {
    hideModal();
    showScroll();
});

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const promptId = getPromptId();
    changePromptText(promptId);
    
    if (promptId) {
        addAnimation();
    } else {
        logIn()
    }
});

headerLogout.addEventListener('click', () => {
    localStorage.removeItem('userName');
    hideUserInHeader();
});


export default headerUserName;