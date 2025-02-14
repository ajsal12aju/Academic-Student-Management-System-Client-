const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  // import.meta.env.VITE_APP_VERSION
  basename: '/',
  defaultPath: '/dashboard',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 8,
  env: import.meta.env.VITE_APP_ENV,
  ip: import.meta.env.VITE_APP_API_ENDPOINT,
  authIp: import.meta.env.VITE_APP_AUTH_API_ENDPOINT,
  studentUrl: import.meta.env.VITE_APP_STUDENT_URL_,
  passCode: import.meta.env.VITE_APP_PASS_CODE
};

export default config;
