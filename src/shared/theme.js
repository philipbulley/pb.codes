const theme = {
  font: {
    family: `Avenir Next, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    weightNormal: 'normal',
    weightDemiBold: 600,
    weightBold: 700,
  },
  color: {
    black: '#000',
    one: '#000022',
    two: '#666677',
    three: '#9999AA',
    white: '#fff',
    blue: '#2850AD',
    yellow: '#FCCC0A',
    red: '#EE352E',
  },
};
theme.color.accent = theme.color.black;

export const themeBlueAccent = {
  ...theme,
  color: { ...theme.color, accent: theme.color.blue },
};
export const themeYellowAccent = {
  ...theme,
  color: { ...theme.color, accent: theme.color.yellow },
};
export const themeRedAccent = {
  ...theme,
  color: { ...theme.color, accent: theme.color.red },
};
export default theme;
