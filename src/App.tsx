import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import quizzerTheme from "./theme";
import NavBar from "./components/navBar/NavBar";
import { UserProvider } from "./components/user/globalProvider";

function App() {
  return (
    <ThemeProvider theme={quizzerTheme}>
      <div className="app-container">
        <UserProvider>
          <Router>
            <NavBar />
            <Layout />
          </Router>
        </UserProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
