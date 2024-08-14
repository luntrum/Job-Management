import React, { useContext, useEffect, useState } from 'react';
import { JobContext } from './JobContext';
export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  // const [completedJobs, setCompletedJobs] = useState([]);
  // const [inCompletedJobs, setInCompletedJobs] = useState([]);
  const [oldJobs, setOldJobs] = useState([]);
  const [prioFilterCase, setPrioFilterCase] = useState('All');
  ///set a arr to locate the job
  const addJobs = (value) => {
    let newJob = {
      id: jobs.length + 1,
      jobTitle: value.title,
      jobDescription: value.description,
      dueDate: value.dueDate,
      priority: value.priority,
      completed: false,
    };
    setJobs([...jobs, newJob]);
    setOldJobs([...oldJobs, newJob]);
  };
  // const handleCompletedJobs = () => {
  //   const newJobs = jobs.filter((job) => job.completed);
  //   setCompletedJobs(newJobs);
  // };
  // const handleInCompletedJobs = () => {
  //   const newJobs = jobs.filter((job) => !job.completed);
  //   setInCompletedJobs(newJobs);
  // };

  // useEffect(() => {
  //   handleCompletedJobs();
  //   handleInCompletedJobs();
  // }, [jobs, oldJobs]);
  /////handle Item
  const handleChangeJobStatusBtn = (id) => {
    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, completed: !job.completed } : job,
      ),
    );
    setOldJobs(
      oldJobs.map((job) =>
        job.id === id ? { ...job, completed: !job.completed } : job,
      ),
    );
  };
  const handleDeleteBtn = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
    setOldJobs(oldJobs.filter((job) => job.id !== id));
  };
  //////////// create a filter
  const [filterCase, setFilterCase] = useState('All');

  const handleFilterCase = (value) => {
    setFilterCase(value);
  };

  const handlePrioFilterCase = (value) => {
    setPrioFilterCase(value);
  };

  const handleCombinedFilter = () => {
    let filteredJobs = oldJobs;

    if (filterCase !== 'All') {
      filteredJobs = filteredJobs.filter((job) =>
        filterCase === 'Completed' ? job.completed : !job.completed,
      );
    }

    if (prioFilterCase !== 'All') {
      filteredJobs = filteredJobs.filter(
        (job) => job.priority.toLowerCase() === prioFilterCase,
      );
    }

    setJobs(filteredJobs);
  };

  useEffect(() => {
    handleCombinedFilter();
  }, [filterCase, prioFilterCase]);

  /////////////// create a sort provider for Due Date
  const [sortCase, setSortCase] = useState('oldest');

  const handleSort = () => {
    const sortedJobs = [...jobs].sort((a, b) => {
      if (sortCase === 'farthest') {
        return new Date(b.dueDate) - new Date(a.dueDate);
      } else {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
    });
    setJobs(sortedJobs);
  };

  useEffect(() => {
    handleSort();
  }, [sortCase, jobs]);

  const handleSortCase = (value) => {
    setSortCase(value);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        addJobs,
        handleChangeJobStatusBtn,
        // handleFilter,
        handleDeleteBtn,
        handleSort,
        handleSortCase,
        handleFilterCase,
        handlePrioFilterCase,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
