const fs = require("fs");
const path = require("path");

// Pasta onde os HTMLs serão salvos
const pastaSaida = path.join(__dirname, "paginas");

// Garante que a pasta exista
if (!fs.existsSync(pastaSaida)) {
  fs.mkdirSync(pastaSaida);
}

// Lista de textos aleatórios
const textos = [
  "Bem-vindo ao Tafofu!",
  "A vida é feita de escolhas simples.",
  "Programar é transformar ideias em código.",
  "Cada linha de código é um passo para o futuro.",
  "Aprender Node.js é divertido!"
];

// Função que gera um HTML simples
function gerarHtml(titulo, conteudo) {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${titulo}</title>
      <style>
        body { font-family: Arial; padding: 40px; background: #f3f3f3; }
        h1 { color: #333; }
        p { color: #555; }
      </style>
    </head>
    <body>
      <h1>${titulo}</h1>
      <p>${conteudo}</p>
    </body>
    </html>
  `;
}

// Gera 5 páginas HTML aleatórias
for (let i = 1; i <= 5; i++) {
  const titulo = `Página ${i}`;
  const conteudo = textos[Math.floor(Math.random() * textos.length)];
  const html = gerarHtml(titulo, conteudo);

  const nomeArquivo = path.join(pastaSaida, `pagina${i}.html`);
  fs.writeFileSync(nomeArquivo, html);

  console.log(`✅ Página gerada: ${nomeArquivo}`);
}
