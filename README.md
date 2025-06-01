# Techlab 2025 - Desafio WebApp

Este repositório contém o código fonte para a aplicação frontend do desafio.

## Sumário

- [Techlab 2025 - Desafio WebApp](#techlab-2025---desafio-webapp)
  - [Sumário](#sumário)
    - [Introdução](#introdução)
    - [Modelagem do sistema](#modelagem-do-sistema)
      - [Rascunho no Excalidraw](#rascunho-no-excalidraw)
      - [Modelagem do banco de dados](#modelagem-do-banco-de-dados)
      - [Prototipação da UI](#prototipação-da-ui)
    - [Planejamento de desenvolvimento](#planejamento-de-desenvolvimento)
      - [Utilização do Gitflow](#utilização-do-gitflow)
    - [Ferramentas e tecnologias escolhidas](#ferramentas-e-tecnologias-escolhidas)
    - [Estrutura de pastas](#estrutura-de-pastas)
    - [Como instalar e rodar o projeto](#como-instalar-e-rodar-o-projeto)
      - [1. Clone o repositório](#1-clone-o-repositório)
      - [2. Instale as dependências](#2-instale-as-dependências)
      - [3. Rode o projeto em modo desenvolvimento](#3-rode-o-projeto-em-modo-desenvolvimento)
      - [4. Variáveis de ambiente](#4-variáveis-de-ambiente)
    - [Minhas dificuldades](#minhas-dificuldades)
    - [Meus acertos e aprendizados](#meus-acertos-e-aprendizados)
### Introdução

Seguindo os requisitos iniciais, desenvolvi um aplicativo simples, voltado para pessoas físicas que desejam um sistema para auxiliar na organização das finanças pessoais. Por ser um produto focado nesse público, utilizei uma abordagem mobile first, estratégia que garante que o design da aplicação seja pensado primeiramente para dispositivos móveis e, posteriormente, adaptado para versões de computador.
Dessa forma, o sistema conta com funcionalidades para gerenciar transações, contas bancárias e categorias de transação, proporcionando uma melhor organização das finanças.

### Modelagem do sistema

#### Rascunho no Excalidraw

Rascunho com as funcionalidades que pensei em desenvolver para o sistema, priorizados por obrigatoriedade.

<img src="/public/readme/scratch.png"/>

#### Modelagem do banco de dados

Utilizei o dbdiagram.io, um app web que utiliza linguagem DBML, para desenvolver o ERD (Entity Relational Modal) que descreve as entidades e relacionamentos do banco de dados.

Disponível aqui:
[Diagrama Entitade Relacionamento](https://dbdiagram.io/d/techLab-682a846b1227bdcb4edf97fc)

#### Prototipação da UI

Implementei a prototipação interface gráfica utilizando o Figma, app moderno e bastante utilizado atualmente para desenvolver protótipos de interface.

Disponível aqui:
[Figma](https://www.figma.com/design/nppN4BHSMrYbxBhRcZpMor/Techlab-25?node-id=3-81&t=byddCRsJjMN0mBDn-1)

### Planejamento de desenvolvimento

Utilizando o framework de desenvolvimento ágil SCRUM, apliquei os conceitos de sprints durante o desenvolvimento, dividindo as funcionalidades e requisitos a serem desenvolvidos por ordem de prioridade e utilizando a metodologia Kanban por meio do app web Trello para gerenciá-las.

#### Utilização do Gitflow

O Gitflow é uma estratégia de ramificação para projetos que utilizam Git, criada para organizar e padronizar o fluxo de trabalho durante o desenvolvimento. Ele define regras claras para criação e integração de branches, separando o desenvolvimento de novas funcionalidades, correções de bugs, preparação de releases e manutenção.

**Porque utilizar Gitflow?**
- Reduz conflitos ao separar o desenvolvimento de features, correções e releases.
- Ajuda a manter o histórico do projeto organizado e compreensível.

No projeto, utilizei o Gitflow para garantir um fluxo de trabalho mais estruturado, com branches dedicadas para desenvolvimento (`develop`), produção (`main`), novas funcionalidades (`feature/*`), correções (`hotfix/*`) e releases (`release/*`).

### Ferramentas e tecnologias escolhidas

- **Next.js**  
  Escolhi o Next.js como framework principal ao invés do Vite (e similares), principalmente pela facilidade no roteamento baseado em pastas, suporte nativo a SSR (Server Side Rendering), SSG (Static Site Generation) e funcionalidades modernas como Server Actions, que facilitam a implementação de lógica no servidor sem sair do contexto do React. Além de ter familiaridade com a ferramenta, isso torna o desenvolvimento mais produtivo e a estrutura do projeto mais organizada, 

- **React**  
  Utilizado como biblioteca base para construção da interface. O React é amplamente adotado, possui grande comunidade e permite criar componentes reutilizáveis e com ótima performance.

- **TypeScript**  
  Adotado para garantir maior segurança no código, com tipagem estática, evitando muitos erros em tempo de desenvolvimento e facilitando a manutenção do projeto.

- **Tailwind CSS**  
  Utilizado para estilização, o Tailwind permite criar interfaces modernas e responsivas de forma rápida, com classes utilitárias que evitam a repetição de código CSS.

- **Material UI (MUI)**  
  Utilizado para componentes prontos e acessíveis, acelerando o desenvolvimento e garantindo uma boa experiência visual e de usabilidade.

- **shadcn/ui**  
  Biblioteca de componentes React moderna, que oferece flexibilidade e personalização, além de integração fácil com Tailwind CSS.

- **React Hook Form**  
  Escolhido para gerenciamento de formulários, por ser leve, performático e facilitar a validação e controle dos inputs.

- **Zod**  
  Utilizado para validação de dados e schemas de formulários, garantindo que os dados estejam corretos antes de serem enviados ou processados.

Essas escolhas priorizam produtividade, agilidade no desenvolvimento, acessibilidade e uma ótima experiência para o usuário e para o desenvolvedor.

### Estrutura de pastas

```bash
  .
├── app  # páginas do sistema
│   ├── (auth)
│   │   ├── cadastro
│   │   └── login
│   ├── favicon.ico
│   ├── (general)
│   │   ├── categorias
│   │   ├── contas
│   │   ├── dashboard
│   │   ├── layout.tsx
│   │   └── transacoes
│   ├── globals.css
│   └── layout.tsx
├── components # componentes do sistema
│   ├── accounts # relacionados às contas bancárias
│   │   ├── AccountCard
│   │   ├── AccountsCarousel
│   │   ├── EditAccountDialog
│   │   └── NewAccountDialog
│   ├── auth # relacionados a autenticação
│   │   ├── GoogleLoginButton
│   │   ├── LoginForm
│   │   └── RegisterForm
│   ├── categories # reçacionados a categorias de transação
│   │   ├── CategoryCard
│   │   ├── CategoryList
│   │   ├── EditCategory
│   │   ├── IconPickerDialog
│   │   ├── NewCategory
│   │   └── TopCategories
│   ├── dashboard # relacionados ao dashboard (tela inicial)
│   │   ├── ResumeChart
│   │   └── WelcomeBalance
│   ├── mui
│   │   # componentes da lib Material
│   ├── shadcnui
│   │   # componentes da lib shadcn 
│   ├── shared # componentes reutilizados em todo o sistema
│   │   ├── ConfirmAction
│   │   ├── FormInput
│   │   ├── Header
│   │   ├── Sidebar
│   │   └── types
│   └── transactions # relacionados às transações
│       ├── EditTransactionDialog
│       ├── FilterPopover
│       ├── InputsForAccountSelection
│       ├── NewTransaction
│       ├── RecentTransactions
│       ├── SearchAndFilter
│       ├── SortPopover
│       ├── TransactionForm
│       └── TransactionsTable
├── enums # tipos enumerados
│   ├── BankAccountType.enum.ts
│   └── TransactionType.enum.ts
├── lib # funções auxiliares
│   ├── fetcher.ts # função para facilitar as requests ao backend
│   ├── session.ts # gerenciamento de sessão do usuário
│   └── utils.ts # utilizada internamente pela shadcn/ui
├── middleware.ts
└── schemas # tipos para validação de formulários
    └── newTransactionValidator.ts
```

- app/: Contém as rotas e páginas principais da aplicação, incluindo autenticação, páginas gerais (categorias, contas, - dashboard, transações), estilos globais e layouts.
- components/: Agrupa componentes reutilizáveis organizados por domínio:
- accounts/: Componentes relacionados a contas bancárias.
  - auth/: Componentes de autenticação.
  - categories/: Componentes para categorias de transações.
  - dashboard/: Componentes do dashboard, como gráficos e saldo.
  - mui/: Componentes baseados no Material UI.
  - shadcnui/: Componentes de UI (botão, card, tabela, etc.) baseados na biblioteca shadcn/ui.
  - shared/: Componentes compartilhados, como cabeçalho, sidebar e tipos.
  - transactions/: Componentes para transações, como formulários, tabelas e diálogos.
  - enums/: Define enums TypeScript, como tipos de conta bancária e tipos de transação.
- lib/: Funções utilitárias e helpers, como fetcher para requisições, sessão e utilidades gerais.
- middleware.ts: Middleware para tratamento dos cookies httpOnly e proteção de rotas.
- schemas/: Schemas de validação, por exemplo, para validação de novas transações.

### Como instalar e rodar o projeto

#### 1. Clone o repositório

No terminal, execute:

```bash
git clone https://github.com/talles-morais/techlab25-frontend.git
cd techlab25-frontend
```

#### 2. Instale as dependências

Utilize o gerenciador de pacotes de sua preferência (npm, yarn ou pnpm). Exemplo com npm:

```bash
npm install
```

#### 3. Rode o projeto em modo desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

#### 4. Variáveis de ambiente

Siga os exemplos em `.env.example` e crie um arquivo `.env` para configurar as variáveis de ambiente necessárias.

### Minhas dificuldades

Minha principal dificuldade durante minha jornada neste desafio foi equilibrar o curto tempo para desenvolver uma aplicação deste porte, com qualidade, e as tarefas pessoais e acadêmicas. Acredito que não falhei na utilização dos métodos para gerir o meu tempo, os prazos que estabeleci para eu fazer as tarefas eram suficientes, o problema foram as dificuldades técnicas em estar aprendendo novos conceitos enquanto desenvolvo e a falta de experiência para resolver tais lacunas de conhecimento com agilidade.

Partindo para dificuldades específicas deste projeto frontend:
- **Generalização de componentes para reutilização no código:** Tive dificuldade em enxergar onde pontos repetitivos do código poderiam ser componentizados e a forma com que poderiam ter sido componentizados. Acredito que isso me custou muito tempo que poderia ser utilizado desenvolvendo novas funcionalidades ao invés de refazer componentes que são parecidos. Apesar de me orgulhar de alguns componentes que desenvolvi, como o `ConfirmAction`. O `ConfirmAction` é um componente que recebe uma função (geralmente de caratér destrutivo, como a exclusão de algo) e gera um modal para que o usuário confirme sua decisão.
- **Focar muito tempo em desenvolver funcionalidades que não são tão críticas:** Acredito que, por empolgação com o rumo que o projeto estava tomando, terminei por dedicar muito tempo em funcionalidades que não seriam essenciais para o funcionamento do sistema. Como uma função para escolher o ícone das categorias de transação.

### Meus acertos e aprendizados

Gosto de participar deste tipo de desafio em que saber como gerenciar o curto espaço de tempo é um fator crucial para o sucesso. Sou forçado a aprender novos métodos que facilitem o desenvolvimento e agilizem este processo, por isso, gostaria de compartilhar alguns aprendizados que obtive durante minha jornada neste Techlab.

- **Utilização de Cookies HTTPOnly para gerenciamento de sessão do usuário:** O uso de cookies HTTPOnly impede que o lado do cliente tenha acesso ao objeto do cookie, o que torna a comunicação cliente-servidor mais segura, porém acarreta em outras dificuldades como o gerenciamento de sessão, ou seja, saber se o usuário está ou não autorizado a acessar determinada página. É aí que entram as server actions do Next.js. Server actions são funções executadas no servidor, permitindo manipular cookies HTTPOnly de forma segura, validar sessões e proteger rotas sem expor informações sensíveis ao cliente. Isso garante uma abordagem mais segura para autenticação e autorização, além de facilitar a implementação de fluxos protegidos no frontend.

- **Utilização expressiva de bibliotecas de UI:** Neste projeto, utilizei de forma intensiva tanto o Material UI (MUI) quanto o shadcn/ui, duas bibliotecas modernas e amplamente reconhecidas no ecossistema frontend. O MUI oferece uma vasta gama de componentes prontos, acessíveis e com excelente padrão visual, o que acelera o desenvolvimento e garante uma experiência consistente para o usuário. Já o shadcn/ui se destaca pela flexibilidade, facilidade de personalização e integração nativa com o Tailwind CSS, inclusive já suportando a versão 4 da biblioteca. Essa combinação permitiu criar interfaces modernas, responsivas e visualmente agradáveis de forma ágil, além de reduzir significativamente o tempo gasto com estilização manual e evitar a repetição de código. O uso dessas bibliotecas também contribuiu para a manutenção do projeto, tornando o código mais organizado, reutilizável e fácil de evoluir.