import { INode } from './node';

export const getParent = <T>(node: INode<T>): INode<T> | null => {
    return node.parent;
};

export const getGrandParent = <T>(node: INode<T>): INode<T> | null => {
    const p = getParent(node);
    if (p) {
        return p.parent;
    }

    return null;
};

export const getSibling = <T>(node: INode<T>): INode<T> | null => {
    const p = getParent(node);
    if (p) {
        if (node === p.leftChild) {
            return p.rightChild;
        }
        if (node === p.rightChild) {
            return p.leftChild;
        }
    }

    return null;
};

export const getUncle = <T>(node: INode<T>): INode<T> | null => {
    const p = getParent(node);
    const gp = getGrandParent(node);

    if (!p || !gp) {
        return null;
    }

    return getSibling(p);
};
