# Minicurso: Terminal Linux e Shell Script — apresentação de slides

Site estático de slides (HTML + CSS + JavaScript puros, sem framework, sem backend,
sem requisições externas), construído a partir de `spec.md` com os ajustes de
`modificacoes.md`.

- **Formato:** apresentação única de **1h30**, sem divisão em módulos e sem tempos
  estimados por atividade.
- **Total:** **27 slides** (capa → encerramento).
- **Público:** Sistemas de Informação · UECE.
- **Conteúdo:** texto dos slides conforme a seção 7 da spec, com as remoções e
  reformulações pedidas em `modificacoes.md`.

---

## Como rodar local

```bash
npx serve .
# ou
python3 -m http.server 8000
```

Abrir `http://localhost:3000` (ou `:8000`). Não há build: basta servir a pasta.

## Como publicar na Vercel (plano Hobby, gratuito)

**Opção A — via GitHub (recomendada):**
1. Criar um repositório e enviar este projeto.
2. Em vercel.com: **Add New → Project** e importar o repositório.
3. Em *Framework Preset*, escolher **Other**. Deixar **Build Command** e **Output Directory** em branco.
4. **Deploy**. Cada novo *push* na branch principal publica automaticamente.

**Opção B — via CLI:** na pasta do projeto, `npx vercel` (teste) e `npx vercel --prod` (produção).

**URL pública:** `[COLE AQUI A URL DO DEPLOY]`

## Uso durante a aula

| Tecla | Ação |
|---|---|
| `→` · `Espaço` · `PageDown` | avançar (passo ou slide) |
| `Shift + →` | mostrar todos os passos do slide |
| `←` · `PageUp` | voltar (desfaz o último passo) |
| `Home` / `End` | primeiro / último slide |
| `F` | tela cheia |
| `N` | notas do instrutor (painel discreto na base) |
| `O` | visão geral (grade de miniaturas) |
| `?` · `Esc` | lista de atalhos · fechar sobreposições |

Clique na metade direita avança; na metade esquerda volta. No toque, *swipe*.
Links por slide: `#/12` abre o slide 12.

## Placeholders

Nenhum placeholder pendente: instrutores preenchidos (**Daniel · Gustavo · Silvio**),
data da aula e formulário de feedback removidos a pedido dos instrutores.

## Estrutura

```
index.html        todos os slides (<section class="slide">)
css/style.css     tema, layouts, componentes, impressão
js/deck.js        navegação, passos, atalhos
assets/fonts/     JetBrains Mono (400/700) + Inter latin (400/600), .woff2 + licenças (OFL)
assets/favicon.svg
vercel.json
```

## O que mudou em relação à spec original (`modificacoes.md`)

1. **Atividade "caça ao tesouro" removida** (slide 16 da versão anterior).
2. **Atividades de scripts de bagunça/organização removidas** (slides 22, 27 e o bloco 37–47).
3. **Sem módulos:** slides de abertura de módulo (M1–M7), plano da aula e intervalo removidos.
   A apresentação é uma sequência única de 27 slides para 1h30.
4. **Sem tempo estimado por tarefa:** removidos os badges `⏱ N min` e todos os `data-timer`.
   Os slides de prática mantêm apenas o selo **SUA VEZ**.
5. **Slide "Sua vez: scripts" reformulado:** o Desafio B foi removido e o antigo Desafio A
   virou o único exercício ("Meu cartão"), agora usando **dois parâmetros** (`$1` nome, `$2` curso).
6. **Slide "O que você aprendeu" reformulado:** lista apenas o conteúdo mantido
   (comandos, `>`/`>>`, variáveis, `$1`/`$2` e script); `for`/curinga saíram.
7. **Apêndices removidos** (cartão de erros e cola de comandos), junto com os atalhos `E`/`C`/`B`.
8. **Exemplos ajustados ao conteúdo restante:** a árvore de pastas mostra `faculdade/` (em vez de
   `caca/`) e o exemplo de `Tab` usa `cd fac<Tab>` → `cd faculdade/`.
9. Textos mantidos seguem literalmente a spec original (acentos, aspas e comandos intactos).

## Verificação rápida antes de publicar

- [ ] Abrir localmente e percorrer todos os slides (`End` vai ao último: `27 / 27`).
- [ ] `#/1`, `#/12`, `#/27` abrem os slides corretos.
- [ ] Passos: `→` revela um a um; `Shift + →` revela tudo; `←` desfaz.
- [ ] `Ctrl+P`: pré-visualizar a impressão (1 slide por página, tema claro).
