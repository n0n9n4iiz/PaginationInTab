import { Box } from "@mui/material";

export const TankTabPanel = (props) => {
  const { children, value, selectValue } = props;
  return (
    <Box role="tabpanel" hidden={value !== selectValue}>
      {value === selectValue && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};
