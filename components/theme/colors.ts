const base = {
  white: '#fff',
  black: '#282a35',
};

const grey = {
  grey_1: '#f2f5f8',
  grey_2: '#f2f3f5',
  grey_3: '#dfdfe1',
  grey_4: '#cecfd3',
  grey_5: '#aeafb3',
  grey_6: '#5e6068',
  grey_highlight: '#eceff2',
};

const primary = {
  primary: '#00ddbe',
  primary_dark: '#00c4a7',
};

// dark blues
const accent = {
  accent: '#04518c',
  accent_light: '#4f85ae',
  accent_dark: '#003055',
  accent_1: '#e5edf3',
};

// light blues
const secondary = {
  secondary: '#4bc6f0',
  secondary_light: '#edf9fd',
  secondary_dark: '#109ed9',
  secondary_accessible: '#0c7cac',
  secondary_1: '#d2f1fb',
  secondary_2: '#aee5f8',
};

const accent2 = {
  accent2_dark: '#9e005d',
  accent2: '#b74a89',
  accent2_light: '#f7ecf3',
};

const accent3 = {
  accent3: '#d9de3a',
};

const error = {
  error: '#c86370',
  error_dark: '#ad404e',
};

const warning = {
  warning: '#f2d021',
  warning_dark: '#e6c104',
};

export default {
  ...base,
  ...grey,
  ...accent,
  ...accent2,
  ...accent3,
  ...primary,
  ...secondary,
  ...error,
  ...warning,
};
