import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';

class AcordionItem extends LitElement {
  static styles = css`
    :host {
    
    
      display: block;
      padding: 8px;
      cursor: pointer;
      background: white;
      border-top: 1px solid #ccc;
    }
    :host(:hover) {
      background: #eee;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick);
    super.disconnectedCallback();
  }

  _handleClick = () => {
    const text = this.textContent.trim();
    this.dispatchEvent(new CustomEvent('item-selected', {
      detail: { text },
      bubbles: true,
      composed: true
    }));
  };
}

customElements.define('acordion-item', AcordionItem);
