// export default {
//   content: ["./index.html", "./src/**/*.{js,jsx}"],
//   theme: {
//     extend: {
//       colors: {
//         bg: "#0B0B0C",
//         surface: "#121214",
//         text: "#F5F5F5",
//         muted: "#A1A1AA",
//         accent: "#E24A2B",
//       },
//       fontSize: {
//         hero: ["clamp(3rem, 8vw, 6.5rem)", { lineHeight: "1" }],
//         section: ["clamp(2rem, 5vw, 3.5rem)", { lineHeight: "1.1" }],
//       },
//       letterSpacing: {
//         tight: "-0.04em",
//       },
//       borderRadius: {
//         xl: "16px",
//         "2xl": "24px",
//       },
//     },
//   },
//   plugins: [],
// };

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in",
      },
      colors: {
        bg: "#0B0B0C",
        surface: "#121214",
        text: "#F5F5F5",
        muted: "#A1A1AA",
        accent: "#E24A2B",
      },

      fontFamily: {
        body: ["Eurostile Round", "system-ui", "sans-serif"],
        heading: ["Goli", "system-ui", "sans-serif"],
      },

      fontSize: {
        hero: ["clamp(3rem, 8vw, 6.5rem)", { lineHeight: "1" }],
        section: ["clamp(2rem, 5vw, 3.5rem)", { lineHeight: "1.1" }],
      },

      letterSpacing: {
        tight: "-0.04em",
      },

      borderRadius: {
        xl: "16px",
        "2xl": "24px",
      },
    },
  },
  plugins: [],
};
