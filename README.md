 Dashboard de Finanças Pessoais
Um sistema completo de controle financeiro pessoal, com autenticação de usuários, gráficos dinâmicos, exportação de dados em PDF, cadastro de transações e muito mais — desenvolvido com React + TypeScript + Firebase.



 Funcionalidades
✅ Cadastro e login de usuários (Firebase Auth)

✅ Registro de transações financeiras (entradas e saídas)

✅ Gráficos dinâmicos com Chart.js (pizza, linha, barras)

✅ Exportação das transações em PDF

✅ Dashboard individual por usuário (seguro)

✅ Armazenamento no Firebase Firestore

✅ Design responsivo e visual clean

✅ Organização por categorias

✅ Exportação segura e em tempo real

 Tecnologias utilizadas
Tecnologia	Descrição
React + Vite	Interface e renderização SPA
TypeScript	Tipagem estática para maior segurança
Firebase Auth	Autenticação de usuários
Firestore	Banco de dados em nuvem em tempo real
Chart.js	Gráficos de linha, pizza e barras
jsPDF + AutoTable	Geração de relatórios PDF

📂 Estrutura de pastas

src/
├── components/
│   ├── AuthMenu.tsx
│   ├── TransactionForm.tsx
│   ├── TransactionList.tsx
│   └── BalanceSummary.tsx
├── context/
│   ├── AuthContext.tsx
│   └── TransactionContext.tsx
├── pages/
│   ├── Login.tsx
│   └── Register.tsx
├── utils/
│   └── formatters.ts
├── styles/
│   └── global.css
└── firebase.ts


  Segurança no Firestore


rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /transactions/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}


Autor
Breno Daniel Silva Gonçalves
Desenvolvedor Front-End & UI Designer
📧 contato: bdlabscontact@gmail.com
🌐 portfólio: bd-lbs.vercel.app

