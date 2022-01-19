const cardTemplate = document.querySelector('.card-template');
const popupImage = document.querySelector('.popup_type_img');
const captionPopup = popupImage.querySelector('.popup__caption');
const imagePopup = popupImage.querySelector('.popup__image');

const popupPlace = document.querySelector('.popup_type_place-add');
const placeFormElement = popupPlace.querySelector('.popup__form');
const placeInput = popupPlace.querySelector('.popup__input_type_place-name');
const linkInput = popupPlace.querySelector('.popup__input_type_input-link');
const placesContainer = document.querySelector('.places');

const placeForm = document.querySelector('.popup__form_type_add-place');
const profileForm = document.querySelector('.popup__form_type_edit')

const popups = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_type_profile-edit');
const profileFormElement = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_occupation');
const profileName = document.querySelector('.profile__name-title');
const profileJob = document.querySelector('.profile__occupation');
const editButton = document.querySelector('.profile__name-button');
const addButton = document.querySelector('.profile__add-button');

const closeButtons = document.querySelectorAll('.popup__close-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function inputValidity(inputs) {
  inputs.some(input => {
    return input.validity.valid
  })
}

function resetValidation(popup) {
  const inputList = Array.from(popup.querySelectorAll(".popup__input"));
  const button = popup.querySelector(".popup__submit-button");
  if (!inputValidity(inputList)) {
    button.classList.add("popup__submit-button_inactive");
    button.disabled = true;
  } else {
    button.classList.remove("popup__submit-button_inactive");
    button.disabled = false;
  }
  inputList.forEach((input) => {
    const inputErrorSpan = popup.querySelector(`.${input.id}-error`);
    input.classList.remove("popup__input_type_error");
    inputErrorSpan.textContent = "";
  });
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", keyHandler);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", keyHandler);
}


closeButtons.forEach((item) => {
  item.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});
popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    closePopup(evt.target);
  });
});

function keyHandler(evt) {
  const popup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") closePopup(popup);
}

/* сохранение нового места */
function saveNewPlace(evt) {
  evt.preventDefault();
  const a = placeInput.value;
  const b = linkInput.value;
  placesContainer.prepend(addCards(a, b));
  closePopup(popupPlace);
}
/* сохранение профиля */
function saveNewProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}
/* эвенты */
profileFormElement.addEventListener('submit', saveNewProfile);

placeFormElement.addEventListener('submit', saveNewPlace);

editButton.addEventListener('click', () => {
  openPopup(popupProfile);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  resetValidation(popupProfile);
});

addButton.addEventListener('click', () => {
  placeForm.reset();
  resetValidation(popupPlace);
  openPopup(popupPlace);
});
/* шаблон карточки */
function addCards(nameValue, urlValue) {
  const cardElement = cardTemplate.content.querySelector('.place').cloneNode(true);
  const image = cardElement.querySelector('.place__image');
  const remove = cardElement.querySelector('.place__remove');
  const like = cardElement.querySelector('.place__like-button');
  const title = cardElement.querySelector('.place__title');
  title.textContent = nameValue;
  image.src = urlValue;
  image.alt = nameValue;
  image.addEventListener('click', () => {
    imagePopup.src = image.src;
    imagePopup.alt = image.alt;
    captionPopup.textContent = title.textContent;
    openPopup(popupImage);
  });
  like.addEventListener('click', (evt) => {
    evt.target.classList.toggle('place__like-button_active');
  });
  remove.addEventListener('click', (evt) => {
    evt.target.closest('.place').remove();
  });
  return cardElement;
}

initialCards.map((card) => {
  placesContainer.append(addCards(card.name, card.link));
});

