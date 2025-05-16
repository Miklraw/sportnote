document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const saveBtn = document.getElementById('saveBtn');
    const successMessage = document.getElementById('successMessage');

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
    });

    saveBtn.addEventListener('click', function () {
        // Здесь может быть логика сохранения, например в localStorage
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    });
});
