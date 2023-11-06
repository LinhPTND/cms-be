import { computed } from "vue";
import useWindowDimension from "./useWindowDimension";

export default function useIsMobile() {
  const { width } = useWindowDimension();
  const breakPoint = 1200;
  const isMobile = computed(() => width.value < breakPoint);

  return isMobile;
}
