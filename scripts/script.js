let formElement = document.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_occupation");
let closeButton = document.querySelector(".popup__close-button");
let profileName = document.querySelector(".profile__name-title");
let profileJob = document.querySelector(".profile__occupation");
let editButton = document.querySelector(".profile__name-button");
let popup = document.querySelector(".popup");

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);