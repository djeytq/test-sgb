const fs = require("fs");
const path = require("path");

const pasta = path.join(__dirname, "paginas");
if (!fs.existsSync(pasta)) fs.mkdirSync(pasta);

// 👉🏽 coloca aqui o link do teu site na Netlify
const sitePrincipal = "https://tafofu.netlify.app";

// Temas que vão gerar as páginas
const temas = [
  "Serviços rápidos da Tafofu em Angola",
  "Tafofu - produtos que facilitam o dia a dia",
  "Soluções tecnológicas Tafofu para empresas",
  "Como comprar na Tafofu online",
  "Tafofu Angola - inovação ao seu alcance"
];

// Função para gerar conteúdo HTML com SEO
function gerarPagina(titulo) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titulo}</title>
  <meta name="description" content="${titulo} - Conheça a Tafofu e descubra como simplificar o seu dia.">
  <meta name="keywords" content="tafofu, angola, serviços, produtos, ${titulo}">
  <link rel="canonical" href="${sitePrincipal}" />
  <style>
    body { font-family: Arial; padding: 40px; background: #f9f9f9; }
    h1 { color: #222; }
    p { color: #555; line-height: 1.6; }
    a { color: #0078cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>${titulo}</h1>
  <p>A <strong>Tafofu</strong> é uma marca angolana que ajuda a tornar o dia a dia mais simples com produtos e serviços acessíveis.</p>
  <p>Saiba mais no nosso site principal:</p>
  <p><a href="${sitePrincipal}" target="_blank">${sitePrincipal}</a></p>
  <footer style="margin-top:40px; font-size:14px; color:#666;">
    &copy; ${new Date().getFullYear()} Tafofu - Todos os direitos reservados.
  </footer>
</body>
</html>
`;
}

// Cria todas as páginas HTML
const urls = [];
temas.forEach((tema, i) => {
  const nomeArquivo = `pagina-${i + 1}.html`;
  const conteudo = gerarPagina(tema);
  fs.writeFileSync(path.join(pasta, nomeArquivo), conteudo);

  const url = `${sitePrincipal}/${nomeArquivo}`;
  urls.push(url);
  console.log(`✅ Página gerada: ${url}`);
});

// Cria o index.html com links para todas as páginas
let indexHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Páginas Tafofu</title>
</head>
<body>
  <h1>Páginas relacionadas à Tafofu</h1>
  <ul>
`;
urls.forEach(url => {
  indexHtml += `<li><a href="${url}" target="_blank">${url}</a></li>\n`;
});
indexHtml += `
  </ul>
</body>
</html>
`;
fs.writeFileSync(path.join(pasta, "index.html"), indexHtml);

// 🗺️ Gera o sitemap.xml automaticamente
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

sitemap += `  <url>\n    <loc>${sitePrincipal}/</loc>\n    <priority>1.0</priority>\n  </url>\n`;

urls.forEach(url => {
  sitemap += `  <url>\n    <loc>${url}</loc>\n    <priority>0.8</priority>\n  </url>\n`;
});

sitemap += `</urlset>`;
fs.writeFileSync(path.join(pasta, "sitemap.xml"), sitemap);

console.log("🌐 sitemap.xml criado com sucesso!");
console.log("🎯 Agora podes enviar para o Google Search Console!");
