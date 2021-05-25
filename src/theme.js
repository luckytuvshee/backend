import { createMuiTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    // primary: {
    //   main: "#019AE8",
    //   dark: "#29394D",
    // },
    background: {
      paper: "#29394D",
      default: "#29394D",
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiTabs: {
      indicator: {
        backgroundColor: pink[700],
      },
    },
  },
  palette: {
    primary: {
      main: "#FFD4CC",
    },
    secondary: {
      // main: '#F6A5C0',
      main: "#FFAC9B",
      // dark: '#F48FB1',
      dark: "#FF827B",
      light: "#F5B8CC",
    },
  },
});

export default theme;
