document.addEventListener('DOMContentLoaded', () => {
  const scanBtn = document.getElementById('scanQRBtn');
  const videoContainer = document.getElementById('qr-video-container');
  const video = document.getElementById('preview');

  let scanner = new Instascan.Scanner({ video: video });

  scanner.addListener('scan', function (content) {
    alert('QR-код: ' + content);
    scanner.stop();
    videoContainer.style.display = 'none';
  });

  scanBtn.addEventListener('click', () => {
    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        // Найдём камеру с именем, в котором есть 'back' (для iPhone)
        const backCamera = cameras.find(c => c.name && c.name.toLowerCase().includes('back')) || cameras[0];
        scanner.start(backCamera);
        videoContainer.style.display = 'block';
      } else {
        alert('Камера не найдена.');
      }
    }).catch(function (e) {
      console.error(e);
      alert('Ошибка доступа к камере: ' + e);
    });
  });
});
