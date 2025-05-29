import { Link, useLocation } from "react-router";
import useAuthUser from "../../hooks/useAuthUser";
import { BellIcon, HomeIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <>
      <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-5 border-b border-base-300 text-center">
          <Link to="/" className="size-9 text=primary ">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider text-center">
              Chat APP
            </span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/"
            className={`btn btm-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/" ? "btn=active" : ""
            }`}
          >
            <HomeIcon className="size-5 text-base-content opacity-70" />
            <span>Home</span>
          </Link>

          <Link
            to="/notification"
            className={`btn btm-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/" ? "btn=active" : ""
            }`}
          >
            <BellIcon className="size-5 text-base-content opacity-70" />
            <span>Notification</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-base-300 mt-auto">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={authUser?.profileImage} />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{authUser?.fullName}</p>
              <p className="text-xs text-success flex items-center gap-2">
                <span className="size-2 rounded-full bg-success inline-block"></span>
                Online
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
