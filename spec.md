# SPEC: Apresentação de slides do minicurso "Terminal Linux e Shell Script" (versão para iniciantes)

> **Para quem é este documento:** IA (ou desenvolvedor) que vai **construir e publicar** a apresentação de slides desta aula.
> **Fonte de verdade do conteúdo:** este arquivo. **Todo o texto de cada slide está escrito literalmente na seção 7.** Não invente, resuma nem reescreva textos. Se algo faltar, **não acrescente**; deixe como está e liste a dúvida no `README.md`.
> **Origem pedagógica:** `roteiro_minicurso_shell_linux_iniciantes.md` (210 min, público quase 100% leigo).

---

## 1. Objetivo

Criar um **site estático de slides**, em português do Brasil (pt-BR), para ser **projetado durante uma aula presencial de 3h30** e também aberto pelos participantes em qualquer navegador via link público.

Os slides **apoiam** a aula; a maior parte do tempo os instrutores demonstram e os participantes praticam **no terminal real**. Portanto: slides **enxutos, legíveis de longe e com pouco texto por tela**.

---

## 2. Restrições técnicas (obrigatórias)

| Restrição | Detalhe |
|---|---|
| **Hospedagem** | **Vercel, plano gratuito (Hobby)**: apenas **arquivos estáticos**. |
| **Sem banco de dados** | Nada de banco, ORM, autenticação, CMS, analytics, formulário com backend, cookies ou `localStorage`. |
| **Sem backend** | Nada de *serverless functions*, API routes, variáveis de ambiente ou Edge Functions. |
| **Sem build obrigatório** | Entregar **HTML + CSS + JavaScript puros (vanilla)**, sem framework e sem *bundler*. O projeto deve abrir com um servidor estático simples (`npx serve .` ou `python3 -m http.server`). |
| **Sem requisições externas em tempo de execução** | **Fontes, ícones e imagens ficam no repositório** (a internet do laboratório pode falhar). Proibido CDN, Google Fonts via `<link>`, scripts de terceiros. |
| **Leve** | Tamanho total do projeto **< 3 MB**; JS próprio **< 20 KB**; CSS próprio **< 30 KB**. |
| **Navegadores** | Últimas 2 versões de Chrome, Edge, Firefox e Safari (desktop e mobile). |
| **Uso** | Plano Hobby da Vercel é para uso **não comercial**: este caso (aula universitária) se enquadra. |

---

## 3. Estrutura de arquivos esperada

```text
/
├── index.html              # todos os slides, como <section class="slide">
├── css/
│   └── style.css           # tema, layouts, componentes, impressão
├── js/
│   └── deck.js             # navegação, passos, timers, atalhos
├── assets/
│   ├── fonts/              # .woff2 (latin) + licenças (OFL)
│   └── favicon.svg         # ícone ">_" (SVG próprio)
├── vercel.json
└── README.md               # como rodar local, como publicar, dúvidas, placeholders a preencher
```

**Como escrever os slides:** diretamente em HTML, uma `<section class="slide" id="sNN" data-layout="..." data-title="...">` por slide, na ordem da seção 7. Conteúdo em HTML semântico (`h1`/`h2`, `ul`, `ol`, `table`, `pre><code`).

---

## 4. Requisitos funcionais

### 4.1 Obrigatórios (MUST)

1. **Palco fixo 16:9 (1920×1080)** escalado para caber na janela (letterbox), mantendo a proporção.
2. **Navegação:** `→`, `Espaço`, `PageDown`, clique no lado direito = avançar; `←`, `PageUp`, clique no lado esquerdo = voltar; `Home`/`End` = primeiro/último; *swipe* no toque.
3. **Endereço por slide:** `#/12` abre o slide 12 (hash), para compartilhar o link de um slide. Ao carregar sem hash, abre o slide 1.
4. **Indicadores:** contador `07 / 53` (fonte mono, canto inferior direito) e **barra de progresso fina** (cor de destaque) na base.
5. **Passos (*steps*):** elementos com classe `step` aparecem **um a um** a cada avanço (`→`); o slide só passa para o próximo quando todos os passos estiverem visíveis. `Shift + →` mostra tudo de uma vez. Voltar (`←`) esconde o último passo.
6. **Cronômetro regressivo por slide:** slides com `data-timer="N"` (minutos) mostram, ao pressionar `T`, um relógio regressivo `MM:SS` no canto superior direito. `T` de novo pausa/retoma; `R` reinicia. Cores: normal → âmbar quando restarem ≤ 5 min → vermelho quando restar ≤ 1 min. Ao zerar, o relógio pisca 3 vezes (sem som).
7. **Atalhos de consulta rápida:** `E` salta para o **Cartão de erros** (slide A1) e `C` para a **Cola de comandos** (slide A2); `B` volta ao slide de onde saiu.
8. **Tela cheia:** `F` alterna tela cheia.
9. **Impressão/PDF:** `@media print` com **um slide por página (A4 paisagem)**, **tema claro** (fundo branco, texto escuro, destaques em tons escuros), todos os passos visíveis, sem barra de progresso.
10. **Acessibilidade:** `lang="pt-BR"`; contraste mínimo **4.5:1**; foco visível; respeitar `prefers-reduced-motion` (desligar animações); `aria-label` nos controles; ordem de leitura lógica; ícones decorativos com `aria-hidden="true"`.

### 4.2 Desejáveis (SHOULD)

- **Notas dos instrutores:** atributo `data-notes="..."` por slide; a tecla `N` abre/fecha um painel discreto na base com as notas (fechado por padrão, pois a tela é projetada).
- **Visão geral (grade):** tecla `O` mostra miniaturas de todos os slides; clique salta para o slide.
- **Atalho `?`:** mostra uma lista dos atalhos.
- Título da aba dinâmico: `Terminal Linux e Shell Script · 07/53`.
- *Open Graph* básico (título e descrição) no `<head>`.

