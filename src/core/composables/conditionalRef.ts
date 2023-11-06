import { customRef } from "vue";

export default function conditionalRef<T = any>(
  value: T,
  conditionalFn: (newValue: T, oldValue?: T) => boolean
) {
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue: T) {
        if (conditionalFn(newValue, value)) {
          value = newValue;
        }
        trigger();
      },
    };
  });
}
