// Atributos necesarios por Firebase
interface Firebase {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  //appId?: string; Esto indica que el atributo es opcional. Todos son obligatorios así que nos saltará un error si eliminamos alguno
}

export default Firebase;
