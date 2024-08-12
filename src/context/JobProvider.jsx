import React, { useContext, useState } from 'react';
import { JobContext } from './JobContext';
export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [oldJobs, setOldJobs] = useState([]);

  const addJobs = (value) => {
    
        let newJob = {
          id: jobs.length + 1,
          jobTitle: value.title,
          jobDescription: value.description,
          completed: false,
        };
        setJobs([...jobs, newJob]);
        setOldJobs([...oldJobs, newJob]);

   
  };

  const handleChangeJobStatusBtn = (id) => {
    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, completed: !job.completed } : job,
      ),
    );
    setOldJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, completed: !job.completed } : job,
      ),
    );
  };
  const handleDeleteBtn = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
    setOldJobs(oldJobs.filter((job) => job.id !== id));
  };
  const handleFilter = (type) => {
    switch (type) {
      case 'All':
        setJobs(oldJobs);
        // setOldJobs([]);
        break;
      case 'Completed':
        const completedJobs = oldJobs.filter((job) => job.completed);
        setJobs(completedJobs);
        break;
      case 'inCompleted':
        const notCompletedJobs = oldJobs.filter((job) => !job.completed);
        setJobs(notCompletedJobs);
        break;
      default:
        console.warn('Unknown filter type:', type);
        break;
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        addJobs,
        handleChangeJobStatusBtn,
        handleFilter,
        handleDeleteBtn,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
