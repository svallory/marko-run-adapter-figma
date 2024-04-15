import type { Node, RawNode } from 'posthtml';

type Maybe<T> = void | T;

const isLocalScript = (src: Maybe<string>) =>
	src && /^[\\.\/]/.test(src);

export default function(tree: Node): void | Node | RawNode {
  tree.match({ tag: "script" }, node => {
	console.log(node);

    if (node.attrs && isLocalScript(node.attrs['src']) ) {
		console.log(node.attrs['src'], "is a match");
    }

    return node;
  });
}
