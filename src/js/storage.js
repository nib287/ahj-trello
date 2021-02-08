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
        const data = JSON.parse(localStorage.data);
        if(data) this.cardsBox = data;
        
    }
}