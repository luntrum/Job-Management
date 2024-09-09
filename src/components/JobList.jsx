import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';
import JobItem from './JobItem';
function JobList() {
  const { jobs } = useContext(JobContext);

  return (
    <div className="flex flex-col">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
