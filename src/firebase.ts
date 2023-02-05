// FYI https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import IFirebase from "@/interfaces/Firebase";

// En las SPAs siempre hay un ambiente de desarrollo (dev) y otro de producción (pro), y en éste, la única persona que debería conocer las credenciales es la que lo pondrá en producción. Así que ponemos las variables de entorno en el fichero .env que no se sube al repositorio
const firebaseConfig: IFirebase = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_DOMAIN,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_BUCKET,
  messagingSenderId: process.env.VUE_APP_SENDERID,
  appId: process.env.VUE_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// export default initializeApp(firebaseConfig); o bien:
export default {
  app,
};
