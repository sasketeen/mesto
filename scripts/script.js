let popup = document.querySelector('.popup'),
    form = document.forms.editForm,
    edit = document.querySelector('.profile__editButton'),
    close = document.querySelector('.popup__closeButton'),
    nameInput = form.querySelector('.popup__input_type_name'),
    descriptionInput = form.querySelector('.popup__input_type_description'),
    profileName = document.querySelector('.profile__name'),
    profileDescription = document.querySelector('.profile__description');

let formSubmitHandler = evt => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup();
}

const openPopup = () => {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    descriptionInput.value =  profileDescription.textContent;
}
const closePopup = () => {
    popup.classList.remove('popup_opened');
}

form.addEventListener('submit', formSubmitHandler);
edit.addEventListener('click', openPopup);
close.addEventListener('click', closePopup);
