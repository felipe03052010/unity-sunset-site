# Instituto Sunset

Site institucional em português do Instituto Sunset, com a trajetória e os projetos da equipe Unity Sunset #22660. Layout landscape com cinco páginas navegáveis, transições usando as cinco artes azuis fornecidas e adaptação para celulares.

## Executar

Requer Node.js 18 ou posterior, sem dependências externas.

```sh
npm start
```

Abra http://localhost:4173. Também é possível abrir `dist/index.html` diretamente; a cópia da chave Pix depende das permissões do navegador.

## Conteúdo

- Página inicial, nossos projetos, conquistas, como ajudar e sobre nós.
- Todas as 25 imagens fornecidas: cinco artes de transição e 20 fotografias, acessíveis na galeria com filtros e visualização ampliada.
- Proposta de patrocínio e portfólio regional BIOBUZZ originais em PDF para consulta e download.
- Cotas Bronze, Prata, Ouro e Diamante; chave Pix; contatos e redes sociais.
- Navegação por hash, histórico do navegador, menu móvel, foco de teclado, textos alternativos e respeito à preferência por movimento reduzido.

## Publicação

O site é estático e o diretório publicável é `dist/`. Pode ser hospedado em qualquer serviço estático. O arquivo `.openai/hosting.json` registra a configuração do Sites; isso não comprova uma publicação concluída.

## Fontes e manutenção

As informações foram transcritas e adaptadas da proposta de patrocínio enviada em 13/11/2026. As metas aparecem como metas, não como resultados alcançados. O total de 14 prêmios corresponde à soma dos prêmios listados na proposta. Os preços não presumem periodicidade. O telefone foi mantido exatamente como consta no documento: +55 81 9170-9505. O contato para patrocínio usa o e-mail informado no PDF. Atualize dados em `dist/index.html`; fotografias e legendas em `dist/app.js`.

O arquivo `asset-manifest.json` relaciona os nomes originais das imagens aos nomes utilizados no site. As fotografias e a identidade visual pertencem aos respectivos titulares; não foi aplicada licença de uso a terceiros.

## Verificação

```sh
npm run check
```

Confere sintaxe JavaScript, todos os assets, cinco rotas, 20 fotografias e os valores de patrocínio. Revisão visual em navegador deve ser realizada antes de mudanças significativas de layout.

## Conteúdo do Instituto Sunset

Robótica em Ação, Explorando a FIRST, formação de educadores, Família em Ação, OxeTC e desenvolvimento de talentos. Os resultados do portfólio são identificados como históricos; as metas da proposta aparecem separadas. A formação e a missão do instituto seguem o direcionamento do proprietário; não foram inventados CNPJ, certificações, endereço de sede ou situação jurídica.

O e-mail, telefone e a chave Pix são os contatos fornecidos pela equipe nos documentos. A página esclarece essa origem. Nenhum pagamento é processado no site: os botões de patrocínio abrem um e-mail.
