// import { Link } from "react-router-dom";
import { TbMoneybag } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";

const JobCard = ({ jobDetails }) => {
  const { id, job_role, job_location_slug, primary_details, whatsapp_no } =
    jobDetails;

  const contact_no =
    whatsapp_no === null ? "Number Not Mentioned" : whatsapp_no;

  const salary =
    primary_details.Salary === "-"
      ? "Not Disclosed"
      : `${primary_details.Salary} P.M.`;

  return (
    <Link to={`/job/${id}`} className="jobcard-container ">
      <h1 className="job-title">{job_role}</h1>

      <div className="">
        <div className="">
          <FaLocationDot className="icon-color" />
          <span className="mx-2 jobcard-text">{job_location_slug}</span>
        </div>
        <div className="">
          <TbMoneybag className="icon-color" />
          <span className="mx-2 jobcard-text">{salary} </span>
        </div>
        <div className="">
          <IoCall className="icon-color" />
          <span className="mx-2 jobcard-text">{contact_no}</span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
