import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class InputButton extends React.Component {
  state = {
    content: "",
  };

  render() {
    const {
      placeholder = "What do you wanna see?",
      buttonText = "Search",
      onClick,
    } = this.props;
    return (
      <>
        <Grid item sm={8} xs={12}>
          <TextField
            placeholder={placeholder}
            fullWidth
            value={this.state.content}
            onChange={(evt) => {
              this.setState({ content: evt.target.value });
            }}
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Button
            onClick={() => {
              if (onClick) onClick(this.state.content);
            }}
            fullWidth
            variant="contained"
            color="primary"
          >
            {buttonText}
          </Button>
        </Grid>
      </>
    );
  }
}
