class AcordionGroup extends HTMLElement {
  constructor() {
    super();
    this.handleOpen = this.handleOpen.bind(this);
  }

  connectedCallback() {
    window.addEventListener('acordion-opened', this.handleOpen);
    if (this.hasAttribute('width')) {
      this._propagateWidth(this.getAttribute('width'));
    }
  }

  disconnectedCallback() {
    window.removeEventListener('acordion-opened', this.handleOpen);
  }

  static get observedAttributes() {
    return ['width'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'width') {
      this._propagateWidth(newVal);
    }
  }

  handleOpen(e) {
    const opened = e.detail;
    this.querySelectorAll('acordion-element').forEach(acc => {
      if (acc !== opened) acc.open = false;
    });
  }

  _propagateWidth(width) {
    this.querySelectorAll('acordion-element').forEach(acc => {
      acc.setAttribute('external-width', width);
    });
  }
}

customElements.define('acordion-group', AcordionGroup);
