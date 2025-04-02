import { Box, FormControl, IconButton, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { Sort } from "../types/enums";

interface SortSelectProps {
  defaultType: Sort;
  defaultReversed: boolean;
  options: Sort[];
  callback: (option: Sort, reversed: boolean) => void;
}

function SortSelect({
  defaultType,
  defaultReversed,
  options,
  callback,
}: SortSelectProps) {
  const [selectedOption, setSelectedOption] = useState<Sort>(defaultType);
  const [reversed, setReversed] = useState<boolean>(defaultReversed);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value as Sort);
    callback(event.target.value as Sort, reversed);
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
