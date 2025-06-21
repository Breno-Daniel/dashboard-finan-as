// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Configuração do Firebase (use suas credenciais aqui)
const firebaseConfig = {
  apiKey: "AIzaSyDZlSVAP1mHIvT85_4dMU7RVjlOO2cBoEE",
  authDomain: "dashboard-financas-f4b0c.firebaseapp.com",
  projectId: "dashboard-financas-f4b0c",
  storageBucket: "dashboard-financas-f4b0c.appspot.com", // corrigido o domínio do storage
  messagingSenderId: "474724949641",
  appId: "1:474724949641:web:40b57b97fcfefc5b773058",
  measurementId: "G-DBN54KKFC3",
};

// Inicializa o Auth e exporta para usar em outros arquivos
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
