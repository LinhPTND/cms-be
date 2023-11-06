const Assets = {
  Images: {
    get Logo() {
      return new URL("./images/logo.webp", import.meta.url).href;
    },
    get Avatar() {
      return {
        boy: new URL("./avatar/boy.webp", import.meta.url).href,
        girl: new URL("./avatar/girl.webp", import.meta.url).href,
      };
    },
  },
  Icons: {
    get Loading() {
      return new URL("./images/loading.svg", import.meta.url).href;
    },
  },
};

export default Assets;
