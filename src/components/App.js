import JobsListProvider from "../store/jobsList";
import Header from "./Header";
//import GetJobsList from "../api/jobs";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <JobsListProvider>
      <Header />
      {/* <GetJobsList /> */}
      <main>
        <Outlet />
      </main>
      <Navbar />
    </JobsListProvider>
  );
}

export default App;
