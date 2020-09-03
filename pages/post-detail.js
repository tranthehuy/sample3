import React from "react";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import Error from "next/error";
import Head from "next/head";

import { getPostDetail } from "../lib/api/public";
import withAuth from "../lib/withAuth";
import notify from "../lib/notifier";
import CommentList from "../components/CommentList";

const PostDetail = ({ post, error, user }) => {
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
      <div
        style={{
          minHeight: 320,
          textAlign: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(https://source.unsplash.com/random/1080x720?nature,water,${new Date().getTime()})`,
        }}
      ></div>

      <h2>{post.name}</h2>
      <div>{post.content}</div>
      <hr />
      <p>
        <b>Feeling space</b>
      </p>
      <CommentList postId={post._id} user={user} />
    </div>
  );
};

PostDetail.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
  error: PropTypes.string,
};

PostDetail.defaultProps = {
  post: null,
  error: null,
};

class PostDetailWithData extends React.Component {
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
    return <PostDetail {...this.props} {...this.state} />;
  }
}

export default withAuth(PostDetailWithData);
