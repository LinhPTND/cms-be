import { onMounted, onUnmounted, Ref } from "vue";

export default function useOnClickOutside(
  ref: Ref<HTMLElement>,
  callback: (event: MouseEvent) => void
) {
  function handleClickOutside(event: MouseEvent) {
    if (ref.value && !ref.value.contains(event.target as any)) {
      callback(event);
    }
  }

  onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });
}
