import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';

function JobItem({ job }) {
  const { handleChangeJobStatusBtn, handleDeleteBtn } = useContext(JobContext);

  return (
    <div className="job-item">
      <p className="job-title">{job.jobTitle}</p>
      <pre className="job-description"> {job.jobDescription} </pre>
      <p className="job-completed">
        {job.completed ? ' Completed ' : ' Not Completed Yet '}
      </p>
      <div className="item-btn">
        <button
          className="change-status"
          onClick={() => handleChangeJobStatusBtn(job.id)}
        >
          Change status
        </button>
        <button className="delete-btn" onClick={() => handleDeleteBtn(job.id)}>
          delete
        </button>
      </div>
    </div>
  );
}

export default JobItem;
