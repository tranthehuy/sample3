import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

import { styleToolbar } from "../lib/SharedStyles";

function Footer() {
  return (
    <div>
      <Toolbar style={styleToolbar}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <span>{`© ${new Date().getFullYear()} Blog Page`}</span>
        </Grid>
      </Toolbar>
    </div>
  );
}

export default Footer;
