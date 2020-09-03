import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import notify from "../lib/notifier";
import { getPostList } from "../lib/api/public";
import PostCard from "./PostCard";

export default class PostGridView extends React.Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    try {
      const { posts } = await getPostList();
      this.setState({ posts });
    } catch (err) {
      notify(err);
    }
  }

  render() {
    return (
      <>
        {this.state.posts.map((p) => (
          <Grid
            key={p.slug}
            item
            md={6}
            sm={12}
            xs={12}
            style={{ textAlign: "center" }}
          >
            <PostCard data={p} />
          </Grid>
        ))}
      </>
    );
  }
}
