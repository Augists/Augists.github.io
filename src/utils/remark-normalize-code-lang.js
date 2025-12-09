const alias = {
  python3: "python",
  python: "python",
  js: "javascript",
  javascript: "javascript",
  ts: "typescript",
  typescript: "typescript",
  golang: "go",
  go: "go",
  c: "c",
  cpp: "cpp",
  "c++": "cpp",
  cp: "cpp",
  qt: "cpp",
  pac: "plaintext",
  config: "plaintext",
  code: "plaintext",
  makefile: "makefile",
  bash: "bash",
  shell: "bash",
};

export default function remarkNormalizeCodeLang() {
  return (tree) => {
    visit(tree, "code", (node) => {
      if (!node.lang) return;
      const key = String(node.lang).toLowerCase();
      node.lang = alias[key] || key;
    });
  };
}

// light-weight visitor to avoid extra deps
function visit(node, type, fn) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((child) => visit(child, type, fn));
    return;
  }
  if (node.type === type) {
    fn(node);
  }
  if (Array.isArray(node.children)) {
    node.children.forEach((child) => visit(child, type, fn));
  }
}
