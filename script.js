;

'use strict';

const MENU_ACTIVE_CLASS = 'menu--active';
const PAGINATOR_ITEM_ACTIVE_CLASS= 'paginator__item--active';
const SLIDE_ACTIVE_CLASS = 'slide--active';
const SLIDE_NO_DELAY_CLASS = 'slide--no-delay';
const SLIDE_PREVIOUS_CLASS = 'slide--previous';

function finishSlideChange(slides, i, item) {
    slides.forEach(slide => {
        if (slide.classList.contains(SLIDE_ACTIVE_CLASS)) {
            slide.classList.add(SLIDE_PREVIOUS_CLASS);
            slide.classList.remove(SLIDE_ACTIVE_CLASS);
        }
    });
    slides.item(i).classList.add(SLIDE_ACTIVE_CLASS);
    item.classList.add(PAGINATOR_ITEM_ACTIVE_CLASS);
}

function get(selector) {
    return document.querySelector(selector);
}

function getAll(selector) {
    return document.querySelectorAll(selector);
}

function toggleMenu() {
    const menu = get('.menu');

    if (menu.classList.contains(MENU_ACTIVE_CLASS)) {
        menu.classList.remove(MENU_ACTIVE_CLASS);
    } else {
        menu.classList.add(MENU_ACTIVE_CLASS);
    }
}

window.onload = () => {
    const menuImage = get('.menu__image');
    const menuLinks = getAll('.menu__link');
    const slides = getAll('.slide');
    const paginatorItems = getAll('.paginator__item');

    paginatorItems.forEach((paginatorItem, i) => paginatorItem.addEventListener('click', function () {
        paginatorItems.forEach(item => item.classList.remove(PAGINATOR_ITEM_ACTIVE_CLASS));

        if (slides.item(i).classList.contains(SLIDE_PREVIOUS_CLASS)) {
            slides.item(i).classList.add(SLIDE_NO_DELAY_CLASS);
            slides.item(i).classList.remove(SLIDE_PREVIOUS_CLASS);
            setTimeout(() => {
                slides.item(i).classList.remove(SLIDE_NO_DELAY_CLASS);
                finishSlideChange(slides, i, this);
            });

            return;
        }

        slides.forEach(slide => slide.classList.remove(SLIDE_PREVIOUS_CLASS));
        finishSlideChange(slides, i, this);
    }));

    menuLinks.forEach(link => link.addEventListener('mouseenter', function () {
        menuImage.style.backgroundImage = `url('${ this.dataset.image }')`;
    }));
};