### 4.3 Proibido

Banco de dados, *login*, *tracking*, cookies, `localStorage`, chamadas a APIs, CDN, bibliotecas de slides (reveal.js etc.), frameworks (React/Vue...), imagens de *stock*, logotipos de terceiros (inclui o mascote Tux: **não usar**), áudio automático.

---

## 5. Direção visual: "a tela preta, mas amigável"

### 5.1 Conceito

O visual deve **parecer um terminal moderno e acolhedor**: fundo escuro, tipografia monoespaçada nos títulos e nos comandos, cursor piscante, janelas de terminal estilizadas. Como o público é **leigo**, o design deve **tirar o medo** do terminal: cores claras de significado (verde = comando/ok, âmbar = cuidado, vermelho = erro, ciano = variável), muito espaço em branco e letras grandes. **Nada de "visual hacker" assustador** (sem chuva de código verde, sem caveiras, sem glitch).

### 5.2 Paleta (definir como variáveis CSS em `:root`)

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#0B0F14` | fundo do slide |
| `--bg-panel` | `#121A24` | cartões e janelas de terminal |
| `--bg-panel-2` | `#192433` | barra de título da janela, linhas alternadas de tabela |
| `--line` | `#26364A` | bordas e divisórias |
| `--fg` | `#E6EDF3` | texto principal |
| `--muted` | `#8B98A9` | texto secundário, comentários, saída de comandos |
| `--green` | `#4ADE80` | destaque principal, prompt `$`, comandos, barra de progresso |
| `--amber` | `#FBBF24` | atenção, avisos, textos entre aspas |
| `--red` | `#F87171` | erros |
| `--cyan` | `#5EEAD4` | variáveis (`$nome`), links, termos-chave |
| `--violet` | `#C4B5FD` | shebang (`#!/bin/bash`), palavras-chave (`for`, `do`, `done`) |

*Opcional:* fundo com **grade pontilhada** ou **linhas de varredura** muito sutis (opacidade ≤ 5%). Não pode reduzir a legibilidade.

### 5.3 Tipografia

- **Títulos, comandos, código, números, rótulos:** **JetBrains Mono** (OFL), pesos 400, 700.
- **Corpo de texto explicativo:** **Inter** (OFL), pesos 400, 600.
- Baixar os `.woff2` do subconjunto *latin* (por exemplo, via pacotes npm `@fontsource/jetbrains-mono` e `@fontsource/inter`, copiando apenas os arquivos necessários para `assets/fonts/`) e declarar com `@font-face` + `font-display: swap`. Fallback: `ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace` e `system-ui, sans-serif`.
- **Verificar os glifos** `↑`, `→`, `←`, `⚠`, `✓`, `✗`, `⏱` e as linhas de árvore `├ └ │ ──`. Se alguma fonte não tiver o glifo, usar **SVG inline** (para `↑`, `⚠`, `⏱`) em vez de depender de fonte do sistema. Para a árvore de diretórios, usar a fonte mono (que contém *box drawing*) e conferir o alinhamento.
- **Tamanhos mínimos no palco 1920×1080:** título de slide 72–88 px; corpo 40–44 px; código 36–40 px; legendas 28 px. **Nunca abaixo de 28 px.**
- Texto do corpo alinhado à esquerda; no máximo ~60 caracteres por linha.

### 5.4 Componentes

1. **Janela de terminal** (`.term`): cantos arredondados (16 px), barra de título com **três bolinhas** (vermelha, âmbar, verde, discretas) e um título em `--muted` (ex.: `aluno@pc: ~/faculdade`). Corpo em `--bg-panel`, borda `--line`.
   - Linhas que começam com `$ ` → o `$` em `--green`, o comando em `--fg`, comentários (após `#`) em `--muted`.
   - Linhas de **saída** (na especificação aparecem prefixadas com `»`) → renderizar **sem** o `»`, em `--muted` e sem o `$`.
   - **Erros** (marcados com `[ERRO]` na especificação) → renderizar sem o marcador, em `--red`.
   - Texto entre aspas em `--amber`; `$variável` em `--cyan`; `#!/bin/bash` em `--violet`; `for`, `do`, `done`, `in` em `--violet`.
   - **Cursor** em bloco verde piscante (`▌`, 1,1 s) **apenas** em UM lugar por slide (último prompt vazio ou título). Desligado com `prefers-reduced-motion`.
2. **Cartão** (`.card`): `--bg-panel`, borda `--line`, raio 16 px, título em mono verde, texto em Inter.
3. **Selo "SUA VEZ"** (`.badge-task`): pílula verde-sólida com texto escuro `SUA VEZ` + duração `⏱ 18 min`. Slides de prática têm uma **borda esquerda grossa verde**, para a turma reconhecer "agora é com vocês".
4. **Aviso** (`.warn`): borda esquerda âmbar, ícone `⚠` em SVG, fundo âmbar a 8% de opacidade.
5. **Erro** (`.err`): igual ao aviso, em vermelho.
6. **Tecla** (`.key`): estilo de tecla de teclado (borda inferior grossa, raio 8 px, fonte mono) para `Tab`, `Ctrl`, `Enter` etc.
7. **Chamadas anotadas** (`.callout`): linha fina ligando um trecho do código a uma etiqueta explicativa (pode ser feito com posicionamento CSS simples; sem bibliotecas).
8. **Numeração de passos:** círculos verdes com número (`1`, `2`, `3`) em listas ordenadas.
9. **Tabelas:** cabeçalho em `--bg-panel-2`, linhas com divisórias `--line`, primeira coluna em mono verde.
10. **Árvore de diretórios:** bloco `pre` em mono, com nomes de pasta terminando em `/` na cor `--cyan` e comentários (`←`) em `--muted`.

