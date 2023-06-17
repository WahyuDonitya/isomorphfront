import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Backend from "./pages/Backend/Backend";
import Dashboard from "./pages/Backend/Dashboard";
import Movie from "./pages/Backend/Admin/Movie";
import { Heroesloader } from "./components/Heroes/HeroesForm";
import { MovieFormAction } from "./components/Movie/MovieForm";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PersistLogin from "./components/Auth/PersistLogin";
import RequireAuth from "./components/Auth/RequireAuth";
import Manager from "./pages/Backend/Manager";
import Visitor from "./pages/Backend/Visitor";
import HeroesForm from "./components/Heroes/HeroesForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route element={<Root />}>
        <Route index path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>


      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route element={<Backend />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route element={<Backend />}>
            <Route path="admin">
              <Route
                path="movie"
                element={<HeroesForm />}
                loader={Heroesloader}
                action={MovieFormAction}
              ></Route>
            </Route>
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["manager"]} />}>
          <Route element={<Backend />}>
            <Route path="manager" element={<Manager />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["visitor"]} />}>
          <Route element={<Backend />}>
            <Route path="visitor" element={<Visitor
             />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
