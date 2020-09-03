import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import InputButton from "../components/InputButton";
import { section } from "../lib/SharedStyles";
import notify from "../lib/notifier";
import { getPostList } from "../lib/api/public";
import PostCard from "./PostCard";

export default class PostGridView extends React.Component {
  state = {
    posts: [],
    pageIndex: 0,
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
    const pageLength = 5;
    const itemCount = (this.state.posts && this.state.posts.length - 0) || 0;
    const pageCount = parseInt(itemCount / pageLength);

    const itemIndexFrom = this.state.pageIndex * pageLength;
    const itemIndexTo = (this.state.pageIndex + 1) * pageLength;

    const renderedItems = this.state.posts.filter(
      (e, i) => i >= itemIndexFrom && i < itemIndexTo
    );
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
        <div style={{ margin: 10 }}>
          <Pagination
            onChange={(event, page) => {
              this.setState({ pageIndex: page - 1 });
            }}
            count={pageCount}
          />
        </div>
        <Grid
          spacing={1}
          container
          direction="row"
          justify="space-around"
          align="flex-start"
        >
          {renderedItems.map((p) => (
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
