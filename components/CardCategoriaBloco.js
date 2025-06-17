// Aqui criamos um template HTML para o nosso componente.
const template = document.createElement('template');
template.innerHTML = `
  <style>
    /* Importamos o Tailwind para que as classes funcionem no Shadow DOM, igual a todos os outros componentes */
    @import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');

    :host {
      display: block;
      cursor: pointer;
      transition: transform 0.2s ease-in-out, filter 0.2s ease-in-out;
    }

    :host(:hover) {
      transform: scale(1.05);
      filter: brightness(1.2);
    }
    
    /* Usamos variáveis CSS (--category-color) para aplicar a cor dinamicamente.*/
    .material-symbols-outlined, h3 {
      color: var(--category-color, #FFFFFF); /* Usa a cor passada ou branco como padrão */
    }

    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-size: 48px;
    }

    #card-container {
      background-color: #272032;
    }
  </style>

  <!-- O componente inteiro é um link para navegação -->
  <a id="link" href="#" class="block">
    <div id="card-container" class="card-container rounded-lg flex flex-col items-center justify-center p-4 py-6 gap-1 h-full">
      <!-- O ícone só vai ser exibido se um 'icon-name' for fornecido lá no index. -->
      <span id="icon" class="material-symbols-outlined"></span>
      <h3 id="nome" class="text-sm font-light text-center"></h3>
    </div>
  </a>
`;

class CardCategoriaBloco extends HTMLElement {
  constructor() {
    // Chama o construtor da classe pai HTMLElement.
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // Essa função é chamada quando o elemento é conectado ao DOM.
  connectedCallback() {
    // Pega os valores dos atributos definidos no HTML.
    const iconName = this.getAttribute('icon-name');
    const nome = this.getAttribute('nome');
    const cor = this.getAttribute('cor');
    const href = this.getAttribute('href');

    // Seleciona os elementos dentro do Shadow DOM para preenchê-los.
    const linkElement = this.shadowRoot.querySelector('#link');
    const iconElement = this.shadowRoot.querySelector('#icon');
    const nomeElement = this.shadowRoot.querySelector('#nome');

    // Atribui os valores.
    linkElement.href = href;
    nomeElement.textContent = nome;

    // Lógica para o ícone opcional:
    // Se receber um nome de ícone, exibe.
    if (iconName) {
      iconElement.textContent = iconName;
    } else {
      // Se não, esconde completamente o elemento do ícone.
      iconElement.style.display = 'none';
    }

    // Se uma cor for passada, a definimos como o valor da nossa variável CSS.
    if (cor) {
      this.style.setProperty('--category-color', cor);
    }
  }
}

// Define o nosso Custom Element. A tag no HTML será <card-categoria-bloco>.
window.customElements.define('card-categoria-bloco', CardCategoriaBloco);