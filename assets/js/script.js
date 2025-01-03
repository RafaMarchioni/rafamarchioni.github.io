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
});

//Retirar Classe Underline
document.addEventListener('DOMContentLoaded', function () {
    var largura = window.innerWidth;
    const nome = document.getElementById('name-mobile');

    if (largura < 950) {
        nome.classList.remove('hvr-underline-from-left');
    }
});

//Typing Animation
document.addEventListener('DOMContentLoaded', function () {
    const description = document.querySelector('.description');

    function startTypingAnimation() {
        description.style.animation = 'typing 3s steps(40) forwards, blink 0.8s infinite';
        description.style.borderRight = '2px solid #15AAFF';
        description.style.opacity = '1';
    }

    function stopTypingAnimation() {
        description.style.animation = 'none';
        description.style.borderRight = 'none';
        description.style.opacity = '0';
    }

    function toggleTypingAnimation() {
        startTypingAnimation();
        setTimeout(stopTypingAnimation, 4000);
        setTimeout(startTypingAnimation, 4500);
    }

    let animationInterval = null;

    function checkScreenWidth() {
        if (window.innerWidth > 950) {
            if (!animationInterval) {
                toggleTypingAnimation();
                animationInterval = setInterval(toggleTypingAnimation, 8000);
            }
        } else {
            if (animationInterval) {
                clearInterval(animationInterval);
                animationInterval = null;
                stopTypingAnimation();
            }
        }
    }

    checkScreenWidth();

    window.addEventListener('resize', checkScreenWidth);
});

