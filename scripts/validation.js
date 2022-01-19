const lockButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
}

const unlockButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
}

const toggleButtonState = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
        lockButton(buttonElement, obj.inactiveButtonClass);
    } else {
        unlockButton(buttonElement, obj.inactiveButtonClass);
    }
}

const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
};


const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const isValid = (fieldSet, inputElement, obj) => {
    if (!inputElement.validity.valid) {
        showInputError(fieldSet, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError(fieldSet, inputElement, obj);
    }
};

const setEventListeners = (fieldSet, obj) => {
    const inputList = Array.from(fieldSet.querySelectorAll(obj.inputSelector));
    const buttonElement = fieldSet.querySelector(obj.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(fieldSet, inputElement, obj)
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
};

const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(obj.fieldSelector));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, obj);
        });
    });
};

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    inputErrorClass: "popup__input_type_error",
    fieldSelector: ".popup__form-set"
});
