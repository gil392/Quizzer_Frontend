import { SearchedUser } from "../../../../api/user/types";

export const getUserSearchLabel = ({ username, email }: SearchedUser) =>
  `${username} (${email})`;
