import React from "react";
import Head from "next/head";
import notify from "../../lib/notifier";

import withAuth from "../../lib/withAuth";
import PostTable from "../../components/PostTable";
import { getPostList } from "../../lib/api/admin";

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
    return (
      <div style={{ padding: "10px 45px" }}>
        <Head>
          <title>Customer</title>
          <meta name="description" content="Settings for Customer" />
        </Head>
        <PostTable {...this.props} {...this.state} />
      </div>
    );
  }
}

export default withAuth(IndexWithData, {});
