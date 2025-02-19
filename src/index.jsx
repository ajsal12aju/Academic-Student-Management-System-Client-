import { createRoot } from 'react-dom/client';

// third party


// project imports
import App from './App';

// google-fonts
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/700.css';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

// style + assets
import 'assets/scss/style.scss';
import reportWebVitals from 'reportWebVitals';

// import { ToastContainer } from 'react-toastify';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
import { store } from './store/index';
import { Provider } from 'react-redux';
// import { Toaster } from 'react-hot-toast';

// ==============================|| REACT DOM RENDER  ||============================== //

root.render(
  <Provider store={store}>
    <App />
    {/* <ToastContainer />
    <Toaster position="top-center" reverseOrder={false} /> */}

  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
