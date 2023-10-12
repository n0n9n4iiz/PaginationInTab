import { Box, Tab, Tabs } from "@mui/material";
import { Suspense, useState } from "react";
import { getTankType } from "../api";
import { Await, defer, useAsyncValue, useLoaderData } from "react-router-dom";

export const TabTestLoader = () => {
  const defObj = {
    tankType: getTankType(),
  };
  return defer(defObj);
};

export const TabTest = () => {
  const loaderData = useLoaderData();
  const [selectValue, setSelectValue] = useState("All");

  const handleChange = (event, newValue) => {
    setSelectValue(newValue);
  };
  const RenderTabs = () => {
    const data = useAsyncValue();
    const { recordset } = data.data;
    return (
      <>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={selectValue} onChange={handleChange}>
            <Tab label="ถังทั้งหมด" value="All" />
            {[...recordset].map((item, index) => {
              return (
                <Tab key={index} label={`ถัง ${item.type}`} value={item.type} />
              );
            })}
          </Tabs>
        </Box>
        <TabPanel value="All">All</TabPanel>
        {[...recordset].map((item, index) => {
          return (
            <TabPanel key={index} value={item.type}>{item.type}</TabPanel>
          );
        })}
      </>
    );
  };
  const TabPanel = (props) => {
    const { children, value, index } = props;
    return (
      <Box role="tabpanel" hidden={value !== selectValue}>
        {value === selectValue && <Box sx={{ p: 3 }}>{children}</Box>}
      </Box>
    );
  };
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Await resolve={loaderData.tankType}>{RenderTabs}</Await>
    </Suspense>
  );
};
