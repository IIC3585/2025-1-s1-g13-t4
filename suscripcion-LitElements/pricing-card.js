import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';

class PricingCard extends LitElement {
  static properties = {
    title: { type: String },
    visits: { type: String },
    price: { type: String },
    vatPrice: { type: String },
    description: { type: String },
    features: { type: String },
    best: { type: Boolean },
    showAlert: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      border: 2px solid #e1e1e1;
      border-radius: 12px;
      background: #fff;
      max-width: 300px;
      font-family: 'Segoe UI', sans-serif;
      padding: 1.5rem;
      box-sizing: border-box;
      transition: border 0.3s;
    }

    :host([best]) {
      border: 2px solid #2c73d2;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h2 {
      font-size: 1.25rem;
      margin: 0;
      color: #2c3e50;
    }

    .badge {
      background: #2c73d2;
      color: white;
      font-size: 0.7rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }

    .visits {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 0.5rem;
    }

    .price {
      font-size: 2rem;
      font-weight: bold;
      margin: 0.5rem 0 0;
      color: #000;
    }

    .vat {
      font-size: 0.8rem;
      color: #999;
      margin-bottom: 1rem;
    }

    .desc {
      font-size: 0.9rem;
      color: #444;
      margin-bottom: 1rem;
    }

    button {
      width: 100%;
      background: #2c73d2;
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      margin: 0.5rem 0;
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      color: #333;
    }

    li::before {
      content: '✔';
      color: green;
      margin-right: 0.5rem;
    }

    .new {
      background: #27ae60;
      color: white;
      font-size: 0.65rem;
      padding: 0.1rem 0.4rem;
      margin-left: 0.5rem;
      border-radius: 3px;
    }

    .alert {
      background: #dff0d8;
      color: #3c763d;
      border: 1px solid #d6e9c6;
      padding: 0.75rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      text-align: center;
      font-size: 0.9rem;
    }
  `;

  constructor() {
    super();
    this.title = '';
    this.visits = '';
    this.price = '';
    this.vatPrice = '';
    this.description = '';
    this.features = '[]';
    this.best = false;
    this.showAlert = false;
  }

  render() {
    let ALLfeatures = [];

    try {
      ALLfeatures = JSON.parse(this.features || '[]');
    } catch (e) {
      console.warn('Error parsing features:', e);
    }

    return html`
      <div class="header">
        <h2>${this.title}</h2>
        ${this.best ? html`<span class="badge">Más cotizado</span>` : ''}
      </div>
      ${this.showAlert ? html`
        <div class="alert">Elegiste el plan ${this.title}</div>
      ` : ''}
      <div class="visits">${this.visits} DCCredits iniciales</div>
      <div class="price">${this.price}</div>
      <div class="visits">Cupo máximo</div>
      <div class="vat">${this.vatPrice} USD Cupo Internacional</div>
      <div class="desc">${this.description}</div>
      <button @click=${this._emitirEvento}>Lo Quiero!</button>
      <ul>
        ${ALLfeatures.map(f =>
          html`<li>${f.text}${f.isNew ? html`<span class="new">New</span>` : ''}</li>`
        )}
      </ul>
    `;
  }

  _emitirEvento() {
    this.dispatchEvent(new CustomEvent('plan-elegido', {
      detail: { plan: this.title },
      bubbles: true,
      composed: true
    }));

    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 2000);
  }
}

customElements.define('pricing-card', PricingCard);
