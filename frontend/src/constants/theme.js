export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: { main: "#E06258" },
          background: { default: "#FFFFFF", paper: "#F7F6F3" },
        }
      : {
          // palette values for dark mode
          primary: { main: "#E06258" },
          background: { default: "#2F3437", paper: "#373C3F" },
        }),
  },
});
