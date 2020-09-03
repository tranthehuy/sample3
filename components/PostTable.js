import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const PostTable = ({ posts, onRemove }) => (
  <div style={{ padding: "10px 45px" }}>
    <Grid container>
      <Grid item xs={12} sm={12}>
        <div>
          <h2>Posts</h2>
          <p>
            <Link href="/admin/add-post">
              <Button startIcon={<Icon>add</Icon>} variant="contained">
                Add post
              </Button>
            </Link>
          </p>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Post Name</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      <Link
                        as={`/post-detail/${row.slug}`}
                        href={`/post-detail?slug=${row.slug}`}
                      >
                        <a>{row.name}</a>
                      </Link>
                      <p>{row.content}</p>
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        as={`/admin/edit-post/${row.slug}`}
                        href={`/admin/edit-post?slug=${row.slug}`}
                      >
                        <Button
                          startIcon={<Icon>edit</Icon>}
                          variant="contained"
                        >
                          Edit
                        </Button>
                      </Link>
                      <span>&nbsp;&nbsp;</span>
                      <Button
                        startIcon={<Icon>delete</Icon>}
                        variant="contained"
                        onClick={() => (onRemove ? onRemove(row) : true)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>
    </Grid>
  </div>
);

PostTable.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PostTable;
