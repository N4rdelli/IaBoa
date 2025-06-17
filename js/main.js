// Script da navbar componentizada (aprendi hoje)
fetch('/components/navbar.html').then(res => res.text()).then(data => document.getElementById('navbar').innerHTML = data);

import('/components/CardRoleDestaque.js');
import('/components/CategoriaBadge.js');
import('/components/CardProximoRole.js');

// Animações de destaque dos cards
// Executa o script quando o conteúdo do DOM estiver totalmente carregado.
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona todos os cards presentes na página.
    const cards = document.querySelectorAll('card-role-destaque');
    const cardContainer = document.querySelector('#card-container');
    
    // Se não houver cards, não faz nada.
    if (cards.length === 0) {
        return;
    }

    // Variáveis para controlar o estado da animação.
    let currentIndex = 0; // Índice do card atualmente destacado.
    let animationInterval = null; // Guardará a referência do setInterval.
    let isPausedByUser = false; // Flag para saber se o usuário está interagindo.

    // Função para remover a classe de destaque de todos os cards.
    const removeHighlight = () => {
        cards.forEach(card => card.classList.remove('highlighted'));
    };

    // Função principal que destaca o próximo card.
    const highlightNextCard = () => {
        // Se a animação estiver pausada pelo usuário, não faz nada.
        if (isPausedByUser) return;

        removeHighlight(); // Remove o destaque anterior.
        
        // Adiciona a classe de destaque ao card atual.
        cards[currentIndex].classList.add('highlighted');
        
        // Atualiza o índice para o próximo card, voltando ao início se chegar ao fim.
        currentIndex = (currentIndex + 1) % cards.length;
    };

    // Função para iniciar o ciclo de animação.
    const startAnimation = () => {
        // Limpa qualquer intervalo anterior para evitar múltiplos ciclos rodando.
        clearInterval(animationInterval);
        // Define um novo intervalo para chamar a função de destaque a cada 3 segundos (3000 ms).
        animationInterval = setInterval(highlightNextCard, 2000);
    };

    // Inicia a animação assim que a página carrega.
    highlightNextCard(); // Destaca o primeiro card imediatamente.
    startAnimation();

    // Adiciona ouvintes de eventos para pausar a animação na interação do usuário.
    // Usamos o container dos cards para delegar os eventos.
    if (cardContainer) {
        // Evento 'mouseover': ocorre quando o mouse entra na área do container.
        cardContainer.addEventListener('mouseover', () => {
            isPausedByUser = true; // Pausa o ciclo automático.
            clearInterval(animationInterval); // Para o intervalo.
            removeHighlight(); // Remove o destaque automático.
        });

        // Evento 'mouseout': ocorre quando o mouse sai da área do container.
        cardContainer.addEventListener('mouseout', () => {
            isPausedByUser = false; // Libera a pausa.
            highlightNextCard(); // Reinicia o destaque a partir de onde parou.
            startAnimation(); // Retoma o ciclo de animação.
        });
    }
});