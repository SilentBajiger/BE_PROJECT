import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import StudentPortal from "./StudentPortal/StudentPortal";
import Home from "./Home";
import FetchPortal from "./FetchPortal/FetchPortal";
import AdminPortal from "./AdminPortal/AdminPortal";
import { SocketProvider } from "./Context/ContextProvider";

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path={"/"} Component={Home} />
          <Route path={"/student/*"} Component={StudentPortal} />
          <Route path={"/fetch"} Component={FetchPortal} />
          <Route path={"/admin"} Component={AdminPortal} />
          <Route path={"/*"} Component={Home} />
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
