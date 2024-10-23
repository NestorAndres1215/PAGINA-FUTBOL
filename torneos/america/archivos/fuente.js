const params = new URLSearchParams(window.location.search);
const videoSrc = params.get('video');

if (videoSrc) {
    document.getElementById('videoFrame').src = videoSrc;
}