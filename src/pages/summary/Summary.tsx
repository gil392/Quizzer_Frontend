import { CardContent, Typography } from "@mui/material";
import useStyles from "./Summary.styles";

type Summary2Props = {
  summary: string;
};
export function Summary(props: Summary2Props) {
  const classes = useStyles();
  return (
    <CardContent>
      <Typography variant="body2" className={classes.summary}>
        {props.summary}
      </Typography>
    </CardContent>
  );
}
