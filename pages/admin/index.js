import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Head from "next/head";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";

import notify from "../../lib/notifier";

import withAuth from "../../lib/withAuth";
import { getPostList } from "../../lib/api/admin";

const Index = ({ posts }) => (
  <div style={{ padding: "10px 45px" }}>
    <Head>
      <title>Admin</title>
      <meta name="description" content="Settings for Admin" />
    </Head>
    <Grid container>
      <Grid item xs={12} sm={4}>
        <div>
          <h2>Posts</h2>
          <Link href="/admin/add-post">
            <Button startIcon={<Icon>add</Icon>} variant="contained">
              Add post
            </Button>
          </Link>
          <ul>
            {posts.map((b) => (
              <li key={b._id}>
                <Link
                  as={`/admin/post-detail/${b.slug}`}
                  href={`/admin/post-detail?slug=${b.slug}`}
                >
                  <a>{b.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Grid>
    </Grid>
  </div>
);

Index.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

class IndexWithData extends React.Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    try {
      const { posts } = await getPostList();

      this.setState({ posts }); // eslint-disable-line
    } catch (err) {
      notify(err);
    }
  }

  render() {
    return <Index {...this.props} {...this.state} />;
  }
}

export default withAuth(IndexWithData, { adminRequired: true });
