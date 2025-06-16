import { Card, CardContent, Typography } from "@mui/material";
import useStyles from "./Summary2.styles";

type Summary2Props = {
    summary: string;
}
export function Summary2(props: Summary2Props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="body2" className={classes.summary}>
          {props.summary}
        </Typography>
      </CardContent>
    </Card>
  );
}
