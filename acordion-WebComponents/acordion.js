class Acordion extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'external-width'];
  }

  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
<style>
  .dropdown {
    border-radius: 6px;
    margin-bottom: 10px;
    width: 100%;
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
    overflow: hidden;
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
    box-sizing: border-box;
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
</style>

<div class="dropdown">
  <div class="selected" tabindex="0">
    <span class="selected-text label">Select...</span>
    <i class="arrow"></i>
  </div>
  <div class="list"><slot></slot></div>
</div>
`;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.selected = this.shadowRoot.querySelector('.selected');
    this.label = this.shadowRoot.querySelector('.label');
    this.list = this.shadowRoot.querySelector('.list');
    this.arrow = this.shadowRoot.querySelector('.arrow');
    this.dropdown = this.shadowRoot.querySelector('.dropdown');

    this.toggleList = this.toggleList.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  connectedCallback() {
    if (!this.hasAttribute('label')) {
      this.setAttribute('label', 'Select...');
    } else {
      this.label.textContent = this.getAttribute('label');
    }

    if (this.hasAttribute('external-width')) {
      this.dropdown.style.width = this.getAttribute('external-width');
    }

    this.selected.addEventListener('click', this.toggleList);


  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'label') {
      this.label.textContent = newValue;
    } else if (name === 'external-width') {
      this.dropdown.style.width = newValue;
    }
  }

  toggleList() {
    this.open = !this.open;
    if (this.open) {
      this.dispatchEvent(new CustomEvent('acordion-opened', {
        bubbles: true,
        composed: true,
        detail: this
      }));
    }
  }

  selectItem(item) {
    this.label.textContent = item.textContent;
    this.open = false;
    this.setAttribute('label', item.textContent);
  }

  get open() {
    return this.list.classList.contains('open');
  }

  set open(value) {
    const isOpen = Boolean(value);
    this.list.classList.toggle('open', isOpen);
    this.selected.classList.toggle('open', isOpen);
    this.arrow.classList.toggle('open', isOpen);
  }
}

customElements.define('acordion-element', Acordion);
