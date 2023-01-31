import { BrowserRouter, Switch, Route } from "react-router-dom";

import SignIn from "./components/Authentication/SignIn/SignIn";

import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import KycLists from "./components/Kyc/KycLists/KycLists";
import KycDetails from "./components/Kyc/KycDetails/KycDetails";
import Error404 from "./components/404/Error404";
import AirDrop from "./components/AirDrop/index";
import AirDropList from "./components/AirDrop/airDropList";
import BountyProgram from "./components/BountyProgram/index";

import browserRoute from "./Routes/browserRoutes";
import PrivateRoute from "./components/HOC/PrivateRoute";
import AuthRoute from "./components/HOC/AuthRoute";
import IcoDistribution from "./components/IcoDistribution/IcoDistribution";
import Transactions from "./components/Transactions/Transactions";
import UserList from "./components/UserList/UserList";
import UserDetail from "./components/UserList/UserDetail/UserDetail";
import CreateToken from "./components/TokenCreation/index";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <AuthRoute exact path={browserRoute.SIGNIN} component={SignIn} />
          <PrivateRoute
            exact
            path={browserRoute.KYC_LISTS}
            component={KycLists}
          />
          <PrivateRoute
            exact
            path={browserRoute.KYC_DETAILS}
            component={KycDetails}
          />
          <PrivateRoute
            exact
            path={browserRoute.USER_LIST}
            component={UserList}
          />
          <PrivateRoute
            exact
            path={browserRoute.USER_DETAILS}
            component={UserDetail}
          />
          <PrivateRoute
            exact
            path={browserRoute.DASHBOARD}
            component={Dashboard}
          />
          <PrivateRoute
            exact
            path={browserRoute.AIR_DROP}
            component={AirDrop}
          />
          <PrivateRoute
            exact
            path={browserRoute.AIR_DROP_LIST}
            component={AirDropList}
          />
          <PrivateRoute
            exact
            path={browserRoute.BOUNTY_PROGRAM}
            component={BountyProgram}
          />

          <PrivateRoute
            exact
            path={browserRoute.ICO_DISTRIBUTION}
            component={IcoDistribution}
          />
          <PrivateRoute
            exact
            path={browserRoute.TRANSACTIONS}
            component={Transactions}
          />
          <PrivateRoute
            exact
            path={browserRoute.CREATE_TOKEN}
            component={CreateToken}
          />

          <PrivateRoute exact path={browserRoute.PROFILE} component={Profile} />

          <Route path="/" component={Error404} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
