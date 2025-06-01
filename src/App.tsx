import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppBar from "./components/appbar/Appbar";
import Layout from "./components/layout/Layout";
import NavBar from "./components/navBar/NavBar";
import { DisplayModeProvider } from "./components/settings/DisplayModeSwitch/globalProvider";
import { Toaster } from "sonner";
import { RecoilRoot } from "recoil";
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <DisplayModeProvider>
        <div className="app-container">
          <RecoilRoot>
            <Toaster richColors />
            <Router>
              <NavBar />
              <div className="app-layout-appbar">
                <AppBar />
                <Layout />
              </div>
            </Router>
          </RecoilRoot>
        </div>
      </DisplayModeProvider>
    </Provider>
  );
}

export default App;
