// Добавить упражнение
function addExercise() {
    const container = document.getElementById('exerciseContainer');
    const div = document.createElement('div');
    div.className = 'exercise-input';
    div.innerHTML = \`
        <input type="text" placeholder="Название упражнения" class="exercise-name">
        <input type="text" placeholder="Значение (опционально)" class="exercise-value">
        <button onclick="removeExercise(this)">−</button>
    \`;
    container.appendChild(div);
}

// Удалить упражнение
function removeExercise(button) {
    const div = button.parentElement;
    div.remove();
}

// Генерация QR-кода
function generateQR() {
    const names = document.querySelectorAll('.exercise-name');
    const values = document.querySelectorAll('.exercise-value');

    const exercises = [];

    for (let i = 0; i < names.length; i++) {
        const name = names[i].value.trim();
        const value = values[i].value.trim();
        if (name) {
            exercises.push({
                name: name,
                value: value || null
            });
        }
    }

    if (exercises.length === 0) {
        alert("Введите хотя бы одно упражнение");
        return;
    }

    const jsonStr = JSON.stringify(exercises);

    const canvas = document.getElementById('qrCanvas');
    QRCode.toCanvas(canvas, jsonStr, { width: 256 }, function (err) {
        if (err) {
            console.error(err);
            alert("Ошибка генерации QR-кода");
            return;
        }
        console.log("QR-код успешно сгенерирован");
    });
}
