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

    insert (value) {
        return insertFunc(this.root, value);
    };

    delete (value) {
        return deleteFunc (this.root, value);
    }
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

function insertFunc (root, key) {
    if (root === null) return new Node(key);

    if (root.data === key) return root;

    if (key < root.data) {
        root.left = insertFunc (root.left, key);
    } else if (key > root.data) {
        root.right = insertFunc (root.right, key);
    };

    return root;
};

function deleteFunc (root, value){
    if (root === null) {
        return root;
    }

    // If key to be searched is in a subtree
    if (root.data > value) {
        root.left = deleteFunc(root.left, value);
    } else if (root.data < value) {
        root.right = deleteFunc(root.right, value);
    } else {
        // If root matches with the given key

        // Cases when root has 0 children or 
        // only right child
        if (root.left === null) 
            return root.right;

        // When root has only left child
        if (root.right === null) 
            return root.left;

        // When both children are present
        
        let succ = root.right;
        while (succ && succ.left) {
            succ = succ.left
        }
        root.data = succ.data;
        root.right = deleteFunc(root.right, succ.data);
    }
    return root;
}