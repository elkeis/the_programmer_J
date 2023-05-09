
class Node {
  static types = ['h1', 'h2', 'h3', 'p', 'pre']
  type = null;

  content = ''

  children = [];

  parent = null;

  constructor(type, content, child, parent) {
    this.type = type;
    this.content = content;
    this.child = child;
    this.parent = parent;
  }

  toString() {
    if (this.type) {
      return `<${this.type}>${this.content}${this.children.length ? this.children.join('\n') : ''}</${this.type}>`;
    } else {
      return ''
    }
  }
}


function typo() {
  document.head.innerHTML += '<link rel="stylesheet" href="/typo.css"/>'
}

function md2html() {
  const md = window.document.querySelector('md');
  const mdContent = md.innerHTML;

  console.log(mdContent);

  const lines = mdContent.split('\n');

  let parentNode = null;

  const nodes = lines.map(line => {
    const trimmed = line.trim();
    let node;
    if (trimmed.startsWith('# ')) {
      node = new Node('h1', trimmed.substring('# '.length), null, null);
    } else if (trimmed.startsWith('## ')) {
      node = new Node('h2', trimmed.substring('## '.length), null, null);
    } else if (trimmed.startsWith('### ')) {
      node = new Node('h3', trimmed.substring('### '.length), null, null);
    } else if (trimmed.startsWith('```')) {
      if (!parentNode) {
        node = new Node('pre', trimmed.substring('```'.length), null, null);
        parentNode = node;
      } else {
        parentNode = null;
      }
    } else {
      if (parentNode) {
        parentNode.children.push(parentNode.children.length + 1 + ' | ' + line);
      } else {
        node = new Node('p', trimmed, null, null);
      }
    }
    return node;
  })

  md.innerHTML = nodes.filter(n => !!n).map(n => n.toString()).join(' ');
}

typo();
md2html();


