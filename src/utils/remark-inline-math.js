export default function remarkInlineMath() {
  return (tree) => {
    const walk = (node) => {
      if (node && typeof node.value === "string") {
        // hexo 习惯：行间用 $$$$...$$$$ ，行内用 $$...$$
        node.value = node.value
          .replace(/\$\$\$\$([\s\S]+?)\$\$\$\$/g, "$$$1$$")
          .replace(/\$\$([^\n]+?)\$\$/g, "$1$");
      }

      if (node && Array.isArray(node.children)) {
        node.children.forEach(walk);
      }
    };

    walk(tree);
  };
}
