import { Color } from './color';

export interface INode<T> {
    color: Color;
    leftChild: INode<T> | null;
    rightChild: INode<T> | null;
    parent: INode<T> | null;
    value: T;
}
