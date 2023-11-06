import { customRef } from "vue";

export default function useDebouncedRef<T = any>(value: T, delay = 200) {
  let timeout: NodeJS.Timeout;

  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue: T) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}
