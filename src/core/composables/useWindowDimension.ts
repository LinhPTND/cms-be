import useOnWindowEvent from "@/core/composables/useOnWindowEvent";
import { ref } from "vue";

export default function useWindowDimension() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  const getDimension = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  useOnWindowEvent("resize", getDimension);

  return { width, height };
}
