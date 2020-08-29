import React from "react";
import withAuth from "../../lib/withAuth";

class MyBooksWithData extends React.Component {
  state = {};

  async componentDidMount() {}

  render() {
    return "Coming soon...";
  }
}

export default withAuth(MyBooksWithData);
