# Minha Galeria

Aplicativo mobile desenvolvido com Ionic e Vue para gerenciamento de uma galeria pessoal de fotos.

## Aluno

**Mario Gonçalves de Freitas Junior**

## Curso

**Informática**

## Unidade Curricular

**Codificar aplicações para dispositivos móveis**

## Sobre o projeto

O **Minha Galeria** é um aplicativo desenvolvido para dispositivos móveis utilizando **Ionic, Vue, TypeScript e Capacitor**.

O aplicativo permite que o usuário:

- Crie uma conta;
- Faça login;
- Acesse sua galeria após realizar o login;
- Adicione fotos utilizando a câmera ou a galeria do dispositivo;
- Visualize as fotos em uma grade;
- Remova fotos da galeria;
- Consulte informações sobre o aplicativo;
- Visualizar a versão do aplicativo;
- Consultar os termos de uso;
- Consultar os termos de privacidade;
- Encerrar a sessão e retornar para a tela de login.

Os dados de cadastro e autenticação dos usuários são armazenados localmente utilizando **SQLite**, através do plugin `@capacitor-community/sqlite`.

As imagens adicionadas à galeria são armazenadas em um vetor durante a utilização do aplicativo.

## Tecnologias utilizadas

- Ionic
- Vue.js
- TypeScript
- Capacitor
- SQLite
- Android
- Ionicons

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd MinhaGaleria
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Executar no navegador

```bash
ionic serve
```

### 4. Preparar o projeto para Android

Compile o projeto:

```bash
ionic build
```

Sincronize os arquivos com o Android:

```bash
npx cap sync android
```

Abra o projeto no Android Studio:

```bash
npx cap open android
```

Depois, no Android Studio, selecione um dispositivo ou emulador Android e execute o aplicativo.

## Permissões

O aplicativo utiliza o recurso de câmera e acesso às fotos do dispositivo. Ao utilizar esses recursos, o Android poderá solicitar as permissões necessárias ao usuário.

## Estrutura principal

```text
src/
├── composables/
│   └── useAuth.ts
│
├── services/
│   └── database.ts
│
├── views/
│   ├── LoginView.vue
│   ├── CadastroView.vue
│   ├── HomeView.vue
│   ├── SobreView.vue
│   └── TabsPage.vue
│
└── router/
    └── index.ts
```

## Banco de dados

O aplicativo utiliza SQLite para armazenar os usuários cadastrados.

A tabela principal é:

```sql
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    login TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
);
```

O banco é utilizado para realizar o cadastro, login, consulta, atualização e exclusão dos usuários.