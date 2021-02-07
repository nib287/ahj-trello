import '../style.css';
import Controller from './controller';
import Storage from './storage';
import Elements from './elements';
import DnD from './dragAndDrop';

const elements = new Elements();
const storage = new Storage();
const dnd = new DnD(storage);
const controller = new Controller(storage, elements, dnd);
controller.init();



