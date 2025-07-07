
// if (typeof(Storage) !== "undefined") {
//     alert ("Votre navigateur supporte l'API local storage !");
// } else {
//     alert ("Votre navigateur ne supporte pas l'API local storage !");
// }

// #CANVAS

const canvas = document.getElementById('marquee');
const ctx = canvas.getContext('2d');

const text = "Explorez et enrichissez votre connaissance à travers le site d’apprentissage sur la technologie.";
const speed = 1;

ctx.font = "14px Poppins";
ctx.fillStyle = "#FEEAA1";

let x = -ctx.measureText(text).width;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(text, x, 22);

    x += speed;

    if (x > canvas.width) {
        x = -ctx.measureText(text).width;
    }

    requestAnimationFrame(animate);
}

animate();

// #ACTIVE PAGE

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


// #THEME

const body = document.getElementById("maPage");
const toggleBtn = document.getElementById("toggleTheme");
const icon = document.getElementById("themeIcon");
const themeImage = document.getElementById("themeImage");

const savedTheme = localStorage.getItem("theme");

function appliquerTheme(theme) {
    if (savedTheme === "nuit") {
        body.classList.replace("theme-jour", "theme-nuit");
        icon.classList.replace("fa-moon", "fa-sun");
        icon.title = "Thème clair";
        themeImage.src = "images/connaissance2.jpg";
    } else {
        body.classList.add("theme-jour");
        icon.classList.replace("fa-sun", "fa-moon");
        icon.title = "Thème sombre";
        themeImage.src = "images/connaissance1.jpg";
    }
}

if (savedTheme === "nuit") {
  appliquerTheme("nuit");
} else {
  appliquerTheme("jour");
}

toggleBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (body.classList.contains("theme-jour")) {
    body.classList.replace("theme-jour", "theme-nuit");
    icon.classList.replace("fa-moon", "fa-sun");
    icon.title = "Thème clair";
    themeImage.src = "images/connaissance2.jpg";

    localStorage.setItem("theme", "nuit");
  } else {
    body.classList.replace("theme-nuit", "theme-jour");
    icon.classList.replace("fa-sun", "fa-moon");
    icon.title = "Thème sombre";
    themeImage.src = "images/connaissance1.jpg";

    localStorage.setItem("theme", "jour");
  }
});


// #USER SESSION

function handleLogin() {
    const username = localStorage.getItem("username");

    if (username) {
    localStorage.removeItem("username");
    localStorage.removeItem("session_expires");
    updateUI();
    } else {
        const name = prompt("Entrez votre nom d'utilisateur :");
        if (name) {
          const expiration = Date.now() + 1000 * 60 * 60 * 1;
            localStorage.setItem("username", name);
            localStorage.setItem("session_expires", expiration);
            updateUI();
        }
    }
}

function updateUI() {
    const username = localStorage.getItem("username");
    const expires = localStorage.getItem("session_expires");

    const welcomeuser = document.getElementById("welcomeuser");

    if (username && expires && Date.now() < parseInt(expires)) {
        welcomeuser.innerHTML = "<div class='user-connect'><span title='Utilisateur : " + username + "'>" + username + "</span><i title='Statut : Connecté' class='fa-solid fa-circle-user'></i><i onclick='logout()' title='Déconnexion' class='fa-solid fa-right-from-bracket disconnect-icon'></i></div>";
    } else {
        welcomeuser.innerHTML = "<div class='contact-button'><a href='' id='loginBtn' onclick='handleLogin()'>Se connecter<i class='fa-solid fa-right-to-bracket'></i></a></div>";
        localStorage.removeItem("username");
        localStorage.removeItem("session_expires");
    }
}

updateUI();

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("expiration");
  location.reload();
}


// #COMMENTS

document.addEventListener('DOMContentLoaded', function() {

    const commentsList = document.getElementById('commentsList');
    const commentForm = document.getElementById('formCommentaire');
    const commentTextarea = document.getElementById('textareaCommentaire');
    
    const defaultComments = [
        {
            user: "Marcus",
            date: "31/05/25 à 12:10",
            text: "Votre travail est tout simplement incroyable ! Je suis émerveillé par votre créativité et votre originalité. Vos idées sont uniques et fascinantes, et je suis sûr que vous avez un avenir brillant devant vous. Continuez à suivre votre passion et à créer des œuvres qui inspirent et émerveillent les autres."
        },
        {
            user: "Diego",
            date: "31/05/25 à 12:40",
            text: "L'équipe a été très à l'écoute et a su répondre à toutes mes questions. Un vrai plaisir de faire affaire avec eux !"
        }
    ];
    
    if (!localStorage.getItem('comments')) {
        localStorage.setItem('comments', JSON.stringify(defaultComments));
    }
    
    function displayLastTwoComments() {
        const comments = JSON.parse(localStorage.getItem('comments'));
        
        const existingComments = document.querySelectorAll('.comment');
        existingComments.forEach(comment => comment.remove());
        
        const lastTwoComments = comments.slice(-2);
        lastTwoComments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = `comment comment--`;
            
            commentElement.innerHTML = `
                <div class="avatar-user-date">
                    <i class="fa-solid fa-circle-user"></i>
                    <div class="user-and-date">
                        <div class="user-commented">${comment.user}</div>
                        <div class="date-comment">${comment.date}</div>
                    </div>
                </div>
                <p class="the-comment">${comment.text}</p>
            `;
            
            commentsList.insertBefore(commentElement, commentForm.parentNode);
        });
    }
    
    function getCurrentDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = String(now.getFullYear()).slice(-2);
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        return `${day}/${month}/${year} à ${hours}:${minutes}`;
    }
    
    const currentUser = localStorage.getItem('username') || 'Utilisateur anonyme';
    userName.innerHTML = `${currentUser}`;

    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const commentText = commentTextarea.value.trim();
        if (commentText.length < 5) return;
        
        const newComment = {
            user: currentUser,
            date: getCurrentDate(),
            text: commentText
        };
        
        const comments = JSON.parse(localStorage.getItem('comments'));
        comments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(comments));
        
        displayLastTwoComments();
        
        commentTextarea.value = '';
    });
    
    displayLastTwoComments();
});


document.getElementById("textareaCommentaire").addEventListener("input", function() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
});


// #LOCATION & MAP

let map, marker;

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
    function(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log("Latitude : " + lat);
        console.log("Longitude : " + lng);

        document.getElementById('latitude').textContent = "Latitude : " + lat;
        document.getElementById('longitude').textContent = "Longitude : " + lng;

        if (!map) {
        map = L.map('map').setView([lat, lng], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);

        marker = L.marker([lat, lng]).addTo(map)
            .bindPopup("Vous êtes ici").openPopup();
        } else {
        marker.setLatLng([lat, lng]);
        map.setView([lat, lng]);
        }
    },
    function(error) {
        console.error("Erreur de géolocalisation :", error.message);
    },
    {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
    }
    );
} else {
    alert("La géolocalisation n'est pas supportée par ce navigateur.");
}

function recentrerCarte() {
  if (marker) {
    map.setView(marker.getLatLng(), 17);
  }
}


// #CONTACT FORM

document.getElementById('formulaire').addEventListener('submit', function(event) {
    event.preventDefault();

    const messageDiv = document.getElementById('confirmation-message')
    messageDiv.style.display = 'block';

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);

    this.reset();
});
