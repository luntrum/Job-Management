import React, { useContext, useEffect, useState } from 'react';
import { JobContext } from '../context/JobContext';

function JobFilter() {
  const { addFilter } = useContext(JobContext);
  ///visibility of filter box
  const [isHiddenFilter, setIsHiddenFilter] = useState(true);
  const [isOpenFilter, setIsOpenFilter] = useState(true);

  const handleFilter = () => {
    setIsOpenFilter(!isOpenFilter);
    setTimeout(() => {
      setIsHiddenFilter(!isHiddenFilter);
    }, 500);
  };
  const { handleSortCase } = useContext(JobContext);

  const handleSelect = (e) => {
    e.preventDefault();
    const newSortCase = e.target.value;
    handleSortCase(newSortCase);
  };

  /// variable for filter choices
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
    <div className="flex flex-col mb-3">
      <h2
        className={`bg-amber-400 mx-5  py-2 text-xl font-sans font-bold text-center  ${
          isHiddenFilter ? 'rounded-xl' : 'rounded-t-xl'
        } 
  `}
        onClick={handleFilter}
      >
        Filter
      </h2>
      <div
        className={`    bg-amber-200 mx-5 flex flex-col rounded-b-xl    ${
          isOpenFilter ? 'animate-close-menu' : 'animate-open-menu '
        } ${isHiddenFilter ? 'hidden' : ' '}    `}
      >
        <form className="ml-5 my-2">
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
              value="completed"
              onChange={(e) => setStatusCase(e.target.value)}
            />
            <label htmlFor="completed">Completed</label>
          </div>
          <div>
            <input
              type="radio"
              name="status"
              id="pending"
              value="pending"
              onChange={(e) => setStatusCase(e.target.value)}
            />
            <label htmlFor="pending">Pending</label>
          </div>
          <div>
            <input
              type="radio"
              name="status"
              id="overdue"
              value="overdue"
              onChange={(e) => setStatusCase(e.target.value)}
            />
            <label htmlFor="overdue">Over Due</label>
          </div>
        </form>
        <div className="ml-5 my-2 flex flex-col">
          <label htmlFor="prio-filter">Priority: </label>
          <select
            className="mr-5  py-2 text-center focus:text-left  "
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
        <div className="ml-5 my-2 flex flex-col">
          <label htmlFor="prio-filter">Category: </label>
          <select
            className="mr-5  py-2 text-center focus:text-left "
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
        <div className="ml-5 my-2 flex flex-col">
          <label htmlFor="dateSort"> Sort by due date: </label>
          <select
            name="dateSort"
            id="dateSort"
            className="mr-5 mb-5 py-2 text-center focus:text-left "
            onChange={(e) => handleSelect(e)}
          >
            <option value="nearest">Sort from nearest Due date</option>
            <option value="farthest">Sort from latest Due date</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default JobFilter;
