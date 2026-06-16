import { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import "../App.css";

function Admin() {
const [leads, setLeads] = useState([]);
const [search, setSearch] = useState("");
const [filterStatus, setFilterStatus] = useState("All");
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");
useEffect(() => {
fetchLeads();
}, []);

const fetchLeads = async () => {
try {
const response = await axios.get(
"http://localhost:5000/api/leads"
);
setLeads(response.data);
} catch (error) {
console.error(error);
}
};


const deleteLead = async (id) => {
  if (!window.confirm("Are you sure you want to delete this lead?")) {
  return;
}
try {
await axios.delete(
`http://localhost:5000/api/leads/${id}`
);
  fetchLeads();
  alert("Lead Deleted Successfully");
} catch (error) {
  console.error(error);
}

};

const updateStatus = async (id, status) => {
  try {
    await axios.put(
      `http://localhost:5000/api/leads/${id}`,
      { status }
    );

    fetchLeads();
  } catch (error) {
    console.error(error);
  }
};

const handleLogin = () => {
  if (
    username === "growthkey" &&
    password === "gk2026"
  ) {
    setIsLoggedIn(true);
  } else {
    alert("Invalid Credentials");
  }
};
if (!isLoggedIn) {
  return (
    <div className="container">
      <h1>Admin Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button
        className="add-btn"
        onClick={handleLogin}
      >
        Login
      </button>
      
    </div>
  )};
const totalLeads = leads.length;

const newLeads = leads.filter(
(lead) => lead.status === "New"
).length;

const contactedLeads = leads.filter(
(lead) => lead.status === "Contacted"
).length;

const closedLeads = leads.filter(
(lead) => lead.status === "Closed"
).length;

const filteredLeads = leads.filter((lead) => {
const matchesSearch =
lead.name.toLowerCase().includes(search.toLowerCase()) ||
lead.email.toLowerCase().includes(search.toLowerCase()) ||
lead.company.toLowerCase().includes(search.toLowerCase());

const matchesStatus =
  filterStatus === "All" ||
  lead.status === filterStatus;

return matchesSearch && matchesStatus;

});

return ( 

<div className="container"> <h1>GrowthKey Admin Dashboard</h1>
<button
  className="logout-btn"
  onClick={() => {
    setIsLoggedIn(false);
    window.location.href = "/";
  }}
>
  Logout
</button>
  <div className="dashboard">
    <div className="card">
      <h3>Total Leads</h3>
      <p>{totalLeads}</p>
    </div>

    <div className="card">
      <h3>New</h3>
      <p>{newLeads}</p>
    </div>

    <div className="card">
      <h3>Contacted</h3>
      <p>{contactedLeads}</p>
    </div>

    <div className="card">
      <h3>Closed</h3>
      <p>{closedLeads}</p>
    </div>
  </div>

  <div className="form-card">
    <input
      type="text"
      placeholder="Search by Name, Email or Company..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <br /><br />

    <select
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
    >
      <option value="All">All</option>
      <option value="New">New</option>
      <option value="Contacted">Contacted</option>
      <option value="Qualified">Qualified</option>
      <option value="Closed">Closed</option>
    </select>

    <br /><br />

    <CSVLink
      data={filteredLeads}
      filename={"leads.csv"}
    >
      <button type="button">
        Export CSV
      </button>
    </CSVLink>
  </div>

  <div className="table-card">
    <h2>Leads List</h2>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Company</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredLeads.map((lead) => (
          <tr key={lead._id}>
            <td>{lead.name}</td>
            <td>{lead.email}</td>
            <td>{lead.phone}</td>
            <td>{lead.company}</td>

            <td>
              <select
                value={lead.status}
                onChange={(e) =>
                  updateStatus(
                    lead._id,
                    e.target.value
                  )
                }
              >
                <option value="New">New</option>
                <option value="Contacted">
                  Contacted
                </option>
                <option value="Qualified">
                  Qualified
                </option>
                <option value="Closed">
                  Closed
                </option>
              </select>
            </td>

            <td>
              <button
                className="delete-btn"
                onClick={() =>
                  deleteLead(lead._id)
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
);
}


export default Admin;
