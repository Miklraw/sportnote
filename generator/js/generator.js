function addExercise() {
    const container = document.getElementById('exerciseContainer');
    const div = document.createElement('div');
    div.className = 'exercise-input';
    div.innerHTML = '<input type="text" placeholder="Название упражнения" class="exercise-name"> <input type="text" placeholder="Значение (опционально)" class="exercise-value">';
    container.appendChild(div);
}

function generateQR() {
    const names = document.querySelectorAll('.exercise-name');
    const values = document.querySelectorAll('.exercise-value');
    const data = [];

    for (let i = 0; i < names.length; i++) {
        const name = names[i].value.trim();
        const value = values[i].value.trim();
        if (name) {
            data.push({ name, value });
        }
    }

    const qrCodeContainer = document.getElementById('qrCode');
    qrCodeContainer.innerHTML = '';
    QRCode.toCanvas(document.createElement('canvas'), JSON.stringify(data), function (err, canvas) {
        if (err) console.error(err);
        qrCodeContainer.appendChild(canvas);
    });
}