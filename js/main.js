// Script da navbar componentizada (aprendi hoje)
fetch('/components/navbar.html')
  .then((res) => res.text())
  .then((data) => (document.getElementById('navbar').innerHTML = data));

import('/components/navbar.js');
import('/components/CardRoleDestaque.js');
import('/components/CategoriaBadge.js');
import('/components/CardProximoRole.js');
import('/components/CardCategoriaBloco.js');
import('/components/CardCategoriaInline.js');

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
    cards.forEach((card) => card.classList.remove('highlighted'));
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

// Carrossel
// Executa o script quando o conteúdo da página estiver totalmente carregado.
document.addEventListener('DOMContentLoaded', () => {
  // Seleciona os elementos essenciais do carrossel.
  const track = document.getElementById('carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.getElementById('carousel-next');
  const prevButton = document.getElementById('carousel-prev');
  const carouselContainer = document.getElementById('carousel-container');

  // Se algum elemento essencial não for encontrado, interrompe o script.
  if (!track || !nextButton || !prevButton || slides.length === 0) {
    console.error('Elementos do carrossel não encontrados.');
    return;
  }

  // Obtém a largura de um slide. Assumimos que todos têm a mesma largura.
  const slideWidth = slides[0].getBoundingClientRect().width;

  // Variáveis de estado
  let currentIndex = 0; // Índice do slide atual.
  let autoplayInterval = null; // Guardará a referência do nosso 'setInterval'.

  // === FUNÇÕES ===

  // Função para mover o track para o slide correto.
  const moveToSlide = (targetIndex) => {
    // Calcula o quanto o track precisa se mover para a esquerda.
    const amountToMove = targetIndex * slideWidth;
    track.style.transform = `translateX(-${amountToMove}px)`;
    currentIndex = targetIndex; // Atualiza o índice atual.
  };

  // Função para ir para o próximo slide.
  const goToNextSlide = () => {
    // Se estiver no último slide, volta para o primeiro. Senão, vai para o próximo.
    const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    moveToSlide(nextIndex);
  };

  // Função para iniciar a troca automática de slides.
  const startAutoplay = () => {
    // Limpa qualquer autoplay anterior para evitar múltiplos intervalos rodando.
    stopAutoplay();
    // Define um novo intervalo para chamar a função goToNextSlide a cada 4 segundos (4000 ms).
    autoplayInterval = setInterval(goToNextSlide, 4000);
  };

  // Função para parar a troca automática.
  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };

  // === CONFIGURAÇÃO INICIAL E EVENTOS ===

  // Posiciona os slides corretamente no início (isto é redundante, mas é uma boa prática).
  moveToSlide(0);

  // Evento de clique no botão "Próximo".
  nextButton.addEventListener('click', () => {
    goToNextSlide();
  });

  // Evento de clique no botão "Anterior".
  prevButton.addEventListener('click', () => {
    // Se estiver no primeiro slide, vai para o último. Senão, vai para o anterior.
    const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    moveToSlide(prevIndex);
  });

  // Eventos para pausar o autoplay quando o mouse está sobre o carrossel.
  carouselContainer.addEventListener('mouseenter', stopAutoplay);
  carouselContainer.addEventListener('mouseleave', startAutoplay);

  // Inicia o autoplay assim que a página carrega.
  startAutoplay();

  // Bônus: Recalcular a largura do slide se a janela for redimensionada.
  window.addEventListener('resize', () => {
    // Recalcula a largura do slide e reposiciona o carrossel.
    const newSlideWidth = slides[0].getBoundingClientRect().width;
    track.style.transition = 'none'; // Desativa a animação durante o reajuste.
    track.style.transform = `translateX(-${currentIndex * newSlideWidth}px)`;
    // Reativa a animação após um pequeno atraso.
    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
  });
});
