function getNoteType(node) {
  if (!node || node.type !== "paragraph" || !node.children?.length) {
    return null;
  }

  const text = node.children
    .map((child) => child.value || "")
    .join("")
    .trim();
  const match = text.match(/^\{%\s*note\s*([a-zA-Z]*)?\s*%}/i);
  return match ? (match[1] ? match[1].toLowerCase() : "note") : null;
}

function isEndNote(node) {
  if (!node || node.type !== "paragraph" || !node.children?.length) {
    return false;
  }

  const text = node.children
    .map((child) => child.value || "")
    .join("")
    .trim();
  return /^\{%\s*endnote\s*%}/i.test(text);
}

export default function remarkHexoNote() {
  return (tree) => {
    const children = tree.children || [];
    const nextChildren = [];

    for (let idx = 0; idx < children.length; ) {
      const node = children[idx];
      const noteType = getNoteType(node);

      if (!noteType) {
        nextChildren.push(node);
        idx += 1;
        continue;
      }

      const collected = [];
      idx += 1;
      while (idx < children.length && !isEndNote(children[idx])) {
        collected.push(children[idx]);
        idx += 1;
      }

      if (idx < children.length && isEndNote(children[idx])) {
        idx += 1;
      } else {
        // no matching endnote, keep original marker and collected nodes
        nextChildren.push(node, ...collected);
        continue;
      }

      nextChildren.push({
        type: "blockquote",
        data: {
          hProperties: {
            className: ["note-block", `note-${noteType}`],
          },
        },
        children: collected,
      });
    }

    tree.children = nextChildren;
  };
}
