import headerUserName from "./auth";

const headerLogoutContainer = document.querySelector('.header__logout-container');

const createNameInput = (value) => {
    const input = document.createElement('input');
    input.classList.add('form-input');
    input.value = value;
    return input;
};

const onBlur = (input) => {
    headerUserName.textContent = input.value;
    localStorage.setItem('userName', input.value);
    headerLogoutContainer.replaceChild(headerUserName, input);
};

headerUserName.addEventListener('click', () => {
    const oldName = headerUserName.textContent;
    const input = createNameInput(oldName);
    
    headerLogoutContainer.replaceChild(input, headerUserName);
    input.focus();
    
    input.addEventListener('blur', () => {
        onBlur(input);
    })
});