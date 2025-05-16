let scanner;
document.getElementById('scanQRBtn').addEventListener('click', () => {
    document.getElementById('preview').style.display = 'block';
    document.getElementById('stopQRBtn').style.display = 'inline-block';

    scanner = new Instascan.Scanner({ video: document.getElementById('preview'), mirror: false });
    scanner.addListener('scan', function (content) {
        const data = JSON.parse(content);
        data.forEach(item => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = item.name + (item.value ? ": " + item.value : "");
            document.getElementById('textBoxes').appendChild(input);
        });
    });
    Instascan.Camera.getCameras().then(cameras => {
        if (cameras.length > 1) {
            scanner.start(cameras[1]);
        } else {
            scanner.start(cameras[0]);
        }
    }).catch(console.error);
});

document.getElementById('stopQRBtn').addEventListener('click', () => {
    if (scanner) {
        scanner.stop();
    }
    document.getElementById('preview').style.display = 'none';
    document.getElementById('stopQRBtn').style.display = 'none';
});

document.getElementById('saveBtn').addEventListener('click', () => {
    document.getElementById('successMessage').style.display = 'block';
});

document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});