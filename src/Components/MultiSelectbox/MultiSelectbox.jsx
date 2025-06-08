import { Checkbox, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, OutlinedInput } from "@mui/material";
import { MenuProps } from "./utils";

function MultiSelectbox({ options = [], selected = [], onChange, label = "انتخاب چندگانه" }) {

  const allIds = options.map(option => option.id);
  const isAllSelected = allIds.length > 0 && selected.length === allIds.length;

  const handleChange = (event) => {
    const value = event.target.value; 

    if (value.includes("all")) {
      onChange(selected.length === allIds.length ? [] : allIds);
      return;
    }
    
    onChange(value);
  };

  return (
    <>
      <InputLabel id="mutiple-select-label">{label}</InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        value={selected} 
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selectedIds) =>
          options
            .filter(option => selectedIds.includes(option.id))
            .map(option => option.goodName)
            .join(',')
        }
        MenuProps={MenuProps}
      >
        <MenuItem value="all">
          <ListItemIcon>
            <Checkbox
              checked={isAllSelected}
              indeterminate={selected.length > 0 && selected.length < allIds.length}
            />
          </ListItemIcon>
          <ListItemText primary="انتخاب همه" />
        </MenuItem>

        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            <ListItemIcon>
              <Checkbox checked={selected.includes(option.id)} />
            </ListItemIcon>
            <ListItemText primary={option.goodName} />
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

export default MultiSelectbox;