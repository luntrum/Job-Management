import React, { useContext, useEffect, useState } from 'react';
import { JobContext } from '../context/JobContext';

function JobFilter() {
  const { addFilter } = useContext(JobContext);

  const [statusCase, setStatusCase] = useState('All');
  const [prioFilterCase, setPrioFilterCase] = useState('All');
  const [categoryFilterCase, setCategoryFilterCase] = useState('All');

  const handleSubmit = (e) => {
    const newFilterCase = {
      status: statusCase,
      priority: prioFilterCase,
      category: categoryFilterCase,
    };
    addFilter(newFilterCase);
  };
  useEffect(() => {
    handleSubmit();
  }, [statusCase, prioFilterCase, categoryFilterCase]);
  return (
    <div className="filter-input">
      <h4>Filter:</h4>
      <form className="filter-by-status">
        <label>Status:</label>
        <div>
          <input
            type="radio"
            name="status"
            id="all"
            value="All"
            onChange={(e) => setStatusCase(e.target.value)}
            defaultChecked
          />
          <label htmlFor="all">All</label>
        </div>
        <div>
          <input
            type="radio"
            name="status"
            id="completed"
            value="Completed"
            onChange={(e) => setStatusCase(e.target.value)}
          />
          <label htmlFor="Completed">Completed</label>
        </div>
        <div>
          <input
            type="radio"
            name="status"
            id="inCompleted"
            value="inCompleted"
            onChange={(e) => setStatusCase(e.target.value)}
          />
          <label htmlFor="inCompleted">Incompleted</label>
        </div>
      </form>
      <div className="prio-filter">
        <label htmlFor="prio-filter">Priority: </label>
        <select
          name="prio-filter"
          id="prio-filter"
          onChange={(e) => setPrioFilterCase(e.target.value)}
        >
          <option value="All">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="cate-filter">
        <label htmlFor="prio-filter">Category: </label>
        <select
          name="prio-filter"
          id="cate-filter"
          onChange={(e) => setCategoryFilterCase(e.target.value)}
        >
          <option value="All">All Category</option>
          <option value="Private">Private</option>
          <option value="Social">Social</option>
          <option value="Company">Company</option>
        </select>
      </div>
    </div>
  );
}

export default JobFilter;
