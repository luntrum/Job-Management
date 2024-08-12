import React from 'react';
import './App.css';
import { JobProvider } from './context/JobProvider';
import JobFilter from './components/JobFilter';
import JobList from './components/JobList';
import JobInput from './components/JobInput';
import Header from './components/JobHeader';

function App() {
  return (
    <JobProvider>
        <Header/>
      <div className='container'>
        <JobInput />
        <JobFilter />
      </div>
        <JobList />
    </JobProvider>
  );
}

export default App;
