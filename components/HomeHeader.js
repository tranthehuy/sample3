import PropTypes from "prop-types";
import Link from "next/link";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import MenuDrop from "./MenuDrop";

import { styleToolbar } from "../lib/SharedStyles";

const optionsMenuCustomer = [
  {
    text: "My posts",
    href: "/customer",
    as: "/customer",
  },
  {
    text: "Log out",
    href: "/logout",
  },
];

const optionsMenuAdmin = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Log out",
    href: "/logout",
  },
];

function Header({ user }) {
  return (
    <div>
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
                  <div>
                    <MenuDrop
                      options={optionsMenuCustomer}
                      src={user.avatarUrl}
                      alt={user.displayName}
                    />
                  </div>
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
                <Link href="/public/login" as="/login">
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
};

Header.defaultProps = {
  user: null,
};

export default Header;
