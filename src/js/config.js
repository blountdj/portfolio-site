
/* Dev */
export const CONFIG_DEV = {
  barbaDebug: true,
  path: './',
  jsFolder: '',
  jsPostFix: '',
  cssFolder: 'src/',
  jsURLFolder: 'src/js/',
  cssPath: 'https://192.168.1.131:5500/',
  cssPostFix: ''
};

/* Prod */
export const CONFIG_PROD = {
  barbaDebug: false,
  path: 'https://cdn.jsdelivr.net/gh/blountdj/portfolio-site@v22/',
  jsFolder: 'src/js/',
  jsURLFolder: 'src/js/',
  // jsFolder: 'dist/js/',
  // jsURLFolder: 'dist/js/',
  // jsPostFix: '.min',
  jsPostFix: '',
  cssFolder: 'dist/',
  cssPath: 'https://cdn.jsdelivr.net/gh/blountdj/portfolio-site@v22/',
  cssPostFix: '.min'
};
