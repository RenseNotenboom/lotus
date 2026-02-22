const colors = {
  bg: {
    base: "#f6f4ef",
    elevated: "#fbf8f3",
    night: "#ece7dc"
  },
  ink: {
    strong: "#1e2430",
    default: "#2b3444",
    muted: "#59657a"
  },
  surface: {
    card: "#fff9f0",
    subtle: "#f2ebdf",
    border: "#dfd2bd"
  },
  state: {
    action: "#1f2f45",
    success: "#2f7f63",
    warning: "#b57b23",
    attention: "#a04d36"
  }
} as const;

const type = {
  family: {
    display: "Georgia",
    body: "Avenir",
    ui: "Avenir"
  },
  size: {
    hero: 34,
    h1: 28,
    h2: 22,
    body: 16,
    small: 13,
    micro: 11
  },
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700"
  }
} as const;

const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32
} as const;

const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 26,
  pill: 999
} as const;

const elevation = {
  card: {
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  }
} as const;

const motion = {
  fast: 120,
  normal: 220,
  slow: 320
} as const;

export const theme = {
  colors,
  type,
  spacing,
  radius,
  elevation,
  motion
} as const;
