import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';

class Acordion extends LitElement {
  static properties = {
    open: { type: Boolean },
    selectedText: { type: String },
    externalWidth: { type: String, attribute: 'external-width' }
  };

  static styles = css`
  .dropdown {
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
    overflow: hidden; /* Prevent overflow */
    box-sizing: border-box;
  }

  .selected-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .arrow {
    flex-shrink: 0;
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
    max-height: none;
    opacity: 1;
  }

  ::slotted(acordion-item) {
  padding: 10px;
  display: block;
  overflow-wrap: break-word;
  white-space: normal;
}

`;


  constructor() {
    super();
    this.open = false;
    this.selectedText = this.getAttribute('label') || 'Select...';
    this.externalWidth = '';
  }



  toggle() {
    this.open = !this.open;
    if (this.open) {
      this.dispatchEvent(new CustomEvent('acordion-opened', {
        bubbles: true,
        composed: true,
        detail: this
      }));
    }
  }

  render() {
    return html`
      <div class="dropdown" style="width: ${this.externalWidth};">
        <div
          class="selected ${this.open ? 'open' : ''}"
          @click=${this.toggle}
          tabindex="0"
          role="button"
          aria-expanded=${this.open ? 'true' : 'false'}
        >
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
