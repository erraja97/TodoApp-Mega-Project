import React from "react";
import Container from "../container/container";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "../Button/LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  //nav menuItems
  const menuItems = [
    { name: "Home", slug: "/", active: true },
    {
      name: "Instruction",
      slug: "/instruction",
      active: true,
    },
    { name: "About", slug: "/about", active: true },
  ];

  const menuItemsAuth = [
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
  ];

  return (
    <header className="py-3 shadow bg-green-400 sticky top-0 z-999">
      <Container>
        <nav className="flex justify-between py-3 px-3">
          <div className="basis-1/4">Logo</div>
          <div className="basis-1/2">
            <ul className="flex">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `ml-5 px-2 py-2 text-lg hover:bg-red-400 ${
                        isActive ? "text-black font-bold" : "text-red-100"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="basis-1/4 justify-end flex">
            <ul className="flex">
              {menuItemsAuth.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `ml-5 px-2 py-2 text-lg hover:bg-red-400 ${
                          isActive ? "text-red-600 font-bold" : "text-black"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
              {authStatus && (<li>
                <LogoutBtn/>
              </li>)}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
