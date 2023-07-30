import { ThemeProvider } from "styled-components";

let initialState = {
  // font: {
  //   main: "SF UI Display",
  // },
  color: {
    // theme colors start
    main: "#4169E1",
  },
  borderRadius: "9px",
  browser: {
    isChrome: false,
  },
};
export const ThemeConsumer = ({ children }) => {
  return <ThemeProvider theme={initialState}>{children}</ThemeProvider>;
};
