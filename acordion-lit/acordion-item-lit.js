import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';

class Acordion extends LitElement {
  static styles = css`
    .dropdown {
      width: 400px;
      border-radius: 6px;
      margin-bottom: 10px;
    }
    .selected {
      padding: 8px;
      border: 3px solid #333;
      border-radius: 6px;
      background: #f0f0f0;
      cursor: pointer;
      user-select: none;
      transition: border-radius 0.3s ease;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .selected.open {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .arrow {
      border: solid #333;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 4px;
      margin-left: 10px;
      transform: rotate(45deg);
      transition: transform 0.25s ease;
    }
    .arrow.open {
      transform: rotate(-135deg);
    }
    .list {
      border: 3px solid #333;
      border-top: none;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      background: white;
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      transition: max-height 0.3s ease, opacity 0.3s ease;
    }
    .list.open {
      max-height: 500px;
      opacity: 1;
    }
    ::slotted(acordion-item:not(:last-child)) {
      border-bottom: 1px solid #ccc;
    }
  `;

  static properties = {
    open: { type: Boolean },
    selectedText: { type: String }
  };

  constructor() {
    super();
    this.open = false;
    this.selectedText = 'Select...';
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('item-selected', (e) => {
      this.selectedText = e.detail.text;
      this.open = false;
    });
    window.addEventListener('acordion-opened', this._handleExternalOpen);
  }

  disconnectedCallback() {
    window.removeEventListener('acordion-opened', this._handleExternalOpen);
    super.disconnectedCallback();
  }

  _handleExternalOpen = (event) => {
    if (event.detail !== this) {
      this.open = false;
    }
  };

  toggle() {
    this.open = !this.open;
    if (this.open) {
      window.dispatchEvent(new CustomEvent('acordion-opened', {
        detail: this,
        bubbles: true,
        composed: true,
      }));
    }
    this.dispatchEvent(new CustomEvent('acordion-toggle', {
      bubbles: true,
      composed: true,
      detail: { target: this }
    }));
  }

  render() {
    return html`
      <div class="dropdown">
        <div class="selected ${this.open ? 'open' : ''}" @click="${this.toggle}">
          ${this.selectedText}
          <i class="arrow ${this.open ? 'open' : ''}"></i>
        </div>
        <div class="list ${this.open ? 'open' : ''}">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('acordion-element', Acordion);


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
