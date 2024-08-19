import React from 'react';
import './css/styles.css';
import { JobProvider } from './context/JobProvider';
import JobFilter from './components/JobFilter';
import JobList from './components/JobList';
import JobInput from './components/JobInput';
import Header from './components/JobHeader';
import JobSortByDue from './components/JobSortByDue';
import JobFind from './components/JobFind';

function App() {
  return (
    <JobProvider>
      <Header />
      <div className="container">
        <JobInput />
        <JobFind />
        <JobFilter />
        <JobSortByDue />
      </div>
      <JobList />
    </JobProvider>
  );
}

export default App;
