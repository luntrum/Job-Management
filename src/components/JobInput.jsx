import React, { useContext, useRef, useState } from 'react';
import { JobContext } from '../context/JobContext';

function JobInput() {
  const { addJobs } = useContext(JobContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert('please fill bolt title and description');
      if (!title) {
        titleInputRef.current.focus();
      } else if (!description) {
        descriptionInputRef.current.focus();
      }
    } else {
      addJobs({ title: title, description: description.trim() });
      setTitle('');
      setDescription('');
      titleInputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
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
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}
export default JobInput;
