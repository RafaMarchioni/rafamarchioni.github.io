//Rolagem de Seções
function Section(sectionId) {
    const section = document.getElementById(sectionId);
    let checkbox = document.getElementById('check');

    if (section) {
        if (checkbox.checked) {
            checkbox.checked = false;
        }
        window.scrollTo({
            top: section.offsetTop - 85,
            behavior: "smooth"
        });
    }
}

//Observer para Adicionar slideRight
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.hidden');

    const sectionObserver = new IntersectionObserver((retornoObserver) => {
        let delay = 0;
        retornoObserver.forEach((section) => {
            if (section.isIntersecting) {
                setTimeout(() => {
                    section.target.classList.add('slideRight');
                }, delay);
                delay += 200;
            }
        })
    });

    sections.forEach((section) => sectionObserver.observe(section))
});

//Animação NavigationBar
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');

    function checkScroll() {
        if (window.scrollY > 0) {
            navbar.classList.add("navbarAfter");
        } else {
            navbar.classList.remove("navbarAfter");
        }
    }
    checkScroll();
    window.addEventListener('scroll', checkScroll);
});


//Redirecionamento Experiências
document.addEventListener('DOMContentLoaded', function () {
    const companies = document.querySelectorAll('.company-logo');
    companies.forEach(function (company) {
        company.addEventListener('click', function () {
            let link = this.getAttribute('data-link');
            if (link == NULL) {
                return 1;
            }
            window.open(link, '_blank');
        });
    });
});

//Redirecionamento Projetos
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(function (card) {
        if (card.id != 'pim') {
            return 1;
        }
        card.addEventListener('click', function () {
            let link = this.getAttribute('data-link');
            window.open(link, '_blank');
        });
    });
});

//Modais
document.addEventListener('DOMContentLoaded', function () {
    const gestiona = document.getElementById('gestiona');
    const modalGestiona = document.getElementById('modal-gestiona');

    const fornecedor = document.getElementById('fornecedor');
    const modalFornecedor = document.getElementById('modal-fornecedor');

    const catalogo = document.getElementById('catalogo');
    const modalCatalogo = document.getElementById('modal-catalogo');

    const formulario = document.getElementById('formulario');
    const modalFormulario = document.getElementById('modal-formulario');

    gestiona.addEventListener('click', function () {
        modalGestiona.style.display = "block";
    })

    modalGestiona.addEventListener('click', function () {
        modalGestiona.style.display = "none";
    })

    fornecedor.addEventListener('click', function () {
        modalFornecedor.style.display = "block";
    })

    modalFornecedor.addEventListener('click', function () {
        modalFornecedor.style.display = "none";
    })

    catalogo.addEventListener('click', function () {
        modalCatalogo.style.display = "block";
    })

    modalCatalogo.addEventListener('click', function () {
        modalCatalogo.style.display = "none";
    })

    formulario.addEventListener('click', function () {
        modalFormulario.style.display = "block";
    })

    modalFormulario.addEventListener('click', function () {
        modalFormulario.style.display = "none";
    })
});

//Retirar Classe Underline
document.addEventListener('DOMContentLoaded', function () {
    var largura = window.innerWidth;
    const nome = document.getElementById('name-mobile');

    if (largura < 950) {
        nome.classList.remove('hvr-underline-from-left');
    }
});

