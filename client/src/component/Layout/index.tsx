import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export default function index({ children, showSidebar = false }: LayoutProps) {
  return (
    <>
      <div className="flex h-screen">
        <div className="Sidebar">{showSidebar && <Sidebar />}</div>
        <div className="flex flex-1 flex-col ">
          <Navbar />
          <main className=" overflow-y-auto">{children}</main>
        </div>
      </div>
    </>
  );
}
