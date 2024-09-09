import React from 'react';
import './App.css';
import { JobProvider } from './context/JobProvider';
import JobFilter from './components/JobFilter';
import JobList from './components/JobList';
import JobInput from './components/JobInput';
import Header from './components/JobHeader';

import JobFind from './components/JobFind';

function App() {
  return (
    <JobProvider>
      <div className="sm:flex  justify-between">
        <div className="sm:w-1/2 md:w-1/3 lg:w-2/6 xl:w-1/4  ">
          <Header />
          <JobInput />
          <JobFind />
          <JobFilter />
        </div>
        <div className="sm:w-2/4 md:w-2/3 lg:w3/6 xl:mr-10">
          <JobList />
        </div>
      </div>
    </JobProvider>
  );
}

export default App;
