# 🚗 Painel de Gestão Ford — Atualizações

Este documento descreve as alterações feitas em cima do projeto original (`painel-ford`), referentes à **Ação 2** do desafio: estruturação da página **Home** (boas-vindas) e da página **Dashboard** (indicadores e telemetria).

## ✅ O que foi implementado

### 1. Página Home (`/home`) — tela de boas-vindas pós-login
- Navbar com link **Dashboard** e botão **Sair**
- Cartão de boas-vindas: *"SISTEMA DE GESTÃO FORD — Seja bem-vindo(a), {usuário}!"*
- Imagem de fundo do veículo (Ranger) ao lado do cartão
- Botão **Acessar Dashboard**, que navega para `/dashboard`

**Arquivos alterados:**
`src/app/pages/home/home.ts`, `home.html`, `home.scss`

### 2. Página Dashboard (`/dashboard`) — indicadores e telemetria
- Painel lateral **Veículo**: campo de busca + lista (Ranger, Mustang, Territory, Bronco Sport), consumindo `GET http://localhost:3001/vehicles`
- Três cartões dinâmicos, que mudam conforme o veículo selecionado:
  - **Total de Vendas**
  - **Conectados**
  - **Update Software**
- Imagem central do modelo selecionado, com badge do nome
- Tabela **Telemetria por código do veículo**, com campo de busca por VIN, consumindo `POST http://localhost:3001/vehicleData`
  - Colunas: Código-VIN, Odômetro, Nível de Combustível, Status, Lat., Long.
  - VIN de exemplo: `2FRHDUYS2Y63NHD22454`

**Arquivos alterados:**
`src/app/pages/dashboard/dashboard.ts`, `dashboard.html`, `dashboard.scss`

### 3. Paleta de cores centralizada
Todas as cores do sistema (login, home e dashboard) agora vêm de **variáveis CSS únicas**, definidas em:

```
src/styles.scss
```

Para trocar a cor principal do sistema (azul Ford) ou qualquer outra cor, edite apenas o bloco `:root { ... }` desse arquivo — não é necessário mexer em nenhuma outra tela:

```scss
:root {
  --ford-blue: #0a3d78;        // cor principal
  --ford-blue-light: #1c5aa8;  // usada em gradientes/hover
  --ford-blue-dark: #06264d;   // usada em hover/gradiente escuro
  --ford-bg: #eef1f6;          // fundo das páginas
  --ford-surface: #ffffff;     // fundo dos cartões
  --ford-success: #1e9e5a;     // badge "Ligado"
  --ford-danger: #d64545;      // badge "Desligado"
}
```

Além disso, a navbar, os cartões e a imagem central agora usam gradientes e sombras suaves (`--ford-shadow-sm` / `--ford-shadow-md`) para um visual mais natural, no lugar de cores e sombras totalmente planas.

### 4. Correção de configuração
- `tsconfig.app.json`: adicionado `"rootDir": "./src"` para eliminar o aviso *"The common source directory of 'tsconfig.app.json' is './src'..."* no VS Code.

## 🛠️ Como rodar localmente

**Terminal 1 — API:**
```bash
cd Api-Sprint7-main/Api-Sprint7-main
npm install express cors   # apenas na primeira vez
node api.js
```

**Terminal 2 — Front-end Angular:**
```bash
cd painel-ford
npm install                # apenas na primeira vez
npx ng serve
```

Acesse `http://localhost:4200/login` (usuário `admin`, senha `123456`).

## 📁 Estrutura de páginas

```
/login       -> Autenticação
/home        -> Boas-vindas + acesso ao Dashboard
/dashboard   -> Indicadores por veículo + telemetria por VIN
```

---
*Atualização realizada com apoio do Claude (Anthropic) sobre o projeto original de Luiz Gabriel Silva Brito Santos.*
