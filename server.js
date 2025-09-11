import app from "./src/app.js";

const PORT = 3000;

// o servidor escuta e inicia.
app.listen(PORT, () => {
  console.log(`Servidor escutando em http://localhost:${PORT}`);
});