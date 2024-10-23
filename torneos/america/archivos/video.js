document.addEventListener('DOMContentLoaded', () => {
    const videosPerPage = 16; // Número de videos por página
    let currentPage = 1; // Página actual
    let videos = []; // Almacenar los videos cargados

    // Función para cargar videos desde video.json
    fetch('video.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            videos = data; // Guardamos todos los videos
            renderPage(); // Renderizar la primera página
        })
        .catch(error => {
            console.error('Ha habido un problema con tu operación de fetch:', error);
        });

    // Función para renderizar los videos de la página actual
    function renderPage() {
        const gridContainer = document.getElementById('grid-container');
        gridContainer.innerHTML = ''; // Limpiar el contenido anterior
        const startIndex = (currentPage - 1) * videosPerPage;
        const endIndex = startIndex + videosPerPage;
        const currentVideos = videos.slice(startIndex, endIndex);

        currentVideos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.classList.add('col', 'grid-item');
            videoCard.innerHTML = `
                <div class="card" onclick="redirectToVideo('${video.video}')" style="cursor: pointer;">
                    <img src="${video.img}" class="card-img-top" alt="${video.name}">
                    <div class="card-body">
                        <p>${video.name}</p>
                    </div>
                </div>
            `;
            gridContainer.appendChild(videoCard);
        });

        // Deshabilitar botón "Anterior" si estamos en la primera página
        document.getElementById('prevPage').disabled = currentPage === 1;
        // Deshabilitar botón "Siguiente" si estamos en la última página
        document.getElementById('nextPage').disabled = endIndex >= videos.length;
    }

    // Función para ir a la página anterior
    window.prevPage = function() {
        if (currentPage > 1) {
            currentPage--;
            renderPage();
        }
    };

    // Función para ir a la página siguiente
    window.nextPage = function() {
        if (currentPage * videosPerPage < videos.length) {
            currentPage++;
            renderPage();
        }
    };

    // Función para redirigir a video1.html
    window.redirectToVideo = function(videoSrc) {
        window.location.href = `fuente.html?video=${encodeURIComponent(videoSrc)}`;
    };
});