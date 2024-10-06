import { useParams } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";
import { PiSuitcaseSimple } from "react-icons/pi";
import { TbMoneybag } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import ErrorMessage from "./ErrorMessage";
import { useContext, useEffect, useState } from "react";
import { JobsList } from "../store/jobsList";

const JobDetails = () => {
  const { id } = useParams();
  const { jobsList, initialJobs } = useContext(JobsList);
  const [jobDetails, setJobDetails] = useState(null);
  const [bookmarksList, setBookmarksList] = useState([]);

  useEffect(() => {
    const getJobDetails = async () => {
      //const jobs = await localStorage.getItem("jobsList");
      //const jobsListData = JSON.parse(jobs);
      //setJobsList(jobsListData);

      const bookmarks = await localStorage.getItem("bookmarksList");
      const bookmarksList = JSON.parse(bookmarks);
      setBookmarksList(bookmarksList);
      let job = null;
      if (jobsList.find((job) => Number(job.id) === Number(id))) {
        job = jobsList.find((job) => Number(job.id) === Number(id));
        setJobDetails(job);
      } else if (bookmarksList.find((job) => Number(job.id) === Number(id))) {
        job = bookmarksList.find((job) => Number(job.id) === Number(id));

        setJobDetails(job);
      }
    };

    getJobDetails();
  }, [id, jobsList]);

  const handleAddBookmark = () => {
    // const updateJobsList = jobsList.filter((job) => job.id !== id);
    // initialJobs(updateJobsList);
    // localStorage.setItem("jobsList", JSON.stringify(updateJobsList));
    // const updatedBookmarkList = bookmarksList.push(jobDetails);
    // console.log(updatedBookmarkList);
    // localStorage.setItem("bookmarksList", JSON.stringify(updatedBookmarkList));
  };

  const renderJobDetails = () => {
    if (!jobDetails) {
      return <ErrorMessage />;
    }

    const {
      job_role,
      company_name,
      primary_details,
      num_applications,
      openings_count,
      views,
      title,
      button_text,
      whatsapp_no,
      job_category,
      job_hours,
      contact_preference,
    } = jobDetails;

    const contact_no =
      whatsapp_no === null ? "Number Not Mentioned" : `${whatsapp_no}  P.M.`;

    const salary =
      primary_details.Salary === "-" ? "Not Disclosed" : primary_details.Salary;

    const isBookmarked =
      bookmarksList.filter((job) => Number(job.id) === Number(id)).length !== 0
        ? "Bookmarked"
        : "Bookmark";

    return (
      <div>
        <section className="card border-secondary job-details-container my-4">
          <div className="">
            <div className="">
              <header className="d-flex">
                <h2 className="text-black">{job_role}</h2>
              </header>
              <div className="mb-3">
                {company_name}

                <div className=""></div>
              </div>
            </div>
            <div className="">
              <div className="d-flex">
                <div className=" border-right">
                  <PiSuitcaseSimple />
                  <span className="mx-2">{primary_details.Experience}</span>
                </div>
                <span className=""></span>
                <div className="">
                  <TbMoneybag />
                  <span className="mx-2">{salary} </span>
                </div>
              </div>
              <div className="">
                <FaLocationDot />
                <span className="mx-2">{primary_details.Place}</span>
              </div>
            </div>
          </div>
          <div className="job-details-bottom">
            <div className="">
              <span className="border-right">
                <label>Views: </label>
                <span className="text-black mx-1">{views}</span>
              </span>
              <span className="border-right">
                <label>Openings: </label>
                <span className="text-black mx-1">{openings_count}</span>
              </span>
              <span className="">
                <label>Applicants: </label>
                <span className="text-black mx-1">{num_applications}</span>
              </span>
            </div>

            <button
              onClick={handleAddBookmark}
              className="btn btn-success rounded-pill fw-medium"
            >
              {isBookmarked}
            </button>
          </div>
        </section>

        <section className="card border-secondary job-details-container my-4">
          <div className="">
            <div className="">
              <header>
                <h3 className="text-black">Job Description</h3>
              </header>
              <div className="my-3">{title}</div>
              <div className="mb-3">
                {button_text} : {contact_no}
              </div>
            </div>
            <div className="">
              <div className="">
                <i className="text-black">Role Category : </i>
                <span className="">{job_category}</span>
              </div>
              <div className="">
                <i className="text-black">Employment Type : </i>
                <span className="">{job_hours}</span>
              </div>

              <div className="">
                <i className="text-black">Qualification : </i>
                <span className="">{primary_details.Qualification}</span>
              </div>
            </div>
            <hr />
            <a
              href={contact_preference.whatsapp_link}
              target="_blank"
              rel="noreferrer"
            >
              <BsWhatsapp className="text-success " />
            </a>
          </div>
        </section>
      </div>
    );
  };

  return <>{renderJobDetails()}</>;
};

export default JobDetails;
