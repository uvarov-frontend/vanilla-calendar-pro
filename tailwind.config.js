/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./demo/**/*.{html,css}', './src/**/*.{js,ts}'],
  theme: {
    extend: {
      screens: {
        surehover: { raw: '(hover: hover) and (pointer: fine)' },
      },
      backgroundImage: {
        'light-arrow':
          'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZmlsbD0nIzBmMTcyYScgZD0nTTEyIDE2Yy0uMyAwLS41LS4xLS43LS4zbC02LTZjLS40LS40LS40LTEgMC0xLjRzMS0uNCAxLjQgMGw1LjMgNS4zIDUuMy01LjNjLjQtLjQgMS0uNCAxLjQgMHMuNCAxIDAgMS40bC02IDZjLS4yLjItLjQuMy0uNy4zeicvPjwvc3ZnPg==")',
        'dark-arrow':
          'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHBhdGggZmlsbD0nI2ZmZicgZD0nTTEyIDE2Yy0uMyAwLS41LS4xLS43LS4zbC02LTZjLS40LS40LS40LTEgMC0xLjRzMS0uNCAxLjQgMGw1LjMgNS4zIDUuMy01LjNjLjQtLjQgMS0uNCAxLjQgMHMuNCAxIDAgMS40bC02IDZjLS4yLjItLjQuMy0uNy4zeicvPjwvc3ZnPg==")',
        'light-arrow-fast':
          'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA0OCA0OCc+CiAgICA8cGF0aCBmaWxsPScjMGYxNzJhJyBkPSdNMjQgMTZjLS42IDAtMS0uMi0xLjQtLjZsLTEyLTEyYy0uOC0uOC0uOC0yIDAtMi44czItLjggMi44IDBMMjQgMTIuOCAzNi42IDIuNmMuOC0uOCAyLS44IDIuOCAwcy44IDIgMCAyLjhsLTEyIDEyYy0uNC40LS44LjYtMS40LjZ6Jy8+CiAgICA8cGF0aCBmaWxsPScjMGYxNzJhJyBkPSdNMjQgMjhjLS42IDAtMS0uMi0xLjQtLjZsLTEyLTEyYy0uOC0uOC0uOC0yIDAtMi44czItLjggMi44IDBMMjQgMjQuOCAzNi42IDE0LjZjLjgtLjggMi0uOCAyLjggMHMuOCAyIDAgMi44bC0xMiAxMmMtLjQuNC0uOC42LTEuNC42eicvPgo8L3N2Zz4K")',
        'dark-arrow-fast':
          'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA0OCA0OCc+CiAgICA8cGF0aCBmaWxsPScjZmZmJyBkPSdNMjQgMTZjLS42IDAtMS0uMi0xLjQtLjZsLTEyLTEyYy0uOC0uOC0uOC0yIDAtMi44czItLjggMi44IDBMMjQgMTIuOCAzNi42IDIuNmMuOC0uOCAyLS44IDIuOCAwcy44IDIgMCAyLjhsLTEyIDEyYy0uNC40LS44LjYtMS40LjZ6Jy8+CiAgICA8cGF0aCBmaWxsPScjZmZmJyBkPSdNMjQgMjhjLS42IDAtMS0uMi0xLjQtLjZsLTEyLTEyYy0uOC0uOC0uOC0yIDAtMi44czItLjggMi44IDBMMjQgMjQuOCAzNi42IDE0LjZjLjgtLjggMi0uOCAyLjggMHMuOCAyIDAgMi44bC0xMiAxMmMtLjQuNC0uOC42LTEuNC42eicvPgo8L3N2Zz4K")',
        'light-mode': 'linear-gradient(145deg, rgb(6 182 212 / 4%) 12%, rgb(6 182 212 / 10%) 42%, rgb(6 182 212 / 5%) 60%, rgb(6 182 212 / 18%) 85%)',
        'dark-mode': 'linear-gradient(145deg, rgb(6 182 212 / 0%) 12%, rgb(6 182 212 / 3%) 42%, rgb(6 182 212 / 10%) 60%, rgb(6 182 212 / 4%) 85%)',
      },
    },
  },
  corePlugins: {
    borderOpacity: false,
    textOpacity: false,
  },
};
