import JobCard from "../components/JobCard";
import NoJobs from "../components/NoJobs";
import { useContext, useEffect, useState } from "react";
import { JobsList } from "../store/jobsList";
import TinderCard from "react-tinder-card";

import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const Jobs = () => {
  const { jobsList, initialJobs } = useContext(JobsList);
  const [page, setPage] = useState(1);
  const [allJobsSwiped, setAllJobsSwiped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const URL = (pageNumber) =>
    `https://testapi.getlokalapp.com/common/jobs?page=${pageNumber}`;

  useEffect(() => {
    const jobsFromStorage = localStorage.getItem("jobsList");
    if (jobsFromStorage) {
      initialJobs(JSON.parse(jobsFromStorage));
    } else {
      fetchData();
    }
  }, [page]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(URL(page));
      const jobs = data.results;
      const jobsData = jobs.filter((job) => job.id !== undefined);
      initialJobs(jobsData);
    } catch (error) {
      setError(error);
      console.error("Error fetching jobs data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [bookMarksList, setBookMarksList] = useState(() => {
    const bookMarks = localStorage.getItem("bookmarksList");
    try {
      return JSON.parse(bookMarks) || [];
    } catch (error) {
      console.error("Error parsing bookmarks:", error);
      return [];
    }
  });

  const swiped = (direction, jobId) => {
    if (direction === "right") {
      const jobDet = jobsList.find((job) => Number(job.id) === Number(jobId));

      const bookMarksListIds = [];

      bookMarksList.forEach((job) => {
        bookMarksListIds.push(job.id);
      });
      const updatedJobsList = jobsList.filter(
        (job) => Number(job.id) !== Number(jobId)
      );
      initialJobs(updatedJobsList);
      localStorage.setItem("jobsList", JSON.stringify(updatedJobsList));

      if (!bookMarksListIds.includes(jobDet.id)) {
        const updatedBookmarkList = [...bookMarksList, jobDet];
        setBookMarksList(updatedBookmarkList);
        localStorage.setItem(
          "bookmarksList",
          JSON.stringify(updatedBookmarkList)
        );
      }

      if (updatedJobsList.length === 0) {
        setAllJobsSwiped(true);
      }
    } else if (direction === "left") {
      const updatedJobsList = jobsList.filter(
        (job) => Number(job.id) !== Number(jobId)
      );
      initialJobs(updatedJobsList);
      localStorage.setItem("jobsList", JSON.stringify(updatedJobsList));

      if (updatedJobsList.length === 0) {
        setAllJobsSwiped(true);
      }
    }
  };

  const handleAllJobsSwiped = async () => {
    setPage(page + 1);
    setAllJobsSwiped(false);

    const { data } = await axios.get(URL(page + 1));
    const newJobs = data.results;
    const jobsData = newJobs.filter((job) => job.id !== undefined);

    if (newJobs.length > 0) {
      initialJobs([...jobsList, ...jobsData]);
    } else {
      console.log("No more jobs available.");
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && <p>Error fetching jobs: {error.message}</p>}
      {jobsList.length === 0 && !allJobsSwiped ? (
        <NoJobs />
      ) : (
        <div className="jobs-container">
          <h1 className="job-list-heading"> Jobs List</h1>
          <div className="cardContainer">
            {jobsList.map((job) => {
              if (job.id !== undefined) {
                return (
                  <TinderCard
                    className="swipe"
                    key={job.id}
                    onSwipe={(dir) => swiped(dir, job.id)}
                    preventSwipe={["up", "down"]}
                  >
                    <JobCard jobDetails={job} />
                  </TinderCard>
                );
              }
            })}
            {allJobsSwiped && (
              <button className="load-jobs" onClick={handleAllJobsSwiped}>
                Load More Jobs
              </button>
            )}
          </div>
          <div className="jobs-buttons-container">
            <button className="swipe-buttons">Swipe Left to Discard</button>
            <button className="swipe-buttons">Swipe Right to Bookmark</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Jobs;
