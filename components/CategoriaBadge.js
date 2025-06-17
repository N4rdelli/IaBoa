// Aqui nós criamos um template HTML para o nosso componente.
const template = document.createElement('template');
template.innerHTML = `
  <style>
    /* Importamos o Tailwind CSS para que as classes utilitárias funcionem dentro do Shadow DOM. */
    @import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');

    :host {
      display: inline-block; /* Faz o componente se comportar como um elemento inline com propriedades de bloco. */
    }

    /* Aqui usamos variáveis CSS para aplicar a cor dinamicamente. O valor de '--category-color' será definido via JavaScript. */

    .category-tag-container {
      border-left: 3px solid var(--category-color, #FFFFFF); /* Usamos a cor passada ou branco como padrão */
      color: var(--category-color, #FFFFFF);
    }
    
    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-weight: 300;
      font-size: 18px;
      line-height: 1;
    }
  </style>

  <div class="category-tag-container flex items-center gap-2 pl-2">
    <span id="icon" class="material-symbols-outlined"></span>
    <h5 id="text" class="text-sm font-normal"></h5>
  </div>
`;

class CategoriaBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // Essa função é chamada quando o elemento é conectado ao DOM.
  connectedCallback() {
    // Pegamos os valores dos atributos definidos no HTML.
    const iconName = this.getAttribute('icon-name');
    const text = this.getAttribute('text');
    const color = this.getAttribute('color');

    // Selecionamos os elementos dentro do Shadow DOM para preenchê-los.
    this.shadowRoot.querySelector('#icon').textContent = iconName;
    this.shadowRoot.querySelector('#text').textContent = text;

    // Se uma cor foi passada como atributo, nós definimos ela como o valor da nossa variável CSS.
    if (color) {
      // this.style.setProperty é a forma de definir uma variável CSS no elemento host.
      this.style.setProperty('--category-color', color);
    }
  }
}

// Define o nosso Custom Element. A tag no HTML será <categoria-tag>.
window.customElements.define('categoria-badge', CategoriaBadge);