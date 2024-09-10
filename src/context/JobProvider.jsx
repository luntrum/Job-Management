import React, { useEffect, useState } from 'react';
import { JobContext } from './JobContext';

// Tạo cơ sở dữ liệu
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('jobDatabase', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore('jobs', { keyPath: 'id' });
      db.createObjectStore('oldJobs', { keyPath: 'id' });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Lưu dữ liệu vào IndexedDB
const saveToIndexedDB = (storeName, data) => {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      data.forEach((item) => {
        store.put(item);
      });

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = (event) => {
        reject(event.target.error);
      };
    });
  });
};

// Lấy dữ liệu từ IndexedDB
const loadFromIndexedDB = (storeName) => {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  });
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [oldJobs, setOldJobs] = useState([]);
  const [needSort, setNeedSort] = useState(false);
  ///set a arr to locate the job
  let newId = null;
  const addJobs = (value) => {
    const existingIds = oldJobs.map((job) => job.id);
    for (let i = 1; i <= oldJobs.length + 1; i++) {
      if (!existingIds.includes(i)) {
        newId = i;
        break;
      }
    }

    let newJob = {
      id: newId,
      jobTitle: value.title,
      jobDescription: value.description,
      dueDate: value.dueDate,
      priority: value.priority,
      category: value.category,
      status: value.status,
    };
    setJobs([...jobs, newJob]);
    setOldJobs([...oldJobs, newJob]);
    setNeedSort(true);
  };

  useEffect(() => {
    loadFromIndexedDB('jobs').then(setJobs);
    loadFromIndexedDB('oldJobs').then(setOldJobs);
  }, []);

  useEffect(() => {
    saveToIndexedDB('jobs', jobs);
    saveToIndexedDB('oldJobs', oldJobs);
  }, [jobs, oldJobs]);

  /////handle Item
  const handleChangeJobStatusBtn = (id) => {
    const today = new Date();

    setJobs(
      jobs.map((job) => {
        if (job.id === id) {
          return {
            ...job,
            status:
              job.status !== 'completed'
                ? 'completed'
                : job.dueDate && job.dueDate < today
                ? 'overdue'
                : 'pending',
          };
        }
        return job;
      }),
    );

    setOldJobs(
      oldJobs.map((job) => {
        if (job.id === id) {
          return {
            ...job,
            status:
              job.status !== 'completed'
                ? 'completed'
                : job.dueDate && job.dueDate < today
                ? 'overdue'
                : 'pending',
          };
        }
        return job;
      }),
    );
  };

  const handleDeleteBtn = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
    setOldJobs(oldJobs.filter((job) => job.id !== id));
  };
  //////////// create a filter

  const [filter, setFilter] = useState({
    status: 'All',
    priority: 'All',
    category: 'All',
  });

  const addFilter = (value) => {
    const newFilter = {
      status: value.status,
      priority: value.priority,
      category: value.category,
    };
    setFilter(newFilter);
  };

  const handleFilter = () => {
    let filteredJobs = [...oldJobs];
    /// Filter with job status
    if (filter.status !== 'All') {
      filteredJobs = filteredJobs.filter((job) => job.status === filter.status);
    }
    ///filter with priority
    if (filter.priority !== 'All') {
      filteredJobs = filteredJobs.filter(
        (job) => job.priority.toLowerCase() === filter.priority.toLowerCase(),
      );
    }
    ///filter with category
    if (filter.category !== 'All') {
      filteredJobs = filteredJobs.filter(
        (job) => job.category.toLowerCase() === filter.category.toLowerCase(),
      );
    }
    setJobs(filteredJobs);
  };

  useEffect(() => {
    setNeedSort(true);
    handleFilter();
  }, [filter, oldJobs]);

  ////////////// create a find function
  const [findSubject, setFindSubject] = useState({
    jobTitle: '',
    jobDescription: '',
  });
  const addFindSubject = (value) => {
    setFindSubject({
      jobTitle: value.jobTitle,
      jobDescription: value.jobDescription,
    });
  };

  const handleFind = () => {
    let findedJobs = [...jobs];

    if (!findSubject.jobDescription && !findSubject.jobTitle) {
      findedJobs = oldJobs;
    } else {
      if (findSubject.jobTitle) {
        findedJobs = findedJobs.filter((job) =>
          job.jobTitle
            .toLowerCase()
            .includes(findSubject.jobTitle.toLowerCase()),
        );
      }
      if (findSubject.jobDescription) {
        findedJobs = findedJobs.filter((job) =>
          job.jobDescription
            .toLowerCase()
            .includes(findSubject.jobDescription.toLowerCase()),
        );
      }
    }

    setJobs(findedJobs);
  };
  useEffect(() => {
    setNeedSort(true);
    handleFind();
  }, [findSubject.jobTitle, findSubject.jobDescription]);

  /////////////// create a sort provider for //Due Date
  const [sortCase, setSortCase] = useState('nearest');
  const handleSortCase = (value) => {
    setSortCase(value);
  };

  const handleSort = () => {
    const sortedJobs = [...jobs].sort((a, b) =>
      sortCase === 'farthest'
        ? new Date(b.dueDate) - new Date(a.dueDate)
        : new Date(a.dueDate) - new Date(b.dueDate),
    );
    setNeedSort(false);
    setJobs(sortedJobs);
  };

  useEffect(() => {
    handleSort();
  }, [sortCase, oldJobs, needSort]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        addJobs,
        handleChangeJobStatusBtn,
        handleDeleteBtn,
        handleSortCase,
        addFilter,
        addFindSubject,
        // handleFilterCase,
        // handlePrioFilterCase,
        // handleCategoryCase,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
