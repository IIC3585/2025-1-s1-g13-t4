const templateItem = document.createElement('template');
templateItem.innerHTML = `
  <style>
    :host {
      
      padding: 8px;
      cursor: pointer;
      background-color: white;
      border-top: 0px solid #ccc;
    }
    :host(:hover) {
      background: #ddd;
    }
  </style>
  <slot></slot>
`;


class AcordionItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(templateItem.content.cloneNode(true));
  }
}

customElements.define('acordion-item', AcordionItem);
