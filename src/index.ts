import { RedBlackTree } from "./red-black-tree/red-black-tree";

const tree = new RedBlackTree<number>((a, b) => Math.floor(a - b));

tree.insert(1);
tree.insert(5);
tree.insert(4);
tree.insert(3);
tree.insert(2);

console.log(tree);