import { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import.meta.env.VITE_API_URL
import "../App.css";

function Admin() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // GET LEADS
  const fetchLeads = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/leads"
      );

      console.log("API RESPONSE:", response.data);

      setLeads(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(error);
      setLeads([]);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchLeads();
    }
  }, [isLoggedIn]);

  // DELETE
  const deleteLead = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/leads/${id}`
      );
      fetchLeads();
      alert("Lead Deleted Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/leads/${id}`,
        { status }
      );
      fetchLeads();
    } catch (error) {
      console.error(error);
    }
  };

  // LOGIN
  const handleLogin = () => {
    if (username === "growthkey" && password === "gk2026") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid Credentials");
    }
  };

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div className="container">
        <h1>Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button className="add-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    );
  }

  // FILTERS
  const totalLeads = leads.length;

  const newLeads = leads.filter((l) => l.status === "New").length;
  const contactedLeads = leads.filter((l) => l.status === "Contacted").length;
  const closedLeads = leads.filter((l) => l.status === "Closed").length;

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(search.toLowerCase()) ||
      lead.company?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || lead.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container">
      <h1>GrowthKey Admin Dashboard</h1>

      <button
        className="logout-btn"
        onClick={() => setIsLoggedIn(false)}
      >
        Logout
      </button>

      {/* DASHBOARD */}
      <div className="dashboard">
        <div className="card"><h3>Total</h3><p>{totalLeads}</p></div>
        <div className="card"><h3>New</h3><p>{newLeads}</p></div>
        <div className="card"><h3>Contacted</h3><p>{contactedLeads}</p></div>
        <div className="card"><h3>Closed</h3><p>{closedLeads}</p></div>
      </div>

      {/* FILTER */}
      <div className="form-card">
        <input
          type="text"
          placeholder="Search..."
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

        <CSVLink data={filteredLeads} filename="leads.csv">
          <button>Export CSV</button>
        </CSVLink>
      </div>

      {/* TABLE */}
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
                      updateStatus(lead._id, e.target.value)
                    }
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>Closed</option>
                  </select>
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteLead(lead._id)}
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