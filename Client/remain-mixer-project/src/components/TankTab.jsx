import { Box, Card, Grid, Tab, Tabs } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { Await, useAsyncValue, useSearchParams } from "react-router-dom";
import { TankTabPanel } from "./TankTabPanel";
import { getTankAll } from "../api";
import { TankCard } from "./TankCard";
import { CardTest } from "./CardTest";

export const TankTab = () => {
  const data = useAsyncValue();
  const typGroup = data.data.recordset;
  const [searchParam, setSearchParam] = useSearchParams([]);
  const [selectValue, setSelectValue] = useState(
    searchParam.get("type") ?? "All"
  );
  const [cardData, setCardData] = useState(null);
  const handleChange = (e, newValue) => {
    setSelectValue(newValue);
    setSearchParam({ page: 1, perPage: 10, type: newValue });
  };
  const page = searchParam.get("page");
  const perPage = searchParam.get("perPage");
  const type = searchParam.get("type");
  const pagination = { page: page, perPage: perPage };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={selectValue} onChange={handleChange}>
          <Tab label="ถังทั้งหมด" value="All" />
          {typGroup.map((item, index) => {
            return (
              <Tab key={index} label={`ถัง ${item.type}`} value={item.type} />
            );
          })}
        </Tabs>
      </Box>
      <TankTabPanel value="All" selectValue={selectValue}>
        <Grid container spacing={1}>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Await resolve={getTankAll(pagination, type)}>{RenderCard}</Await>
          </Suspense>
        </Grid>
      </TankTabPanel>
      <TankTabPanel value="A" selectValue={selectValue}>
        <Grid container spacing={1}>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Await resolve={getTankAll(pagination, type)}>{RenderCard}</Await>
          </Suspense>
        </Grid>
      </TankTabPanel>
      <TankTabPanel value="B" selectValue={selectValue}>
        <Grid container spacing={1}>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Await resolve={getTankAll(pagination, type)}>{RenderCard}</Await>
          </Suspense>
        </Grid>
      </TankTabPanel>
    </>
  );
};

const RenderCard = () => {
  const data = useAsyncValue();
  const dataset = data?.data.result.recordset;
  return dataset.map((item, index) => {
    return <CardTest key={index} data={item}></CardTest>;
  });
};
