import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';

class SuscripcionCard extends LitElement {
  static properties = {
    titulo: { type: String },
    descripcion: { type: String },
    precio: { type: String },
    boton: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      background: #fff;
      max-width: 300px;
      font-family: 'Segoe UI', sans-serif;
      box-sizing: border-box;
    }

    h2 {
      margin-top: 0;
      font-size: 1.5rem;
      color: #2c3e50;
    }

    p {
      margin: 0.5rem 0 1rem 0;
      color: #555;
    }

    .precio {
      font-weight: bold;
      font-size: 1.25rem;
      color: #27ae60;
      margin-bottom: 1rem;
      display: block;
    }

    button {
      background: #2980b9;
      color: white;
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover {
      background: #1f6391;
    }
  `;

  constructor() {
    super();
    this.titulo = 'Título';
    this.descripcion = 'Descripción';
    this.precio = '$0';
    this.boton = 'Suscribirme';
  }

  render() {
    return html`
      <h2>${this.titulo}</h2>
      <p>${this.descripcion}</p>
      <span class="precio">${this.precio}</span>
      <button @click=${this._emitirEvento}>${this.boton}</button>
    `;
  }

  _emitirEvento() {
    this.dispatchEvent(new CustomEvent('suscripcion-realizada', {
      detail: { plan: this.titulo },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('suscripcion-card', SuscripcionCard);
