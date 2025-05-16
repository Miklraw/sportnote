document.addEventListener('DOMContentLoaded', () => {
  let scanner = null;
  const scanBtn = document.getElementById('scanQRBtn');
  const stopBtn = document.getElementById('stopScanBtn');
  const scannerContainer = document.getElementById('scannerContainer');
  const videoElem = document.getElementById('preview');

  scanBtn.addEventListener('click', () => {
    if(scanner) return; // уже запущен
    scanner = new Instascan.Scanner({ video: videoElem });

    scanner.addListener('scan', content => {
      alert('Считано: ' + content);
      stopScanner();
      // Здесь можно обработать QR содержимое, напр. добавить тренировку
    });

    Instascan.Camera.getCameras()
      .then(cameras => {
        if (cameras.length === 0) {
          alert('Камеры не найдены');
          return;
        }

        // Пытаемся найти заднюю камеру
        let backCamera = cameras.find(camera =>
          camera.name.toLowerCase().includes('back') ||
          camera.name.toLowerCase().includes('rear') ||
          camera.id.toLowerCase().includes('back') ||
          camera.id.toLowerCase().includes('rear')
        );

        let selectedCamera = backCamera || cameras[0];

        scanner.start(selectedCamera).then(() => {
          scannerContainer.style.display = 'block';
          scanBtn.style.display = 'none';
          stopBtn.style.display = 'inline-block';
        }).catch(e => {
          alert('Ошибка запуска камеры: ' + e);
          scanner = null;
        });
      }).catch(e => {
        alert('Ошибка получения камер: ' + e);
      });
  });

  stopBtn.addEventListener('click', () => {
    stopScanner();
  });

  function stopScanner() {
    if(scanner) {
      scanner.stop();
      scanner = null;
    }
    scannerContainer.style.display = 'none';
    scanBtn.style.display = 'inline-block';
    stopBtn.style.display = 'none';
  }
});
