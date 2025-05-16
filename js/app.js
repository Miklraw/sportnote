// Инициализация сканера Instascan
let scanner = new Instascan.Scanner({ video: document.getElementById('preview'), mirror: false });

scanner.addListener('scan', function (content) {
  try {
    // Парсим JSON с упражнениями из QR
    const exercises = JSON.parse(content);
    if (Array.isArray(exercises)) {
      exercises.forEach(ex => {
        addExerciseToUI(ex.name, ex.value);
      });
      updateWorkoutCounter();
      alert('Упражнения из QR добавлены!');
    } else {
      alert('QR-код не распознан как тренировка');
    }
  } catch (err) {
    alert('Ошибка чтения QR: ' + err);
  }
});

// Функция добавления упражнения (пример)
function addExerciseToUI(name, value) {
  // Создаём div с input'ами для упражнения и значением
  const container = document.getElementById('textBoxes');
  const div = document.createElement('div');
  div.className = 'exercise-input';
  div.innerHTML = `
    <input type="text" class="exercise-name" value="${name}" />
    <input type="text" class="exercise-value" value="${value || ''}" />
  `;
  container.appendChild(div);
}

// Обновление счётчика тренировок (пример)
function updateWorkoutCounter() {
  const counter = document.getElementById('workoutCounter');
  const count = document.querySelectorAll('.exercise-name').length;
  counter.textContent = `Тренировок сохранено: ${count}`;
}

const scanQRBtn = document.getElementById('scanQRBtn');
let scannerStarted = false;

scanQRBtn.addEventListener('click', () => {
  if (scannerStarted) {
    scanner.stop();
    scannerStarted = false;
    scanQRBtn.textContent = '📷 Сканировать QR';
    document.getElementById('preview').style.display = 'none';
  } else {
    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        // Выбираем заднюю камеру (обычно содержит 'back' или 'rear')
        let backCamera = cameras.find(cam => cam.name.toLowerCase().includes('back')) || cameras[0];
        scanner.start(backCamera).then(() => {
          scannerStarted = true;
          scanQRBtn.textContent = '❌ Остановить сканирование';
          document.getElementById('preview').style.display = 'block';
        });
      } else {
        alert('Камеры не найдены');
      }
    }).catch(function (e) {
      console.error(e);
      alert('Ошибка при получении камер: ' + e);
    });
  }
});
