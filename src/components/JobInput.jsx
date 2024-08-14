import React, { useContext, useRef, useState } from 'react';
import { JobContext } from '../context/JobContext';

function JobInput() {
  const { addJobs } = useContext(JobContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const dueDateRef = useRef(null);

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
      });
      setTitle('');
      setDescription('');
      setDueDate(null);
      titleInputRef.current.focus();
      dueDateRef.current.value = '';
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
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}
export default JobInput;
