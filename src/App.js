// App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Add your own styles

const users = [
  {
  "id": "1",
  "name": "Aaron Miles",
  "email": "aaron@mailinator.com",
  "role": "member"
  },
  {
  "id": "2",
  "name": "Aishwarya Naik",
  "email": "aishwarya@mailinator.com",
  "role": "member"
  },
  {
  "id": "3",
  "name": "Arvind Kumar",
  "email": "arvind@mailinator.com",
  "role": "admin"
  }
]

const App = () => {
 
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data from API and set it to 'users' state
  

  // Filter and paginate the data based on search term
  useEffect(() => {
    const filteredData = users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filteredData);
    setCurrentPage(1);
  }, [searchTerm, users]);

  // Get current rows based on pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  const handlePageChange = (newPage) => setCurrentPage(newPage);

  // Handle row selection
  const handleRowSelect = (userId) => {
    const isSelected = selectedRows.includes(userId);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((id) => id !== userId));
    } else {
      setSelectedRows([...selectedRows, userId]);
    }
  };

  // Handle delete selected rows
  const handleDeleteSelected = () => {
    // Implement logic to delete selected rows in memory
    console.log('Deleting selected rows:', selectedRows);
  };

  return (
    <div className="app">
      <div className="header">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Add search button/icon */}
      </div>

      {/* Display user data table */}
      <table>
        <thead>
          <tr>
            <th>Select All</th>
            <th>ID</th>
            <th>Name</th>
            {/* Add other column headers */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((user) => (
            <tr key={user.id} className={selectedRows.includes(user.id) ? 'selected' : ''}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleRowSelect(user.id)}
                  checked={selectedRows.includes(user.id)}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              {/* Add other row data */}
              <td>
                {/* Add buttons for edit and delete */}
                <button className="edit">Edit</button>
                <button className="delete" onClick={() => handleDeleteSelected(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {/* Add buttons for first, previous, next, last */}
        <span>Page {currentPage}</span>
      </div>

      {/* Delete Selected button */}
      <button className="delete-selected" onClick={handleDeleteSelected}>
        Delete Selected
      </button>
    </div>
  );
};

export default App;