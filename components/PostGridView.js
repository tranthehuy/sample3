import Grid from "@material-ui/core/Grid";
import InputButton from "../components/InputButton";
import { section } from "../lib/SharedStyles";
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
        </Grid>
      </div>
    );
  }
}
