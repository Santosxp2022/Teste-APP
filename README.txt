# Quiz Coin — Mini Game (PWA)

## Rodar localmente (teste rápido)
- Abra `index.html` com duplo clique.
- Observação: o modo “instalar” (PWA) e o offline via Service Worker funcionam melhor quando hospedado em HTTPS.

## Publicar como link (GitHub Pages)
1) Crie um repositório no GitHub (ex.: `quiz-coin`).
2) Envie estes arquivos/pastas para o repositório:
   - `index.html`
   - `manifest.json`
   - `service-worker.js`
   - pasta `icons/`
   - `README.txt`
3) No repositório: Settings → Pages → Deploy from a branch → Branch `main` → /(root) → Save.
4) Copie o link gerado em Settings → Pages.

## Instalar no celular (após publicar)
- Android (Chrome): menu ⋮ → “Instalar app” / “Adicionar à tela inicial”.
- iPhone (Safari): compartilhar → “Adicionar à Tela de Início”.

## Editar perguntas
- Abra `index.html` e procure por `QUESTION_BANK`.


## Modo entrevista (sem certo/errado)
- Todas as respostas são registradas.
- Use **Exportar CSV/JSON** para baixar as respostas.


## Configuração do questionário (ANEXO A)
- As perguntas estão em `index.html`, no bloco `QUESTIONNAIRE`.
- Você pode reduzir opções (ter menos alternativas) editando o array `options`.
- Tipos: `single`, `multi` (com `maxSelect`), `text`.
- Condicionais usam `showIf`.


## Cadastro rápido
- Antes de iniciar, o aluno preenche: **Nome**, **Curso** (lista fixa) e **Matrícula** (obrigatória; letras e números).
- Esses campos vão junto no **CSV/JSON** exportado.
