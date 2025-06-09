    // Card 1
    const conteudo = document.getElementById('conteudoMobile')
    const botao = document.getElementById('btnIcone')
    const trocaIcone = document.getElementById('btnTroca')

    botao.addEventListener("click", () =>{
        const estaAberto = conteudo.classList.contains("max-h-[300px]");
        if (estaAberto) {
            conteudo.classList.remove("max-h-[300px]");
            conteudo.classList.add("max-h-0");
            trocaIcone.classList.remove("fa-angle-up");
            trocaIcone.classList.add("fa-angle-down");
        } else {
            conteudo.classList.remove("max-h-0");
            conteudo.classList.add("max-h-[300px]");
            trocaIcone.classList.remove("fa-angle-down");
            trocaIcone.classList.add("fa-angle-up");
        };
    });

    // Card 2
    const conteudo2 = document.getElementById('conteudoMobile2')
    const botao2 = document.getElementById('btnIcone2')
    const trocaIcone2 = document.getElementById('btnTroca2')

    botao2.addEventListener("click", () =>{
        const estaAberto = conteudo2.classList.contains("max-h-[300px]");
        if (estaAberto) {
            conteudo2.classList.remove("max-h-[300px]");
            conteudo2.classList.add("max-h-0");
            trocaIcone2.classList.remove("fa-angle-up");
            trocaIcone2.classList.add("fa-angle-down");
        } else {
            conteudo2.classList.remove("max-h-0");
            conteudo2.classList.add("max-h-[300px]");
            trocaIcone2.classList.remove("fa-angle-down");
            trocaIcone2.classList.add("fa-angle-up");
        };
    });

    // Card 3
    const conteudo3 = document.getElementById('conteudoMobile3')
    const botao3 = document.getElementById('btnIcone3')
    const trocaIcone3 = document.getElementById('btnTroca3')

    botao3.addEventListener("click", () =>{
        const estaAberto = conteudo3.classList.contains("max-h-[300px]");
        if (estaAberto) {
            conteudo3.classList.remove("max-h-[300px]");
            conteudo3.classList.add("max-h-0");
            trocaIcone3.classList.remove("fa-angle-up");
            trocaIcone3.classList.add("fa-angle-down");
        } else {
            conteudo3.classList.remove("max-h-0");
            conteudo3.classList.add("max-h-[300px]");
            trocaIcone3.classList.remove("fa-angle-down");
            trocaIcone3.classList.add("fa-angle-up");
        };
    });

    // card 4
    const conteudo4 = document.getElementById('conteudoMobile4')
    const botao4 = document.getElementById('btnIcone4')
    const trocaIcone4 = document.getElementById('btnTroca4')

    botao4.addEventListener("click", () =>{
        const estaAberto = conteudo4.classList.contains("max-h-[300px]");
        if (estaAberto) {
            conteudo4.classList.remove("max-h-[300px]");
            conteudo4.classList.add("max-h-0");
            trocaIcone4.classList.remove("fa-angle-up");
            trocaIcone4.classList.add("fa-angle-down");
        } else {
            conteudo4.classList.remove("max-h-0");
            conteudo4.classList.add("max-h-[300px]");
            trocaIcone4.classList.remove("fa-angle-down");
            trocaIcone4.classList.add("fa-angle-up");
        };
    });

    // Card 5
    const conteudo5 = document.getElementById('conteudoMobile5')
    const botao5 = document.getElementById('btnIcone5')
    const trocaIcone5 = document.getElementById('btnTroca5')

    botao5.addEventListener("click", () =>{
        const estaAberto = conteudo5.classList.contains("max-h-[300px]");
        if (estaAberto) {
            conteudo5.classList.remove("max-h-[300px]");
            conteudo5.classList.add("max-h-0");
            trocaIcone5.classList.remove("fa-angle-up");
            trocaIcone5.classList.add("fa-angle-down");
        } else {
            conteudo5.classList.remove("max-h-0");
            conteudo5.classList.add("max-h-[300px]");
            trocaIcone5.classList.remove("fa-angle-down");
            trocaIcone5.classList.add("fa-angle-up");
        };
    });