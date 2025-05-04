import { ThemeProvider } from "@mui/styles";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppBar from "./components/appbar/Appbar";
import Layout from "./components/layout/Layout";
import NavBar from "./components/navBar/NavBar";
import quizzerTheme from "./theme";

function App() {
  return (
    <ThemeProvider theme={quizzerTheme}>
      <div className="app-container">
        <Router>
          <NavBar />
          <div className="app-layout-appbar">
            <AppBar />
            <Layout />
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
