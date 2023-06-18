/**
 *
 * KNOWN BUG
 *
 *
 * https://github.com/remix-run/react-router/issues/9529
 *
 *

Expected Behavior

Routes '/' and '/test' are Protected. loader is a function that will fetch me some data and require auth token (now do console log).
I expect that ProtectedRoute logic should prevent us from rinning loader function if user are not authenticated.
Actual Behavior

Request will be sent (we will see console.log) anyway with token or without.
This makes ProtectedRoutes - BadlyProtectedRoutes as they generally do not protect us anymore. ¯_(ツ)_/¯

 *
 * Jadi kenapa loader kita jalan duluan dari pada persist login kita? jawabanya
 *
 * Fetching is decoupled from rendering in 6.4, so loaders run before any rendering logic.
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPage from "../../pages/ErrorPage";

const RequireAuth = (props) => {
  const auth = useSelector((state) => state.auth);
  const { allowedRoles } = props;
  const location = useLocation();
  let roleSesuai = false;

  if (!auth?.pengguna) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles) {
    roleSesuai = true;
  } else {
    for (const r of allowedRoles) {
      if (auth.pengguna.roles.includes(r)) {
        roleSesuai = true;
      }
    }
  }

  if (roleSesuai === true) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
    // return <ErrorPage status="404" />;
  }
};

export default RequireAuth;
