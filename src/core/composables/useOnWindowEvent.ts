import { onBeforeUnmount } from "vue";

export default function useOnWindowEvent<
  K extends keyof WindowEventMap = keyof WindowEventMap
>(event: K, listener: (this: Window, ev: WindowEventMap[K]) => any) {
  window.addEventListener(event, listener);

  onBeforeUnmount(() => {
    window.removeEventListener(event, listener);
  });
}
