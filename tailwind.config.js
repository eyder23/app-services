const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        btn: `px-4 py-1 rounded-full bg-red-500 text-white`,
        "resize-repeat": {
          resizeMode: `repeat`,
        },
      });
    }),
  ],
};
