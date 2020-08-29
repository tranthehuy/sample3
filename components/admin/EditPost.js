import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { styleTextField } from "../../lib/SharedStyles";
import notify from "../../lib/notifier";

class EditPost extends React.Component {
  static propTypes = {
    post: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
    onSave: PropTypes.func.isRequired,
  };

  static defaultProps = {
    post: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      post: props.post || {},
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { onSave } = this.props;
    const { post } = this.state;
    const { name, content } = post;

    if (!name) {
      notify("Name is required");
      return;
    }
    onSave(post);
  };

  render() {
    const { post, repos } = this.state;
    return (
      <div style={{ padding: "10px 45px" }}>
        <br />
        <form onSubmit={this.onSubmit}>
          <div>
            <TextField
              onChange={(event) => {
                this.setState({
                  post: Object.assign({}, post, { name: event.target.value }),
                });
              }}
              value={post.name || ""}
              type="text"
              label="Post's title"
              style={styleTextField}
              required
            />
          </div>
          <br />

          <TextField
            onChange={(event) => {
              this.setState({
                post: Object.assign({}, post, {
                  content: event.target.value,
                }),
              });
            }}
            value={post.content || ""}
            label="Content"
            className="textFieldInput"
            style={styleTextField}
          />
          <br />
          <br />
          <Button variant="contained" type="submit">
            Save
          </Button>
        </form>
      </div>
    );
  }
}

export default EditPost;
