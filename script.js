document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(".menu a");
    const homeLink = document.querySelector(".menu a.active");

    function updateActiveLink() {
        const currentHash = window.location.hash;

        if (!currentHash) {
            menuLinks.forEach(link => link.classList.remove("active"));
            homeLink.classList.add("active");
            return;
        }

        menuLinks.forEach(link => {
            if (link.getAttribute("href") === currentHash) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    updateActiveLink();

    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            updateActiveLink();
        });
    });

    window.addEventListener("hashchange", updateActiveLink);
});

function openImage(imageUrl) {
    window.open(imageUrl, "_self");
}
