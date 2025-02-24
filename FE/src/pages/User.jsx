// components/layout/UserLayout.jsx
import { NavLink, Outlet } from "react-router-dom";

const User = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="w-full min-h-[80vh] md:w-64 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <nav>
          <ul className="space-y-2">
            <NavLink
              to="/user/profile"
              className="flex flex-col items-center gap-1"
            >
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-500 hidden" />
              <p>Profile</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-500 hidden" />
            </NavLink>
            <NavLink
              to="/user/addresses"
              className="flex flex-col items-center gap-1"
            >
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-500 hidden" />
              <p>Addresses</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-500 hidden" />
            </NavLink>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default User;
