import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import SignIn from './components/Authentication/SignIn/SignIn';
import SignUp from './components/Authentication/SignUp/SignUp';
import SignUpSuccess from './components/Authentication/SignUpSuccess/SignUpSuccess';
import VerifyEmail from './components/Authentication/VerifyEmail';
import ForgotPassword from './components/Authentication/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Authentication/ResetPassword/ResetPassword';

import Dashboard from './components/Dashboard/Dashboard';
import BuyToken from './components/BuyToken/BuyToken';
import Transactions from './components/Transactions/Transactions';
import Profile from './components/Profile/Profile';
import AirDrop from './components/AirDrop/AirDrop';
import BountyProgram from './components/BountyProgram/index';
import KycApplication from './components/Kyc/KycApplication/KycApplication';
import KycForm from './components/Kyc/KycForm/KycForm';
import KycThankYou from './components/Kyc/KycThankyou/KycThankyou';
import Error404 from './components/404/Error404';
import browserRoute from './Routes/browserRoutes';
import LandingPage from './components/LandingPage/LandingPage';
import IcoDistribution from './components/IcoDistribution/IcoDistribution';
import AuthRoute from './components/HOC/AuthRoute';
import PrivateRoute from './components/HOC/PrivateRoute';
import Referral from './components/IcoDistribution/Referral';

function App() {
  return (
    <div id='app'>
      <Switch>
        <AuthRoute exact path={browserRoute.SIGNIN} component={SignIn} />
        <AuthRoute exact path={browserRoute.SIGNUP} component={SignUp} />

        <Route exact path={browserRoute.LANDING_PAGE} component={LandingPage} />

        <PrivateRoute
          exact
          path={browserRoute.TRANSACTIONS}
          component={Transactions}
        />
        <PrivateRoute exact path={browserRoute.PROFILE} component={Profile} />
        <PrivateRoute path={browserRoute.REFERRALS} component={Referral} />
        <PrivateRoute
          exact
          path={browserRoute.BUY_TOKEN}
          component={BuyToken}
        />
        <PrivateRoute
          exact
          path={browserRoute.RESET_PASSWORD}
          component={ResetPassword}
        />
        <PrivateRoute
          exact
          path={browserRoute.FORGOT_PASSWORD}
          component={ForgotPassword}
        />
        <PrivateRoute
          exact
          path={browserRoute.SIGNUP_SUCCESS}
          component={SignUpSuccess}
        />
        <PrivateRoute
          exact
          path={browserRoute.BUY_TOKEN}
          component={BuyToken}
        />
        <PrivateRoute
          exact
          path={browserRoute.VERIFY_EMAIL}
          component={VerifyEmail}
        />
        <PrivateRoute
          exact
          path={browserRoute.DASHBOARD}
          component={Dashboard}
        />
        <PrivateRoute exact path={browserRoute.AIRDROP} component={AirDrop} />
        <PrivateRoute
          exact
          path={browserRoute.BOUNTY_PROGRAM}
          component={BountyProgram}
        />

        <PrivateRoute
          exact
          path={browserRoute.KYC_APPLICATION}
          component={KycApplication}
        />
        <PrivateRoute exact path={browserRoute.KYC_FORM} component={KycForm} />
        <PrivateRoute
          exact
          path={browserRoute.KYC_THANKYOU}
          component={KycThankYou}
        />

        <PrivateRoute
          exact
          path={browserRoute.ICO_DISTRIBUTION}
          component={IcoDistribution}
        />
        {/* <Route exact path={browserRoute.AIRDROP} component={AirDrop} /> */}
        <Route path='/*' component={Error404} />
      </Switch>
    </div>
  );
}

export default App;
