import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: `"Vazirmatn", "sans-serif"`,
  },
  direction: "rtl",
  palette: {
    primary: {
      main: "#ce9e48", // رنگ اصلی
    },
    secondary: {
      main: "#54595f", // رنگ ثانویه
    },
    // می‌توانید رنگ‌های دیگر را نیز اضافه کنید
    customColor: {
      main: "#ff5722", // رنگ سفارشی
    },
  },
});

export default theme;
