import Router from "./Routes";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:8080";
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
