import Detail from "pages/detail/Detail";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
// import "./aseets/style/index.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
