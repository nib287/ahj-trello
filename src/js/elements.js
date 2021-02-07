export default class Elements {
    constructor() {
        this.itemsBox = document.getElementsByClassName('box').item(0);
        this.addCardButtons = document.getElementsByClassName('box__button');
        this.cards = document.getElementsByClassName('box__item');
        this.submitButtons = document.getElementsByClassName('form__submit');
        this.cardsList =  document.getElementsByClassName('box__list');
        this.deleteCardButtons = document.getElementsByClassName('box__remove');
        this.formCloseButtons = document.getElementsByClassName('form__remove');
        this.activeFotrm = null;
    }

    createElements(containerId, cardText) {
        const container = document.getElementById(containerId);
        container.insertAdjacentHTML('beforeend', `
            <li class="box__item">
                <span class="box__value">${cardText}</span>
                <span class="box__remove not-visibility">&#10006;</span>       
            </li>
        `);
    }

    redrawCards(cardsBox) {
        this.clearCards();
        
        for (let key in cardsBox) {
            cardsBox[key].forEach(el => {
                this.createElements(key, el);
            });
        }        
    }

    clearCards() {
        this.cardsList.forEach(card => card.innerHTML = '');
    }
}




