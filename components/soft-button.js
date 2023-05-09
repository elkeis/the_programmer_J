class SoftButton extends HTMLElement {

  pressedWell = false;
  pressedWellTimeout = null;
  timeToPress = 100;
  pressed = 0;
  released = 0;

  pressWell() {
    this.pressedWell = true;
    this.pressedWellTimeout = null;
    this.classList.add('pressed-well');
  }

  release() {
    this.pressedWell = false;
    if (this.pressedWellTimeout) {
      clearTimeout(this.pressedWellTimeout);
      this.pressedWellTimeout = null;
    }
    this.classList.remove('pressed-well');
  }

  connectedCallback() {
    this.timeToPress = parseInt(this.getAttribute('timeToPress') || this.timeToPress.toString());
    // this.attachShadow({ mode: 'open' });
    this.addEventListener('mousedown', (event) => {
      console.log(`mousedown ${event.target}`)
      this.pressed = Date.now();
      this.pressedWellTimeout = setTimeout(this.pressWell.bind(this), this.timeToPress)
    });

    this.addEventListener('mouseup', (event) => {
      console.log(`mouseup ${event.target}`)
      this.released = Date.now();
      this.release();
    });

    this.addEventListener('mouseleave', (event) => {
      this.pressed = 0;
      this.released = 0;
      this.release();
    });

    this.addEventListener('click', (event) => {
      console.log(`click ${event.target}`)
      event.stopPropagation();
      event.preventDefault();
      setTimeout(() => {
        if (this.released - this.pressed >= this.timeToPress) {
          console.log(`soft-click ${event.target}`)
          this.dispatchEvent(new Event('soft-click', { bubbles: true }));
        }

        this.released = 0;
        this.pressed = 0;
      }, 0);
    });

    this.addEventListener('touchend', () => {
      this.dispatchEvent(new Event('soft-click', { bubbles: true }));
    })
    this.innerHTML = `<button>${this.innerHTML}</button>`;
  }
}

window.customElements.define('soft-button', SoftButton)
