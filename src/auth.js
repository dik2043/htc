
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


window.localStorage.getItem('userName') ? showUserInHeader(localStorage.getItem('userName')) : null;

const showModal = () => {
    modal.classList.remove('modal--hidden');
    window.setTimeout(() => modal.classList.remove('modal--invisible'), 50);
};

const hideModal = () => {
    modal.classList.add('modal--invisible');
    window.setTimeout(() => modal.classList.add('modal--hidden'), 200);
};

const addAnimation = () => {
    authForm.classList.add('modal__form--animation');
    window.setTimeout(() => authForm.classList.remove('modal__form--animation'), 200); 
};

const getPromptId = () => {
    let counter = [];
    authFormInputs.forEach((el) => {
        !el.value ? counter.push(el.id) : null;
    });
    return counter.length <= 1 ? counter[0] : 'all';
};

const getUserName = () => {
    return authForm.querySelector('.modal__login').value;
};

const changePromptText = (id) => {
    authPrompt.textContent = mapPrompt[id];
};


headerLogin.addEventListener('click', () => {
    showModal();
});

modalBackground.addEventListener('click', () => {
    hideModal();
});

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = getPromptId();
    changePromptText(id);
    
    if (id) {
        addAnimation();
    } else {
        const name = getUserName();
        const isRemember = authForm.querySelector('.modal__remember').checked;
        isRemember ? localStorage.setItem('userName', name) : null;
        showUserInHeader(name);
        hideModal();
    }
});


headerLogout.addEventListener('click', () => {
    localStorage.removeItem('userName');
    hideUserInHeader();
});