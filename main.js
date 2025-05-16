const { createApp } = Vue;

createApp({
    data() {
        return {
            scrolled: false,
            navigation: [
                { title: 'Home', link: '#' },
                { title: 'Bureau', link: '#bureau' },
                { title: 'Cellules', link: '#cellules' },
                { title: 'Events', link: '#events' }
            ],
            carouselSlides: [
                { image: 'img1.png', alt: 'Event 1' },
                { image: 'img2.png', alt: 'Event 2' },
                { image: 'img3.png', alt: 'Event 3' },
                { image: 'img4.png', alt: 'Event 4' }
            ],
            bureauMembers: [
                {
                    name: 'Hiba knitha',
                    role: 'General Secretary',
                    icon: 'fas fa-scroll',
                    symbol: '📜'
                },
                {
                    name: 'Amine El hend',
                    role: 'C.Design Cell',
                    icon: 'fas fa-palette',
                    symbol: '🎨'
                }
            ],
            cells: [
                {
                    title: "Cellule Media",
                    description: "Cette cellule est responsable de la communication et de la gestion numérique de l'événement. Elle s'occupe de la création et de la diffusion du contenu visuel et audiovisuel, y compris les affiches, vidéos promotionnelles et publications sur les réseaux sociaux. Elle assure également le bon fonctionnement des outils informatiques et des plateformes en ligne utilisées pour l'organisation et la coordination des activités.",
                    icon: 'fas fa-comments',
                },
                {
                    title: "Cellule Planification",
                    description: "Chargée de l'organisation globale, cette cellule élabore le programme détaillé de l'événement. Elle coordonne les différentes étapes, définit les délais et veille à la bonne répartition des tâches entre les équipes. Son rôle est d'assurer une gestion fluide du projet en anticipant les imprévus et en optimisant les ressources disponibles.",
                    icon: 'fas fa-comments',
                },
                {
                    title: "Cellule Contact et Sponsoring",
                    description: "Cette cellule joue un rôle clé dans le développement des partenariats et la recherche de sponsors. Elle établit des relations avec les entreprises, institutions et potentiels contributeurs afin d'obtenir des financements ou du soutien matériel. Elle gère également la communication avec les intervenants, les invités et les participants pour garantir une collaboration efficace.",
                    icon: 'fas fa-comments',
                },
                {
                    title: "Cellule Organisation",
                    description: "Responsable de la logistique et de la mise en place des infrastructures, cette cellule veille à ce que tout soit en place pour le bon déroulement de l'événement. Elle gère l'accueil des participants, l'aménagement des espaces, la gestion des équipements et le respect des consignes de sécurité. Son objectif est d'assurer une expérience fluide et agréable pour tous les participants.",
                    icon: 'fas fa-comments',
                }
            ],
            socialMedia: [
                { icon: 'fab fa-instagram', link: 'https://instagram.com/amii_official' },
                { icon: 'fab fa-facebook', link: '#' },
                { icon: 'fab fa-linkedin', link: '#' }
            ]
        }
    },
    mounted() {
        $('#welcomepics').carousel({
            interval: 2000,
            pause: 'hover',
            wrap: true,
            keyboard: true
        });
    
        // Add touch support
        let touchStartX = 0;
        const carouselElement = document.querySelector('#welcomepics');
        
        carouselElement.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
    
        carouselElement.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].screenX;
            const threshold = 50;
            
            if (touchStartX - touchEndX > threshold) {
                $('#welcomepics').carousel('next');
            }
            if (touchStartX - touchEndX < -threshold) {
                $('#welcomepics').carousel('prev');
            }
        }, false);
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-quart'
        });

        tsParticles.load("particles", {
            particles: {
                number: { value: 80 },
                color: { value: "#82c4ad" },
                opacity: { value: 0.5 },
                size: { value: 1 },
                move: { speed: 1 }
            }
        });

        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.scrolled = window.scrollY > 50;
        },
        scrollBureau(direction) {
            const container = document.getElementById('bureauScroll');
            const scrollAmount = 300;
            container.scrollBy({
                left: scrollAmount * direction,
                behavior: 'smooth'
            });
        },
        visitDeveloper() {
            window.location.href = 'https://aferiad-kamal.pages.dev';
        }
    }
}).mount('#app');