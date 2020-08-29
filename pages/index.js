import PropTypes from "prop-types";
import Head from "next/head";
import Grid from "@material-ui/core/Grid";

import Header from "../components/HomeHeader";
import Footer from "../components/HomeFooter";
import PostList from "../components/PostList";

import { styleH1 } from "../lib/SharedStyles";
import withAuth from "../lib/withAuth";

const Index = ({ user }) => (
  <div>
    <Head>
      <title>Blog Page</title>
      <meta
        name="description"
        content="Open source web app built with modern JavaScript stack: 
        React, Material UI, Next, Express, Mongoose, and MongoDB. 
        Integrated with AWS SES, Github, Google OAuth, Stripe, and MailChimp."
      />
    </Head>
    <Header user={user} />
    <div style={{ padding: "10px 8%", fontSize: "15px", minHeight: "100vh" }}>
      <Grid container direction="row" justify="space-around" align="flex-start">
        <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
          <h1 style={styleH1}>Tự học online</h1>
        </Grid>
      </Grid>
      <Grid
        spacing={1}
        container
        direction="row"
        justify="space-around"
        align="flex-start"
      >
        <PostList />
      </Grid>
    </div>
    <Footer />
  </div>
);

Index.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
};

Index.defaultProps = {
  user: null,
};

Index.getInitialProps = function getInitialProps() {
  const indexPage = true;
  return { indexPage };
};

export default withAuth(Index, { loginRequired: false });
