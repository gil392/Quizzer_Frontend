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
import {
  FunctionComponent,
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { searchUsers as apiSearchUsers } from "../../../../api/user/api";
import { SearchedUser } from "../../../../api/user/types";
import { useStyles } from "./styles";

const UsersSearcher: FunctionComponent = () => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<SearchedUser[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async (searchTerm: string) => {
    setLoading(true);
    try {
      const res = await apiSearchUsers(searchTerm);
      setOptions(res.data);
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

  const renderOption = (
    props: HTMLAttributes<HTMLLIElement> & {
      key: any;
    },
    { picture, username, email }: SearchedUser
  ) => (
    <Box component="li" {...props}>
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
      label="Search users"
      slotProps={textFieldSlotProps(params)}
    />
  );

  return (
    <Autocomplete
      disablePortal
      options={options}
      getOptionLabel={(option) => `${option.username} (${option.email})`}
      renderOption={renderOption}
      onInputChange={(_, value) => setInputValue(value)}
      loading={loading}
      renderInput={renderInput}
    />
  );
};

export default UsersSearcher;
