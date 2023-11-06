import { debounce, DebounceSettings } from "lodash";
import { onUnmounted } from "vue";

type Fn = (...args: any) => any;

export default function useDebounceFn<T extends Fn>(
  fn: T,
  options?: DebounceSettings & { wait: number }
) {
  const wait = options?.wait ?? 1000;

  const debounced = debounce<T>(
    ((...args: any[]) => {
      return fn(...args);
    }) as T,
    wait,
    options
  );

  onUnmounted(() => {
    debounced.cancel();
  });

  return {
    run: debounced as unknown as T,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}
