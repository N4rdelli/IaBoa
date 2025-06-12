class NavbarIaBoa extends HTMLElement {
  connectedCallback() {
    const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

    const currentPage = location.pathname.split('/').pop();

    this.innerHTML = `
      <style>
        .nav-link {
          position: relative;
          color: #d1d5db; /* Tailwind: text-gray-300 */
          transition: color 0.3s ease;
          padding: 4px 0;
        }

        .nav-link:hover {
          color: #ffffff;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #ffffff;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link.active {
          color: #ffffff;
        }
      </style>

      <nav class="bg-[#1A1423] text-white text-xs lg:text-sm font-light tracking-wide leading-none py-4 px-8 md:px-16 lg:px-32 flex justify-between items-center">
        <button id="menu-btn" class="md:hidden cursor-pointer">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        <ul class="hidden md:flex space-x-6">
          <li><a href="../index.html" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">Página Inicial</a></li>
          <li><a href="../pages/sobre.html" class="nav-link ${currentPage === 'sobre.html' ? 'active' : ''}">Sobre o Projeto</a></li>
          <li><a href="../pages/desenvolvedores.html" class="nav-link ${currentPage === 'desenvolvedores.html' ? 'active' : ''}">Desenvolvedores</a></li>
        </ul>

        <div class="text-xl font-semibold">I a Boa?</div>

        <div class="hidden md:flex space-x-6 items-center">
          ${
            userLoggedIn
              ? `
              <div class="relative">
                <button id="profile-btn" class="bg-[#DB2763] px-4 py-2 lg:px-8 rounded-md flex items-center gap-2 hover:bg-[#B01D4F] transition">
                  Perfil
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div id="dropdown-menu" class="hidden absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100">Meu Perfil</a>
                  <button id="logout-btn" class="w-full text-left px-4 py-2 hover:bg-gray-100">Sair</button>
                </div>
              </div>
            `
              : `
              <button class="bg-transparent border border-white px-4 py-2 lg:px-8 rounded-md hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer">Cadastre-se</button>
              <button id="login-btn" class="bg-[#DB2763] px-4 py-2 lg:px-8 rounded-md hover:bg-[#B01D4F] transition-colors duration-200 cursor-pointer">Entrar</button>
            `
          }
        </div>
      </nav>

      <div id="offcanvas" class="fixed top-0 left-0 h-full w-64 bg-[#1A1423] text-white text-sm font-light tracking-wide leading-none transform -translate-x-full transition-transform duration-300 z-50 shadow-lg">
        <div class="flex justify-end p-4">
          <button id="close-btn" class="cursor-pointer">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <nav class="flex flex-col space-y-8 p-4">
          <div class="flex flex-col space-y-4">
            <a href="../index.html" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">Página Inicial</a>
            <a href="../pages/sobre.html" class="nav-link ${currentPage === 'sobre.html' ? 'active' : ''}">Sobre o Projeto</a>
            <a href="../pages/desenvolvedores.html" class="nav-link ${currentPage === 'desenvolvedores.html' ? 'active' : ''}">Desenvolvedores</a>
          </div>
          <div class="flex flex-col space-y-2">
            ${
              userLoggedIn
                ? `
                <button id="mobile-profile-btn" class="bg-[#DB2763] px-4 py-2 rounded-md hover:bg-[#B01D4F] transition">Meu Perfil</button>
                <button id="mobile-logout-btn" class="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition">Sair</button>
              `
                : `
                <button class="bg-transparent border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition">Cadastre-se</button>
                <button id="mobile-login-btn" class="bg-[#DB2763] px-4 py-2 rounded-md hover:bg-[#B01D4F] transition">Entrar</button>
              `
            }
          </div>
        </nav>
      </div>
    `;

    // OFFCANVAS
    const menuBtn = this.querySelector('#menu-btn');
    const offcanvas = this.querySelector('#offcanvas');
    const closeBtn = this.querySelector('#close-btn');
    menuBtn?.addEventListener('click', () => {
      offcanvas.classList.remove('-translate-x-full');
      offcanvas.classList.add('translate-x-0');
    });
    closeBtn?.addEventListener('click', () => {
      offcanvas.classList.add('-translate-x-full');
      offcanvas.classList.remove('translate-x-0');
    });

    // DROPDOWN
    const profileBtn = this.querySelector('#profile-btn');
    const dropdownMenu = this.querySelector('#dropdown-menu');
    profileBtn?.addEventListener('click', () => {
      dropdownMenu.classList.toggle('hidden');
    });

    // LOGIN
    const loginBtn = this.querySelector('#login-btn');
    const mobileLoginBtn = this.querySelector('#mobile-login-btn');
    loginBtn?.addEventListener('click', () => {
      window.location.href = '../pages/autenticacao/entrar.html';
    });
    mobileLoginBtn?.addEventListener('click', () => {
      window.location.href = '../pages/autenticacao/entrar.html';
    });

    // LOGOUT
    const logoutBtn = this.querySelector('#logout-btn');
    const mobileLogoutBtn = this.querySelector('#mobile-logout-btn');
    logoutBtn?.addEventListener('click', () => {
      localStorage.removeItem('userLoggedIn');
      location.reload();
    });
    mobileLogoutBtn?.addEventListener('click', () => {
      localStorage.removeItem('userLoggedIn');
      location.reload();
    });
  }
}

customElements.define('navbar-iaboa', NavbarIaBoa);