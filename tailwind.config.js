const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      translate: {
        center: "translate(-50%, -50%)",
      },
      // customForms: (theme) => ({
      //   scrollbar: {
      //     scrollbarWidth: "thin",
      //     scrollbarColor: `${theme("colors['9']")} ${theme(
      //       "colors['10']"
      //     )}`,
      //   },
      // }),
    },
    colors: {
      0: "var(--tw-0)",
      1: "var(--tw-1)",
      2: "var(--tw-2)",
      3: "var(--tw-3)",
      4: "var(--tw-4)",
      5: "var(--tw-5)",
      6: "var(--tw-6)",
      7: "var(--tw-7)",
      8: "var(--tw-8)",
      9: "var(--tw-9)",
      10: "var(--tw-10)",
      11: "var(--tw-11)",
      12: "var(--tw-12)",
      13: "var(--tw-13)",
      14: "var(--tw-14)",
      15: "var(--tw-15)",
      16: "var(--tw-16)",
      17: "var(--tw-17)",
      18: "var(--tw-18)",
      19: "var(--tw-19)",
      20: "var(--tw-20)",
      21: "var(--tw-21)",
      22: "var(--tw-22)",
      23: "var(--tw-23)",
      24: "var(--tw-24)",
    },
    screens: {
      xs: "375px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
