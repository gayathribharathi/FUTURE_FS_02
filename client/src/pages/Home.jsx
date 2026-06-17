import React, { useState, useRef } from "react";
import axios from "axios";
import.meta.env.VITE_API_URL
import "./Home.css";


function Home() {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  description: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/leads`,
      formData
    );

    alert(
      "Thank you! Our team will contact you soon."
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      description: "",
    });
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};
  return (
   <div className="home">
    <nav className="navbar">
  <h2 className="logo">
    Growth<span>Key</span>
  </h2>

  <ul className="nav-links">
    <li>
      <a href="#home">Home</a>
    </li>

    <li>
      <a href="#services">Services</a>
    </li>

    <li>
      <a href="#reviews">Reviews</a> 
    </li>

    <li>
  <a
    href="#contact"
    onClick={() => setShowForm(true)}
  >
    Contact
  </a>
</li>
<li>
  <a href="/admin">Admin</a>
</li>
  </ul>
</nav>
      <div className="hero" id="home">
        <h1>
  Growth<span style={{ color: "#38bdf8" }}>Key</span>
  Technologies
</h1>

        <p>
          Transforming Ideas into Digital Solutions
        </p>

        <button
  className="hero-btn"
  onClick={() => {
  setShowForm(true);

  setTimeout(() => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, 100);
}}
>
  🚀 Get Free Consultation
</button>
</div>

<div className="services" id="services">
  <h2>Our Services</h2>

  <div className="service-cards">
    <div className="card">
      🌐
      <h3>Website Development</h3>
    </div>

    <div className="card">
      📱
      <h3>Mobile App Development</h3>
    </div>

    <div className="card">
      🏢
      <h3>CRM & ERP Solutions</h3>
    </div>

    <div className="card">
      🤖
      <h3>AI Solutions</h3>
    </div>

    <div className="card">
      ☁️
      <h3>Cloud Services</h3>
    </div>
  </div>
</div>
         <div className="reviews-section" id="reviews">
  <h2>What Our Clients Say</h2>

  <div className="review-cards">

    <div className="review-card">
      <h3>⭐⭐⭐⭐⭐</h3>
      <p>
        "GrowthKey developed our company website
        professionally and on time."
      </p>
      <h4>- ABC Pvt Ltd</h4>
    </div>

    <div className="review-card">
      <h3>⭐⭐⭐⭐⭐</h3>
      <p>
        "Excellent CRM solution with great support."
      </p>
      <h4>- XYZ Technologies</h4>
    </div>

    <div className="review-card">
      <h3>⭐⭐⭐⭐⭐</h3>
      <p>
        "Highly recommended for software development."
      </p>
      <h4>- Bright Solutions</h4>
    </div>

   </div>
   </div>


  {showForm && (
    <div className="contact-section" id="contact" ref={formRef}>
    <h2>Get Free Consultation</h2>

  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="name"
      placeholder="Name"
      value={formData.name}
      onChange={handleChange}
      required
    />

    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="phone"
      placeholder="Phone"
      value={formData.phone}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="company"
      placeholder="Company Name"
      value={formData.company}
      onChange={handleChange}
    />

    <select
      name="service"
      value={formData.service}
      onChange={handleChange}
    >
      <option value="">Select Service</option>
      <option>Website Development</option>
      <option>Mobile App Development</option>
      <option>CRM Software</option>
      <option>ERP Software</option>
      <option>AI Solutions</option>
    </select>

    <select
      name="budget"
      value={formData.budget}
      onChange={handleChange}
    >
      <option value="">Select Budget</option>
      <option>Under ₹50,000</option>
      <option>₹50,000 - ₹1,00,000</option>
      <option>Above ₹1,00,000</option>
    </select>

    <textarea
      name="description"
      placeholder="Project Description"
      value={formData.description}
      onChange={handleChange}
      rows="5"
    />

    <button
      type="submit"
      className="hero-btn"
    >
      Submit
    </button>
  </form>
</div>
    )}
<footer className="footer">
  <h3>GrowthKey Technologies</h3>

  <p>📧 info@growthkey.com</p>
  <p>📞 +91 9876543210</p>
  <p>📍 Chennai, Tamil Nadu, India</p>

  <hr />

  <p>
    © 2026 GrowthKey Technologies.
    All Rights Reserved.
  </p>
</footer>
</div>
  );}
export default Home;