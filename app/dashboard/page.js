"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Shield, 
  User, 
  LogOut, 
  DollarSign, 
  TrendingUp, 
  Database, 
  AlertTriangle, 
  Calendar, 
  Grid, 
  MessageSquare, 
  Check, 
  Users, 
  Trash2,
  Send,
  Coffee,
  Loader2,
  X
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [enquiries, setEnquiries] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // overview | seating | CRM
  const [commModal, setCommModal] = useState(null); // { type, name, phone, desk/shift, msg }
  const [sendingComm, setSendingComm] = useState(false);

  // Initial mock data definitions
  const defaultOverdues = [
    { name: "Rohan Verma", desk: "B-12", phone: "9810334812", daysOverdue: 4, amount: 599 },
    { name: "Shreya Ghoshal", desk: "F-03", phone: "8826450123", daysOverdue: 9, amount: 1099 },
    { name: "Kabir Dev", desk: "A-21", phone: "9013459821", daysOverdue: 2, amount: 1099 },
    { name: "Pooja Sen", desk: "C-05", phone: "7827440123", daysOverdue: 12, amount: 599 }
  ];

  const defaultRenewals = [
    { name: "Nitin Saxena", renewalDate: "June 10", daysLeft: 3, desk: "D-08", shift: "Full Day Access", amount: 1099 },
    { name: "Priya Sharma", renewalDate: "June 12", daysLeft: 5, desk: "B-02", shift: "Half Day Shift", amount: 599 },
    { name: "Amit Shah", renewalDate: "June 14", daysLeft: 7, desk: "E-11", shift: "Full Day Access", amount: 1099 }
  ];

  const defaultEnquiries = [
    { id: "ENQ-7023", name: "Rahul Kapoor", mobile: "9899120489", shift: "Full Day Access (₹1,099)", date: "Jun 4, 11:32 AM", status: "Pending" },
    { id: "ENQ-5591", name: "Divya Teja", mobile: "8076592231", shift: "Morning Shift (₹599)", date: "Jun 4, 04:15 PM", status: "Approved" },
    { id: "ENQ-1922", name: "Sara Khan", mobile: "7210984400", shift: "Evening Shift (₹599)", date: "Jun 5, 09:10 AM", status: "Pending" }
  ];

  useEffect(() => {
    // Check authentication
    const userRole = localStorage.getItem("mindspace_user_role");
    const name = localStorage.getItem("mindspace_user_name");

    if (!userRole) {
      router.push("/login");
      return;
    }

    setRole(userRole);
    setUserName(name || "Authorized User");

    // Initialize Enquiries Mock Data
    const localEnquiries = localStorage.getItem("mindspace_enquiries");
    if (!localEnquiries) {
      localStorage.setItem("mindspace_enquiries", JSON.stringify(defaultEnquiries));
      setEnquiries(defaultEnquiries);
    } else {
      setEnquiries(JSON.parse(localEnquiries));
    }

    // Initialize Seating Mock Data (48 Desks)
    const localSeats = localStorage.getItem("mindspace_seats");
    if (!localSeats) {
      const initialSeats = [];
      const prefixes = ["A", "B", "C", "D", "E", "F"];
      
      prefixes.forEach((prefix) => {
        for (let i = 1; i <= 8; i++) {
          const deskId = `${prefix}-0${i}`;
          // Determine state: Green (Vacant), Red (Occupied), Birch Wood Brown (Reserved Full-Day)
          const rand = Math.random();
          let state = "Vacant";
          let occupant = null;
          let phone = "";
          let shiftType = "";

          if (rand < 0.4) {
            state = "Occupied";
            occupant = ["Aarav Jain", "Meera Nair", "Sameer Sen", "Kriti Joshi", "Aditya Goel", "Preeti Roy"][Math.floor(Math.random() * 6)];
            phone = "98" + Math.floor(10000000 + Math.random() * 90000000);
            shiftType = Math.random() > 0.5 ? "Morning Shift" : "Evening Shift";
          } else if (rand < 0.65) {
            state = "Reserved"; // Birch Wood Brown
            occupant = ["Tanveer Singh", "Ridhima Sen", "Arnav Vats", "Isha Patel"][Math.floor(Math.random() * 4)];
            phone = "88" + Math.floor(10000000 + Math.random() * 90000000);
            shiftType = "Full Day Access";
          }

          initialSeats.push({
            id: deskId,
            state,
            occupant,
            phone,
            shiftType
          });
        }
      });

      localStorage.setItem("mindspace_seats", JSON.stringify(initialSeats));
      setSeats(initialSeats);
    } else {
      setSeats(JSON.parse(localSeats));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("mindspace_user_role");
    localStorage.removeItem("mindspace_user_name");
    router.push("/login");
  };

  const toggleDemoRole = () => {
    const nextRole = role === "Admin" ? "Staff" : "Admin";
    localStorage.setItem("mindspace_user_role", nextRole);
    localStorage.setItem("mindspace_user_name", nextRole === "Admin" ? "Harsh Goyal (Admin)" : "Arjun Sharma (Staff)");
    setRole(nextRole);
    setUserName(nextRole === "Admin" ? "Harsh Goyal (Admin)" : "Arjun Sharma (Staff)");
  };

  // Automated WhatsApp simulator trigger
  const triggerWhatsAppReminder = (type, name, phone, details) => {
    let msg = "";
    if (type === "Overdue") {
      msg = `Hello ${name}, this is a polite reminder from MindSpace Library. Your subscription renewal for Seat ${details} is overdue. Please renew via the tariff board or contact operational staff at Sector 62.`;
    } else {
      msg = `Hello ${name}, thank you for your enquiry at MindSpace Library. Your requested shift ${details} has been pre-allocated. Let us know when you'd like to visit to complete onboarding.`;
    }

    setCommModal({
      type,
      name,
      phone,
      details,
      msg
    });
  };

  const sendMockReminder = () => {
    setSendingComm(true);
    setTimeout(() => {
      setSendingComm(false);
      setCommModal(null);
      alert("Notification sent successfully! (WhatsApp/SMS simulated connection ok)");
    }, 1500);
  };

  // CRM Actions
  const handleApproveEnquiry = (id) => {
    const updated = enquiries.map((enq) => {
      if (enq.id === id) {
        return { ...enq, status: "Approved" };
      }
      return enq;
    });
    localStorage.setItem("mindspace_enquiries", JSON.stringify(updated));
    setEnquiries(updated);
  };

  const handleDeleteEnquiry = (id) => {
    const updated = enquiries.filter((enq) => enq.id !== id);
    localStorage.setItem("mindspace_enquiries", JSON.stringify(updated));
    setEnquiries(updated);
  };

  // Seat management
  const handleReserveVacantSeat = (e) => {
    e.preventDefault();
    const nameInput = e.target.occupantName.value;
    const phoneInput = e.target.occupantPhone.value;
    const shiftInput = e.target.occupantShift.value;

    if (!nameInput || !phoneInput || !shiftInput) return;

    const updated = seats.map((seat) => {
      if (seat.id === selectedSeat.id) {
        return {
          ...seat,
          state: shiftInput === "Full Day Access" ? "Reserved" : "Occupied",
          occupant: nameInput,
          phone: phoneInput,
          shiftType: shiftInput
        };
      }
      return seat;
    });

    localStorage.setItem("mindspace_seats", JSON.stringify(updated));
    setSeats(updated);
    setSelectedSeat(null);
  };

  const handleEvictSeat = (id) => {
    if (!confirm("Are you sure you want to release this seat? All occupant data will be wiped.")) return;

    const updated = seats.map((seat) => {
      if (seat.id === id) {
        return {
          ...seat,
          state: "Vacant",
          occupant: null,
          phone: "",
          shiftType: ""
        };
      }
      return seat;
    });

    localStorage.setItem("mindspace_seats", JSON.stringify(updated));
    setSeats(updated);
    setSelectedSeat(null);
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-[#1C2421] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent-aqua-core" />
      </div>
    );
  }

  // Calculated Stats for Admin (Aggregates)
  const totalSubscribers = seats.filter(s => s.state !== "Vacant").length;
  const monthlyRecurringIncome = (seats.filter(s => s.state === "Occupied").length * 599) + (seats.filter(s => s.state === "Reserved").length * 1099);
  const totalEnquiries = enquiries.length;
  const pendingEnquiriesCount = enquiries.filter(e => e.status === "Pending").length;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-primary font-body flex flex-col">
      
      {/* Top Banner Ribbon */}
      <div className="bg-[#1C2421] text-stone-300 py-3 px-8 text-xs flex justify-between items-center border-b border-stone-800">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-accent-birch-wood">DEMO SANDBOX CONSOLE</span>
          <div className="h-4 w-[1px] bg-stone-700" />
          <p className="text-[10px] text-stone-500">Current Role Mode: <strong className="text-white">{role}</strong></p>
        </div>
        <button
          onClick={toggleDemoRole}
          className="px-3 py-1 bg-white/10 hover:bg-accent-aqua-core hover:text-white rounded-md text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer"
        >
          Switch to {role === "Admin" ? "Staff" : "Admin"} View
        </button>
      </div>

      {/* Main Layout Header */}
      <header className="bg-white border-b border-stone-200/60 h-20 px-8 flex items-center justify-between shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 bg-white border border-stone-200 rounded-full overflow-hidden p-0.5 shadow-sm">
            <Image src="/assets/logo.jpg" alt="MindSpace Logo" fill className="object-contain" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-ink-primary uppercase tracking-wider">MindSpace Portal</h1>
            <p className="text-[10px] text-ink-muted uppercase tracking-widest font-semibold">{role} Control Matrix</p>
          </div>
        </div>

        {/* Navbar tab links for Staff or general view */}
        <div className="flex items-center gap-6">
          {role === "Staff" && (
            <div className="flex bg-bg-warm-secondary p-1.5 squircle-sm border border-stone-200">
              <button
                onClick={() => setActiveTab("seating")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "seating" ? "bg-white text-ink-primary shadow" : "text-ink-secondary hover:text-ink-primary"
                }`}
              >
                Seating Heatmap
              </button>
              <button
                onClick={() => setActiveTab("CRM")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
                  activeTab === "CRM" ? "bg-white text-ink-primary shadow" : "text-ink-secondary hover:text-ink-primary"
                }`}
              >
                CRM Router
                {pendingEnquiriesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-aqua-core text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {pendingEnquiriesCount}
                  </span>
                )}
              </button>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-right">
              <span className="text-xs font-semibold text-ink-secondary hidden sm:inline">{userName}</span>
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200">
                <User className="w-4 h-4 text-ink-secondary" />
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-stone-400 hover:text-red-500 rounded-full hover:bg-stone-50 cursor-pointer transition-colors"
              title="Logout Session"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Space */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8 flex flex-col gap-8">
        
        {/* =========================================================================
            ADMIN EXCLUSIVE VIEW
            ========================================================================= */}
        {role === "Admin" && (
          <div className="flex flex-col gap-8 animate-[fadeIn_0.4s_ease-out]">
            
            {/* 5-Card Financial Quadrant Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Card 1: Monthly Recurring Income */}
              <div className="bg-bg-warm-elevated border border-stone-200/50 p-6 squircle-sm shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-wider text-ink-muted font-bold">Monthly MRR</span>
                  <DollarSign className="w-4.5 h-4.5 text-accent-aqua-core" />
                </div>
                <div className="mt-4">
                  <h3 className="shrimp-display text-3xl text-ink-primary">₹{monthlyRecurringIncome.toLocaleString()}</h3>
                  <p className="text-[10px] text-green-600 font-semibold mt-1">Based on {totalSubscribers} active seats</p>
                </div>
              </div>

              {/* Card 2: Projected Upcoming Pipelines (15 Days) */}
              <div className="bg-bg-warm-elevated border border-stone-200/50 p-6 squircle-sm shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-wider text-ink-muted font-bold">Projected 15d</span>
                  <TrendingUp className="w-4.5 h-4.5 text-accent-birch-wood" />
                </div>
                <div className="mt-4">
                  <h3 className="shrimp-display text-3xl text-ink-primary">₹{(monthlyRecurringIncome * 0.45).toFixed(0).toLocaleString()}</h3>
                  <p className="text-[10px] text-ink-muted font-semibold mt-1">Scheduled dues next 15 days</p>
                </div>
              </div>

              {/* Card 3: Gross Lifetime Generation Volume */}
              <div className="bg-bg-warm-elevated border border-stone-200/50 p-6 squircle-sm shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-wider text-ink-muted font-bold">Gross Lifetime</span>
                  <Database className="w-4.5 h-4.5 text-ink-primary" />
                </div>
                <div className="mt-4">
                  <h3 className="shrimp-display text-3xl text-ink-primary">₹8,420,900</h3>
                  <p className="text-[10px] text-ink-muted font-semibold mt-1">Operational aggregate total</p>
                </div>
              </div>

              {/* Card 4: Total active subscribers */}
              <div className="bg-bg-warm-elevated border border-stone-200/50 p-6 squircle-sm shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-wider text-ink-muted font-bold">Active Members</span>
                  <Users className="w-4.5 h-4.5 text-indigo-500" />
                </div>
                <div className="mt-4">
                  <h3 className="shrimp-display text-3xl text-ink-primary">{totalSubscribers} / 48</h3>
                  <p className="text-[10px] text-ink-muted font-semibold mt-1">Space occupancy capacity</p>
                </div>
              </div>

              {/* Card 5: Inbound Leads */}
              <div className="bg-bg-warm-elevated border border-stone-200/50 p-6 squircle-sm shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-wider text-ink-muted font-bold">CRM Leads</span>
                  <MessageSquare className="w-4.5 h-4.5 text-accent-aqua-core" />
                </div>
                <div className="mt-4">
                  <h3 className="shrimp-display text-3xl text-ink-primary">{totalEnquiries} Leads</h3>
                  <p className="text-[10px] text-accent-birch-wood font-semibold mt-1">{pendingEnquiriesCount} awaiting review</p>
                </div>
              </div>
            </div>

            {/* Split layout: Chronological Overdues Panel vs Upcoming Renewal Tracking */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Chronological Overdues Alert Card Panel (7 Columns) */}
              <div className="lg:col-span-7 bg-white border border-stone-200/50 p-6 squircle-sm shadow-sm flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <h3 className="text-sm font-bold text-ink-primary uppercase tracking-wider">Chronological Overdues Alert Panel</h3>
                  </div>
                  <span className="bg-red-50 text-red-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-red-100">
                    High Risk Delinquencies
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-stone-100 text-ink-muted font-bold uppercase tracking-wider h-10">
                        <th className="pb-2">Member</th>
                        <th className="pb-2">Desk</th>
                        <th className="pb-2">Phone</th>
                        <th className="pb-2">Delinquency</th>
                        <th className="pb-2 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100/50">
                      {defaultOverdues.map((item, idx) => (
                        <tr key={idx} className="h-12 hover:bg-stone-50/50 transition-colors">
                          <td className="font-semibold text-ink-primary">{item.name}</td>
                          <td>
                            <span className="font-mono bg-stone-100 px-2.5 py-0.5 rounded-md text-[11px] font-bold border border-stone-200 text-ink-secondary">
                              {item.desk}
                            </span>
                          </td>
                          <td className="text-ink-secondary font-mono">{item.phone}</td>
                          <td className="text-red-500 font-bold">{item.daysOverdue} days late</td>
                          <td className="text-right font-bold text-ink-primary">₹{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Proactive Upcoming Renewal Dues Tracking Panel (5 Columns) */}
              <div className="lg:col-span-5 bg-white border border-stone-200/50 p-6 squircle-sm shadow-sm flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent-birch-wood" />
                  <h3 className="text-sm font-bold text-ink-primary uppercase tracking-wider">Proactive Upcoming Renewals (7 Days)</h3>
                </div>

                <div className="flex flex-col gap-4">
                  {defaultRenewals.map((renew, idx) => (
                    <div key={idx} className="bg-bg-warm-primary border border-stone-200/40 p-4 rounded-2xl flex items-center justify-between hover:border-accent-birch-wood transition-colors">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-ink-primary">{renew.name}</span>
                        <div className="flex gap-2 items-center">
                          <span className="text-[10px] text-ink-muted">{renew.shift}</span>
                          <span className="text-[10px] font-mono text-ink-muted">({renew.desk})</span>
                        </div>
                      </div>
                      <div className="text-right flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold text-accent-birch-wood uppercase tracking-wider">{renew.renewalDate}</span>
                        <span className="text-[10px] text-stone-500 font-semibold">({renew.daysLeft} days left)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}


        {/* =========================================================================
            STAFF OPERATIONAL WORKSPACE VIEW
            ========================================================================= */}
        {role === "Staff" && (
          <div className="flex flex-col gap-8 animate-[fadeIn_0.4s_ease-out]">
            
            {/* Tab: Seating Heatmap */}
            {activeTab === "seating" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* 1:1 Seating Heatmap Grid (8 Columns) */}
                <div className="lg:col-span-8 bg-white border border-stone-200/50 p-6 md:p-8 squircle-sm shadow-sm flex flex-col gap-6">
                  
                  {/* Legend */}
                  <div className="flex flex-wrap justify-between gap-4 items-center border-b border-stone-100 pb-4">
                    <div>
                      <h3 className="text-sm font-bold text-ink-primary uppercase tracking-wider">Interactive Seating Heatmap</h3>
                      <p className="text-[11px] text-ink-muted">A 1:1 digital layout representation of the physical library workspace.</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-md bg-green-500 inline-block border border-green-600/20" />
                        <span className="text-stone-600">Vacant</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-md bg-red-500 inline-block border border-red-600/20" />
                        <span className="text-stone-600">Occupied</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-md bg-accent-birch-wood inline-block border border-accent-birch-wood/30" />
                        <span className="text-stone-600">Full-Day</span>
                      </div>
                    </div>
                  </div>

                  {/* 48-Desk Grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mt-2">
                    {seats.map((seat) => {
                      let bgClass = "bg-green-500 hover:bg-green-600 text-white";
                      if (seat.state === "Occupied") {
                        bgClass = "bg-red-500 hover:bg-red-600 text-white";
                      } else if (seat.state === "Reserved") {
                        bgClass = "bg-accent-birch-wood hover:bg-[#c2a17b] text-white";
                      }

                      const isSelected = selectedSeat && selectedSeat.id === seat.id;

                      return (
                        <button
                          key={seat.id}
                          onClick={() => setSelectedSeat(seat)}
                          className={`aspect-square squircle-sm flex flex-col items-center justify-center text-xs font-bold font-mono transition-all border border-stone-200/20 hover:scale-[1.08] shadow-sm relative cursor-pointer ${bgClass} ${
                            isSelected ? "ring-4 ring-accent-aqua-core ring-offset-2 scale-[1.08]" : ""
                          }`}
                        >
                          <span className="text-[10px] opacity-75">Desk</span>
                          <span className="text-xs">{seat.id}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Desk Administration Sidebar (4 Columns) */}
                <div className="lg:col-span-4 bg-bg-warm-elevated border border-stone-200/50 p-6 squircle-sm shadow-sm flex flex-col gap-6 sticky top-28">
                  {selectedSeat ? (
                    <div className="flex flex-col gap-6">
                      <div className="flex justify-between items-start border-b border-stone-200/50 pb-4">
                        <div>
                          <h4 className="text-[10px] uppercase tracking-widest font-bold text-accent-birch-wood">Desk Administration</h4>
                          <span className="text-xl font-bold text-ink-primary font-mono">{selectedSeat.id}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          selectedSeat.state === "Vacant" ? "bg-green-100 text-green-700 border border-green-200" :
                          selectedSeat.state === "Occupied" ? "bg-red-100 text-red-700 border border-red-200" :
                          "bg-amber-100 text-amber-700 border border-amber-200"
                        }`}>
                          {selectedSeat.state}
                        </span>
                      </div>

                      {/* Display Occupant or Form to Reserve */}
                      {selectedSeat.state === "Vacant" ? (
                        <form onSubmit={handleReserveVacantSeat} className="flex flex-col gap-4">
                          <p className="text-xs text-ink-secondary leading-relaxed">This workstation is currently vacant. Enter user details below to route onboarding check-in.</p>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] uppercase tracking-widest font-bold text-ink-muted">Occupant Name</label>
                            <input
                              type="text"
                              required
                              name="occupantName"
                              placeholder="Harsh Goyal"
                              className="bg-white border border-stone-200 px-3 py-2.5 rounded-xl text-xs font-semibold outline-0 focus:border-accent-aqua-core"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] uppercase tracking-widest font-bold text-ink-muted">Mobile Phone</label>
                            <input
                              type="tel"
                              required
                              name="occupantPhone"
                              placeholder="9876543210"
                              className="bg-white border border-stone-200 px-3 py-2.5 rounded-xl text-xs font-semibold outline-0 focus:border-accent-aqua-core"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] uppercase tracking-widest font-bold text-ink-muted">Shift Routing</label>
                            <select
                              required
                              name="occupantShift"
                              className="bg-white border border-stone-200 px-3 py-2.5 rounded-xl text-xs font-semibold outline-0 focus:border-accent-aqua-core cursor-pointer"
                            >
                              <option value="Morning Shift">Morning Shift (₹599)</option>
                              <option value="Evening Shift">Evening Shift (₹599)</option>
                              <option value="Full Day Access">Full Day Access (₹1,099)</option>
                            </select>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 bg-accent-aqua-core hover:bg-[#009bc0] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow mt-2"
                          >
                            Assign Workstation
                          </button>
                        </form>
                      ) : (
                        <div className="flex flex-col gap-5">
                          <div className="bg-bg-warm-primary border border-stone-200/50 p-4 rounded-xl flex flex-col gap-3">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[9px] uppercase tracking-widest font-bold text-ink-muted">Current Occupant</span>
                              <span className="text-xs font-bold text-ink-primary">{selectedSeat.occupant}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[9px] uppercase tracking-widest font-bold text-ink-muted">Contact Coordinates</span>
                              <span className="text-xs font-mono text-ink-secondary">{selectedSeat.phone}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[9px] uppercase tracking-widest font-bold text-ink-muted">Allocated Shift Plan</span>
                              <span className="text-xs font-semibold text-accent-birch-wood">{selectedSeat.shiftType}</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => triggerWhatsAppReminder("Inquiry", selectedSeat.occupant, selectedSeat.phone, selectedSeat.id)}
                              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Dispatch WhatsApp Reminder</span>
                            </button>
                            <button
                              onClick={() => handleEvictSeat(selectedSeat.id)}
                              className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Release Workstation Seat</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-ink-muted gap-2">
                      <Grid className="w-8 h-8 text-stone-300" />
                      <p className="text-xs font-semibold">Select a seat block inside heatmap coordinates to execute administrative actions.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Tab: CRM Inquiry Router */}
            {activeTab === "CRM" && (
              <div className="bg-white border border-stone-200/50 p-6 md:p-8 squircle-sm shadow-sm flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-ink-primary uppercase tracking-wider">Inbound Enquiry CRM Action Router</h3>
                    <p className="text-[11px] text-ink-muted">Inbound lead inquiries synchronized directly from public landing page Enquiry Engine.</p>
                  </div>
                  <span className="bg-[#00A8CC]/10 text-accent-aqua-core text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-accent-aqua-core/20">
                    Live Payload Tracker
                  </span>
                </div>

                {enquiries.length === 0 ? (
                  <div className="text-center py-12 text-ink-muted text-xs font-semibold">
                    No lead inquiries active in localized database. Submit inquiries on landing page form.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-stone-100 text-ink-muted font-bold uppercase tracking-wider h-10">
                          <th className="pb-2">Enquiry ID</th>
                          <th className="pb-2">Identity / Name</th>
                          <th className="pb-2">Mobile Phone</th>
                          <th className="pb-2">Requested Shift</th>
                          <th className="pb-2">Timestamp</th>
                          <th className="pb-2">Status</th>
                          <th className="pb-2 text-right">CRM Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100/50">
                        {enquiries.map((enq) => (
                          <tr key={enq.id} className="h-14 hover:bg-stone-50/50 transition-colors">
                            <td className="font-bold text-ink-secondary font-mono">{enq.id}</td>
                            <td className="font-semibold text-ink-primary">{enq.name}</td>
                            <td className="font-mono text-ink-secondary">{enq.mobile}</td>
                            <td className="font-semibold text-accent-birch-wood">{enq.shift}</td>
                            <td className="text-ink-muted">{enq.date}</td>
                            <td>
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                                enq.status === "Pending" ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-green-50 text-green-600 border-green-200"
                              }`}>
                                {enq.status}
                              </span>
                            </td>
                            <td className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                {enq.status === "Pending" && (
                                  <button
                                    onClick={() => handleApproveEnquiry(enq.id)}
                                    className="p-1.5 bg-green-50 hover:bg-green-100 border border-green-200 text-green-600 rounded-lg cursor-pointer"
                                    title="Approve / Allocate Seat"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                <button
                                  onClick={() => triggerWhatsAppReminder("Inquiry", enq.name, enq.mobile, enq.shift)}
                                  className="p-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 rounded-lg cursor-pointer"
                                  title="Prefill WhatsApp Msg"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteEnquiry(enq.id)}
                                  className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg cursor-pointer"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </main>

      {/* WhatsApp Communication Notification Simulator Modal Overlay */}
      {commModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-md bg-white border border-stone-200 shadow-2xl rounded-[2rem] p-6 text-left flex flex-col gap-5 animate-[scaleIn_0.25s_ease-out]">
            
            <div className="flex justify-between items-start border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-ink-primary uppercase tracking-wider">Communication Simulator</h4>
                  <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">Type: WhatsApp API Gateway</p>
                </div>
              </div>
              <button
                onClick={() => setCommModal(null)}
                className="text-stone-400 hover:text-ink-primary"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 bg-bg-warm-primary p-4 rounded-2xl border border-stone-200/50">
              <div className="flex justify-between text-[10px] font-semibold text-ink-muted">
                <span>RECIPIENT: {commModal.name}</span>
                <span>PHONE: {commModal.phone}</span>
              </div>
              <div className="h-[1px] w-full bg-stone-200/50 my-1" />
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] uppercase tracking-widest font-bold text-accent-birch-wood">Payload Body Message</span>
                <textarea
                  readOnly
                  value={commModal.msg}
                  className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs text-ink-secondary font-medium leading-relaxed resize-none outline-none h-28"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-1">
              <button
                onClick={() => setCommModal(null)}
                className="py-3 border border-stone-200 hover:bg-stone-50 text-ink-secondary text-xs uppercase font-bold tracking-wider rounded-xl cursor-pointer"
              >
                Cancel Dispatch
              </button>
              <button
                onClick={sendMockReminder}
                disabled={sendingComm}
                className="py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase font-bold tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                {sendingComm ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Package</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Dashboard Footer */}
      <footer className="bg-white border-t border-stone-200/60 py-6 text-center text-[10px] text-ink-muted">
        MindSpace Operations Console (Sector 62). System authenticated on node address ff6bcbea-0276-400a-b51c-e67f918fa48b.
      </footer>
    </div>
  );
}
