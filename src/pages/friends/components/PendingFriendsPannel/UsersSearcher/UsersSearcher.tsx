import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Avatar,
  Box,
  CircularProgress,
  debounce,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { isNotNil } from "ramda";
import {
  FunctionComponent,
  HTMLAttributes,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  searchUsers as apiSearchUsers,
  submitFriendRequest,
} from "../../../../../api/user/api";
import { SearchedUser } from "../../../../../api/user/types";
import { useStyles } from "./styles";
import { notifyFriendRequestAsync } from "../../../../../store/notificationReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store/store";
import { toastSuccess, toastWarning } from "../../../../../utils/utils";

interface UsersSearcherProps {
  excludedIds?: string[];
  textFieldLabel?: string;
}

const UsersSearcher: FunctionComponent<UsersSearcherProps> = (props) => {
  const { excludedIds = [], textFieldLabel } = props;
  const classes = useStyles();
  const [value, setValue] = useState<SearchedUser | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<SearchedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const fetchUsers = useCallback(
    async (searchTerm: string) => {
      setLoading(true);
      try {
        const { data } = await apiSearchUsers(searchTerm);
        const options = data.filter(({ _id }) => !excludedIds.includes(_id));
        setOptions(options);
      } finally {
        setLoading(false);
      }
    },
    [excludedIds]
  );
  const searchUsers = useMemo(() => debounce(fetchUsers, 400), [excludedIds]);

  useEffect(() => {
    if (inputValue.trim()) {
      searchUsers(inputValue);
    } else {
      setOptions([]);
    }
  }, [inputValue, searchUsers]);

  const handleSelect = async (
    _event: SyntheticEvent,
    value: SearchedUser | null
  ) => {
    if (isNotNil(value)) {
      try {
        await submitFriendRequest(value._id);
        await dispatch(notifyFriendRequestAsync(value._id));
        toastSuccess("Friend request sent successfully!");
      } catch (error) {
        toastWarning("Failed to send friend request. Please try again.");
      }
    }
    setInputValue("");
    setValue(null);
  };

  const renderOption = (
    props: HTMLAttributes<HTMLLIElement> & {
      key: any;
    },
    { profileImage, username, email }: SearchedUser
  ) => (
    <Box component="li" {...props} key={username}>
      <Avatar
        src={profileImage ?? "error"}
        alt={username.toUpperCase()}
        className={classes.oprionAvatar}
      />
      {username}
      <span className={classes.optionEmail}>
        <Typography variant="caption" color="textSecondary">
          {email}
        </Typography>
      </span>
    </Box>
  );

  const textFieldSlotProps = (
    params: AutocompleteRenderInputParams
  ): TextFieldProps["slotProps"] => ({
    input: {
      ...params.InputProps,
      endAdornment: (
        <>
          {loading ? <CircularProgress size={16} /> : null}
          {params.InputProps.endAdornment}
        </>
      ),
    },
  });

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...params}
      label={textFieldLabel ?? "Search users"}
      slotProps={textFieldSlotProps(params)}
    />
  );

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => `${option.username} (${option.email})`}
      renderOption={renderOption}
      onInputChange={(_, value) => setInputValue(value)}
      loading={loading}
      renderInput={renderInput}
      onChange={handleSelect}
      value={value}
      inputValue={inputValue}
    />
  );
};

export default UsersSearcher;
