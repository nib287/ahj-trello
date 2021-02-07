export default class Storage {
    constructor() {
        this.cardsBox = {
            todo: [],
            inprogress: [],
            done: []
        }
    }
    
    saveInlocalStorage() {
        localStorage.setItem('data', JSON.stringify(this.cardsBox));
    }

    getdataInlocalStorage() {
        this.cardsBox = JSON.parse(localStorage.data);
    }
}