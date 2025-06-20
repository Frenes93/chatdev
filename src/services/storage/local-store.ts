export const localStore = {
  get<T = any>(key: string, defaultValue: T | null = null): T | null {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return defaultValue;
      try {
        return JSON.parse(raw) as T;
      } catch {
        return raw as unknown as T;
      }
    } catch {
      return defaultValue;
    }
  },
  set(key: string, value: any): void {
    try {
      const toStore = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, toStore);
    } catch (err) {
      console.error(err);
    }
  }
};
export default localStore;
