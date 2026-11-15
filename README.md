# Minicurso: Terminal Linux e Shell Script — apresentação de slides

Site estático de slides (HTML + CSS + JavaScript puros, sem framework, sem backend,
sem requisições externas) construído a partir de `spec.md`.

- **Público:** aula presencial de 3h30 (Sistemas de Informação · UECE) + link para os participantes.
- **Conteúdo:** a fonte de verdade é `spec.md` (seção 7). Os textos dos slides são os da especificação.

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
| `T` / `R` | cronômetro regressivo: iniciar/pausar / reiniciar (slides com `data-timer`) |
| `E` / `C` / `B` | Cartão de erros (A1) · Cola de comandos (A2) · voltar ao slide de origem |
| `F` | tela cheia |
| `N` | notas do instrutor (painel discreto na base) |
| `O` | visão geral (grade de miniaturas) |
| `?` · `Esc` | lista de atalhos · fechar sobreposições |

Clique na metade direita avança; na metade esquerda volta. No toque, *swipe*.
Links por slide: `#/12` abre o slide 12.

## Placeholders

Nenhum placeholder pendente: instrutores preenchidos (**Daniel · Gustavo · Silvio**),
data da aula e formulário de feedback removidos a pedido dos instrutores
(o slide S50 ficou apenas com as perguntas para coleta verbal).

## Estrutura

```
index.html        todos os slides (<section class="slide">)
css/style.css     tema, layouts, componentes, impressão
js/deck.js        navegação, passos, cronômetro, atalhos
assets/fonts/     JetBrains Mono (400/700) + Inter latin (400/600), .woff2 + licenças (OFL)
assets/favicon.svg
vercel.json
```

## Decisões e dúvidas registradas

1. **54 slides em vez de 53:** a Cola de comandos foi dividida em **A2 (8 linhas) e A3 (7 linhas
   + faixa final)**, opção prevista na própria spec (seção A2), porque as 15 linhas não caberiam
   respeitando o mínimo de 28 px no palco 1920×1080. O total passou de 53 para 54.
2. **Fonte de S44 em 28 px (spec pedia 34 px):** a janela de 21 linhas com fonte 34 px excede a
   altura do palco; foi usado o piso de 28 px da spec (seção 5.3) para o esqueleto ficar inteiro
   visível, sem rolagem. **S46 (solução)** mantém 32 px com `overflow-y: auto`, como a spec indica.
3. **Glifos `→`, `←`, `⚠`, `⏱`:** o subconjunto das fontes não os cobre; são **SVG inline**
   (próprios, no repositório), conforme previsto na seção 5.3. A JetBrains Mono usada é a versão
   completa (oficial da JetBrains), que inclui box-drawing (`├ └ │ ─`) usado nas árvores.
4. **Chamadas anotadas (S08):** implementadas como etiquetas com seta ao lado do terminal
   (posicionamento CSS simples, sem bibliotecas), conforme autorizado na spec (item 5.4.7).
5. **Cronômetro:** disponível nos slides com `data-timer` (S10, S16, S22, S23, S27, S36, S40, S43);
   no slide de intervalo (S23) ele aparece gigante, no centro, ao pressionar `T`.
6. **Lighthouse:** recomendação da spec (Performance/Acessibility/Best Practices ≥ 95). Rodar
   após o deploy (DevTools → Lighthouse, categoria desktop). Nenhum recurso externo é carregado.

## Verificação rápida antes de publicar

- [ ] Abrir localmente e percorrer todos os slides (`End` vai ao último).
- [ ] `#/1`, `#/12`, `#/54` abrem os slides corretos.
- [ ] Passos: `→` revela um a um; `Shift + →` revela tudo; `←` desfaz.
- [ ] `T` no slide de intervalo inicia a contagem (cores em 5 min e 1 min).
- [ ] `Ctrl+P`: pré-visualizar a impressão (1 slide por página, tema claro).
