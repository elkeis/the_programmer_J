async function main() {
  const menu = window.document.querySelector('menu');
  const main = window.document.querySelector('main');
  const iframe = window.document.querySelector('#frame');

  const posts = await (await fetch('/posts')).json();

  menu.innerHTML = posts.reduce((result, post) => `${result} <button>${post}</button>`, '');

  menu.addEventListener('click', (event) => {
    console.log(event.target);
    if (event.target.tagName === 'BUTTON') {
      iframe.src = `./posts/${event.target.innerHTML}`
    }
  })
}

main();