### 5.5 Layouts (atributo `data-layout`)

| Layout | Descrição |
|---|---|
| `cover` | Capa: título gigante à esquerda, janela de terminal decorativa à direita |
| `section` | Abertura de módulo: linha `$ cd modulo-N` em mono/verde, número `M N` gigante, título do módulo, duração |
| `bullets` | Título + lista (até 4 itens, 1 ideia por item) |
| `cards` | Título + 2 a 4 cartões lado a lado |
| `terminal` | Título curto + uma janela de terminal grande (centralizada) |
| `split` | Texto/legenda à esquerda e janela de terminal à direita (ou vice-versa) |
| `table` | Título + tabela |
| `task` | Slide de prática: selo SUA VEZ + lista numerada grande (e, quando indicado, bloco de apoio à direita) |
| `warning` | Fundo com tom âmbar suave, ícone `⚠` grande, texto curto |
| `break` | Intervalo: relógio regressivo gigante |
| `closing` | Encerramento |

### 5.6 Movimento

- Transição entre slides: *fade* de 150–200 ms. Nada de transições 3D.
- Passos (`.step`): aparecem com *fade + deslocamento de 8 px*, 150 ms.
- Cursor piscante e o relógio são as únicas animações contínuas.
- Tudo desligado sob `prefers-reduced-motion: reduce`.

### 5.7 Identidade e rodapé

- Rodapé discreto em todos os slides (exceto capa e encerramento): à esquerda `Terminal Linux e Shell Script · UECE` em `--muted` (28 px); à direita o contador. Barra de progresso na base.
- Favicon: SVG próprio com o símbolo `>_` verde sobre fundo `--bg`.

---

## 6. Como ler a especificação dos slides (seção 7)

- **Layout:** valor de `data-layout`.
- **Texto exato:** deve aparecer **exatamente** como escrito (inclusive acentos, aspas e pontuação). Blocos `text` mostram o conteúdo literal.
- **Convenções dentro dos blocos de código:**
  - `$ ` no início da linha = prompt de comando.
  - `» ` no início da linha = **saída** do comando (renderizar sem o `»`).
  - `[ERRO] ` no início da linha = mensagem de erro (renderizar sem o marcador, em vermelho).
  - Linhas em branco devem ser preservadas.
- **Passos:** "Passos: sim" = cada linha/item do bloco vira um `.step`; "Passos: não" = tudo aparece de uma vez.
- **Timer:** valor de `data-timer`, quando houver.
- **Notas:** conteúdo para `data-notes` (só aparece com a tecla `N`).
- Os **scripts e comandos foram testados em Bash**; **não alterar** código, nomes de arquivo, espaços nem aspas.
- Os trechos entre colchetes (`[NOME 1]`, `[DATA DA AULA]`...) são **placeholders que o usuário preencherá**: **mantê-los visíveis**, exatamente assim, e listá-los no `README.md`.

---

## 7. Conteúdo slide a slide

**Total: 53 slides** (51 de aula + 2 de apêndice). Ordem fixa.

---

### S01 · Capa
**Layout:** `cover` · **Passos:** não

```text
MINICURSO · SISTEMAS DE INFORMAÇÃO · UECE

Terminal Linux e Shell Script

Primeiros passos para quem nunca abriu a tela preta

Instrutores: [NOME 1] · [NOME 2] · [NOME 3]
[DATA DA AULA]
```

**Janela decorativa (lado direito):**
```text
$ ./comecar.sh
» Vamos lá!
$ ▌
```

---

### S02 · O que vamos construir
**Layout:** `split` (duas janelas lado a lado, "antes" e "depois") · **Passos:** sim (primeiro "antes", depois "depois")

```text
Ao final da aula, você vai escrever isto
```
**Janela 1 (título da janela: `antes`):**
```text
$ ls bagunca
» foto1.jpg  foto2.png  notas.txt  programa.py  resumo.pdf  selfie.jpg  trabalho.pdf
```
**Janela 2 (título da janela: `depois`):**
```text
$ ./organizar.sh bagunca
» Pasta 'bagunca' organizada!
$ ls bagunca
» codigos  documentos  imagens
```
**Legenda:**
```text
Um script que arruma uma pasta bagunçada sozinho.
```
**Notas:** Executar ao vivo o script (demo-gancho) antes ou durante este slide.

---

### S03 · Plano da aula
**Layout:** `table` · **Passos:** não

```text
Plano da aula
```
| Início | Bloco | Duração |
|---|---|---|
| 0:10 | M1 · O que é o terminal? | 15 min |
| 0:25 | M2 · Onde estou? Navegando pelas pastas | 30 min |
| 0:55 | M3 · Criando e organizando pastas e arquivos | 30 min |
| 1:25 | Intervalo | 10 min |
| 1:35 | M4 · Escrevendo e lendo texto | 20 min |
| 1:55 | M5 · Seu primeiro script | 35 min |
| 2:30 | M6 · Repetindo tarefas com for | 20 min |
| 2:50 | M7 · Exercício final: organizador de pasta | 30 min |
| 3:20 | Encerramento | 10 min |

```text
Mais da metade do tempo é você praticando.
```

---

### S04 · Regras de ouro
**Layout:** `cards` (4 cartões) · **Passos:** sim (um cartão por avanço)

```text
4 regras de ouro do terminal
```
| Cartão | Título | Texto |
|---|---|---|
| 1 | Enter executa | O comando só roda quando você aperta Enter. |
| 2 | Maiúsculas importam | Aula e aula são nomes diferentes. |
| 3 | Espaços importam | Um espaço a mais (ou a menos) muda tudo. |
| 4 | Errar é normal | A mensagem de erro é uma pista, não uma bronca. |

