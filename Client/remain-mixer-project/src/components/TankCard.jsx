import { Grid, Paper, Typography } from "@mui/material";

export const TankCard = ({data}) => {
  const {Id,Type,Name,Volumn,CapVolumn} = data
  console.log(Id)
  return (
    <>
      <Grid item xs={3}>
        <Paper sx={{ padding: 1 }}>
          <Typography variant="h5">{Id}</Typography>
          <Typography variant="h5">{Type}</Typography>
          <Typography variant="h5">{Name}</Typography>
          <Typography variant="h5">{Volumn}</Typography>
          <Typography variant="h5">{CapVolumn}</Typography>
        </Paper>
      </Grid>
    </>
  );
};
