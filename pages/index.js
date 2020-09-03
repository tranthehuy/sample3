import PropTypes from "prop-types";
import Head from "next/head";
import Header from "../components/HomeHeader";
import Footer from "../components/HomeFooter";
import PostGridView from "../components/PostGridView";
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
    <PostGridView />
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
