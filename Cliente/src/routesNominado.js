
// @material-ui/icons
//import Dashboard from "@material-ui/icons/Dashboard";
import Eventos from "@material-ui/icons/EventSeatOutlined"
//import Person from "@material-ui/icons/Person"

// core components/views for Admin layout
//import DashboardPage from "views/Dashboard/Dashboard.js";
import Events from 'views/Events/Events'




const dashboardRoutes = [
 
  {
    path: "/events",
    name: "Eventos",
    rtlName: "لوحة القيادة",
    icon: Eventos,
    component: Events,
    layout: "/nominado"
  }
 
  
];

export default dashboardRoutes;
