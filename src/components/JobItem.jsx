import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';

function JobItem({ job }) {
  const { handleChangeJobStatusBtn, handleDeleteBtn } = useContext(JobContext);
  const dueDate = job.dueDate ? new Date(job.dueDate) : 'no due date set';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // dueDate.setHours(0, 0, 0, 0);

  const isOverDue = dueDate && dueDate < today;
  let itemClass = 'job-item';
  let jobStatus = 'Pending';

  const threeDateLater = new Date(today);
  threeDateLater.setDate(today.getDate() + 3);
  const isNearDue = dueDate && dueDate <= threeDateLater;
  // setup Status of job
  if (job.completed) {
    itemClass = 'job-item completed';
    jobStatus = 'Completed';
  } else if (isOverDue) {
    itemClass = 'job-item overdue';
    jobStatus = 'OverDue';
  } else if (isNearDue) {
    itemClass = 'job-item neardue';
  }
  ///set up near duedate notification

  return (
    <div className={itemClass}>
      <p className="job-title">{job.jobTitle}</p>
      <pre className="job-description"> {job.jobDescription} </pre>
      <p className="job-due-date">{dueDate.toLocaleDateString()}</p>
      <p className="job-status">{jobStatus}</p>
      {isNearDue && !job.completed && (
        <p className="notification">This job is due in the next 3 days!</p>
      )}
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
