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
            window.open(link, '_blank');
        });
    });
});

//Redirecionamento Projetos
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(function (card) {
        if (card.id === 'catalogo') {
            return 1;
        }
        card.addEventListener('click', function () {
            let link = this.getAttribute('data-link');
            window.open(link, '_blank');
        });
    });
});

//Modal Catálogo
document.addEventListener('DOMContentLoaded', function () {
    const catalogo = document.getElementById('catalogo');
    const modal = document.getElementById('modal');

    catalogo.addEventListener('click', function () {
        modal.style.display = "block";
    })

    modal.addEventListener('click', function () {
        modal.style.display = "none";
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

//Sections Mobile
function Sidebar() {

}