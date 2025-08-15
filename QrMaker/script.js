const logoInput = document.getElementById("logoInput");
const logoPreview = document.getElementById("logoPreview");
const logoPreviewContainer = document.getElementById("logoPreviewContainer");
const generateBtn = document.getElementById("generateBtn");
const qrCanvas = document.getElementById("qrCanvas");
const downloadBtn = document.getElementById("downloadBtn");

// Preview logo
logoInput.addEventListener("change", function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      logoPreview.src = e.target.result;
      logoPreviewContainer.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    logoPreviewContainer.style.display = "none";
  }
});

generateBtn.addEventListener("click", function() {
  const qrType = document.getElementById("qrType").value;
  let qrInput = document.getElementById("qrInput").value.trim();

  if (qrInput === "") {
    alert("Masukkan teks atau link terlebih dahulu Ndeng Gendeng!");
    return;
  }

  if (qrType === "link" && !qrInput.startsWith("http")) {
    qrInput = "https://" + qrInput;
  }

  const qrSize = 300;
  qrCanvas.width = qrSize;
  qrCanvas.height = qrSize;
  const ctx = qrCanvas.getContext("2d");

  // Buat QR pakai qrious
  const qr = new QRious({
    value: qrInput,
    size: qrSize,
    level: 'H'
  });

  // Gambar QR ke canvas
  ctx.drawImage(qr.image, 0, 0, qrSize, qrSize);

  // Tempel logo jika ada
  if (logoInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = e => {
      const logo = new Image();
      logo.src = e.target.result;
      logo.onload = () => {
        const logoSize = qrSize * 0.25;
        const x = (qrSize - logoSize) / 2;
        const y = (qrSize - logoSize) / 2;

        ctx.fillStyle = "white";
        ctx.fillRect(x, y, logoSize, logoSize);
        ctx.drawImage(logo, x, y, logoSize, logoSize);

        showQR();
      };
    };
    reader.readAsDataURL(logoInput.files[0]);
  } else {
    showQR();
  }
});

function showQR() {
  qrCanvas.style.display = "block";
  downloadBtn.style.display = "inline-block";
  downloadBtn.href = qrCanvas.toDataURL("image/png");
}