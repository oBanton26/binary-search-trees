import { Tree , prettyPrint } from './bstLogic.js';

const test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 56, 298];
const tree = new Tree (test);
tree.insert(26);
tree.delete(9);

prettyPrint(tree.root);
tree.levelOrderForEach(console.log);
