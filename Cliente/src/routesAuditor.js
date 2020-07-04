/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
/*eslint-disable*/
import Dashboard from "@material-ui/icons/Dashboard";
import Events from "@material-ui/icons/EventSeatOutlined"
import Person from "@material-ui/icons/Person"

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Eventos from 'views/Eventos/Eventos'
import Nominados from 'views/Nominados/Nominados'



const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/auditor"
  },

  {
    path: "/eventos",
    name: "Eventos",
    rtlName: "لوحة القيادة",
    icon: Events,
    component: Eventos,
    layout: "/auditor"
  }
 
  
];

export default dashboardRoutes;
