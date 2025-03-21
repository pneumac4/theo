document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(".menu a");
    const homeLink = document.querySelector(".menu a.active"); // "Accueil" par défaut

    function updateActiveLink() {
        const currentHash = window.location.hash; // Récupère l'ancre (#section1)

        if (!currentHash) {
            // Si aucun #id dans l'URL, forcer l'Accueil actif et désactiver les autres
            menuLinks.forEach(link => link.classList.remove("active"));
            homeLink.classList.add("active");
            return;
        }

        menuLinks.forEach(link => {
            if (link.getAttribute("href") === currentHash) {
                link.classList.add("active"); // Active le bon menu
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Exécuter au chargement de la page
    updateActiveLink();

    // Mettre à jour au clic sur un lien du menu
    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            updateActiveLink();
        });
    });

    // Mettre à jour quand l'utilisateur utilise le bouton retour du navigateur
    window.addEventListener("hashchange", updateActiveLink);
});
