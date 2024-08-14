import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';

function JobFilter() {
  const { handleFilterCase, handlePrioFilterCase } = useContext(JobContext);

  // const handleSubmit = (e) => {
  //   const newFilterCase = e.target.value;
  //   handleFilterCase(newFilterCase);
  // };
  return (
    <div className="filter-input">
      <form className="filter-by-status">
        <h4>Filter:</h4>
        <div>
          <input
            type="radio"
            name="filter"
            id="all"
            value="All"
            onChange={(e) => handleFilterCase(e.target.value)}
            defaultChecked
          />
          <label htmlFor="all">All</label>
        </div>
        <div>
          <input
            type="radio"
            name="filter"
            id="completed"
            value="Completed"
            onChange={(e) => handleFilterCase(e.target.value)}
          />
          <label htmlFor="Completed">Completed</label>
        </div>
        <div>
          <input
            type="radio"
            name="filter"
            id="inCompleted"
            value="inCompleted"
            onChange={(e) => handleFilterCase(e.target.value)}
          />
          <label htmlFor="inCompleted">Incompleted</label>
        </div>
      </form>
      <div className="prio-filter">
        <label htmlFor="prio-filter">Priority Filter:</label>
        <select
          name="prio-filter"
          id="prio-filter"
          onChange={(e) => handlePrioFilterCase(e.target.value)}
        >
          <option value="All">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
}

export default JobFilter;
