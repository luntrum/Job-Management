import React, { useContext, useEffect, useState } from 'react';
import { JobContext } from '../context/JobContext';

function JobSortByDue() {
  //   const { jobs, handleSort } = useContext(JobContext);
  //   const updateJobs = useContext(JobContext);
  const { handleSortCase } = useContext(JobContext);

  const handleSelect = (e) => {
    e.preventDefault();
    const newSortCase = e.target.value;
    handleSortCase(newSortCase);
  };
  return (
    <div className="dateSort">
      <label htmlFor="dateSort"> Sort by due date: </label>
      <select name="dateSort" id="dateSort" onChange={(e) => handleSelect(e)}>
        <option value="nearest">Sort from nearest Due date</option>
        <option value="farthest">Sort from farthest Due date</option>
      </select>
    </div>
  );
}

export default JobSortByDue;
