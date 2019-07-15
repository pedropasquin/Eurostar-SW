import React from 'react';
import { Link, NavLink } from "react-router-dom";

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
          <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                    <NavLink
                        to="/contestants"
                        className="nav-link"
                        activeClassName="active"
                    >
                    Concursantes
                    </NavLink>
              </li>
              <li className="nav-item">
                  <NavLink
                        to="/new-contestants"
                        className="nav-link"
                        activeClassName="active"
                        >
                      Añadir Concursante
                  </NavLink>

              </li>
          </ul>
      </div>
  </nav>
);

export default Header;
