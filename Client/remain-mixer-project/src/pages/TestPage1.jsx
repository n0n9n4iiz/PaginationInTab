import React, { useState } from "react";
import { getTankAll, getTankType } from "../api";
import { Await, defer, useLoaderData } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { TankTab } from "../components/TankTab";

export const TestPage1Loader = async ({ request }) => {
  const url = new URL(request.url);
  const param = new URLSearchParams(url.searchParams);
  const page = param.get("page");
  const perPage = param.get("perPage");
  const pagination = { page: page, perPage: perPage };
  const type = param.get("type");
  const defObj = {
    //tank: getTankAll(pagination, type),
    tankType : getTankType()
  };
  return defer(defObj);
};
export const TestPage1 = () => {
  const loaderData = useLoaderData();
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2">RMR TANK</Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ height: "80dvh", padding: 2 }}>
              <Await resolve={loaderData.tankType}>
                <TankTab />
              </Await>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            Pagination
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
