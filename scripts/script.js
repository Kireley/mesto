/* усе попапы */
const popups = document.querySelectorAll('.popup');
const closeButton = document.querySelectorAll('.popup__close-button');
/* селекторы для попапа с картинкой */
const placePopup = document.querySelector('.popup_type_place-add');
const placeFormElement = placePopup.querySelector('.popup__form');
const placeInput = document.querySelector('.popup__input_type_place-name');
const linkInput = document.querySelector('.popup__input_type_input-link');
/* селекторы для попапа профиля */
const profilePopup = document.querySelector('.popup_type_profile-edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_occupation');
/* селекторы кнопки профиля */
const profileName = document.querySelector('.profile__name-title');
const profileJob = document.querySelector('.profile__occupation');
const editButton = document.querySelector('.profile__name-button');
const addButton = document.querySelector('.profile__add-button');
/* селекторы для карточек */
const placesContainer = document.querySelector('.places');

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


/* закрытие попапа */
function openPopup(popup) {
  document.querySelector(popup).classList.add('popup_opened');
}
function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}
closeButton.forEach((item) => {
  item.addEventListener('click', closePopup);
});

editButton.addEventListener('click', function () {
  openPopup('.popup_type_profile-edit');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

addButton.addEventListener('click', function () {
  openPopup('.popup_type_place-add');
  placeInput.value = '';
  linkInput.value = '';
});


function placeSubmitHandler(evt) {

  evt.preventDefault();
  const a = placeInput.value;
  const b = linkInput.value;
  placesContainer.prepend(addCards(a, b));
  closePopup(evt);
}
/* сохранение попапа */
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(evt);
}

/* эвенты */
profileFormElement.addEventListener('submit', formSubmitHandler);
placeFormElement.addEventListener('submit', placeSubmitHandler);

/* шаблон карточки */
function addCards(nameValue, urlValue) {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);
  const image = cardElement.querySelector('.place__image');
  const remove = cardElement.querySelector('.place__remove');
  const like = cardElement.querySelector('.place__like-button');
  cardElement.querySelector('.place__title').textContent = nameValue;
  image.src = urlValue;
  image.alt = nameValue;
  image.addEventListener('click', function () {
    const popup = document.querySelector('.popup_type_img');
    const imagePopup = popup.querySelector('.popup__image');
    imagePopup.src = image.src;
    imagePopup.alt = image.alt;
    popup.querySelector('.popup__caption').textContent = cardElement.querySelector('.place__title').textContent;
    openPopup('.popup_type_img');
  });
  like.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like-button_active');
  });
  remove.addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });
  return cardElement;
};

/* массив карточек */
initialCards.map(function (a) {
  placesContainer.append(addCards(a.name, a.link));
});
