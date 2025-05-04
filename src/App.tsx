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
      <div
        style={
          {
            width: "100%",
            height: "100%",
            display: "flex",
            "--primary-main": quizzerTheme.palette.primary.main,
            "--primary-light": quizzerTheme.palette.primary.light,
            "--primary-contrastText": quizzerTheme.palette.primary.contrastText,
          } as React.CSSProperties
        }
      >
        <Router>
          <NavBar />
          <div
            style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <AppBar />
            <Layout />
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
