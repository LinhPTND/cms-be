import { onMounted, onUnmounted, ref } from "vue";

export default function useNetworkStatus(callback: (status: boolean) => {}) {
  const status = ref(false);
  const updateOnlineStatus = () => {
    callback(navigator.onLine);
    status.value = navigator.onLine;
  };

  onMounted(() => {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
  });

  onUnmounted(() => {
    window.removeEventListener("online", updateOnlineStatus);
    window.removeEventListener("offline", updateOnlineStatus);
  });

  return status;
}
