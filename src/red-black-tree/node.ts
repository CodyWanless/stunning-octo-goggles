import { Color } from "./color";

export interface Node<T> {
    color: Color;
    leftChild: Node<T> | null;
    rightChild: Node<T> | null;
    parent: Node<T> | null;
    value: T;
}