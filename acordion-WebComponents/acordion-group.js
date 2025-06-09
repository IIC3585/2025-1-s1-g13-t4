class AcordionGroup extends HTMLElement {
  constructor() {
    super();
    this.handleToggle = this.handleToggle.bind(this);
  }

  connectedCallback() {
    this.addEventListener('acordion-toggle', this.handleToggle);
  }

  handleToggle(event) {
    const opened = event.detail.target;

    this.querySelectorAll('acordion-element').forEach(acordion => {
      if (acordion !== opened) {
        acordion.close();
      }
    });
  }
}

customElements.define('acordion-group', AcordionGroup);
