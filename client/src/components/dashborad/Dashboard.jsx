import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from "recharts";
import MainLayout from "../MainLayout";

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 6000 },
  { name: "May", sales: 7000 },
  { name: "Jun", sales: 8000 },
];

const orderData = [
  { name: "Completed", value: 400 },
  { name: "Pending", value: 200 },
  { name: "Cancelled", value: 100 },
];

const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

const userActivity = [
  { name: "Mon", users: 100 },
  { name: "Tue", users: 300 },
  { name: "Wed", users: 500 },
  { name: "Thu", users: 200 },
  { name: "Fri", users: 400 },
  { name: "Sat", users: 600 },
  { name: "Sun", users: 700 },
];

const Dashboard = () => {
    return (
        <div className="p-4 bg-gray-100 min-h-screen">
          {/* ✅ Top Bar */}
          <div className="flex justify-between items-center bg-white p-4 rounded shadow">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded w-1/3"
            />
            <div className="flex items-center gap-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded">Buy Now</button>
              <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
      
          {/* ✅ Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
            {[
              { label: "Daily Signups", value: "1,503", icon: "👥" },
              { label: "Daily Visitors", value: "79,503", icon: "📊" },
              { label: "Daily Orders", value: "15,503", icon: "📦" },
              { label: "Daily Revenue", value: "$98,503", icon: "💰" },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded shadow flex items-center">
                <span className="text-3xl mr-4">{stat.icon}</span>
                <div>
                  <h2 className="text-xl font-bold">{stat.value}</h2>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
      
          {/* ✅ Charts Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sales Report (Takes full width on mobile, half on desktop) */}
            <div className="bg-white p-4 rounded shadow col-span-1 md:col-span-2 h-72">
              <h3 className="text-xl font-semibold mb-2">📈 Sales Report</h3>
              <ResponsiveContainer width="100%" height="80%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
      
            {/* Orders Overview (Pie Chart) */}
            <div className="bg-white p-4 rounded shadow h-72">
              <h3 className="text-xl font-semibold mb-2">📊 Orders Overview</h3>
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie data={orderData} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" dataKey="value">
                    {orderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
      
            {/* User Activity (Bar Chart) */}
            <div className="bg-white p-4 rounded shadow h-72">
              <h3 className="text-xl font-semibold mb-2">📉 User Activity</h3>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={userActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
      
};

export default Dashboard;
