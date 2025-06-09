
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      --primary: #2c73d2;
      --primary-dark: #1b4f9c;
      --border: #ddd;
      --bg: #fff;
      --text-dark: #111;
      --text-muted: #666;
      display: block;
      font-family: 'Segoe UI', Tahoma, sans-serif;
    }
    .planes {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 2rem;
      align-items: stretch;
    }
    ::slotted([slot="plan"]) {
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
      height: 100%;
      position: relative;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    ::slotted([slot="plan"]:hover) {
      transform: translateY(-6px);
      box-shadow: 0 8px 15px rgba(0,0,0,0.15);
    }
    /* Élite destacado */
    ::slotted([slot="plan"][data-nombre="Élite"]) {
      border: 2px solid var(--primary);
    }
    ::slotted([slot="plan"][data-nombre="Élite"])::before {
      content: 'MÁS COTIZADO';
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: var(--primary);
      color: #fff;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    ::slotted([slot="plan"] h3) {
      margin: 0 0 0.25rem;
      font-size: 1.25rem;
      color: var(--text-dark);
    }
    ::slotted([slot="plan"] .visits) {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin-bottom: 0.25rem;
    }
    /* precio grande y negrita */
    ::slotted([slot="plan"] .precio) {
      font-size: 2rem;
      font-weight: bold;
      color: var(--text-dark);
      margin: 0.25rem 0;
    }
    ::slotted([slot="plan"] .label-precio) {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin-bottom: 0.75rem;
    }
    ::slotted([slot="plan"] .vat) {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin-bottom: 1rem;
    }
    ::slotted([slot="plan"] .descripcion) {
      flex: 1;
      font-size: 0.9rem;
      color: #444;
      margin-bottom: 1rem;
      line-height: 1.4;
    }
    /* botón azul full-width */
    ::slotted([slot="plan"] button) {
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 4px;
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      margin: 1rem 0;
      transition: background 0.2s ease;
    }
    ::slotted([slot="plan"] button:hover) {
      background: var(--primary-dark);
    }

    ::slotted([slot="plan"] .features) {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    ::slotted([slot="plan"] .features li) {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: var(--text-dark);
    }
    ::slotted([slot="plan"] .features li)::before {
      content: '✔';
      color: #28a745;
      margin-right: 0.5rem;
      line-height: 1;
    }
    ::slotted([slot="plan"] .features li .new) {
      margin-left: 0.5rem;
      background: #28a745;
      color: #fff;
      font-size: 0.625rem;
      border-radius: 4px;
      padding: 0.1rem 0.4rem;
      text-transform: uppercase;
    }
  </style>
  <div class="planes">
    <slot name="plan"></slot>
  </div>
`;

class SuscripcionElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.shadowRoot.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        const planEl = e.target.closest('[slot="plan"]');
        const nombre = planEl.getAttribute('data-nombre') || '';
        alert('Usted ha elegido el plan ' + nombre);
      }
    });
  }
}

customElements.define('suscripcion-element', SuscripcionElement);