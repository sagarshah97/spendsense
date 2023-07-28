import Router from "./Routes";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  axios.defaults.baseURL = "https://ti-backend-uvfq.onrender.com";
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Router />
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
}

export default App;
