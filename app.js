const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8500;

// ⚡ Servir archivos estáticos, pero SIN index.html
app.use(express.static(path.join(__dirname, "public"), {
  index: false
}));

// Ruta principal
app.get("/", (req, res) => {
  const imgDir = path.join(__dirname, "public/img");

  fs.readdir(imgDir, (err, files) => {
    if (err) return res.send("Error al leer imágenes");

    const images = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));

    const slides = images.map((img, i) => `
      <div class="gallery-slide fade">
        <img src="/img/${img}" alt="Foto ${i + 1}">
      </div>
    `).join("");

    const dots = images.map(() => `<span class="dot"></span>`).join("");

    // Leer index.html base
    let html = fs.readFileSync(path.join(__dirname, "public/index.html"), "utf-8");

    // Reemplazar marcador {{galeria}}
    html = html.replace("{{galeria}}", `
      ${slides}
      <a class="prev">&#10094;</a>
      <a class="next">&#10095;</a>
      <div class="dots">${dots}</div>
    `);

    res.send(html);
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
