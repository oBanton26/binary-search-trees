import { Tree , prettyPrint } from './bstLogic.js';

function randomArray (length) {
    const result = [];
    for (let i=0; i<length; i++) {
        result.push(Math.floor(Math.random()*100));
    };
    return result;
}

const test = randomArray(26);
const tree = new Tree (test);
prettyPrint(tree.root);