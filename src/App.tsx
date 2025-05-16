import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppBar from "./components/appbar/Appbar";
import Layout from "./components/layout/Layout";
import NavBar from "./components/navBar/NavBar";
import { DisplayModeProvider } from "./components/settings/DisplayModeSwitch/globalProvider";

function App() {
  return (
    <DisplayModeProvider>
      <div className="app-container">
        <Router>
          <NavBar />
          <div className="app-layout-appbar">
            <AppBar />
            <Layout />
          </div>
        </Router>
      </div>
    </DisplayModeProvider>
  );
}

export default App;
