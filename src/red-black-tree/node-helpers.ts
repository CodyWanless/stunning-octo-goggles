import { Node } from './node';

export const parent = <T>(node: Node<T>): Node<T> | null => {
    return node.parent;
}

export const grandParent = <T>(node: Node<T>): Node<T> | null => {
    const p = parent(node);
    if (p) {
        return p.parent;
    }

    return null;
}

export const sibling = <T>(node: Node<T>): Node<T> | null => {
    const p = parent(node);
    if (p) {
        if (node === p.leftChild) {
            return p.rightChild;
        } if (node === p.rightChild) {
            return p.leftChild;
        }
    }

    return null;
}

export const uncle = <T>(node: Node<T>): Node<T> | null => {
    const p = parent(node);
    const gp = grandParent(node);

    if (!p || !gp) {
        return null;
    }

    return sibling(p);
}