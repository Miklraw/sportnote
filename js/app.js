// Тема и остальное (ваш существующий код)

document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

document.getElementById('qrGeneratorBtn').addEventListener('click', () => {
    window.location.href = 'generator/index.html';
});

// Остальной ваш код, например, сканирование QR и сохранение тренировки

document.getElementById('saveBtn').addEventListener('click', () => {
    // Логика сохранения тренировки
    // После успешного сохранения показываем сообщение
    document.getElementById('successMessage').style.display = 'block';
    setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
    }, 3000);
});

// Остальной код для сканера и управления интерфейсом
