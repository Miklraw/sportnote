function addExercise() {
    const container = document.getElementById('exerciseContainer');
    const newExercise = document.createElement('div');
    newExercise.className = 'exercise-input';
    newExercise.innerHTML = `
        <input type="text" placeholder="Название упражнения" class="exercise-name">
        <input type="text" placeholder="Значение (опционально)" class="exercise-value">
        <button onclick="this.parentNode.remove()">-</button>
    `;
    container.appendChild(newExercise);
}

function generateQR() {
    const exercises = [];
    const inputs = document.querySelectorAll('.exercise-input');
    
    inputs.forEach(input => {
        const name = input.querySelector('.exercise-name').value;
        const value = input.querySelector('.exercise-value').value;
        if (name) {
            exercises.push({ name, value });
        }
    });
    
    if (exercises.length === 0) {
        alert('Добавьте хотя бы одно упражнение!');
        return;
    }
    
    const dataStr = JSON.stringify(exercises);
    const qrElement = document.getElementById('qrCode');
    qrElement.innerHTML = '';
    
    QRCode.toCanvas(qrElement, dataStr, { width: 200 }, (error) => {
        if (error) console.error(error);
    });
}