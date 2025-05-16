let workoutCount = 0;
const workoutCounter = document.getElementById('workoutCounter');
const themeToggleBtn = document.getElementById('themeToggle');
const scanQRBtn = document.getElementById('scanQRBtn');
const saveBtn = document.getElementById('saveBtn');
const successMessage = document.getElementById('successMessage');
const preview = document.getElementById('preview');

let scanner = null;
let scanning = false;

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

scanQRBtn.addEventListener('click', () => {
    if (scanning) {
        stopScanner();
    } else {
        startScanner();
    }
});

saveBtn.addEventListener('click', () => {
    workoutCount++;
    workoutCounter.textContent = `Тренировок сохранено: ${workoutCount}`;
    showSuccessMessage();
});

function showSuccessMessage() {
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

function startScanner() {
    if (scanner) {
        scanner.start();
        scanning = true;
        scanQRBtn.textContent = '⏹ Остановить сканирование';
        preview.style.display = 'block';
        return;
    }

    scanner = new Instascan.Scanner({ video: preview, mirror: false });
    scanner.addListener('scan', function (content) {
        alert('QR-код прочитан: ' + content);
        stopScanner();
    });

    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
            scanning = true;
            scanQRBtn.textContent = '⏹ Остановить сканирование';
            preview.style.display = 'block';
        } else {
            alert('Камера не найдена.');
        }
    }).catch(function (e) {
        console.error(e);
        alert('Ошибка доступа к камере.');
    });
}

function stopScanner() {
    if (scanner) {
        scanner.stop();
        scanning = false;
        scanQRBtn.textContent = '📷 Сканировать QR';
        preview.style.display = 'none';
    }
}
