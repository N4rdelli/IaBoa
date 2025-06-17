// Criamos o template. A estrutura é quase idêntica à do componente de bloco.
const template = document.createElement('template');
template.innerHTML = `
  <style>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');

    :host {
      display: block;
      cursor: pointer;
      transition: transform 0.2s ease-in-out, filter 0.2s ease-in-out;
    }

    :host(:hover) {
      transform: scale(1.03); /* Escala um pouco menor para um efeito mais sutil */
      filter: brightness(1.2);
    }
    
    .material-symbols-outlined, h3 {
      color: var(--category-color, #FFFFFF);
    }

    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-size: 16px;
    }
    
    #card-container {
      background-color: #272032;
    }
  </style>

  <a id="link" href="#" class="block">
    <div id="card-container" class="card-container bg-[#272032] rounded-lg flex flex-row items-center p-4 gap-4 h-full">
      <span id="icon" class="material-symbols-outlined"></span>
      <h3 id="nome" class="text-sm font-light"></h3>
    </div>
  </a>
`;

// A classe JavaScript é IDÊNTICA à do componente de bloco, só muda o nome.
class CardCategoriaInline extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const iconName = this.getAttribute('icon-name');
    const nome = this.getAttribute('nome');
    const cor = this.getAttribute('cor');
    const href = this.getAttribute('href');

    const linkElement = this.shadowRoot.querySelector('#link');
    const iconElement = this.shadowRoot.querySelector('#icon');
    const nomeElement = this.shadowRoot.querySelector('#nome');

    linkElement.href = href;
    nomeElement.textContent = nome;

    if (iconName) {
      iconElement.textContent = iconName;
    } else {
      iconElement.style.display = 'none';
    }

    if (cor) {
      this.style.setProperty('--category-color', cor);
    }
  }
}

// Define o nosso Custom Element. A tag no HTML será <card-categoria-inline>.
window.customElements.define('card-categoria-inline', CardCategoriaInline);