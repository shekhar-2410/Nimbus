import { ThemeProvider } from "./components/context/theme-provider";
import Layout from "./components/layout/Layout";
import Cities from "./components/pages/Cities";
import WeatherDashboard from "./components/pages/Weather-Dashboard";

import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Layout>
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="/city/:cityname" element={<Cities />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
