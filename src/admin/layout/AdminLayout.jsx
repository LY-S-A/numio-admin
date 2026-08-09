// // import { useState } from "react";
// // import { Outlet } from "react-router-dom";

// // import Sidebar from "../components/Sidebar";
// // import Topbar from "../components/Topbar";

// // import "../styles/layout.css";

// // const AdminLayout = () => {
// //     const [sidebarOpen, setSidebarOpen] = useState(false);

// //     return (
// //         <div className="layout">

// //             <Sidebar
// //                 sidebarOpen={sidebarOpen}
// //                 setSidebarOpen={setSidebarOpen}
// //             />

// //             <div className="layout-main">

// //                 <Topbar
// //                     setSidebarOpen={setSidebarOpen}
// //                 />

// //                 <main className="layout-content">
// //                     <Outlet />
// //                 </main>

// //             </div>

// //         </div>
// //     );
// // };

// // export default AdminLayout;

// import { useState } from "react";
// import { Outlet } from "react-router-dom";

// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// import "../styles/layout.css";

// const AdminLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="admin-layout">
//       <Sidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       <div className="admin-content">
//         <Topbar setSidebarOpen={setSidebarOpen} />

//         <main className="admin-main">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import "../styles/layout.css";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="dashboard-content">
        <Topbar setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;