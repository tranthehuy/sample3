import React from "react";
import Link from "next/link";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 10,
    cursor: "pointer",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const { name, content, slug, createdAt } = props.data;
  const classes = useStyles();
  return (
    <Link href={`/posts/${slug}`}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              VN
            </Avatar>
          }
          title={name}
          subheader={moment(createdAt).fromNow()}
        />
        <CardMedia
          className={classes.media}
          image={`https://source.unsplash.com/random?nature,water,${new Date().getTime()}`}
          title="Unsplash Source"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
