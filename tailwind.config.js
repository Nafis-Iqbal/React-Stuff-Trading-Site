/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        // 🔥 Neon / Dark background favorites
        neonRed: "0 0 5px #ff1744, 0 0 10px #ff1744, 0 0 20px #ff1744, 0 0 40px #ff1744",
        neonBlue: "0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 20px #00e5ff, 0 0 40px #00e5ff",
        neonGreen: "0 0 5px #69f0ae, 0 0 10px #69f0ae, 0 0 20px #69f0ae, 0 0 40px #69f0ae",
        neonPurple: "0 0 5px #d500f9, 0 0 10px #d500f9, 0 0 20px #d500f9, 0 0 40px #d500f9",
        neonYellow: "0 0 5px #ffea00, 0 0 10px #ffea00",

        // 🌈 Mixed dual-tones
        bluePink: "0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 20px #f50057, 0 0 40px #f50057",
        purpleCyan: "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #9c27b0, 0 0 40px #9c27b0",
        orangePink: "0 0 5px #ff9100, 0 0 10px #ff9100, 0 0 20px #ff4081, 0 0 40px #ff4081",
        limeTeal: "0 0 5px #aeea00, 0 0 10px #aeea00, 0 0 20px #1de9b6, 0 0 40px #1de9b6",
        rainbow: "0 0 5px #ff1744, 0 0 10px #ff9100, 0 0 20px #ffea00, 0 0 30px #00e676, 0 0 40px #2979ff, 0 0 50px #d500f9",

        // 🌞 For bright / light backgrounds
        subtleGray: "0 0 2px rgba(0,0,0,0.3), 0 0 5px rgba(0,0,0,0.2)", // clean shadow pop
        pinkGlow: "0 0 3px #ff80ab, 0 0 6px #ff4081, 0 0 12px #f50057", // stands out on white
        violetPop: "0 0 2px #7e57c2, 0 0 6px #673ab7, 0 0 10px #311b92", // elegant for light bg
        cyanEdge: "0 0 2px #00bcd4, 0 0 6px #00acc1, 0 0 10px #00838f", // cool cyan edges
        coralSunset: "0 0 3px #ff6f61, 0 0 6px #ff8a65, 0 0 12px #ff7043", // warm pop on pale bg
      }
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {};
      for (const [key, value] of Object.entries(theme("textShadow"))) {
        newUtilities[`.text-shadow-${key}`] = { textShadow: value };
      }
      addUtilities(newUtilities, ["hover", "responsive"]);
    },
  ],
}