**Faixa inferior:**
```text
Travou? Levante o post-it. Os instrutores de apoio vão até você.
```

---

### S05 · Módulo 1
**Layout:** `section` · **Passos:** não

```text
$ cd modulo-1
M1
O que é o terminal?
15 min
```

---

### S06 · Terminal, shell e Bash
**Layout:** `cards` (3 cartões) · **Passos:** sim

```text
Terminal, shell e Bash
```
| Título | Texto |
|---|---|
| Terminal | A janela onde você digita os comandos. |
| Shell | O programa que entende o que você digitou e pede ao sistema para executar. |
| Bash | O shell mais usado no Linux. É o que usaremos hoje. |

**Frase final (destaque):**
```text
É como conversar com o computador por texto.
```

---

### S07 · Por que aprender?
**Layout:** `bullets` · **Passos:** sim

```text
Por que aprender o terminal?
```
```text
Servidores, nuvem e desenvolvimento de software usam Linux.
Tudo o que você digita no terminal pode ser guardado e repetido.
Um script é uma receita de bolo: o computador segue os passos sozinho.
```

---

### S08 · Anatomia do prompt
**Layout:** `terminal` com chamadas anotadas (`.callout`) · **Passos:** sim (uma chamada por avanço)

```text
Como ler o prompt
```
**Janela (título: `terminal`):**
```text
aluno@pc:~$ ▌
```
**Chamadas (apontando para cada parte):**
```text
aluno  →  quem é você
pc     →  em qual máquina
~      →  em qual pasta (~ = sua pasta pessoal)
$      →  pode digitar!
```
**Legenda:**
```text
Você digita depois do $.
```

---

### S09 · Seu primeiro comando
**Layout:** `terminal` · **Passos:** sim (um comando + sua saída por avanço)

```text
Seu primeiro comando: echo
```
```text
$ echo Olá
» Olá
$ echo "Olá, UECE!"
» Olá, UECE!
$ echo "Meu primeiro comando"
» Meu primeiro comando
```
**Legenda:**
```text
echo escreve um texto na tela.
```

---

### S10 · Sua vez: três echo
**Layout:** `task` · `data-timer="4"` · **Passos:** não

```text
SUA VEZ  ⏱ 4 min

Digite três comandos echo com mensagens suas:

1  seu nome
2  seu curso
3  sua cidade

Exemplo:
```
**Bloco de apoio (janela):**
```text
$ echo "Meu nome é Maria"
» Meu nome é Maria
```

---

### S11 · Módulo 2
**Layout:** `section` · **Passos:** não

```text
$ cd modulo-2
M2
Onde estou? Navegando pelas pastas
30 min
```

---

### S12 · Pense em um prédio
**Layout:** `cards` (3 linhas/cartões grandes) · **Passos:** sim

```text
Pense em um prédio
```
| Comando | Pergunta |
|---|---|
| pwd | Em que sala estou? |
| ls | O que há nesta sala? |
| cd | Ir para outra sala. |

**Legenda:**
```text
As "salas" são as pastas do computador.
```

---

### S13 · A árvore de pastas
**Layout:** `split` (árvore à esquerda, legenda à direita) · **Passos:** não

```text
As pastas formam uma árvore
```
**Árvore (janela):**
```text
/                      ← a raiz: o início de tudo
├── home/
│   └── aluno/         ← ~ (sua pasta pessoal)
│       ├── Documentos/
│       └── caca/
└── usr/
```
**Legenda (símbolo → significado):**
```text
/    →  a raiz
~    →  sua pasta pessoal
..   →  a pasta acima da atual
```

---

### S14 · Os comandos de navegação
**Layout:** `terminal` · **Passos:** sim (uma linha por avanço)

```text
pwd, ls e cd
```
```text
$ pwd                # onde estou?
$ ls                 # o que há aqui?
$ cd /               # vai para a raiz
$ cd /home           # caminho completo
$ cd ~               # volta para a pasta pessoal
$ cd ..              # sobe um nível
```
**Notas:** Demonstrar ao vivo no terminal; este slide é a referência escrita.

---

### S15 · Tab e seta para cima
**Layout:** `cards` (2 cartões) + exemplo · **Passos:** sim

```text
Dois atalhos que salvam sua vida
```
| Tecla | Texto |
|---|---|
| Tab | Completa o nome para você. Digite as primeiras letras e aperte Tab. |
| ↑ | Traz de volta o comando anterior. Aperte de novo para voltar mais. |

**Exemplo (janela):**
```text
$ cd cac<Tab>
$ cd caca/
```

---

### S16 · Sua vez: caça ao tesouro
**Layout:** `task` · `data-timer="18"` · **Passos:** não

```text
SUA VEZ  ⏱ 18 min

Caça ao tesouro

1  Vá até a pasta caca dentro da sua pasta pessoal.
2  Usando só ls e cd, encontre a pasta chamada tesouro.
3  Ao chegar, digite pwd e anote o caminho completo.
4  Volte à pasta pessoal com um único comando.
5  Refaça o caminho até o tesouro com um único cd, usando Tab.

Dica: se você se perder, digite pwd.
```
**Notas:** Antes: rodar `preparar_caca.sh` nas máquinas. Resposta: `/home/<usuario>/caca/biblioteca/sala3/estante_azul/tesouro`.

---

### S17 · Módulo 3
**Layout:** `section` · **Passos:** não

```text
$ cd modulo-3
M3
Criando e organizando pastas e arquivos
30 min
```

---

### S18 · Os quatro comandos
**Layout:** `table` · **Passos:** sim (uma linha por avanço)

```text
Criar, mover e apagar
```
| Comando | O que faz |
|---|---|
| mkdir nome | Cria uma pasta |
| touch nome | Cria um arquivo vazio |
| mv origem destino | Move ou renomeia |
| rm arquivo | Apaga um arquivo |

