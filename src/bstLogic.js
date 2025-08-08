class Node {
    constructor (data) {
        this.data = data;
        this.left = null;
        this.right = null;
    };
};

export class Tree {
    constructor (array) {
        this.root = buildTree(array);
    };
};

function sortedArrayToBSTRecur(arr, start, end) {
    if (start > end) return null;
    
    // Find the middle element
    let mid = start + Math.floor((end - start) / 2);
    
    // Create root node
    let root = new Node(arr[mid]);
    
    // Create left subtree
    root.left = sortedArrayToBSTRecur(arr, start, mid - 1);
    
    // Create right subtree
    root.right = sortedArrayToBSTRecur(arr, mid + 1, end);
    
    return root;
};

function buildTree (array) {
    const sortedArray = array.toSorted((a,b)=> a-b);
    const checkedArray = sortedArray.filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
    const root = sortedArrayToBSTRecur(checkedArray, 0, checkedArray.length-1);
    return root;
};

export const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};