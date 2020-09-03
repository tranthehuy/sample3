import PropTypes from "prop-types";
import Head from "next/head";
import Grid from "@material-ui/core/Grid";

import Header from "../components/HomeHeader";
import Footer from "../components/HomeFooter";
import PostGridView from "../components/PostGridView";

import InputButton from "../components/InputButton";

import { section } from "../lib/SharedStyles";
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
      <div style={section}>
        <Grid
          spacing={2}
          container
          direction="row"
          justify="space-around"
          align="flex-start"
        >
          <InputButton />
        </Grid>
      </div>
      <Grid
        spacing={1}
        container
        direction="row"
        justify="space-around"
        align="flex-start"
      >
        <PostGridView />
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
