module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        purple: { 100: "#fbadff", "100_01": "#dfb6ff" },
        black: {
          900: "#000000",
          "900_5c": "#0000005c",
          "900_5e": "#0000005e",
          "900_87": "#00000087",
          "900_61": "#00000061",
          "900_a2": "#000000a2",
          "900_19": "#00000019",
        },
        light_blue: { A200: "#36daff" },
        red: {
          500: "#ff3b3c",
          "500_64": "#ff3b3f64",
          "500_63": "#ff3b3f63",
          "500_01": "#ff3b3f",
        },
        green: { 400: "#44b77b" },
        yellow: { 400: "#feff65", 500: "#ffe949" },
        deep_purple: { A100: "#af9cf3", A100_00: "#af9cf300" },
        deep_orange: { A400: "#ff3c00" },
        pink: { 100: "#ffbcc9" },
        amber: { 900: "#ff7304" },
        orange: { 300: "#f7c248", 700: "#ff7d00", A200: "#ffa645" },
        gray: {
          100: "#f3f4fa",
          500: "#999999",
          900: "#222222",
          "900_01": "#1e1e28",
        },
        indigo: { 50: "#ebedf5" },
        teal: { A100: "#9affd9", A200: "#49fff4" },
        white: { A700: "#ffffff" },
      },
      fontFamily: {
        nunito: "Nunito",
        sourcesanspro: "Source Sans Pro",
        poppins: "Poppins",
      },
      backgroundImage: {
        gradient: "linear-gradient(180deg ,#af9cf300,#af9cf3)",
      },
      boxShadow: { bs: "0px 8px  8px 0px #00000019" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
