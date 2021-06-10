import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAutheticated, signout } from "./helper/coreApicall";
const currentTab = (history, path) => {
  if (history.location.path === path) {
    return { color: "#FFFFFF" };
  } else {
    return { color: "#1FAA59" };
  }
};

function Menu({ history }) {
  return (
    <div>
      <div>
        <ul className="nav nav-tabs bg-dark">
          <li className="nav-item">
            <Link style={currentTab(history, "/")} className="nav-link" to="/">
              HOME
            </Link>
          </li>

          {isAutheticated() && isAutheticated().user.role === 0 && (
            <li className="nav-item">
              <Link
                style={currentTab(history, "/user/dashboard")}
                className="nav-link"
                to="/user/dashboard"
              >
                DASHBOARD
              </Link>
            </li>
          )}

          {!isAutheticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  SIGN IN
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  SIGN UP
                </Link>
              </li>
            </Fragment>
          )}
          {isAutheticated() && (
            <li className="nav-item">
              <span
                className="nav-link text-warning"
                onClick={() => {
                  signout(() => {
                    history.push();
                  });
                }}
              >
                SIGN OUT
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default withRouter(Menu);
