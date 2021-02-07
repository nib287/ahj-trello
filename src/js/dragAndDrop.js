export default class DnD {
    constructor(storage) {
        this.storage = storage;
        this.box = document.getElementsByClassName('box').item(0);  
        this.boxList = document.getElementsByClassName('box__list');
        this.draggedEl = null; 
        this.ghostEl = null;
        this.diffX = null;
        this.diffY = null;
        this.activeCard = null;
        this.currentColumn = null;
    }

    init() {
        this.mousedownListener();
        this.mousemoveListener();
        this.mouseleaveListener();
        this.mouseupListener();
    }

    removeGhosEl() {
        document.body.removeChild(this.ghostEl);
        this.draggedEl = null;
        this.ghostEl = null;
        document.body.style = 'cursor: arrow;';
    }

    addCard(closest, beforeOrAfter) {
        if(!this.activeCard) {
            closest[beforeOrAfter](this.draggedEl);
            this.activeCard = closest;
            this.activeCard.addEventListener('mouseleave', e => {
                if(this.activeCard) this.activeCard = null;
            });                          
        }
    }
    
    mouseupListener() {
        this.box.addEventListener('mouseup', e => {
            if(!this.draggedEl) return;
            
            this.draggedEl.classList.remove('notActive');
            const closest = document.elementFromPoint(e.clientX, e.clientY).closest('.box__item');
            const parent = e.target.closest('.box__list');
            if(!closest) {
                if(parent) {
                    this.refreshStorage(parent);
                    parent.appendChild(this.draggedEl);
                    this.removeGhosEl();

                    return true
                }
                
                return this.removeGhosEl();
            }
     
            this.refreshStorage(parent);
            parent.insertBefore(this.draggedEl, closest);
            this.removeGhosEl()   
        });
    }
    
    refreshStorage(parent) {
        const cardValue = this.draggedEl.getElementsByClassName('box__value').item(0).innerText;
        this.storage.cardsBox[parent.id].push(cardValue);

        const indexRemoveValue = this.storage.cardsBox[this.currentColumn.id].indexOf(cardValue);
        this.storage.cardsBox[this.currentColumn.id].splice(indexRemoveValue, 1);
        this.storage.saveInlocalStorage();
    }

    mouseleaveListener() {   
        this.box.addEventListener('mouseleave', e => {
            if(!this.draggedEl) return;
    
            this.draggedEl.classList.remove('notActive');
            this.removeGhosEl(); 
        });
    }

    mousemoveListener() {   
        this.box.addEventListener('mousemove', e => {
            e.preventDefault();
            if(!this.draggedEl) return;
            
            this.ghostEl.style.top = `${e.pageY - this.diffY}px`;
            this.ghostEl.style.left = `${e.pageX - this.diffX}px`; 
            
            // освобождаем место под дроп
            const closest = document.elementFromPoint(e.clientX, e.clientY).closest('.box__item');
            if(closest) {
                const {top, bottom} = closest.getBoundingClientRect();
                if(e.pageY > window.scrollY + top + closest.offsetHeight / 2)  this.addCard(closest,'before');
                if (e.pageY < window.scrollY + bottom - closest.offsetHeight / 2) this.addCard(closest,'after');
            }
        });
    }
    
    mousedownListener() {
        this.box.addEventListener('mousedown', e => {
     
            const cardValue = e.target.classList.contains('box__value');
            const card = e.target.classList.contains('box__item');
            if(!(card || cardValue)) return;
            
            this.draggedEl = e.target.closest('.box__item');
            this.currentColumn = this.draggedEl.closest('.box__list');
            this.ghostEl = this.draggedEl.cloneNode(true);
            this.ghostEl.classList.add('dragged');
            this.draggedEl.classList.add('notActive')
            
            const {x, y} = this.draggedEl.getBoundingClientRect(); 
            this.diffY = e.clientY - y;
            this.diffX = e.clientX - x;
            this.ghostEl.style.top = `${y + window.scrollY - 10}px`;
            this.ghostEl.style.left = `${x + window.scrollX}px`;
            
            document.body.appendChild(this.ghostEl);
            //сохранить размер на драге
            this.ghostEl.style.width = `${this.draggedEl.offsetWidth}px`;
            
            document.body.style = 'cursor: grabbing;';
        });
    }
}

       



