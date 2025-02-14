import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

const App = () => {
  const customization = useSelector((state) => state.customization);
  const [toastMargin, setToastMargin] = useState(10); // Default margin for larger screens

  useEffect(() => {
    const updateToastMargin = () => {
      const newMargin = window.innerWidth < 768 ? 60 : 10;
      console.log("📢 Updated Toast Margin:", newMargin); // Debugging log
      setToastMargin(newMargin);
    };

    updateToastMargin(); // Set initial value based on current screen width
    window.addEventListener('resize', updateToastMargin);

    return () => {
      window.removeEventListener('resize', updateToastMargin);
    };
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ToastContainer position="top-right" style={{ marginTop: toastMargin }} />
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <RouterProvider router={router} />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
