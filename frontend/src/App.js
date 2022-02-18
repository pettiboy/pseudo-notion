import { useEffect, useState, useMemo } from "react";
import { CircularProgress, ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./config/firebase";
import routes from "./config/routes";
import Center from "./components/utils/Center";
import AuthChecker from "./components/auth/AuthChecker";
import { createTheme } from "@mui/material/styles";
import { getDesignTokens } from "./constants/theme";
import ColorModeContext from "./context/ColorModeContext";

function App() {
  const [loading, setLoading] = useState(true);

  const [mode, setMode] = useState(
    localStorage.getItem("themePreference") || "light"
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          if (prevMode === "dark") {
            localStorage.setItem("themePreference", "light");
            return "light";
          } else {
            localStorage.setItem("themePreference", "dark");
            return "dark";
          }
        });
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          localStorage.setItem("Token", idToken);
        });
        console.info("User detected.");
      } else {
        console.info("No user detected");
      }
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Center>
          <CircularProgress />
        </Center>
      </ThemeProvider>
    );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.protected ? (
                    <AuthChecker>
                      <route.component />
                    </AuthChecker>
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
