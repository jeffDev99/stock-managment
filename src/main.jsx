import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import theme from "./Themes/theme.js";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import "./index.css";

// ساخت cache برای RTL
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  </StrictMode>
);
