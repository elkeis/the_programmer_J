async function main() {
  const menu = window.document.querySelector('menu');
  const main = window.document.querySelector('main');
  const iframe = window.document.querySelector('#frame');

  const posts = await (await fetch('/posts')).json();

  menu.innerHTML = posts.reduce((result, post) => `${result} <soft-button timeToPress="500" data="${post}">${post.replace('.html', '')}</soft-button>`, '');

  const clickTracker = {
    target: null,
    mouseDownTimestamp: 0,
    mouseUpTimestamp: 0,
  }

  menu.addEventListener('soft-click', (event) => {
    iframe.src = `./posts/${event.target.getAttribute('data')}`;
  });
}

window.onload = main;
