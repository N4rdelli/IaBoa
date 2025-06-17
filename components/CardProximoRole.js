// Aqui nós criamos um template HTML para o nosso componente.
const template = document.createElement('template');
template.innerHTML = `
  <style>
    /* Importamos o Tailwind assim como no outro componente. */
    @import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');

    :host {
      display: block;
    }

    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-weight: 300;
      line-height: 1;
      transition: color 0.3s ease;
    }
    
    .cta-button, .favorite-button {
      transition: background-color 0.3s ease;
      transition: transform 0.3s ease;
    }

    .cta-button .material-symbols-outlined, .favorite-button .material-symbols-outlined {
      font-size: 24px;
    }

    .cta-button:hover, .favorite-button:hover {
      background-color: #FFFFFF;
    }
    
    .cta-button:hover .material-symbols-outlined {
      color: #272032;
    }

    .favorite-button:hover .material-symbols-outlined {
      font-variation-settings: 'FILL' 1;
      color: #272032;
    }

    #card-container {
      background: #272032;
      transition: all 0.3s ease;
    }

    #card-container:hover .cta-button{
      scale: 1.05;
      transform: translateY(-5px);
    }

    #card-container:hover{
      filter: brightness(1.2);
      cursor: pointer;
    }
  </style>

  <!-- Container principal do card. -->
  <div id="card-container" class="card-container overflow-hidden flex flex-col xl:flex-row shadow-lg">
    
    <!-- Container da Imagem -->
    <img id="card-img" src="https://placehold.co/300x300/E2E8F0/E2E8F0" alt="" class="w-full h-48 xl:w-48 xl:h-auto object-cover flex-shrink-0">

    <!-- Container de Informações -->
    <div class="info-container px-6 py-8 flex-grow flex justify-between items-center gap-4">
      
      <!-- Informações Principais (Título, horário, local, categorias) -->
      <div class="infos flex flex-col gap-6">
        <h3 id="card-title" class="text-xl font-semibold text-white"></h3>
        <div class="details-wrapper flex flex-col gap-2 text-sm font-light text-gray-300">
          <div id="horario-container" class="flex items-center gap-2">
            <span class="material-symbols-outlined">schedule</span>
            <p id="card-horario"></p>
          </div>
          <div id="lugar-container" class="flex items-center gap-2">
            <span class="material-symbols-outlined">location_on</span>
            <p id="card-lugar"></p>
          </div>
        </div>
        <div id="categorias-container" class="flex flex-wrap gap-x-4 gap-y-2"></div>
      </div>

      <!-- Botões -->
      <div class="buttons flex flex-col gap-4">
        <a id="card-link" href="#" class="cta-button w-12 h-12 rounded-full border border-white flex items-center justify-center">
          <span class="material-symbols-outlined text-white">arrow_outward</span>
        </a>
        <button class="favorite-button w-12 h-12 rounded-full border border-white flex items-center justify-center">
          <span class="material-symbols-outlined text-white">favorite</span>
        </button>
      </div>
    </div>
  </div>
`;

class CardProximoRole extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // Essa função aqui é chamada quando o elemento se conecta ao DOM.
  connectedCallback() {
    // Pega os valores dos atributos
    const imgSrc = this.getAttribute('img-src');
    const titulo = this.getAttribute('titulo');
    const horario = this.getAttribute('horario');
    const lugar = this.getAttribute('lugar');
    const href = this.getAttribute('href');
    // As categorias são passadas como uma string JSON e precisam ser convertidas para um objeto JavaScript.
    const categoriasData = JSON.parse(this.getAttribute('categorias') || '[]');

    // Seleciona os elementos no Shadow DOM
    const imgElement = this.shadowRoot.querySelector('#card-img');
    const titleElement = this.shadowRoot.querySelector('#card-title');
    const horarioElement = this.shadowRoot.querySelector('#card-horario');
    const lugarElement = this.shadowRoot.querySelector('#card-lugar');
    const linkElement = this.shadowRoot.querySelector('#card-link');
    const categoriasContainer = this.shadowRoot.querySelector('#categorias-container');

    // Atribui os valores
    imgElement.src = imgSrc;
    imgElement.alt = `Imagem do evento ${titulo}`;
    titleElement.textContent = titulo;
    horarioElement.textContent = horario;
    lugarElement.textContent = lugar;
    linkElement.href = href;

    // Limpa qualquer categoria anterior
    categoriasContainer.innerHTML = '';

    // Loop através dos dados das categorias para criar e adicionar cada badge dinamicamente.
    categoriasData.forEach(cat => {
      // Cria uma instância do nosso componente <categoria-badge>
      const badgeElement = document.createElement('categoria-badge');
      
      // Define os atributos para o componente da badge
      badgeElement.setAttribute('icon-name', cat.icon);
      badgeElement.setAttribute('text', cat.text);
      badgeElement.setAttribute('color', cat.color);
      
      // Adiciona a badge criada ao container de categorias dentro do card.
      categoriasContainer.appendChild(badgeElement);
    });
  }
}

// Define o nosso Custom Element. A badge no HTML será <card-proximo-role>.
window.customElements.define('card-proximo-role', CardProximoRole);