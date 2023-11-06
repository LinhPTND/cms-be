import { ref, Ref, watch } from "vue";

export default function usePrevious<T>(state: Ref<T>) {
  const previous = ref<T>();

  watch(state, (_, old) => {
    previous.value = old;
  });

  return previous;
}
