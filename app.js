const fs = require("fs");
const path = require("path");

const pasta = path.join(__dirname, "paginas");
if (!fs.existsSync(pasta)) fs.mkdirSync(pasta);

// Seu domínio principal
const sitePrincipal = "https://www.tafofu.com"; // substitui pelo teu domínio real

// Lista de temas ou palavras-chave relacionadas ao teu site
const temas = [
  "Serviços rápidos em Angola",
  "Produtos Tafofu originais",
  "Soluções para o dia a dia em Luanda",
  "Como comprar com a Tafofu",
  "Tafofu – inovação angolana"
];

// Função para gerar conteúdo único
function gerarConteudo(titulo) {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${titulo}</title>
      <meta name="description" content="${titulo} – Saiba mais sobre nossos serviços e produtos em Angola.">
      <meta name="keywords" content="Tafofu, Angola, serviços, produtos, ${titulo}">
      <style>
        body { font-family: Arial; padding: 40px; background: #fafafa; }
        h1 { color: #333; }
        p { color: #555; line-height: 1.6; }
        a { color: #0077cc; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <h1>${titulo}</h1>
      <p>A Tafofu é uma marca angolana que facilita o dia a dia das pessoas com produtos e serviços de qualidade. Nesta página, falamos sobre <b>${titulo.toLowerCase()}</b> e como isso se conecta à nossa missão.</p>
      <p>Descubra mais no nosso site principal:</p>
      <p><a href="${sitePrincipal}" target="_blank">${sitePrincipal}</a></p>
      <footer style="margin-top:40px; font-size:14px;">
        <p>&copy; ${new Date().getFullYear()} Tafofu - Todos os direitos reservados.</p>
      </footer>
    </body>
    </html>
  `;
}

// Gerar páginas para cada tema
temas.forEach((tema, i) => {
  const nomeArquivo = `pagina-${i + 1}.html`;
  const html = gerarConteudo(tema);
  fs.writeFileSync(path.join(pasta, nomeArquivo), html);
  console.log(`✅ Página criada: ${nomeArquivo}`);
});

// Gera uma página principal (índice com links)
let index = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Páginas relacionadas à Tafofu</title>
</head>
<body>
  <h1>Páginas relacionadas à Tafofu</h1>
  <ul>
`;
temas.forEach((tema, i) => {
  index += `<li><a href="./pagina-${i + 1}.html">${tema}</a></li>\n`;
});
index += `
  </ul>
</body>
</html>
`;
fs.writeFileSync(path.join(pasta, "index.html"), index);

console.log("🌐 Index gerado com sucesso!");
