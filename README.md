# Site modelo para barbearias

Site pronto para vender para barbearias. Uma página só, com animações, cardápio de serviços, equipe, galeria, depoimentos e **agendamento que manda o pedido pronto pro WhatsApp** do barbeiro. Não precisa de servidor, banco de dados nem mensalidade de sistema.

## O que vem no site

- **Topo de impacto**: título grande animado, selo girando com o nome da casa e a listra de poste de barbeiro.
- **Faixa em movimento** com os serviços.
- **Manifesto**: um texto da casa que vai acendendo conforme a pessoa rola a página, mais os números (cortes feitos, nota no Google...).
- **Serviços e preços**: clicar num serviço já leva pro agendamento com ele selecionado.
- **Equipe**: cartões que inclinam com o mouse. Sem foto, aparecem as iniciais do barbeiro.
- **Galeria** com as fotos da barbearia. Sem fotos, aparecem cartões ilustrados.
- **Depoimentos** que trocam sozinhos.
- **Agendamento**: o cliente escolhe serviço, barbeiro, dia e horário. Os dias fechados e os horários que já passaram ficam bloqueados. No fim, abre o WhatsApp com a mensagem pronta.
- **Contato**: endereço, link do mapa, horários, WhatsApp e Instagram.
- Botão flutuante de WhatsApp, menu de celular, e respeita quem desativa animações no aparelho.

## Como adaptar para uma barbearia nova (10 minutos)

Tudo fica em **um arquivo só: `js/config.js`**. Abra no Bloco de Notas ou no VS Code e troque:

| Campo | O que é |
|---|---|
| `nome`, `sigla`, `desde`, `cidade` | Identidade da barbearia |
| `heroTitulo` | Título grande do topo. Cada item é uma linha. `*palavra*` fica em itálico dourado |
| `heroTexto`, `manifesto` | Textos de apresentação (no manifesto, `*palavra*` também destaca) |
| `cores` | Cor de fundo, cor de destaque e a cor da listra |
| `whatsapp` | Número com DDI e DDD, só números. Ex.: `5511987654321` |
| `instagram`, `telefoneExibicao`, `endereco`, `mapsLink` | Contatos |
| `horariosTexto` | Os horários que aparecem escritos no site |
| `funcionamento` | Os horários que o agendamento usa (0 = domingo ... 6 = sábado; `null` = fechado) |
| `servicos` | Nome, descrição, preço, duração em minutos. `destaque: true` coloca a etiqueta "Mais pedido" |
| `barbeiros` | Nome, especialidade e foto (opcional) |
| `fotos` | Fotos da galeria. Coloque os arquivos na pasta `img/` e liste aqui (ideal: 6 fotos) |
| `depoimentos` | Avaliações reais de clientes (copie do Google) |

Fotos: coloque na pasta `img/` (ex.: `img/rafael.jpg`) e use o caminho no config. Fotos na vertical funcionam melhor para os barbeiros.

## Como ver no seu computador

Dê dois cliques no `index.html`. Ele abre no navegador e já funciona.

## Como colocar no ar (grátis)

**Netlify (mais fácil):** entre em [app.netlify.com/drop](https://app.netlify.com/drop) e arraste a pasta inteira do site. Em segundos ele te dá um link. Depois dá pra ligar um domínio próprio (ex.: `fioenavalha.com.br`).

**GitHub Pages:** no repositório, vá em *Settings → Pages*, escolha a branch e a pasta raiz. O site fica em `seuusuario.github.io/nome-do-repo`.

## Dicas para vender

- Antes de oferecer, monte uma versão **com o nome, os preços e as fotos do Instagram da própria barbearia**. Mostrar o site já pronto no celular do dono vende muito mais que falar.
- O argumento principal: **o cliente agenda sozinho e o pedido chega organizado no WhatsApp**, sem o barbeiro parar o corte pra responder "tem horário amanhã?".
- Cobre a criação (valor único) e, se quiser renda recorrente, uma mensalidade pequena para hospedagem, domínio e atualizações de preço/foto.
- Limitação para ser honesto com o cliente: o agendamento **não bloqueia horários já ocupados** (não tem banco de dados). O barbeiro confirma ou sugere outro horário pelo WhatsApp. Para agenda com bloqueio automático, dá para integrar com o sistema DomCorte.

## Estrutura

```
index.html      estrutura da página
css/style.css   visual e animações
js/config.js    TODO o conteúdo da barbearia (é aqui que você edita)
js/main.js      lógica (agendamento, animações). Não precisa mexer
img/            fotos da barbearia
```
