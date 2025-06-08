import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl'; // فرض می‌کنیم formControl برای یک FormControl استفاده می‌شود

const theme = createTheme();

const StyledFormControl = styled(FormControl)(({ theme }) => ({
 
}));

const StyledSelectedAllDiv = styled('div')({ // فرض می‌کنیم selectedAll برای یک div استفاده می‌شود
  backgroundColor: "rgba(0, 0, 0, 0.08)",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.08)"
  }
});


// سایر ثابت‌ها و MenuProps بدون تغییر باقی می‌مانند
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
};


export { theme, StyledFormControl, StyledSelectedAllDiv, MenuProps };
