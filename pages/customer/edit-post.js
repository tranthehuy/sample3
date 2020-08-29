import React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import Head from "next/head";
import Error from "next/error";

import EditPostComp from "../../components/admin/EditPost";
import { getPostDetail, editPost } from "../../lib/api/admin";
import withAuth from "../../lib/withAuth";
import notify from "../../lib/notifier";

class EditPost extends React.Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
  };

  static getInitialProps({ query }) {
    return { slug: query.slug };
  }

  state = {
    error: null,
    post: null,
  };

  async componentDidMount() {
    NProgress.start();

    const { slug } = this.props;

    try {
      const post = await getPostDetail({ slug });
      this.setState({ post }); // eslint-disable-line
      NProgress.done();
    } catch (err) {
      this.setState({ error: err.message || err.toString() }); // eslint-disable-line
      NProgress.done();
    }
  }

  editPostOnSave = async (data) => {
    const { post } = this.state;
    NProgress.start();

    try {
      const editedPost = await editPost({ ...data, id: post._id });
      notify("Saved");
      NProgress.done();
      Router.push(
        `/admin/post-detail?slug=${editedPost.slug}`,
        `/admin/post-detail/${editedPost.slug}`
      );
    } catch (err) {
      notify(err);
      NProgress.done();
    }
  };

  render() {
    const { post, error } = this.state;

    if (error) {
      notify(error);
      return <Error statusCode={500} />;
    }

    if (!post) {
      return null;
    }

    return (
      <div>
        <Head>
          <title>
            Edit
            {post.name}
          </title>
          <meta name="description" content={`Edit post: ${post.name}`} />
        </Head>
        <EditPostComp onSave={this.editPostOnSave} post={post} />
      </div>
    );
  }
}

export default withAuth(EditPost);
