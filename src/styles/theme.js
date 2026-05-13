// src/styles/theme.js

const theme = {
  colors: {
    primary: "#7D73E6",
    primaryLight: "#F1ECFF",

    secondary: "#24325C",

    background: "#FAF9FF",
    white: "#FFFFFF",

    border: "#EEE6FA",

    text: "#24325C",
    textLight: "#6B7280",

    success: "#7BD88F",
    warning: "#FFB84D",
    danger: "#FF6B6B",
  },

  radius: {
    sm: 12,
    md: 18,
    lg: 24,
    xl: 32,
  },

  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 20,
    xl: 28,
  },

  shadows: {
    card: "0 8px 24px rgba(125, 115, 230, 0.12)",
    soft: "0 4px 12px rgba(0,0,0,0.06)",
  },

  typography: {
    title: {
      fontSize: 24,
      fontWeight: 800,
      color: "#24325C",
    },

    subtitle: {
      fontSize: 18,
      fontWeight: 700,
      color: "#24325C",
    },

    body: {
      fontSize: 15,
      fontWeight: 500,
      color: "#6B7280",
    },

    small: {
      fontSize: 13,
      fontWeight: 500,
      color: "#6B7280",
    },
  },

  components: {
    card: {
      background: "#FFFFFF",
      borderRadius: 24,
      padding: 20,
      border: "1px solid #EEE6FA",
      boxShadow: "0 8px 24px rgba(125, 115, 230, 0.12)",
    },

    buttonPrimary: {
      background: "#7D73E6",
      color: "#FFFFFF",
      border: "none",
      borderRadius: 18,
      padding: "14px 18px",
      fontWeight: 800,
      fontSize: 15,
      cursor: "pointer",
    },

    buttonSecondary: {
      background: "#F1ECFF",
      color: "#7D73E6",
      border: "none",
      borderRadius: 18,
      padding: "14px 18px",
      fontWeight: 700,
      fontSize: 15,
      cursor: "pointer",
    },

    input: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: 16,
      border: "1px solid #EEE6FA",
      outline: "none",
      fontSize: 15,
      color: "#24325C",
      background: "#FFFFFF",
      boxSizing: "border-box",
    },
  },
};

export default theme;