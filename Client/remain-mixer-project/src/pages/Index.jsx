import {
  Container,
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { TankCard } from "../components/TankCard";
import { getTankAll } from "../api";
import { Await, defer, useAsyncValue, useLoaderData, useSearchParams } from "react-router-dom";
import { Suspense } from "react";

export const IndexLoader = ({ request }) => {
  const url = new URL(request.url);
  const params1 = new URLSearchParams(url.search);
  const pagination = {
    page: params1.get("page"),
    perPage: params1.get("perPage"),
  };
  const defObj = {
    getTankAll: getTankAll(pagination),
  };
  return defer(defObj);
};

export const Index = () => {
  const loaderData = useLoaderData();
  const [searchParam, setSetSearchParam] = useSearchParams({});
  const handleChange = (e, v) => {
    setSetSearchParam({ page: v, perPage: 2 });
  };

  const RenderPagination = () => {
    const {count} = useAsyncValue().data
    const page = Number(searchParam.get("page")) || 1
    const perPage = Number(searchParam.get("perPage")) || 2
    const totalPage = count/perPage
    return <Pagination
      count={totalPage}
      variant="outlined"
      shape="rounded"
      page={page}
      onChange={handleChange}
      sx={{ display: "flex", justifyContent: "center" }}
    />
  };
  return (
    <>
      <Container>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">RMR Tank</Typography>
          </Grid>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Await
              resolve={loaderData.getTankAll}
              errorElement={<h2>Error, Please try again.</h2>}
            >
              <Grid item xs={12}>
                <Paper sx={{ height: "80dvh", padding: 1 }} elevation={3}>
                  <Grid container spacing={1}>
                    <TankCard />
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <RenderPagination/>
                </Stack>
              </Grid>
            </Await>
          </Suspense>
        </Grid>
      </Container>
    </>
  );
};
