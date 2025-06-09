import { LitElement, html } from 'https://unpkg.com/lit@2.8.0/index.js?module';

class AcordionGroup extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('acordion-opened', this._onAcordionOpened);
  }

  disconnectedCallback() {
    window.removeEventListener('acordion-opened', this._onAcordionOpened);
    super.disconnectedCallback();
  }

  _onAcordionOpened = (e) => {
    const accordions = this.querySelectorAll('acordion-element');
    accordions.forEach(acc => {
      if (acc !== e.detail) {
        acc.open = false;
      }
    });
  };

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('acordion-group', AcordionGroup);
