import React from "react";
import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";

import withAuth from "../../lib/withAuth";
import EditPost from "../../components/admin/EditPost";
import { addPost } from "../../lib/api/admin";
import notify from "../../lib/notifier";

class AddPost extends React.Component {
  addPostOnSave = async (data) => {
    NProgress.start();

    try {
      const book = await addPost(data);
      notify("Saved");
      try {
        const bookId = book._id;
        // await syncAllChapters({ bookId });
        notify("Synced");
        NProgress.done();
        Router.push(
          `/post-detail?slug=${book.slug}`,
          `/post-detail/${book.slug}`
        );
      } catch (err) {
        notify(err);
        NProgress.done();
      }
    } catch (err) {
      notify(err);
      NProgress.done();
    }
  };

  render() {
    return (
      <div style={{ padding: "10px 45px" }}>
        <Head>
          <title>Add Post</title>
          <meta name="description" content="Add new post" />
        </Head>
        <EditPost onSave={this.addPostOnSave} />
      </div>
    );
  }
}

export default withAuth(AddPost);
