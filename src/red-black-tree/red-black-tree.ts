import { Color } from './color';
import { Node } from './node';
import { grandParent, parent, uncle } from './node-helpers';

export class RedBlackTree<T> {
    private compareFunc: (a: T, b: T) => number;
    private root: Node<T> | null;

    constructor(compareFunc: (a: T, b: T) => number) {
        this.root = null;
        this.compareFunc = compareFunc;
    }

    public insert(value: T): void {
        const newNode: Node<T> = {
            rightChild: null,
            leftChild: null,
            color: Color.red,
            parent: null,
            value
        };

        this.bstInsert(null, this.root, newNode);
        this.insertRepairTree(newNode);

        // find the root 
        this.root = newNode;
        while (this.root && parent(this.root)) {
            this.root = parent(this.root);
        }
    }

    private bstInsert(parent: Node<T> | null,
        currentNode: Node<T> | null,
        newNode: Node<T>): Node<T> {
        if (!currentNode) {
            newNode.parent = parent;
            return newNode;
        }

        const compResult = this.compareFunc(newNode.value, currentNode.value);
        if (compResult < 0) {
            currentNode.leftChild = this.bstInsert(currentNode, currentNode.leftChild, newNode);
        }
        else if (compResult > 0) {
            currentNode.rightChild = this.bstInsert(currentNode, currentNode.rightChild, newNode);
        }
        return currentNode;
    }

    private insertRepairTree(node: Node<T>): void {
        const p = parent(node);
        const nodeUncle = uncle(node);
        const gp = grandParent(node);

        if (!p) {
            node.color = Color.black;
        } else if (p.color === Color.black) {
            // do nothing
        } else if (nodeUncle && nodeUncle.color === Color.red) {
            p.color = Color.black;
            nodeUncle.color = Color.black;
            if (gp) {
                gp.color = Color.red;
                this.insertRepairTree(gp);
            }
        } else if (gp) {
            if (node === p.rightChild && p === gp.leftChild) {
                this.rotateLeft(node);
                if (!node.leftChild) {
                    return;
                }
                node = node.leftChild;
            } else if (node === p.leftChild && p === gp.rightChild) {
                this.rotateRight(node);
                if (!node.rightChild) {
                    return;
                }
                node = node.rightChild;
            }

            const newParent = parent(node);
            const newGP = grandParent(node);

            if (newGP && newParent && node === newParent.leftChild) {
                this.rotateRight(newGP);
            } else if (newGP) {
                this.rotateLeft(newGP);
            }
            if (newParent) {
                newParent.color = Color.black;
            }
            if (newGP) {
                newGP.color = Color.red;
            }
        }
    }

    private rotateLeft(node: Node<T>): void {
        const newNode = node.rightChild;
        const p = parent(node);
        if (!newNode) {
            // leaf can't be internal node, return
            return;
        }

        node.rightChild = newNode.leftChild;
        newNode.leftChild = node;
        node.parent = newNode;

        if (node.rightChild) {
            node.rightChild.parent = node;
        }
        if (p) {
            if (node === p.leftChild) {
                p.leftChild = newNode;
            } else if (node === p.rightChild) {
                p.rightChild = newNode;
            }
        }

        newNode.parent = p;
    }

    private rotateRight(node: Node<T>): void {
        const newNode = node.leftChild;
        const p = parent(node);
        if (!newNode) {
            // leaf can't be internal node, return
            return;
        }

        node.leftChild = newNode.rightChild;
        newNode.rightChild = node;
        node.parent = newNode;

        if (node.leftChild) {
            node.leftChild.parent = node;
        }
        if (p) {
            if (node === p.leftChild) {
                p.leftChild = newNode;
            } else if (node === p.rightChild) {
                p.rightChild = newNode;
            }
        }

        newNode.parent = p;
    }
}