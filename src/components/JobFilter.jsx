import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';

function JobFilter() {
  const { handleFilter } = useContext(JobContext);
  return (
    <form className="filter-input">
      <h4>Filter:</h4>
      <input
        type="radio"
        name="filter"
        id="all"
        value="All"
        onClick={(e) => handleFilter(e.target.value)}
      />
      <label htmlFor="all">All</label>
      <input
        type="radio"
        name="filter"
        id="completed"
        value="Completed"
        onClick={(e) => handleFilter(e.target.value)}
      />
      <label htmlFor="Completed">Completed</label>
      <input
        type="radio"
        name="filter"
        id="inCompleted"
        value="inCompleted"
        onClick={(e) => handleFilter(e.target.value)}
      />
      <label htmlFor="inCompleted">Incompleted</label>
    </form>
  );
}

export default JobFilter;