//Typing Animation e Linguas
document.addEventListener('DOMContentLoaded', function () {
    // --- Elementos Globais ---
    const langToggleBtn = document.getElementById('lang-toggle');
    const descriptionContainer = document.querySelector('.description');
    const langEnElements = document.querySelectorAll('.lang-en');
    const langPtElements = document.querySelectorAll('.lang-pt');

    let currentLang = localStorage.getItem('portfolioLang') || 'pt';
    let animationInterval = null; // ID do setInterval para repetir a animação
    let isWideScreen = window.innerWidth > 950; // Estado atual da largura da tela
    let typingTimeout = null; // ID do setTimeout para controlar o fim da digitação
    let stopTimeout = null; // ID do setTimeout para parar/ocultar após espera

    function startTypingAnimation() {
        // Só executa se o container existir e a tela for larga
        if (!descriptionContainer || !isWideScreen) return;

        const visibleLangSpan = descriptionContainer.querySelector('.lang-en:not(.hidden-lang), .lang-pt:not(.hidden-lang)');

        if (!visibleLangSpan) {
            console.error("Não foi possível encontrar o span de idioma visível dentro de .description");
            stopTypingAnimation();
            return;
        }

        // --- Reinício da Animação ---
        visibleLangSpan.style.animation = 'none';
        visibleLangSpan.style.width = '0';
        visibleLangSpan.style.opacity = '0';
        void visibleLangSpan.offsetHeight;

        // Reaplica os estilos para iniciar a animação com os valores corretos/dinâmicos
        visibleLangSpan.style.width = ''; // Remove a largura fixa para o keyframe 'typing' assumir
        visibleLangSpan.style.opacity = '1'; // Torna visível
        visibleLangSpan.style.animation = `typing 3.5s steps(60) forwards, blink 0.8s infinite`;
        visibleLangSpan.style.borderRight = '2px solid #15AAFF'; // Garante que o cursor (borda) volte
    }

    function stopTypingAnimation() {
        if (!descriptionContainer) return;
        // Para a animação CSS, remove a borda (cursor) e torna o elemento invisível
        descriptionContainer.style.animation = 'none';
        descriptionContainer.style.borderRight = 'none';
        descriptionContainer.style.opacity = '0';
        descriptionContainer.style.width = '0'; // Garante que a largura volte a zero

        // Limpa timeouts pendentes do ciclo de animação para evitar execuções fantasmas
        if (typingTimeout) clearTimeout(typingTimeout);
        if (stopTimeout) clearTimeout(stopTimeout);
        typingTimeout = null;
        stopTimeout = null;
    }

    // Roda um ciclo: Mostra a digitação -> Espera -> Esconde
    function runTypingCycle() {
        // Se a tela ficou estreita enquanto o ciclo estava agendado, para tudo
        if (!isWideScreen) {
             stopTypingAnimation();
             return;
        }
        // Limpa timeouts de ciclos anteriores que possam estar pendentes
        if (typingTimeout) clearTimeout(typingTimeout);
        if (stopTimeout) clearTimeout(stopTimeout);

        // Inicia a animação de digitação (que define a duração baseada no texto)
        startTypingAnimation();

        // Calcula novamente a duração da digitação atual para agendar a parada
        const visibleLangSpan = descriptionContainer.querySelector('.lang-en:not(.hidden-lang), .lang-pt:not(.hidden-lang)');
        const textLength = visibleLangSpan ? (visibleLangSpan.textContent || '').length : 40; // Usa 40 como fallback
        const typingDurationMs = Math.max(1.5, textLength * 0.08) * 1000; // Duração em milissegundos
        const waitDurationMs = 2000; // Tempo para ficar visível após digitar (2 segundos)

        // Agenda a chamada para stopTypingAnimation após a digitação + espera
        stopTimeout = setTimeout(stopTypingAnimation, typingDurationMs + waitDurationMs);
    }


    // --- Funções de Controle (Idioma e Largura da Tela) ---

    const setLanguage = (lang) => {
        currentLang = lang; // Atualiza o estado global

        // Aplica/Remove a classe 'hidden-lang' para todos os elementos relevantes na página
        if (lang === 'pt') {
            langEnElements.forEach(el => el.classList.add('hidden-lang'));
            langPtElements.forEach(el => el.classList.remove('hidden-lang'));

            if (langToggleBtn) {
                langToggleBtn.innerHTML = '';
                const imgEn = document.createElement('img');
                imgEn.src = '../assets/img/USA.svg';
                imgEn.alt = 'Switch to English';
                imgEn.style.height = '30px';
                langToggleBtn.appendChild(imgEn);
            }
        } else {
            langPtElements.forEach(el => el.classList.add('hidden-lang'));
            langEnElements.forEach(el => el.classList.remove('hidden-lang'));

            if (langToggleBtn) {
                langToggleBtn.innerHTML = '';
                const imgPt = document.createElement('img');
                imgPt.src = '../assets/img/Brazil.svg';
                imgPt.alt = 'Mudar para Português';
                imgPt.style.height = '30px';
                langToggleBtn.appendChild(imgPt);
            }
        }

        // Salva a preferência no localStorage para visitas futuras
        localStorage.setItem('portfolioLang', lang);

        // --- Lógica de Animação Pós-Troca de Idioma ---
        if (isWideScreen) {
            // Para completamente o ciclo de animação atual (intervalo e timeouts)
            if (animationInterval) clearInterval(animationInterval);
            if (typingTimeout) clearTimeout(typingTimeout);
            if (stopTimeout) clearTimeout(stopTimeout);
            animationInterval = null;
            typingTimeout = null;
            stopTimeout = null;

            // Roda o ciclo de animação IMEDIATAMENTE com o novo texto
            // Usamos um pequeno timeout para garantir que o DOM atualizou a visibilidade do span
            setTimeout(() => {
                 runTypingCycle();
                 animationInterval = setInterval(runTypingCycle, 8000); // Ex: Repete a cada 8 segundos
            }, 50);

        } else {
            // Se a tela for estreita durante a troca de idioma, apenas garante que a animação esteja parada
            stopTypingAnimation();
        }
    };

    // Verifica a largura da tela e gerencia o início/fim do intervalo da animação
    function checkScreenWidth() {
        const currentlyWide = window.innerWidth > 950;

        if (currentlyWide && !isWideScreen) {
            // Transição: Estreita -> Larga
            isWideScreen = true;
             stopTypingAnimation(); // Garante que qualquer estado anterior seja limpo
            // Roda o ciclo de animação uma vez imediatamente
             setTimeout(() => { // Pequeno delay para garantir renderização inicial
                 runTypingCycle();
                // Inicia o intervalo para repetir a animação
                if (animationInterval) clearInterval(animationInterval); // Limpa por segurança
                animationInterval = setInterval(runTypingCycle, 8000);
            }, 250); // Delay um pouco maior na transição de tela

        } else if (!currentlyWide && isWideScreen) {
            // Transição: Larga -> Estreita
            isWideScreen = false;
            // Para o intervalo de repetição
            if (animationInterval) {
                clearInterval(animationInterval);
                animationInterval = null;
            }
            // Para e esconde a animação imediatamente
            stopTypingAnimation();
        }
    }

    // Define o idioma
    setLanguage(currentLang);

    // Verifica a largura da tela inicial e inicia a animação/intervalo se necessário
    checkScreenWidth();

    // Listener para redimensionamento da janela (com debounce)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        // Espera um pouco após o usuário parar de redimensionar para executar a checagem
        resizeTimer = setTimeout(checkScreenWidth, 250);
    });

    // Listener para o botão de alternar idioma
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            // Chama setLanguage com o idioma OPOSTO ao atual
            setLanguage(currentLang === 'en' ? 'pt' : 'en');
        });
    } else {
        console.warn("Elemento com id 'lang-toggle' não encontrado.");
    }
});