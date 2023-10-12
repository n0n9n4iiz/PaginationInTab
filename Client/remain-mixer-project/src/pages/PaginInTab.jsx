import { Box, Grid, Pagination, Paper, Tab, Tabs } from "@mui/material";
import { Suspense, useState } from "react";
import { getTankAll2, getTankType } from "../api";
import { Await, defer, useAsyncValue, useLoaderData, useSearchParams } from "react-router-dom";

export const PaginInTabLoader = ({ request }) => {
  const defObj = {
    tankType: getTankType(),
    tank: getTankAll2(),
  };
  return defer(defObj);
};

export const PaginInTab = () => {
  const loaderData = useLoaderData();
  const [selectValue, setSelectValue] = useState("All");
  const [searchParam,setSearchParam] = useSearchParams();

  const handleChange = (event, newValue) => {
    setSelectValue(newValue);
  };
  const RenderTabs = () => {
    const data = useAsyncValue();
    const { recordset } = data.data;
    const type = [...recordset].map((item) => item.Type);
    const typeGroup = [...new Set(type)];
    return (
      <>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={selectValue} onChange={handleChange}>
            <Tab label="ถังทั้งหมด" value="All" />
            {typeGroup.map((item, index) => {
              return <Tab key={index} label={`ถัง ${item}`} value={item} />;
            })}
          </Tabs>
        </Box>
        <TabPanel value="All">
          <Grid container spacing={1}>
            {[...recordset].map((item, index) => {
              return (
                <Grid item key={index} xs={3} >
                  <Paper>
                    <Grid container>
                      <Grid item xs={12} textAlign={"center"}>{item.Type}</Grid>
                      <Grid item xs={12} textAlign={"center"}>{item.Name}</Grid>
                    </Grid>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </TabPanel>
        {typeGroup.map((item, index) => {
          return (
            <TabPanel key={index} value={item}>
              {item}
            </TabPanel>
          );
        })}
      </>
    );
  };

  const TabPanel = (props) => {
    const { children, value } = props;
    return (
      <Box role="tabpanel" hidden={value !== selectValue}>
        {value === selectValue && <Box sx={{ p: 3 }}>{children}</Box>}
      </Box>
    );
  };
  
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Await resolve={loaderData.tank}>{RenderTabs}</Await>
    </Suspense>
  );
};
