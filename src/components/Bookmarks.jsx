import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";

const Bookmarks = () => {
  const [bookmarksList, setBookmarksList] = useState([]);

  useEffect(() => {
    const getBookmarksList = async () => {
      const storedBookmarks = await localStorage.getItem("bookmarksList");
      if (storedBookmarks) {
        setBookmarksList(JSON.parse(storedBookmarks));
      }
    };
    getBookmarksList();
  }, []);

  return (
    <>
      {bookmarksList.length === 0 ? (
        <h1>No jobs bookmarked yet.</h1>
      ) : (
        <div className="jobs-container">
          <h1 className="job-list-heading">Bookmarked Jobs</h1>

          {bookmarksList.map((job) => (
            <div key={job.id} className="jobcard-container2">
              <JobCard jobDetails={job} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Bookmarks;
