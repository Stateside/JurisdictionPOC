import { extendTheme } from "@chakra-ui/react";

const defaultFontSize = '15px';
const fontFamilyTypes = ['GTAmericaStandardRegular','GTAmericaStandardBold','GTAmericaCompressedRegular','GTAmericaCompressedBold'];
const fontFamily = `${fontFamilyTypes[0]}, ${fontFamilyTypes[2]}, helvetica`;

const fonts = {
  config: {
    defaultFontSize: defaultFontSize,
    fontFamilyTypes: fontFamilyTypes,
    fontFamily: fontFamily,
  },
  body: "GTAmericaStandardRegular, sans-serif;",
  header: "GTAmericaStandardRegular, sans-serif;",
};

const breakpoints = {
  sm: "0",
  md: "640px",
  lg: "1024px",
  xl: "1200px",
};

const colors = {
  brand: {
    white: "#FFFFFF",
    grey: {
      grey01: '#FAFAFA',
      grey02: '#D3D3D3',
      grey03: '#A8A8A8',
      grey04: '#2A2A2A',
    },
    black: '#000000',
    coralRed: '#FF4850',
    lemon: '#F1F106',
    java: '#02BEB7',
    javaHover: '#02D9D1',
  },
};

const sizes = {
  sizes: {
    max: "max-content",
    min: "min-content",
    full: "100%",
    "3xs": "14rem",
    "2xs": "16rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem",
    "8xl": "90rem",
    container: {
      sm: "640px",
      md: "768px",
      lg: "1124px",
      xl: "1280px",
    },
  },
};

const components = {
  Button: {
    variants: {
      "white-link": {
        justifyContent: "left",
        padding: "5px 0",
        color: "brand.white",
        textTransform: "none",
        fontWeight: "600",
        lineHeight: "20px",
        fontSize: "16px",
        "&:hover": {
          background: "transparent",
          color: "brand.white",
        },
      },
    },
  },
};

export const theme = extendTheme({
  colors,
  breakpoints,
  components,
  fonts,
  sizes,
});


