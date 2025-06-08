import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';

class Acordion extends LitElement {
  static styles = css`
    .dropdown {
      position: relative;
      width: 400px;
      border-radius: 6px;
    }

    .selected {
      padding: 8px;
      border: 3px solid #333;
      border-radius: 6px;
      background: #f0f0f0;
      cursor: pointer;
      user-select: none;
      transition: border-radius 0.25s ease;
    }

    .selected.open {
      border-bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .list {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background: white;
      border: 3px solid #333;
      border-top: none;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      z-index: 1000;

      max-height: 0;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      transition: max-height 0.25s ease, opacity 0.25s ease;
    }

    .list.open {
      max-height: 300px;
      opacity: 1;
      pointer-events: auto;
    }
      .dropdown, .selected, .list {
        box-sizing: border-box;
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

  toggle() {
    this.open = !this.open;
  }

  firstUpdated() {
    this.addEventListener('item-selected', (e) => {
      this.selectedText = e.detail.text;
      this.open = false;
    });
  }

  render() {
    return html`
      <div class="dropdown">
        <div class="selected ${this.open ? 'open' : ''}" @click="${this.toggle}">
          ${this.selectedText}
        </div>
        <div class="list ${this.open ? 'open' : ''}">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('acordion-element', Acordion);