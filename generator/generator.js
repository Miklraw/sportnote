function addExercise() {
  const container = document.getElementById("exerciseContainer");
  const div = document.createElement("div");
  div.classList.add("exercise-input");
  div.innerHTML = '<input type="text" placeholder="Название упражнения" class="exercise-name"><input type="text" placeholder="Значение (опционально)" class="exercise-value">';
  container.appendChild(div);
}
function generateQR() {
  const names = document.querySelectorAll(".exercise-name");
  const values = document.querySelectorAll(".exercise-value");
  const data = [];
  for (let i = 0; i < names.length; i++) {
    const name = names[i].value.trim();
    const value = values[i].value.trim();
    if (name) {
      data.push({ name, value });
    }
  }
  const qrContainer = document.getElementById("qrCode");
  qrContainer.innerHTML = "";
  QRCode.toCanvas(JSON.stringify(data), { width: 256 }, function (err, canvas) {
    if (err) return console.error(err);
    qrContainer.appendChild(canvas);
  });
}