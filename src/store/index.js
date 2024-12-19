import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    message: '',
    loading: false,
    error: null
  }),
  actions: {
    async fetchMessage() {
      this.loading = true;
      try {
        const response = await getHello();
        this.message = response;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
}); 