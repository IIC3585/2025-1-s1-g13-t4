const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display: block; font-family: sans-serif; }
    .card {
      position: relative;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      max-width: 280px;
      display: flex;
      flex-direction: column;
    }
    .card.best { border: 2px solid #2c73d2; }
    .badge {
      display: none;
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: #2c73d2;
      color: #fff;
      font-size: .75rem;
      font-weight: 600;
      padding: .25rem .5rem;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .card.best .badge { display: block; }

    .header { margin-bottom: .5rem; }
    .title { font-size: 1.25rem; margin: 0; }
    .visits { font-size: .875rem; color: #666; margin: .25rem 0; }

    .price { font-size: 1.5rem; font-weight: bold; margin: .5rem 0; }
    .vat { font-size: .875rem; color: #666; margin-bottom: .5rem; }

    .description {
      flex: 1;
      font-size: .875rem;
      color: #444;
      margin-bottom: .5rem;
    }

    .button {
      background: #2c73d2;
      border: none;
      color: white;
      padding: .75rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      margin-bottom: .5rem;
    }
    .button:hover { background: #245bb5; }

    .features { list-style: none; padding: 0; margin: 0; }
    .feature-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: .25rem;
      font-size: .875rem;
    }
    .feature-item::before {
      content: '✔';
      color: green;
      margin-right: .5rem;
      line-height: 1;
    }
    .new {
      background: #28a745;
      color: #fff;
      font-size: .625rem;
      border-radius: 4px;
      padding: .1rem .3rem;
      margin-left: .5rem;
      text-transform: uppercase;
    }
  </style>

  <div class="card">
    <div class="badge">Más cotizado</div>
    <div class="header">
      <h3 class="title"></h3>
      <div class="visits"></div>
    </div>
    <div class="price"></div>
    <div class="vat"></div>
    <p class="description"></p>
    <button class="button">Lo Quiero!</button>
    <ul class="features"></ul>
  </div>
`;

class PricingCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['title','visits','price','vatprice','description','features','best'];
  }

  attributeChangedCallback() {
    this._render();
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    const root = this.shadowRoot;
    // Título y visitas
    root.querySelector('.title').textContent = this.getAttribute('title') || '';
    root.querySelector('.visits').textContent =
      (this.getAttribute('visits') || '') + ' DCCredits iniciales';

    // Precio y cupo internacional
    root.querySelector('.price').textContent =
      (this.getAttribute('price') || '') + ' Cupo máximo';
    root.querySelector('.vat').textContent =
      (this.getAttribute('vatprice') || '') + ' USD Cupo Internacional';

    // Descripción
    root.querySelector('.description').textContent =
      this.getAttribute('description') || '';

    // Lista de features
    const ul = root.querySelector('.features');
    ul.innerHTML = '';
    let features = [];
    try {
      features = JSON.parse(this.getAttribute('features') || '[]');
    } catch (e) {
      console.error('Invalid JSON in features attribute', e);
    }
    features.forEach(item => {
      const li = document.createElement('li');
      li.className = 'feature-item';
      li.textContent = item.text;
      if (item.isNew) {
        const span = document.createElement('span');
        span.className = 'new';
        span.textContent = 'New';
        li.appendChild(span);
      }
      ul.appendChild(li);
    });

    // “Más cotizado”
    const isBest = this.hasAttribute('best');
    root.querySelector('.card').classList.toggle('best', isBest);
  }
}

customElements.define('pricing-card', PricingCard);