# Portal do Portal — PWA inicial

Site estático responsivo, com áreas de mural, guia de serviços, bazar, agenda, achados e perdidos e contribuição via WhatsApp. O logo provisório é uma ilustração vetorial de prédios.

## Arquivos
- `index.html`: estrutura e textos das páginas/seções.
- `styles.css`: identidade visual (azul escuro, laranja e off-white) e responsividade.
- `config.js`: conteúdo editável; adicione apenas publicações reais e revisadas.
- `app.js`: exibição dos conteúdos, filtros e botão de WhatsApp.
- `manifest.webmanifest`: configuração PWA.
- `sw.js`: cache básico para recursos do site.
- `assets/icon.svg`: logo/ícone provisório de prédios.

## Configurar antes de divulgar
1. Abra `config.js`.
2. Preencha `whatsappNumber` com número autorizado, apenas dígitos com DDI e DDD (exemplo de formato: `5511999999999`).
3. Adicione conteúdo real nos arrays `news`, `services`, `market`, `events` e `lostFound`. Os exemplos comentados são apenas modelos, não publicações reais.
4. Revise e obtenha autorização para publicar contatos de prestadores e anúncios de moradores.
5. Não publique dados pessoais, números de apartamento, documentos, imagens identificáveis ou informações que possam comprometer a segurança dos moradores.

## Publicar gratuitamente no GitHub Pages
1. Crie um repositório GitHub chamado `portal-do-portal`.
2. Para publicar no GitHub Pages, o repositório normalmente precisa estar público no plano gratuito. Todo código e conteúdo publicado será público; não coloque segredos nem dados privados.
3. Extraia o ZIP no computador e envie todos os arquivos e a pasta `assets` para a raiz do repositório.
4. No GitHub, abra **Settings → Pages**.
5. Em **Build and deployment**, selecione **Deploy from a branch**, branch `main`, pasta `/(root)`, e salve.
6. Aguarde a URL publicada e teste no celular e computador.
7. Para o PWA, acesse a URL HTTPS publicada; o service worker não funciona abrindo o arquivo local diretamente.

## Atualizar o conteúdo
No GitHub, abra `config.js`, clique no lápis (Edit), altere os dados, use **Commit changes** e aguarde alguns instantes para o Pages atualizar. Os dados são apresentados publicamente.

## Limitações
GitHub Pages hospeda arquivos estáticos. Este projeto não inclui banco de dados, login, painel administrativo, envio automático de formulários, moderação integrada, autenticação, mensagens privadas ou notificações. A curadoria e as alterações são manuais.
O PWA tem cache básico offline dos arquivos do site; conteúdo atualizado depende de publicação e pode levar um tempo para refletir em navegadores que mantêm cache.
O portal é independente e não deve ser apresentado como oficial sem autorização. Confirme os termos atuais do GitHub Pages antes de uma futura operação comercial; use esta versão para prototipagem e validação. Uma versão comercial poderá exigir hospedagem e infraestrutura adequadas, privacidade, segurança e termos de uso.
