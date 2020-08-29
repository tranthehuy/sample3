import React from "react";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import Error from "next/error";
import Head from "next/head";
import Link from "next/link";
import Button from "@material-ui/core/Button";

import { getPostDetail } from "../../lib/api/admin";
import withAuth from "../../lib/withAuth";
import notify from "../../lib/notifier";

const MyPost = ({ post, error }) => {
  if (error) {
    notify(error);
    return <Error statusCode={500} />;
  }

  if (!post) {
    return null;
  }

  const { chapters = [] } = post;

  return (
    <div style={{ padding: "10px 45px" }}>
      <Head>
        <title>{post.name}</title>
        <meta name="description" content={`Details for post: ${post.name}`} />
      </Head>
      <h2>{post.name}</h2>
      <div>{post.content}</div>
      <Link
        as={`/admin/edit-post/${post.slug}`}
        href={`/admin/edit-post?slug=${post.slug}`}
      >
        <Button variant="contained" style={{ marginLeft: "20px" }}>
          Edit post
        </Button>
      </Link>
    </div>
  );
};

MyPost.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
  error: PropTypes.string,
};

MyPost.defaultProps = {
  post: null,
  error: null,
};

class MyPostWithData extends React.Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
  };

  static getInitialProps({ query }) {
    return { slug: query.slug };
  }

  state = {
    loading: true,
    error: null,
    post: null,
  };

  async componentDidMount() {
    NProgress.start();
    try {
      const { slug } = this.props;
      const post = await getPostDetail({ slug });
      this.setState({ post, loading: false }); // eslint-disable-line
      NProgress.done();
    } catch (err) {
      this.setState({ loading: false, error: err.message || err.toString() }); // eslint-disable-line
      NProgress.done();
    }
  }

  render() {
    return <MyPost {...this.props} {...this.state} />;
  }
}

export default withAuth(MyPostWithData);