---

### S19 · mv move e renomeia
**Layout:** `terminal` · **Passos:** sim

```text
mv: mover e renomear
```
```text
$ mv resumo.txt banco_de_dados/     # MOVE para dentro da pasta
$ mv lista1.txt lista_bd.txt        # RENOMEIA
```
**Legenda:**
```text
Renomear é só mover para outro nome.
```

---

### S20 · Aviso: sem lixeira
**Layout:** `warning` · **Passos:** sim

```text
Não existe lixeira no terminal

O que o rm apaga não volta.
Antes de apagar, rode ls e confira o nome.
Evite espaços nos nomes: use_underline.
```

---

### S21 · Demonstração: pasta de disciplina
**Layout:** `terminal` · **Passos:** sim (uma linha ou par comando/saída por avanço)

```text
Montando a pasta de uma disciplina
```
```text
$ cd ~
$ mkdir faculdade
$ cd faculdade
$ mkdir banco_de_dados
$ touch resumo.txt lista1.txt
$ mv resumo.txt banco_de_dados/
$ ls banco_de_dados
» resumo.txt
$ mv lista1.txt lista_bd.txt
$ rm lista_bd.txt
$ ls
» banco_de_dados
```
**Notas:** Rodar `ls` depois de cada comando que modifica algo.

---

### S22 · Sua vez: pasta de projeto
**Layout:** `task` com bloco de apoio à direita · `data-timer="18"` · **Passos:** não

```text
SUA VEZ  ⏱ 18 min

Pasta de projeto (dentro de ~/faculdade)
Confira cada passo com ls.

1  Crie as pastas projeto, docs e imagens.
2  Crie os arquivos ideia.txt, requisitos.txt e logo.png.
3  Mova ideia.txt e requisitos.txt para docs.
4  Mova logo.png para imagens.
5  Renomeie requisitos.txt (dentro de docs) para requisitos_v1.txt.
6  Apague ideia.txt.
7  Mova as pastas docs e imagens para dentro de projeto.
```
**Bloco de apoio (título: `resultado final`):**
```text
projeto/
├── docs/
│   └── requisitos_v1.txt
└── imagens/
    └── logo.png
```

---

### S23 · Intervalo
**Layout:** `break` · `data-timer="10"` · **Passos:** não

```text
Intervalo

10 minutos

Volte com o terminal aberto.
```
**Notas:** Pressionar `T` ao entrar neste slide para iniciar a contagem.

---

### S24 · Módulo 4
**Layout:** `section` · **Passos:** não

```text
$ cd modulo-4
M4
Escrevendo e lendo texto
20 min
```

---

### S25 · > e >>
**Layout:** `cards` (3 cartões: `>`, `>>`, `cat`) · **Passos:** sim

```text
Do comando para o arquivo
```
| Título | Texto | Exemplo |
|---|---|---|
| > | Grava o texto no arquivo. Se o arquivo já existir, apaga o que havia antes. | echo "Olá" > a.txt |
| >> | Acrescenta o texto ao final do arquivo, sem apagar nada. | echo "Mais" >> a.txt |
| cat | Mostra o conteúdo do arquivo na tela. | cat a.txt |

**Selo de aviso no cartão `>`:**
```text
Cuidado com o >
```

---

### S26 · Demonstração: diário
**Layout:** `terminal` · **Passos:** sim (um comando + saída por avanço)

```text
Criando e lendo um arquivo
```
```text
$ echo "Aula 1: introdução ao terminal" > diario.txt
$ cat diario.txt
» Aula 1: introdução ao terminal
$ echo "Aula 2: navegação" >> diario.txt
$ cat diario.txt
» Aula 1: introdução ao terminal
» Aula 2: navegação
$ echo "Texto novo" > diario.txt
$ cat diario.txt
» Texto novo
```
**Legenda (aparece no último passo):**
```text
O > apagou as linhas antigas!
```

---

### S27 · Sua vez: diário de estudos
**Layout:** `task` · `data-timer="12"` · **Passos:** não

```text
SUA VEZ  ⏱ 12 min

Diário de estudos

1  Crie estudos.txt com 3 linhas no formato "disciplina - o que estudei". Use > na primeira e >> nas outras.
2  Mostre o arquivo com cat.
3  Acrescente uma quarta linha.
4  Teste: rode echo "apaguei tudo" > estudos.txt e depois cat. O que aconteceu? Explique para o colega.
```

---

### S28 · Módulo 5
**Layout:** `section` · **Passos:** não

```text
$ cd modulo-5
M5
Seu primeiro script
35 min
```

---

### S29 · Script é uma receita
**Layout:** `cards` (3 etapas em sequência, ligadas por setas) · **Passos:** sim

```text
Um script é uma receita
```
| Etapa | Título | Texto |
|---|---|---|
| 1 | Escrever | Um arquivo de texto com comandos, um por linha. |
| 2 | Dar permissão | chmod +x script.sh |
| 3 | Executar | ./script.sh |

**Legenda:**
```text
O computador executa os comandos na ordem, sem você digitar de novo.
```

---

### S30 · Passo a passo
**Layout:** `terminal` · **Passos:** sim

```text
Do zero ao script rodando
```
```text
$ nano ola.sh            # escreve o script
$ chmod +x ola.sh        # dá permissão de execução
$ ./ola.sh               # executa
```

---

### S31 · Atalhos do nano
**Layout:** `cards` (2 cartões com teclas) · **Passos:** não

```text
Editor nano: só dois atalhos
```
| Teclas | Ação |
|---|---|
| Ctrl + O, depois Enter | Salvar |
| Ctrl + X | Sair |

**Rodapé:**
```text
Prefere outro editor? Pode usar o editor de texto do sistema ou o VS Code.
```

---

