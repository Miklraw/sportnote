document.getElementById("scanQRBtn").addEventListener("click", function () {
    const qrReader = document.getElementById("qr-reader");
    qrReader.style.display = "block";

    const html5QrCode = new Html5Qrcode("qr-reader");

    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        alert("QR-код считан: " + decodedText);
        html5QrCode.stop().then(() => {
            qrReader.style.display = "none";
        });
    };

    const config = { fps: 10, qrbox: 250 };

    html5QrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback
    ).catch(err => {
        alert("Ошибка доступа к камере: " + err);
        console.error("Ошибка QR: ", err);
        qrReader.style.display = "none";
    });
});
