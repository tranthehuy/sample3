import PropTypes from "prop-types";
import Link from "next/link";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

import MenuDrop from "./MenuDrop";

import { styleToolbar, styleRaisedButton } from "../lib/SharedStyles";

const optionsMenuCustomer = [
  {
    text: "My posts",
    href: "/customer/my-posts",
    as: "/customer/my-posts",
  },
  {
    text: "Log out",
    href: "/logout",
  },
];

const optionsMenuAdmin = [
  {
    text: "Admin Panel",
    href: "/admin",
  },
  {
    text: "Log out",
    href: "/logout",
  },
];

function Header({ user, hideHeader, next }) {
  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        display: "block",
        top: hideHeader ? "-64px" : "0px",
        transition: "top 0.5s ease-in",
      }}
    >
      <Toolbar style={styleToolbar}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item sm={6} xs={1} style={{ textAlign: "left" }}>
            <a href="/">TuHocOnline.com</a>
          </Grid>
          <Grid item sm={6} xs={9} style={{ textAlign: "right" }}>
            {user ? (
              <div style={{ whiteSpace: "nowrap" }}>
                {!user.isAdmin ? (
                  <MenuDrop
                    options={optionsMenuCustomer}
                    src={user.avatarUrl}
                    alt={user.displayName}
                  />
                ) : null}
                {user.isAdmin ? (
                  <MenuDrop
                    options={optionsMenuAdmin}
                    src={user.avatarUrl}
                    alt={user.displayName}
                  />
                ) : null}
              </div>
            ) : (
              <div>
                <Link
                  href={{
                    pathname: "/public/login",
                    query: { next },
                  }}
                  as={{
                    pathname: "/login",
                    query: { next },
                  }}
                >
                  <a style={{ margin: "0px 20px 0px auto" }}>Log in</a>
                </Link>
              </div>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool,
    avatarUrl: PropTypes.string,
    isGithubConnected: PropTypes.bool,
  }),
  hideHeader: PropTypes.bool,
  next: PropTypes.string,
};

Header.defaultProps = {
  user: null,
  hideHeader: false,
  next: "",
};

export default Header;
