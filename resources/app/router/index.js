import Vue from "vue";
import VueRouter from "vue-router";
import SideMenu from "../layouts/SideMenu";
import SimpleMenu from "../layouts/SimpleMenu";
import TopMenu from "../layouts/TopMenu";
import Dashboard from "../views/Dashboard";
import Inbox from "../views/Inbox";
import FileManager from "../views/FileManager";
import PointOfSale from "../views/PointOfSale";
import Chat from "../views/Chat";
import Post from "../views/Post";
import CrudDataList from "../views/CrudDataList";
import CrudForm from "../views/CrudForm";
import UsersLayout1 from "../views/UsersLayout1";
import UsersLayout2 from "../views/UsersLayout2";
import UsersLayout3 from "../views/UsersLayout3";
import ProfileOverview1 from "../views/ProfileOverview1";
import ProfileOverview2 from "../views/ProfileOverview2";
import ProfileOverview3 from "../views/ProfileOverview3";
import WizardLayout1 from "../views/WizardLayout1";
import WizardLayout2 from "../views/WizardLayout2";
import WizardLayout3 from "../views/WizardLayout3";
import BlogLayout1 from "../views/BlogLayout1";
import BlogLayout2 from "../views/BlogLayout2";
import BlogLayout3 from "../views/BlogLayout3";
import PricingLayout1 from "../views/PricingLayout1";
import PricingLayout2 from "../views/PricingLayout2";
import InvoiceLayout1 from "../views/InvoiceLayout1";
import InvoiceLayout2 from "../views/InvoiceLayout2";
import FaqLayout1 from "../views/FaqLayout1";
import FaqLayout2 from "../views/FaqLayout2";
import FaqLayout3 from "../views/FaqLayout3";
import Login from "../views/Login";
import Register from "../views/Register";
import ErrorPage from "../views/ErrorPage";
import UpdateProfile from "../views/UpdateProfile";
import ChangePassword from "../views/ChangePassword";
import RegularTable from "../views/RegularTable";
import Tabulator from "../views/Tabulator";
import Accordion from "../views/Accordion";
import Button from "../views/Button";
import Modal from "../views/Modal";
import Alert from "../views/Alert";
import ProgressBar from "../views/ProgressBar";
import Tooltip from "../views/Tooltip";
import Dropdown from "../views/Dropdown";
import Toast from "../views/Toast";
import Typography from "../views/Typography";
import Icon from "../views/Icon";
import LoadingIcon from "../views/LoadingIcon";
import RegularForm from "../views/RegularForm";
import Datepicker from "../views/Datepicker";
import TailSelect from "../views/TailSelect";
import FileUpload from "../views/FileUpload";
import WysiwygEditor from "../views/WysiwygEditor";
import Validation from "../views/Validation";
import Chart from "../views/Chart";
import Slider from "../views/Slider";
import ImageZoom from "../views/ImageZoom";
import Download_luncher from '../views/Download_luncher';
import LeaderBoards from '../views/LeaderBoards';
import Support from '../views/Support';
import Shop from '../views/Shop';
import Donate from '../views/Donate';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: SideMenu,
    children: [
      {
        path: "/",
        name: "side-menu-dashboard",
        component: Dashboard
      },
      {
        path: "/download_luncher",
        name: "download-luncher",
        component: Download_luncher
      },
      {
        path: "/leaderboards",
        name: "leaderboards",
        component: Tabulator
      },
      {
        path: "/support",
        name: "support",
        component: Support
      },
      {
        path: "/profile",
        name: "profile",
        component: Dashboard
      },
      {
        path: "/shop",
        name: "shop",
        component: Shop
      },
      {
        path: "/donate",
        name: "donate",
        component: Donate
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/error-page",
    name: "error-page",
    component: ErrorPage
  },
  {
    path: "/*",
    component: ErrorPage
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
