import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./LinkStyles.module.css";

function Layout() {
  return (
    <div className="w-5/6 mx-auto my-1 border border-black-600 rounded shadow-lg overflow-hidden">
      <header className="flex flex-row justify-end items-center mb-10 bg-sky-500 text-white p-5">
        <nav className="prose-xl flex flex-row gap-4">
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.activeLink}` : `${styles.navLink} `
            }
            to={"/"}
          >
            Log in
          </NavLink>
          <NavLink
            to={"/signup"}
            end={true}
            className={({ isActive }) =>
              isActive ? `${styles.activeLink}` : `${styles.navLink}`
            }
          >
            Sign in
          </NavLink>
        </nav>
      </header>

      <main className="w-full">
        <Outlet />
      </main>

      <footer className="flex flex-row justify-between p-4 mt-12 border-t border-gray-300">
        <p className="prose">Created by Nurmamedova Mengli</p>
        <p className="prose">BSU 2023</p>
      </footer>
    </div>
  );
}

export default React.memo(Layout);
