import { Box, FormControl, IconButton, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

function SortSelect({ defaultType, defaultReversed, options, callback }) {
  const [selectedOption, setSelectedOption] = useState(defaultType);
  const [reversed, setReversed] = useState(defaultReversed);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    callback(event.target.value, reversed);
  };

  const handleReverse = () => {
    const newValue = !reversed;
    setReversed(newValue);
    callback(selectedOption, newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <IconButton size="small" onClick={handleReverse}>
        {reversed ? (
          <KeyboardArrowUpOutlinedIcon />
        ) : (
          <KeyboardArrowDownOutlinedIcon />
        )}
      </IconButton>
      <FormControl size="small">
        <Select
          variant="standard"
          value={selectedOption}
          onChange={handleChange}
        >
          {options.map((option) => {
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SortSelect;
