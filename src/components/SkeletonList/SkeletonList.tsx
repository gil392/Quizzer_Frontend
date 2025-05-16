import { Skeleton } from "@mui/material";
import { FunctionComponent } from "react";

interface SkeletonListProps {
  numberOfItems: number;
  itemClassName?: string;
}

const SkeletonList: FunctionComponent<SkeletonListProps> = (props) => {
  const { numberOfItems, itemClassName } = props;

  const skeletons = Array.from({ length: numberOfItems }, (_, index) => (
    <Skeleton key={index} className={itemClassName} />
  ));

  return <>{skeletons}</>;
};

export default SkeletonList;
