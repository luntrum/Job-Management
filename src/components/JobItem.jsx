import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';

function JobItem({ job }) {
  const { handleChangeJobStatusBtn, handleDeleteBtn } = useContext(JobContext);
  const dueDate = job.dueDate ? new Date(job.dueDate) : 'no due date set';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // dueDate.setHours(0, 0, 0, 0);

  let itemBackground = 'bg-amber-200';

  const threeDateLater = new Date(today);
  threeDateLater.setDate(today.getDate() + 3);
  const isNearDue = dueDate && dueDate <= threeDateLater;
  // setup Status of job
  if (job.status === 'completed') {
    itemBackground = 'bg-emerald-400';
  } else if (job.status === 'overdue') {
    itemBackground = 'bg-red-600';
  } else if (isNearDue) {
    itemBackground = 'bg-pink-200';
  }
  ///set up near duedate notification

  return (
    <div
      className={` mx-5 my-3 rounded-xl 
        ${itemBackground} px-5 py-3`}
    >
      <p className="font-bold">Title: {job.jobTitle}</p>
      {isNearDue && job.status !== 'completed' && job.status !== 'overdue' && (
        <p className="font-bold text-red-700 text-xl md:text-3xl  ">
          This job need to be finished in the next 3 days!
        </p>
      )}
      <p>Category: {job.category}</p>
      <p>Priority: {job.priority}</p>
      <p>Due Date: {dueDate.toLocaleDateString()}</p>
      <p>Status: {job.status}</p>
      <pre className="italic">
        Description:
        <p className="not-italic">{job.jobDescription}</p>
      </pre>
      <div className="flex justify-center ">
        <button
          className={`mr-5 border-2 border-slate-800 p-2 rounded-xl hover:opacity-20`}
          onClick={() => handleChangeJobStatusBtn(job.id)}
        >
          Change status
        </button>
        <button
          className={` ml-5 border-2 border-slate-800 py-3 px-10 rounded-xl  hover:opacity-20 `}
          onClick={() => handleDeleteBtn(job.id)}
        >
          delete
        </button>
      </div>
    </div>
  );
}

export default JobItem;
