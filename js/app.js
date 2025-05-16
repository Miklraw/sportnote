document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const saveBtn = document.getElementById('saveBtn');
    const successMessage = document.getElementById('successMessage');
    const scanBtn = document.getElementById('scanQRBtn');
    const videoPreview = document.getElementById('preview');

    let scanner;
    let scanning = false;

    // Инициализация Instascan
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner = new Instascan.Scanner({ video: videoPreview, mirror: false });
            scanner.addListener('scan', function (content) {
                alert('Считано: ' + content);
                stopScanning();
            });
            // Камеру не запускаем сразу, ждём нажатия кнопки
        } else {
            console.error('Камера не найдена');
            alert('Камера не найдена');
        }
    }).catch(function (e) {
        console.error(e);
        alert('Ошибка доступа к камере');
    });

    function startScanning() {
        if (scanner && !scanning) {
            scanner.start().then(() => {
                scanning = true;
                videoPreview.style.display = 'block';
                scanBtn.textContent = '✖ Выключить скан';
            }).catch(e => {
                console.error(e);
                alert('Не удалось запустить камеру');
            });
        }
    }

    function stopScanning() {
        if (scanner && scanning) {
            scanner.stop();
            scanning = false;
            videoPreview.style.display = 'none';
            scanBtn.textContent = '📷 Сканировать QR';
        }
    }

    scanBtn.addEventListener('click', function () {
        if (scanning) {
            stopScanning();
        } else {
            startScanning();
        }
    });

    // Переключение темы
    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
    });

    // Показ сообщения "Ты молодец" при сохранении
    saveBtn.addEventListener('click', function () {
        // Логика сохранения тренировки может быть здесь
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    });
});
