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

  const fetchUsers = useCallback(async (searchTerm: string) => {
    setLoading(true);
    try {
      const { data } = await apiSearchUsers(searchTerm);
      const options = data.filter(({ _id }) => !excludedIds.includes(_id));
      setOptions(options);
    } finally {
      setLoading(false);
    }
  }, []);
  const searchUsers = useMemo(() => debounce(fetchUsers, 400), []);

  useEffect(() => {
    if (inputValue.trim()) {
      searchUsers(inputValue);
    } else {
      setOptions([]);
    }
  }, [inputValue, searchUsers]);

  const handleSelect = (_event: SyntheticEvent, value: SearchedUser | null) => {
    if (isNotNil(value)) {
      submitFriendRequest(value._id);
    }
    setInputValue("");
    setValue(null);
  };

  const renderOption = (
    props: HTMLAttributes<HTMLLIElement> & {
      key: any;
    },
    { picture, username, email }: SearchedUser
  ) => (
    <Box component="li" {...props} key={username}>
      <Avatar
        src={picture ?? "error"}
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
