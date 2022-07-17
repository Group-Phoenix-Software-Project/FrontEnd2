// react router
import { useRoutes } from "react-router-dom";
// pages
import Home from "./pages/Home";
import { ItemDetails } from "./pages/ItemDetails";
import { Dashboard } from "./pages/Dashboard";
import { CheckOut } from "./pages/checkout";
import { Categories } from "./pages/Categories";
import { CategorieDetails } from "./pages/CategorieDetails";
import { AllCustomers } from "./components/admin/AllCustomers";
import { AllEmployees } from "./components/admin/AllEmployees";
import { RegisterEmployee } from "./components/admin/RegisterEmployee";
import { UpdateEmployee } from "./components/employee/UpdateEmployee";
import { Login } from "./components/customer/Login";
import { UpdateCustomer } from "./components/customer/UpdateCustomer";
import { RegisterCustomer } from "./components/customer/RegisterCustomer";
import { ResetCusPassword } from "./components/customer/ResetCusPassword";
import { ResetEmpPassword } from "./components/employee/ResetEmpPassword";
import { CustomerRoutes } from "./CustomerRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";


export const ApplicationRouter = () => {
  let routes = useRoutes([

    {
      element: <CustomerRoutes />,
      children: [
        { path: "/checkout", element: <CheckOut /> },
        { path: "/updateCustomer/:id", element: <UpdateCustomer /> },
        { path: "/resetCusPassword/:id", element: <ResetCusPassword /> },

      ]
    },
    {
      element: <EmployeeRoutes />,
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/categories", element: <Categories /> },
        { path: "/updateEmployee/:id", element: <UpdateEmployee /> },

      ]
    },

    {
      element: <AdminRoutes />,
      children: [
        { path: "/get-all-customers", element: <AllCustomers /> },
        { path: "/get-all-employees", element: <AllEmployees /> },
        { path: "/register-employee", element: <RegisterEmployee /> },
        { path: "/updateEmployee/:id", element: <UpdateEmployee /> },
        { path: "/updateCustomer/:id", element: <UpdateCustomer /> },
        { path: "/resetCusPassword/:id", element: <ResetCusPassword /> },
        { path: "/resetEmpPassword/:id", element: <ResetEmpPassword /> },

      ]
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/item/:slug",
      element: <ItemDetails />,
    },
    // {
    //   path: "/dashboard",
    //   element: <Dashboard />,
    // },
    // {
    //   path: "/categories",
    //   element: <Categories />,
    // },
    {
      path: "/category/:slug",
      element: <CategorieDetails />,
    },
    // {
    //   path: "/checkout",
    //   element: <CheckOut />,
    // },


    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register-customer",
      element: <RegisterCustomer />,
    },

  ]);

  return routes;
};
