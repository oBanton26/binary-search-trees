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
        return deleteFunc(this.root, value);
    };

    find (value) {
        return findFunc(this.root, value);
    };

    levelOrderForEachIt (callback) {
        levelOrderForEachFuncIteration(this.root, callback);
    };

    levelOrderForEachRec (callback) {
        if (this.root == null) return;
        const root = [this.root];
        levelOrderForEachFuncRecurtion(root, callback);
    };

    inOrderForEach (callback) {
        const results = [];
        inOrderForEachFunc(this.root, callback, results);
        return results;
    };

    preOrderForEach (callback) {
        preOrderForEachFunc(this.root, callback);
    };

    postOrderForEach (callback) {
        postOrderForEachFunc(this.root, callback);
    };

    height (value) {
        const node = this.find(value);
        const initialList = [node];
        let h = 0;
        if (node === null) return null;
        return heightFunc(initialList,h);
    };

    depth (value) {
        if (!this.find(value)) return null;
        const rootHeight = this.height(this.root.data);
        const nodeHeight = this.height(value);
        return rootHeight - nodeHeight;
    };

    isBalanced () {
        const self = this;
        const results = this.inOrderForEach(isBalancedFunc);

        // Return false if there is one false in the results array
        return !results.some((elem)=>!elem);

        function isBalancedFunc (node) {
            if (self.height(node.data) <= 1) return true;

            let leftH = -1;
            let rightH = -1;
            if (node.left) {
                leftH = self.height(node.left.data);
            };
            if (node.right) {
                rightH = self.height(node.right.data);
            };

            if (Math.abs(leftH - rightH)<2) {
                return true;
            } else {
                return false;
            };
        };
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
};

function findFunc (root, value) {
    if (root === null) {
        return null;
    };

    if (root.data === value) {
        return root;
    } else if (root.data < value) {
        return findFunc(root.right, value);
    } else if (root.data > value) {
        return findFunc(root.left, value);
    };
};

function levelOrderForEachFuncIteration (root, callback) {
    // Special case check up
    if (typeof callback !== 'function') {
        throw new Error('The callback you gave is not a function');
    };
    if (root == null ) return;

    let q = [];
    q.push(root);
    while (q.length) {
        let pointer = q[0];
        callback(pointer);
        if (pointer.left) {
            q.push(pointer.left);
        };
        if (pointer.right) {
            q.push(pointer.right);
        };
        q.shift();
    };
};

function levelOrderForEachFuncRecurtion (levelList, callback) {
    if (typeof callback !== 'function') {
        throw new Error('The callback you gave is not a function');
    };
    
    if (!levelList.length) return;

    let childList = [];
    for (let node of levelList) {
        callback(node);
        if (node.left) {
            childList.push(node.left)
        };
        if (node.right) {
            childList.push(node.right)
        };
    };
    levelOrderForEachFuncRecurtion (childList, callback);
};

function inOrderForEachFunc (root, callback, resultArray) {
    if (typeof callback !== 'function') {
        throw new Error('The callback you gave is not a function');
    };

    
    if (root === null) return;

    inOrderForEachFunc(root.left, callback, resultArray);
    resultArray.push(callback(root));
    inOrderForEachFunc(root.right, callback, resultArray);
};

function preOrderForEachFunc (root, callback) {
    if (typeof callback !== 'function') {
        throw new Error('The callback you gave is not a function');
    };

    if (root === null) return;

    callback(root);
    preOrderForEachFunc(root.left, callback);
    preOrderForEachFunc(root.right, callback);
};

function postOrderForEachFunc (root, callback) {
    if (typeof callback !== 'function') {
        throw new Error('The callback you gave is not a function');
    };

    if (root === null) return;

    postOrderForEachFunc(root.left, callback);
    postOrderForEachFunc(root.right, callback);
    callback(root);
};

function heightFunc (levelList, h) {
    if (!levelList.length) {
        return h-1;
    }

    let childrenList = [];
    for (let node of levelList) {
        if (node.left) childrenList.push(node.left);
        if (node.right) childrenList.push(node.right);
    };

    h++;
    return heightFunc(childrenList, h);
};

