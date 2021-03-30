import NavBar from '../core/Header';
import Screen from '../core/Screen';
import AdminDashboard from "../admin/AdminDashboard";
import { Route, Switch,Redirect } from 'react-router';
import AddVehicle from '../admin/AddVehicle';

const routes = (
  <div>
    <NavBar />
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route exact path="/home" component={Screen} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/add-vehicle" component={AddVehicle} />
    </Switch>
  </div>
)

export default routes;
