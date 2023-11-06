import { inject } from "vue";

export const loadingInjectKey = Symbol("loading");

export default function useLoading() {
  return inject<{
    startLoading: () => void;
    stopLoading: () => void;
  }>(loadingInjectKey, {
    startLoading: () => {},
    stopLoading: () => {},
  });
}
