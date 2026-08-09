// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./admin/pages/Login";
// import Dashboard from "./admin/pages/Dashboard";
// import Users from "./admin/pages/Users";
// import Orders from "./admin/pages/Orders";
// import Transactions from "./admin/pages/Transactions";
// import Pricing from "./admin/pages/Pricing";
// import Support from "./admin/pages/Support";

// import AdminLayout from "./admin/layout/AdminLayout";
// import ProtectedRoute from "./admin/components/ProtectedRoute";

// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/login" element={<Login />} />

//                 <Route
//                     path="/"
//                     element={
//                         <ProtectedRoute>
//                             <AdminLayout />
//                         </ProtectedRoute>
//                     }
//                 >
//                     <Route index element={<Dashboard />} />
//                     <Route path="users" element={<Users />} />
//                     <Route path="orders" element={<Orders />} />
//                     <Route path="transactions" element={<Transactions />} />
//                     <Route path="pricing" element={<Pricing />} />
//                     <Route path="support" element={<Support />} />
//                 </Route>
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { ThemeProvider } from "./admin/context/ThemeContext";

import Layout from "./admin/layout/AdminLayout";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import Users from "./admin/pages/Users";
import Orders from "./admin/pages/Orders";
import Transactions from "./admin/pages/Transactions";
import Pricing from "./admin/pages/Pricing";


import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>

        <Routes>
          {/* Auth Pages */}
          <Route
            path="/login"
            element={<Login />}
          />


          {/* Protected Pages */}
          <Route element={<Layout />}>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/users"
              element={<Users />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

            <Route
              path="/transactions"
              element={<Transactions />}
            />

            <Route
              path="/pricing"
              element={<Pricing />}
            />

          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;