### S32 · O script ola.sh
**Layout:** `split` (código à esquerda, anotações à direita) · **Passos:** sim (anotações uma a uma)

```text
ola.sh
```
**Janela (título: `ola.sh`):**
```text
#!/bin/bash
# Meu primeiro script

echo "Olá, mundo!"

curso="Sistemas de Informação"
echo "Bem-vindo(a) ao curso de $curso"
```
**Anotações:**
```text
#!/bin/bash  →  diz qual programa executa o arquivo
# ...        →  comentário: o computador ignora
echo         →  escreve na tela
curso="..."  →  guarda um valor em uma variável
```

---

### S33 · Permission denied
**Layout:** `terminal` + faixa de aviso · **Passos:** sim

```text
Rodando o ola.sh
```
```text
$ ./ola.sh
[ERRO] bash: ./ola.sh: Permission denied
$ chmod +x ola.sh
$ ./ola.sh
» Olá, mundo!
» Bem-vindo(a) ao curso de Sistemas de Informação
```
**Faixa (aparece após o erro):**
```text
"Permission denied" é normal: falta dar permissão de execução.
```

---

### S34 · Variáveis
**Layout:** `split` · **Passos:** sim

```text
Variáveis: caixas com etiqueta
```
**Janela 1 (título: `certo`):**
```text
nome="Maria"
echo "Olá, $nome"
» Olá, Maria
```
**Regras (lista):**
```text
nome="Maria"  guarda o valor
$nome         abre a caixa e usa o valor
Sem espaços ao redor do =
```
**Janela 2 (título: `errado`, borda vermelha):**
```text
nome = "Maria"
[ERRO] nome: command not found
```

---

### S35 · Argumentos
**Layout:** `split` · **Passos:** sim

```text
Argumentos: $1 e $2
```
**Janela 1 (título: `saudacao.sh`):**
```text
#!/bin/bash
nome="$1"
curso="$2"
echo "Olá, $nome!"
echo "Bem-vindo(a) a $curso."
```
**Janela 2 (título: `terminal`):**
```text
$ ./saudacao.sh Maria "Sistemas de Informação"
» Olá, Maria!
» Bem-vindo(a) a Sistemas de Informação.
```
**Legenda (mapeamento):**
```text
$1 = Maria
$2 = Sistemas de Informação
Use aspas quando o valor tiver espaços.
```

---

### S36 · Sua vez: scripts
**Layout:** `task` · `data-timer="20"` · **Passos:** não

```text
SUA VEZ  ⏱ 20 min

Desafio A (8 min): Meu cartão
Crie cartao.sh com seu nome, curso e cidade em três variáveis e mostre um cartão com echo. Deixe-o executável e rode.

Desafio B (12 min): Criar projeto
Crie criar_projeto.sh. Ele recebe o nome de um projeto em $1, cria a pasta com as subpastas docs e src e mostra o conteúdo com ls.
Teste com: ./criar_projeto.sh meu_app
```

---

### S37 · Módulo 6
**Layout:** `section` · **Passos:** não

```text
$ cd modulo-6
M6
Repetindo tarefas com for
20 min
```

---

### S38 · O laço for
**Layout:** `split` (código + anotações; abaixo, saída) · **Passos:** sim

```text
for = "para cada..."
```
**Janela 1 (título: `turma.sh`):**
```text
#!/bin/bash
for disciplina in BD SO Redes; do
    mkdir -p "faculdade/$disciplina"
    echo "Pasta criada: $disciplina"
done
```
**Anotações:**
```text
for disciplina  →  a variável que muda a cada volta
in BD SO Redes →  a lista de itens
do ... done    →  o que repetir
```
**Janela 2 (título: `terminal`):**
```text
$ ./turma.sh
» Pasta criada: BD
» Pasta criada: SO
» Pasta criada: Redes
```

---

### S39 · O curinga *
**Layout:** `split` · **Passos:** sim

```text
O curinga *
```
**Lista:**
```text
*      →  qualquer coisa
*.txt  →  todos os arquivos que terminam em .txt
*.jpg  →  todas as fotos .jpg
```
**Janela (título: `ler.sh`):**
```text
#!/bin/bash
for arq in *.txt; do
    echo "=== $arq ==="
    cat "$arq"
done
```
**Legenda:**
```text
Para cada arquivo .txt da pasta: mostre o nome e o conteúdo.
```

---

### S40 · Sua vez: for
**Layout:** `task` · `data-timer="12"` · **Passos:** não

```text
SUA VEZ  ⏱ 12 min

Desafio A (6 min): Semestre
Crie semestre.sh que, com um for, crie as pastas aula1, aula2, aula3 e aula4 dentro de uma pasta semestre.

Desafio B (6 min): Cartas
Crie 3 arquivos .txt e escreva mostrar.sh, que exiba o nome e o conteúdo de cada um com for e cat.
```

---

### S41 · Módulo 7
**Layout:** `section` · **Passos:** não

```text
$ cd modulo-7
M7
Exercício final: organizador de pasta
30 min
```

---

### S42 · A situação
**Layout:** `bullets` (2 frases grandes) · **Passos:** sim

```text
A situação
```
```text
Sua pasta de trabalhos está uma bagunça: fotos, PDFs, textos e códigos misturados.
Em vez de arrumar tudo à mão, escreva um script que organiza qualquer pasta que você indicar.
```

---

### S43 · O enunciado
**Layout:** `task` · `data-timer="24"` · **Passos:** não

```text
SUA VEZ  ⏱ 24 min

Escreva organizar.sh. Ele recebe o nome de uma pasta ($1) e:

1  Cria dentro dela as pastas imagens, documentos e codigos (use um for).
2  Move os arquivos .jpg e .png para imagens.
3  Move os arquivos .pdf e .txt para documentos.
4  Move os arquivos .py para codigos.
5  Gera relatorio.txt listando o conteúdo de cada pasta e mostra o relatório na tela com cat.

Antes: ./preparar_bagunca.sh cria a pasta bagunca.
Depois: ./organizar.sh bagunca
```

