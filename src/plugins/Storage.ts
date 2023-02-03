import { App } from 'vue';

export default {
  install: (app: App) => {
    const Storage = {
      get(key: string): any {
        if (window.localStorage) {
          const sKey = window.localStorage.getItem(`${process.env.VUE_APP_SITENAME}_${key}`);
          return sKey;
        } else {
          console.log('tu navegador no soporta Local Storage');
          return null;
        }
      },
      set(key: string, value: any): void {
        if (window.localStorage) {
          window.localStorage.setItem(`${process.env.VUE_APP_SITENAME}_${key}`, JSON.stringify(value));
        } else {
          console.warn('Tu navegador no soporta Local Storage');
        }
      },
      delete(key: string): void {
        if (window.localStorage) {
          window.localStorage.removeItem(`${process.env.VUE_APP_SITENAME}_${key}`);
        } else {
          console.warn('Tu navegador no soporta Local Storage');
        }
      }
    };
    const { config: { globalProperties } } = app;
    globalProperties.$storage = Storage;
    // Vue 2

    app.provide('Storage', Storage);
    // Vue 3
  },
};