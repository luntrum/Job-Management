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
      handleFind();
    } else alert('you are not find to be finish');
  };
  ///hanlde visibility
  const [isHiddenFind, setIsHiddenFind] = useState(true);
  const [isOpenFind, setIsOpenFind] = useState(true);

  const handleFind = () => {
    setIsOpenFind(!isOpenFind);
    setTimeout(() => {
      setIsHiddenFind(!isHiddenFind);
    }, 500);
  };

  return (
    <div className="   mb-7">
      <p
        className={`bg-amber-400 mx-5  py-2 text-xl font-sans font-bold text-nowrap  text-center  ${
          isHiddenFind ? 'rounded-xl' : 'rounded-t-xl'
        } 

  `}
        onClick={handleFind}
      >
        Find Job
      </p>
      <div
        className={`    bg-amber-200 mx-5 px-10 flex flex-col rounded-b-xl    ${
          isOpenFind ? 'animate-close-menu' : 'animate-open-menu '
        } ${isHiddenFind ? 'hidden' : ' '}    `}
      >
        <div className="flex flex-col">
          <label htmlFor="job-find-by-title " className="font-bold mb-2">
            Title:
          </label>

          <input
            type="text"
            name="job-find-by-title"
            id="job-find-by-title"
            placeholder="Enter the Title of Job"
            className="py-5 text-center focus:text-left mb-5"
            value={findTitle}
            onChange={(e) => setFindTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="job-find-by-description " className="font-bold mb-2">
            Job description:
          </label>
          <textarea
            name="job-find-by-description"
            id="job-find-by-description"
            placeholder="Enter the Title of Job"
            className="py-10 text-center focus:text-left mb-5  "
            value={findDescription}
            onChange={(e) => setFindDescription(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
        </div>
        <button
          className="mb-2 bg-amber-600 rounded-xl hover:bg-amber-400 font-bold"
          onClick={() => handleSubmit()}
        >
          Find
        </button>
        <button
          className="mb-5 bg-amber-600 rounded-xl hover:bg-amber-400 font-bold"
          onClick={() => handleFinish()}
        >
          Finish Find
        </button>
      </div>
    </div>
  );
}

export default JobFind;
