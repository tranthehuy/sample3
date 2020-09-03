import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// import Link from "next/link";
import notify from "../lib/notifier";
import { getCommentList } from "../lib/api/public";
import {
  addPostComment,
  editPostComment,
  deletePostComment,
} from "../lib/api/admin";

class CommentForm extends React.Component {
  state = {
    content: "",
  };

  render() {
    const { user, postId, onAdded } = this.props;
    return (
      <Grid
        spacing={1}
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item sm={12} xs={12}>
          <TextField
            label="Your comment here!"
            multiline
            rows={4}
            variant="filled"
            fullWidth
            value={this.state.content}
            onChange={(evt) => {
              this.setState({ content: evt.target.value });
            }}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Button
            onClick={() => {
              addPostComment(postId, this.state).then((r) => {
                if (onAdded) {
                  onAdded(r);
                }
                notify("Saved");
                this.setState({ content: "" });
              });
            }}
            fullWidth
            variant="contained"
            color="primary"
          >
            Add comment
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default class CommentList extends React.Component {
  state = {
    comments: [],
  };

  fetchData = async () => {
    try {
      const { postId } = this.props;
      const { comments } = await getCommentList(postId);
      this.setState({ comments });
    } catch (err) {
      notify(err);
    }
  };

  async componentDidMount() {
    this.fetchData();
  }

  editComment = (comment) => {
    const content = prompt("Please type your new comment: ");
    editPostComment(comment.postId, comment._id, { content })
      .then(() => {
        this.fetchData();
      })
      .catch((e) => notify(e.message));
  };

  deleteComment = (comment) => {
    deletePostComment(comment.postId, comment._id)
      .then(() => {
        this.fetchData();
      })
      .catch((e) => notify(e.message));
  };

  render() {
    const { user, postId } = this.props;
    return (
      <>
        {this.state.comments.map((c, index) =>
          c.userId === user._id ? (
            <p key={c._id}>
              <span>
                <i>You on {moment(c.createdAt).fromNow()} said: </i> {c.content}
              </span>
              <br />
              <span style={{ fontSize: "80%", opacity: "0.9" }}>
                <a onClick={() => this.editComment(c)}>Edit</a> |{" "}
                <a onClick={() => this.deleteComment(c)}>Delete</a>
              </span>
            </p>
          ) : (
            <p key={c._id}>
              <i>Someone on {moment(c.createdAt).fromNow()} said: </i>{" "}
              {c.content}
            </p>
          )
        )}
        {user ? (
          <CommentForm
            postId={postId}
            user={user}
            onAdded={(newComment) => {
              const newList = [...this.state.comments, newComment];
              this.setState({ comments: newList });
            }}
          />
        ) : (
          <p>Please login to comment!</p>
        )}
      </>
    );
  }
}
