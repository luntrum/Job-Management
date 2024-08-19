import React, { useContext, useRef, useState } from 'react';
import { JobContext } from '../context/JobContext';

function JobInput() {
  const { addJobs } = useContext(JobContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('Private');

  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const dueDateRef = useRef(null);
  const prioRef = useRef(null);
  const categoryRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate) {
      alert('please fill every things');
      if (!title) {
        titleInputRef.current.focus();
      } else if (!description) {
        descriptionInputRef.current.focus();
      } else if (!dueDate) {
        dueDateRef.current.focus();
      }
    } else {
      addJobs({
        title: title,
        description: description.trim(),
        dueDate: dueDate,
        priority: priority,
        category: category,
      });

      setTitle('');
      setDescription('');
      setDueDate(null);
      setPriority('Low');
      titleInputRef.current.focus();
      dueDateRef.current.value = '';
      prioRef.current.value = 'Low';
      categoryRef.current.value='Private'
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };
  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    if (!isNaN(date)) {
      setDueDate(date);
    }
  };

  return (
    <div className="job-input">
      <form className="job-input">
        <label htmlFor="job-title">Job title</label>
        <input
          type="text"
          value={title}
          id="job-title"
          name="job-title"
          placeholder="Job title"
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={titleInputRef}
        />
        <label htmlFor="job-description">Job description</label>
        <textarea
          type="text"
          value={description}
          id="job-description"
          name="job-description"
          placeholder="Job description"
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={descriptionInputRef}
        />
        <label htmlFor="job-due-date">Due Date:</label>
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          placeholder="Due Date"
          onChange={handleDateChange}
          onKeyDown={handleKeyDown}
          ref={dueDateRef}
        />
        <label htmlFor="priority">Priority:</label>
        <select
          name="priority"
          id="priority"
          onChange={(e) => setPriority(e.target.value)}
          ref={prioRef}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <label htmlFor="category">Category:</label>
        <select
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          ref={categoryRef}
        >
          <option value="Private">Private</option>
          <option value="Social">Social</option>
          <option value="Company">Company</option>
        </select>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
export default JobInput;