---

### S44 · Esqueleto para preencher
**Layout:** `terminal` (janela larga, fonte 34 px) · **Passos:** não

```text
Preencha as lacunas ___
```
**Janela (título: `organizar.sh`):**
```text
#!/bin/bash
# organizar.sh
pasta="___"                      # guarde aqui o primeiro argumento

# Criar as pastas de destino
for nome in imagens documentos ___; do
    mkdir -p "$pasta/___"
done

# Mover os arquivos (use o curinga *)
mv "$pasta"/*.jpg "$pasta"/*.png "$pasta/imagens/"
mv "$pasta"/*.pdf "$pasta"/___ "$pasta/documentos/"
mv "$pasta"/___ "$pasta/codigos/"

# Relatório
echo "Relatório de organização" > relatorio.txt
echo "--- Imagens ---" >> relatorio.txt
ls "$pasta/imagens" >> relatorio.txt
# ... repita para documentos e codigos ...

cat relatorio.txt
```
*Destacar visualmente cada `___` (fundo âmbar a 20% e texto âmbar) para chamar a atenção.*

---

### S45 · Dicas
**Layout:** `bullets` · **Passos:** sim (uma dica por avanço)

```text
Travou? Quatro dicas
```
```text
1  Comece só pelo for que cria as pastas. Rode e confira com ls bagunca.
2  Acrescente uma linha mv por vez e teste.
3  Use echo "$pasta" para conferir o valor da variável.
4  Deu erro? Aperte E para abrir o cartão de erros.
```
**Notas:** Para repetir o teste, rodar `./preparar_bagunca.sh` de novo.

---

### S46 · Solução comentada
**Layout:** `terminal` (janela larga, fonte 32 px; se necessário, `overflow-y: auto` na janela) · **Passos:** não

```text
Solução
```
**Janela (título: `organizar.sh`):**
```text
#!/bin/bash
# organizar.sh: organiza os arquivos de uma pasta por tipo
# Uso: ./organizar.sh <pasta>

pasta="$1"          # $1 é o primeiro argumento informado ao rodar o script

# Cria as pastas de destino, uma por vez, com o for
# (-p evita erro se a pasta já existir)
for nome in imagens documentos codigos; do
    mkdir -p "$pasta/$nome"
done

# Move os arquivos usando curingas
mv "$pasta"/*.jpg "$pasta"/*.png "$pasta/imagens/"
mv "$pasta"/*.pdf "$pasta"/*.txt "$pasta/documentos/"
mv "$pasta"/*.py "$pasta/codigos/"

# Gera o relatório: > cria o arquivo; >> acrescenta
echo "Relatório de organização" > relatorio.txt
echo "--- Imagens ---" >> relatorio.txt
ls "$pasta/imagens" >> relatorio.txt
echo "--- Documentos ---" >> relatorio.txt
ls "$pasta/documentos" >> relatorio.txt
echo "--- Códigos ---" >> relatorio.txt
ls "$pasta/codigos" >> relatorio.txt

echo "Pasta '$pasta' organizada!"
cat relatorio.txt
```
**Notas:** Só avançar para este slide na correção (últimos 3 min do M7).

---

### S47 · Resultado esperado
**Layout:** `terminal` · **Passos:** não

```text
Resultado esperado
```
```text
$ ./organizar.sh bagunca
» Pasta 'bagunca' organizada!
» Relatório de organização
» --- Imagens ---
» foto1.jpg
» foto2.png
» selfie.jpg
» --- Documentos ---
» notas.txt
» resumo.pdf
» trabalho.pdf
» --- Códigos ---
» programa.py
```

---

### S48 · O que você aprendeu
**Layout:** `cards` (2 grupos) · **Passos:** sim

```text
O que você aprendeu hoje
```
**Cartão "Comandos":**
```text
pwd · ls · cd · mkdir · touch · mv · rm · echo · cat · chmod
```
**Cartão "Conceitos":**
```text
> e >> · variável · $1 · for
```
**Frase final:**
```text
Você saiu da tela preta para a automação.
```

---

### S49 · Próximos passos
**Layout:** `bullets` · **Passos:** sim

```text
Para continuar
```
```text
if: tomar decisões nos scripts
cp: copiar arquivos
grep: procurar texto
|: ligar um comando ao outro (pipe)
man: o manual de cada comando
```
**Rodapé:**
```text
Guia de referência: diegomariano.com/shell-script-um-guia-basico
```

---

### S50 · Feedback
**Layout:** `bullets` · **Passos:** não

```text
Conta pra gente!

O que foi mais útil?
Onde você travou?
O que faltou?

[LINK DO FORMULÁRIO DE FEEDBACK]
```

---

### S51 · Encerramento
**Layout:** `closing` · **Passos:** sim

```text
Obrigado!

Abra o terminal todos os dias. A prática é o que fixa.

$ exit
```
**Rodapé:**
```text
[NOME 1] · [NOME 2] · [NOME 3]  ·  Sistemas de Informação · UECE
```

---

### A1 · Apêndice: Cartão de erros  *(tecla `E`)*
**Layout:** `table` · **Passos:** não

