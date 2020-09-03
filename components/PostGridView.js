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

  fetchData = async (searchQuery) => {
    try {
      const { posts } = await getPostList(searchQuery);
      this.setState({ posts });
    } catch (err) {
      notify(err);
    }
  };

  async componentDidMount() {
    this.fetchData("");
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
            <InputButton
              onClick={(searchQuery) => this.fetchData(searchQuery)}
            />
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
