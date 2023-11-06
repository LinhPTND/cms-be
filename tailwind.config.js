// eslint-disable-next-line no-undef
module.exports = {
  important: true,
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "460px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1600px",
    },
    extend: {
      colors: {
        primary: "#0090c6",
        border: "rgba(225,227,229, 1)",
        selected: "#EDEEEF",
        hover: "#F1F2F3",
        blue2c: "#2C6ECB",
      },
    },
  },
  plugins: [],
};
