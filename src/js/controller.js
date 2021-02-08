export default class Controller {
    constructor(storage, elements, dnd) {
        this.storage = storage;
        this.elements = elements;
        this.dnd = dnd;
    }

    init() {
        this.storage.getdataInlocalStorage();
        this.elements.redrawCards(this.storage.cardsBox);
        this.clickListeners();
        this.mouseListeners();
        this.deleteCard();  
        this.dnd.init();
    }

    clickListeners() {
        this.elements.addCardButtons.forEach(el => {
            el.addEventListener('click', e => this.openAddCardWindow(e));
        });

        this.elements.formCloseButtons.forEach(el => {
            el.addEventListener('click', e => this.closeAddCardWindow(e));
        });
        
        this.elements.submitButtons.forEach(el => {
            el.addEventListener('click', e => {
                e.preventDefault();
                const parent = e.target.closest('.box__column');
                const form = parent.getElementsByClassName('form').item(0);
                const textArea = form.getElementsByClassName('form__input').item(0);
                textArea.focus();       

                if(textArea.value) {
                    this.saveCardInMemory(form);
                    this.closeAddCardWindow(e);
                    this.elements.redrawCards(this.storage.cardsBox);
                    this.mouseListeners();
                    this.deleteCard();        
                } 
            });
        });
    }

    saveCardInMemory(form) {
        const card = form.getElementsByClassName('form__input').item(0);
        this.storage.cardsBox[card.dataset.id].push(card.value);
        this.storage.saveInlocalStorage();  
        card.value = ''; 
    }
    
    openAddCardWindow(e) {
        e.target.classList.add('hidden');
        const parent = e.target.closest('.box__column');
        const form = parent.getElementsByClassName('form').item(0);
        form.classList.remove('hidden');
        const textArea = form.getElementsByClassName('form__input').item(0);
        textArea.value = '';
        textArea.focus();
    }

    closeAddCardWindow(e) {
        const parent = e.target.closest('.box__column');
        const form = parent.getElementsByClassName('form').item(0);
        form.classList.add('hidden');
        const addCardButton = parent.getElementsByClassName('box__button').item(0);
        addCardButton.classList.remove('hidden');
    }

    mouseListeners() {
        this.elements.cards.forEach(el => {
            el.addEventListener('mouseover', e => {
                this.toggleCrossIconVisibility(e);
            });

            el.addEventListener('mouseout', e => {
                this.toggleCrossIconVisibility(e);
            });
        });
    }

    toggleCrossIconVisibility(e) {
        const crossIcon = e.currentTarget.getElementsByClassName('box__remove').item(0);
        if(crossIcon) crossIcon.classList.toggle('not-visibility');
    }
    
    deleteCard() {
        this.elements.deleteCardButtons.forEach(el => el.addEventListener('click', e => {
            const removeElemet = e.target.closest('.box__item');
            const valueRemoveElemet = removeElemet.getElementsByClassName('box__value').item(0).innerText;
            const containerId = e.target.closest('[id]').id;
            const indexRemoveValue = this.storage.cardsBox[containerId].indexOf(valueRemoveElemet);
            this.storage.cardsBox[containerId].splice(indexRemoveValue, 1);
            this.storage.saveInlocalStorage();
            removeElemet.remove();
        }));  
    }





  








}