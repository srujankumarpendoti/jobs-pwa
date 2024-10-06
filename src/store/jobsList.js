import { createContext, useReducer } from "react";

export const JobsList = createContext({
  jobsList: [],
  initialJobs: () => {},
  removeJob: () => {},
});

const JobsListReducer = (currJobsList, action) => {
  let newJobsList = currJobsList;
  if (action.type === "INITIAL_POST") {
    newJobsList = action.payload.jobs;
  } else if (action.type === "REMOVE_JOB") {
    newJobsList = newJobsList.filter(
      (job) => Number(job.id) !== Number(action.payload.jobId)
    );
  }
  return newJobsList;
};

const JobsListProvider = ({ children }) => {
  const [jobsList, dispatchJobsList] = useReducer(JobsListReducer, []);
  const initialJobs = (jobs) => {
    dispatchJobsList({
      type: "INITIAL_POST",
      payload: {
        jobs,
      },
    });
  };

  const removeJob = (jobId) => {
    dispatchJobsList({
      type: "REMOVE_JOB",
      payload: {
        jobId,
      },
    });
  };

  return (
    <JobsList.Provider value={{ jobsList, initialJobs, removeJob }}>
      {children}
    </JobsList.Provider>
  );
};

export default JobsListProvider;
