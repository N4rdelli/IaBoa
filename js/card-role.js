class CardRole extends HTMLElement {
    connectedCallback() {
        const titulo = this.getAttribute('titulo') || '';
        const horario = this.getAttribute('horario') || '';
        const local = this.getAttribute('local') || '';
        const categoria = this.getAttribute('categoria') || '';
        const imagem = this.getAttribute('imagem') || '';

        this.innerHTML = `
            <div class="card">
                <img src="${imagem}" alt="${titulo}" class="card-role-imagem"
                <div class="flex flex-column">
                    <h1>${titulo}</h1>
                    <h3>${horario}</h3>
                    <h3>${local}</h3>
                </div>
            </div>
        `
    }
}

customElements.define('card-role', CardRole);