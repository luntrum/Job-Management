import React, { useContext, useState } from 'react';
import { JobContext } from '../context/JobContext';

function JobFind() {
  const [findTitle, setFindTitle] = useState('');
  const [findDescription, setFindDescription] = useState('');
  const { addFindSubject } = useContext(JobContext);

  const handleSubmit = () => {
    addFindSubject({ jobTitle: findTitle, jobDescription: findDescription });
    setFindTitle('');
    setFindDescription('');
  };
  const handleKeyDown = (e) => {
    // e.preventDefault();
    if (e.key === 'Enter' || e.metaKey || e.ctrlKey) {
      handleSubmit();
    }
  };
  const handleFinish = () => {
    if (!findTitle && !findDescription) {
      addFindSubject({ jobTitle: findTitle, jobDescription: findDescription });
    } else alert('you are not find to be finish');
  };

  return (
    <div className="job-find">
      <p className="job-find-header">Find Job:</p>
      <div className="job-find-by-title">
        <label htmlFor="job-find-by-title">Title:</label>

        <input
          type="text"
          name="job-find-by-title"
          id="job-find-by-title"
          placeholder="Enter the Title of Job"
          value={findTitle}
          onChange={(e) => setFindTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="job-find-by-description">
        <label htmlFor="job-find-by-description">Job description:</label>
        <textarea
          name="job-find-by-description"
          id="job-find-by-description"
          placeholder="Enter the Title of Job"
          value={findDescription}
          onChange={(e) => setFindDescription(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>
      <button className="find-btn" onClick={() => handleSubmit()}>
        Find
      </button>
      <button className="finish-find-btn" onClick={() => handleFinish()}>
        Finish Find
      </button>
    </div>
  );
}

export default JobFind;
