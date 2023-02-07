import { App } from "vue";

export default {
  install(app: App) {
    const Storage = {
      get(key: string): any {
        if (window.localStorage) {
          const sKey = window.localStorage.getItem(
            `${process.env.VUE_APP_SITENAME}_${key}`
          );
          return sKey;
        }
        console.log("Tu navegador no soporta el Local Storage");
        return null;
      },
      set(key: string, value: any): void {
        if (window.localStorage) {
          window.localStorage.setItem(
            `${process.env.VUE_APP_SITENAME}_${key}`,
            JSON.stringify(value)
          );
        } else {
          console.warn("Tu navegador no soporta el Local Storage");
        }
      },
      delete(): void {
        if (window.localStorage) {
          window.localStorage.clear();
        } else {
          console.warn("Tu navegador no soporta el Local Storage");
        }
      },
    };
    const {
      config: { globalProperties },
    } = app;
    globalProperties.$storage = Storage;
    // Vue 2
    app.provide("Storage", Storage);
    // Vue 3
  },
};
