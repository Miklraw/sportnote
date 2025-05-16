let scanner;
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});
document.getElementById("saveBtn").addEventListener("click", () => {
  document.getElementById("successMessage").style.display = "block";
});
document.getElementById("scanQRBtn").addEventListener("click", () => {
  document.getElementById("scannerContainer").style.display = "block";
  scanner = new Instascan.Scanner({ video: document.getElementById("preview"), mirror: false });
  scanner.addListener("scan", function (content) {
    const data = JSON.parse(content);
    if (Array.isArray(data)) {
      data.forEach((exercise) => {
        addExerciseRow(exercise.name, exercise.value);
      });
    }
    scanner.stop();
    document.getElementById("scannerContainer").style.display = "none";
  });
  Instascan.Camera.getCameras().then((cameras) => {
    if (cameras.length > 1) {
      scanner.start(cameras[1]); // задняя камера
    } else if (cameras.length > 0) {
      scanner.start(cameras[0]);
    } else {
      alert("Камера не найдена");
    }
  });
});
document.getElementById("stopScanBtn").addEventListener("click", () => {
  if (scanner) {
    scanner.stop();
    document.getElementById("scannerContainer").style.display = "none";
  }
});
function addExerciseRow(name = "", value = "") {
  const container = document.getElementById("textBoxes");
  const row = document.createElement("div");
  row.innerHTML = \`
    <input type="text" value="\${name}" placeholder="Упражнение">
    <input type="text" value="\${value}" placeholder="Значение">
  \`;
  container.appendChild(row);
}
document.getElementById("addRowBtn").addEventListener("click", () => {
  addExerciseRow();
});