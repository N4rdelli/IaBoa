// Aqui nós criamos um template HTML para o nosso componente.
const template = document.createElement('template');
template.innerHTML = `
<style>
    /* Aqui nós importamos o Tailwind (como o Shadow DOM encapsula o CSS, importar o tailwind só no index não funciona, portanto temos que importar ele dentro de cada Web Component) */
    @import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');

    /* Nós também podemos utilizar clases CSS aqui, e elas ficaram encapsuladas aqui dentro) */
    #card-container{
      background: #272032;
      transition: transform 0.3s ease;
    }

    :host {
      display: block; /* Garante que o custom element se comporte como um bloco */
      cursor: pointer;
    }
  </style>

  <!-- O card inteiro é um link '<a>' -->
  <a href="#" class="block group">
    <div id="card-container" class="rounded-lg overflow-hidden flex flex-col h-full">
      <!-- Container da Imagem -->
      <div id="img-container">
        <img id="card-img" src="" alt="" class="w-full h-48 object-cover">
      </div>
      
      <!-- Container de Informações (Título e Descrição) -->
      <div id="info-container" class="flex flex-col px-6 py-8 gap-y-4 flex-grow">
        <h3 id="card-title" class="font-semibold text-xl text-white"></h3>
        <p id="card-description" class="font-light text-sm leading-relaxed text-white"></p>
      </div>

    </div>
  </a>
`;

// Define a classe do nosso Custom Element, que herda de HTMLElement
class CardRoleDestaque extends HTMLElement {
  constructor() {
    // Nós sempre vamos chamar super() primeiro no construtor
    super();

    // Anexa uma Shadow DOM à instância do elemento.
    // O modo 'open' permite que o JavaScript da página principal acesse o Shadow DOM.
    this.attachShadow({ mode: 'open' });

    // Anexa o conteúdo do nosso template clonado ao Shadow DOM.
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // Essa função é chamada quando o elemento é conectado ao DOM principal do documento.
  // É o local ideal para settar os atributos e configurar o estado inicial do componente.
  connectedCallback() {
    // Pega os valores dos atributos definidos no HTML
    const imgSrc = this.getAttribute('img-src');
    const titulo = this.getAttribute('titulo');
    const descricao = this.getAttribute('descricao');
    const href = this.getAttribute('href');

    // Seleciona os elementos dentro do Shadow DOM e atribui os valores a eles
    const imgElement = this.shadowRoot.querySelector('#card-img');
    const titleElement = this.shadowRoot.querySelector('#card-title');
    const descriptionElement = this.shadowRoot.querySelector('#card-description');
    const linkElement = this.shadowRoot.querySelector('a');

    // Aqui nós configuramos onde estamos passando os atributos no card feito ali em cima
    imgElement.src = imgSrc;
    imgElement.alt = `Imagem do ${titulo}`; // Adicionando automaticamente um alt para as imagens
    titleElement.textContent = titulo;
    descriptionElement.textContent = descricao;
    linkElement.href = href;
  }
}

// Define o nosso Custom Element. A tag no HTML será <card-role-destaque>.
window.customElements.define('card-role-destaque', CardRoleDestaque);
