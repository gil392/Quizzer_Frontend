import { CardContent, Typography } from "@mui/material";
import useStyles from "./Summary.styles";

type SummaryProps = {
  summary: string;
};
export function Summary(props: SummaryProps) {
  const classes = useStyles();
  return (
    <CardContent>
      <Typography variant="body2" className={classes.summary}>
        {props.summary}
      </Typography>
    </CardContent>
  );
}