```text
Cartão de erros comuns
```
| O que apareceu | Provável causa | O que fazer |
|---|---|---|
| command not found | Comando digitado errado, ou espaço ao redor do = (nome = "Ana") | Conferir a digitação; variável sem espaços: nome="Ana" |
| No such file or directory | Nome ou caminho errado | pwd e ls para ver onde está e como o arquivo se chama |
| Permission denied | Falta permissão ao rodar o script | chmod +x script.sh |
| unexpected end of file / syntax error | Falta fechar um bloco (ex.: done) ou as aspas | Conferir for...do...done e as aspas |
| O script não mudou | Arquivo não foi salvo no nano | Ctrl+O, Enter, Ctrl+X |
| O terminal "travou" | Está esperando algo | Pressione Ctrl+C |
| Nome com espaço dá erro | O shell separa em dois nomes | Evitar espaços ou usar aspas: "meu arquivo" |

**Rodapé:**
```text
Aperte B para voltar ao slide anterior.
```

---

### A2 · Apêndice: Cola de comandos  *(tecla `C`)*
**Layout:** `table` · **Passos:** não

```text
Cola de comandos
```
| Comando | O que faz | Exemplo |
|---|---|---|
| pwd | Mostra onde estou | pwd |
| ls | Lista o conteúdo da pasta | ls |
| cd pasta | Entra na pasta | cd faculdade |
| cd .. / cd ~ | Sobe um nível / vai para a pasta pessoal | cd .. |
| mkdir nome | Cria pasta | mkdir projeto |
| touch nome | Cria arquivo vazio | touch ideia.txt |
| mv origem destino | Move ou renomeia | mv a.txt docs/ |
| rm arquivo | Apaga arquivo (sem lixeira!) | rm a.txt |
| echo "texto" | Escreve na tela | echo "Olá" |
| echo "texto" > arq | Salva no arquivo (sobrescreve) | echo "oi" > a.txt |
| echo "texto" >> arq | Acrescenta ao arquivo | echo "mais" >> a.txt |
| cat arquivo | Mostra o conteúdo | cat a.txt |
| chmod +x script.sh | Dá permissão de execução | chmod +x ola.sh |
| ./script.sh | Executa o script | ./ola.sh Maria |
| Tab / ↑ | Completa nomes / repete comando | — |

**Faixa final (script):**
```text
#!/bin/bash na 1ª linha · variável: nome="valor" (sem espaços) · uso: $nome · argumentos: $1, $2 · repetição: for x in a b c; do ... done
```

*(Se a tabela não couber a 28 px, dividir em dois slides: A2 e A3 com 8 + 7 linhas, mantendo o título e a faixa final apenas no último.)*

---

## 8. Publicação na Vercel (plano gratuito)

### 8.1 `vercel.json` (sugerido)

```json
{
  "cleanUrls": true,
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### 8.2 Passos (documentar no `README.md`)

**Opção A: via GitHub (recomendada):**
1. Criar um repositório e enviar o projeto.
2. Em vercel.com, **Add New → Project** e importar o repositório.
3. Em *Framework Preset*, escolher **Other**. Deixar **Build Command** e **Output Directory** em branco (o site é estático e a raiz já contém `index.html`).
4. **Deploy**. Cada novo *push* na branch principal publica automaticamente.

**Opção B: via CLI:** na pasta do projeto, `npx vercel` (teste) e `npx vercel --prod` (produção).

### 8.3 Testes locais antes de publicar

```bash
npx serve .
# ou
python3 -m http.server 8000
```
Abrir `http://localhost:3000` (ou `:8000`) e percorrer **todos** os slides.

---

## 9. Critérios de aceitação (checklist final)

- [ ] Existem **exatamente 53 slides** (S01–S51 + A1 + A2; ou 54 se a cola for dividida), na ordem da seção 7.
- [ ] O texto de cada slide é **idêntico** ao especificado (acentos, aspas, pontuação). Nenhum texto adicional foi inventado.
- [ ] Os **placeholders** (`[NOME 1]`, `[NOME 2]`, `[NOME 3]`, `[DATA DA AULA]`, `[LINK DO FORMULÁRIO DE FEEDBACK]`) estão visíveis e listados no `README.md`.
- [ ] **Nenhuma requisição externa** (verificar a aba *Network*: só o próprio domínio). Funciona **offline** após o carregamento.
- [ ] Navegação por teclado, clique e toque funciona; `#/N` abre o slide N.
- [ ] Passos (`.step`) funcionam; `Shift + →` revela tudo; `←` desfaz o último passo.
- [ ] `T`, `R`, `E`, `C`, `B`, `F` funcionam; cronômetro muda de cor em 5 min e 1 min.
- [ ] Todo texto tem **≥ 28 px** no palco 1920×1080; contraste ≥ 4.5:1; legível a ~8 m de distância (testar projetando ou reduzindo a janela a 50% e conferindo a leitura).
- [ ] Os blocos de código estão **corretos e sem alteração** (comparar com a seção 7); `___` realçados em âmbar.
- [ ] Impressão em PDF: 1 slide por página, tema claro, todos os passos visíveis.
- [ ] Sem `localStorage`, cookies, analytics, bibliotecas de slides, frameworks ou CDN.
- [ ] Lighthouse (desktop): **Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95**.
- [ ] Projeto < 3 MB; JS < 20 KB; CSS < 30 KB.
- [ ] Deploy na Vercel (plano gratuito) concluído e **URL pública** funcionando; link registrado no `README.md`.

---

## 10. O que NÃO fazer

- Não adicionar slides, textos, imagens, emojis decorativos ou "curiosidades" que não estejam nesta especificação.
- Não corrigir ou "melhorar" os comandos e scripts (foram testados em Bash).
- Não usar o mascote Tux, logotipos de distribuições ou imagens de terceiros.
- Não usar fontes menores que 28 px para "fazer caber": se não couber, **dividir o slide** e registrar no `README.md`.
- Não carregar nada de CDN. Não usar Google Fonts por `<link>`.
- Não colocar a solução do exercício final (S46) antes da hora: ela deve ficar **depois** do enunciado e das dicas, como especificado.
- Não criar páginas, rotas ou formulários além do `index.html`.
