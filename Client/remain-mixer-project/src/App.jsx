import "./App.css";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Index, IndexLoader } from "./pages/Index";
import { TabTest, TabTestLoader } from "./pages/TabTest";
import { PaginInTab, PaginInTabLoader } from "./pages/PaginInTab";
import { TestPage1, TestPage1Loader } from "./pages/TestPage1";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Index />} loader={IndexLoader} />
        <Route path="/tab" element={<TabTest />} loader={TabTestLoader} />
        <Route path="/comb" element={<PaginInTab/>} loader={PaginInTabLoader}/>
        <Route path="/test1" element={<TestPage1/>} loader={TestPage1Loader}/>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
