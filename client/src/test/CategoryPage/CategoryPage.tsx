import React, { useState } from 'react';

interface Job {
  jobName: string;
  createdBy: string;
  status: string;
}

const CategoryPage: React.FC = () => {
  const [jobList, setJobList] = useState<Job[]>([]);
  const [jobDetails, setJobDetails] = useState<Job>({
    jobName: '',
    createdBy: '',
    status: '',
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setJobDetails({
      ...jobDetails,
      [field]: event.target.value,
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setJobList([...jobList, jobDetails]);
    setJobDetails({
      jobName: '',
      createdBy: '',
      status: '',
    });
  };

  return (
    <div>
      <h1>Category Page</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="jobName">Job Name:</label>
          <input
            id="jobName"
            type="text"
            value={jobDetails.jobName}
            onChange={(e) => handleInputChange(e, 'jobName')}
          />
        </div>
        <div>
          <label htmlFor="createdBy">Created By:</label>
          <input
            id="createdBy"
            type="text"
            value={jobDetails.createdBy}
            onChange={(e) => handleInputChange(e, 'createdBy')}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <input
            id="status"
            type="text"
            value={jobDetails.status}
            onChange={(e) => handleInputChange(e, 'status')}
          />
        </div>
        <button type="submit">Add Job</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Job Name</th>
            <th>Created By</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobList.map((job, index) => (
            <tr key={index}>
              <td>{job.jobName}</td>
              <td>{job.createdBy}</td>
              <td>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryPage;
