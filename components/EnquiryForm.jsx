"use client";

import { useState } from "react";
import { CheckCircle2, User, Phone, Calendar, Loader2 } from "lucide-react";

export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [shift, setShift] = useState("");
  const [isFocused, setIsFocused] = useState({ name: false, mobile: false, shift: false });
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const handleMobileChange = (e) => {
    // Client-side numeric filter
    const val = e.target.value.replace(/[^0-9]/g, "");
    setMobile(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !mobile || !shift) return;

    setStatus("submitting");

    // Simulate database payload latency
    setTimeout(() => {
      // Fetch existing mock database records from local storage
      const existing = JSON.parse(localStorage.getItem("mindspace_enquiries") || "[]");
      
      const newEnquiry = {
        id: "ENQ-" + Math.floor(1000 + Math.random() * 9000),
        name,
        mobile,
        shift,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "Pending",
      };

      existing.unshift(newEnquiry);
      localStorage.setItem("mindspace_enquiries", JSON.stringify(existing));

      // Also create a check-in sheet record if useful or add to user statistics
      const seats = JSON.parse(localStorage.getItem("mindspace_seats") || "[]");
      // Add check-in or seat allocation in dashboard if needed
      
      setStatus("success");
      
      // Reset form fields
      setName("");
      setMobile("");
      setShift("");

      // Revert button status back to idle after a few seconds
      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    }, 1200);
  };

  return (
    <section id="lead-capture-crm-payload" className="py-32 bg-[#FDFBF7] relative">
      <div className="w-full max-w-4xl mx-auto px-6">
        
        {/* Card Wrapper Container */}
        <div className="bg-bg-warm-elevated border border-stone-200/50 p-8 md:p-12 squircle-md shadow-lg flex flex-col gap-10">
          
          {/* Header */}
          <div className="flex flex-col gap-2 items-center text-center">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-accent-birch-wood bg-accent-birch-light/50 px-4 py-1 rounded-full">
              CRM Pipeline Connection
            </span>
            <h2 className="shrimp-display text-4xl md:text-5xl text-ink-primary font-bold">
              FLUID ENQUIRY ENGINE
            </h2>
            <p className="text-xs md:text-sm text-ink-secondary max-w-md">
              Submit details to check shift availability. Payload synchronizes with the Staff Portal CRM instantly.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Field 1: Name */}
              <div 
                className={`input-frame-wrapper border border-stone-200 bg-bg-warm-primary px-5 py-4 squircle-sm relative transition-all duration-300 ${
                  isFocused.name ? "aura-glow-illuminated" : "hover:border-stone-300"
                }`}
              >
                {/* Float label */}
                <label 
                  htmlFor="name-input"
                  className={`absolute left-5 transition-all duration-300 pointer-events-none select-none text-xs font-semibold ${
                    isFocused.name || name 
                      ? "top-2 text-accent-birch-wood scale-90" 
                      : "top-1/2 -translate-y-1/2 text-ink-muted text-sm"
                  }`}
                >
                  Full Identity / Name
                </label>
                <div className="flex items-center gap-3 mt-1.5">
                  <User className="w-4 h-4 text-ink-muted shrink-0" />
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={name}
                    onFocus={() => setIsFocused(prev => ({ ...prev, name: true }))}
                    onBlur={() => setIsFocused(prev => ({ ...prev, name: false }))}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-0 outline-0 p-0 text-sm text-ink-primary font-medium"
                    placeholder={(isFocused.name) ? "e.g., Harsh Goyal" : ""}
                  />
                </div>
              </div>

              {/* Field 2: Mobile */}
              <div 
                className={`input-frame-wrapper border border-stone-200 bg-bg-warm-primary px-5 py-4 squircle-sm relative transition-all duration-300 ${
                  isFocused.mobile ? "aura-glow-illuminated" : "hover:border-stone-300"
                }`}
              >
                {/* Float label */}
                <label 
                  htmlFor="mobile-input"
                  className={`absolute left-5 transition-all duration-300 pointer-events-none select-none text-xs font-semibold ${
                    isFocused.mobile || mobile 
                      ? "top-2 text-accent-birch-wood scale-90" 
                      : "top-1/2 -translate-y-1/2 text-ink-muted text-sm"
                  }`}
                >
                  Communication Mobile
                </label>
                <div className="flex items-center gap-3 mt-1.5">
                  <Phone className="w-4 h-4 text-ink-muted shrink-0" />
                  <input
                    id="mobile-input"
                    type="tel"
                    required
                    maxLength={10}
                    value={mobile}
                    onFocus={() => setIsFocused(prev => ({ ...prev, mobile: true }))}
                    onBlur={() => setIsFocused(prev => ({ ...prev, mobile: false }))}
                    onChange={handleMobileChange}
                    className="w-full bg-transparent border-0 outline-0 p-0 text-sm text-ink-primary font-medium"
                    placeholder={(isFocused.mobile) ? "e.g., 9876543210" : ""}
                  />
                </div>
              </div>

            </div>

            {/* Field 3: Shift Router Dropdown */}
            <div 
              className={`input-frame-wrapper border border-stone-200 bg-bg-warm-primary px-5 py-4 squircle-sm relative transition-all duration-300 ${
                isFocused.shift ? "aura-glow-illuminated" : "hover:border-stone-300"
              }`}
            >
              {/* Float label */}
              <label 
                htmlFor="shift-select"
                className={`absolute left-5 transition-all duration-300 pointer-events-none select-none text-xs font-semibold ${
                  isFocused.shift || shift 
                    ? "top-2 text-accent-birch-wood scale-90" 
                    : "top-1/2 -translate-y-1/2 text-ink-muted text-sm"
                }`}
              >
                Shift Selection Routing
              </label>
              <div className="flex items-center gap-3 mt-1.5">
                <Calendar className="w-4 h-4 text-ink-muted shrink-0" />
                <select
                  id="shift-select"
                  required
                  value={shift}
                  onFocus={() => setIsFocused(prev => ({ ...prev, shift: true }))}
                  onBlur={() => setIsFocused(prev => ({ ...prev, shift: false }))}
                  onChange={(e) => setShift(e.target.value)}
                  className="w-full bg-transparent border-0 outline-0 p-0 text-sm text-ink-primary font-medium appearance-none cursor-pointer"
                >
                  <option value="" disabled hidden></option>
                  <option value="Morning Shift (₹599)">Morning Shift [08:00 AM - 02:00 PM] - ₹599</option>
                  <option value="Evening Shift (₹599)">Evening Shift [03:00 PM - 09:00 PM] - ₹599</option>
                  <option value="Full Day Access (₹1,099)">Full Day Access [08:00 AM - 10:00 PM] - ₹1,099</option>
                </select>
              </div>
            </div>

            {/* Submit Button with feedback animations */}
            <div className="mt-4 flex justify-center">
              {status === "idle" && (
                <button
                  type="submit"
                  className="px-12 py-4 bg-gradient-to-r from-accent-aqua-core to-[#14B8A6] text-white text-xs uppercase tracking-widest font-bold squircle-sm transition-all duration-300 hover:shadow-lg active:scale-[0.98] cursor-pointer"
                >
                  Submit Inquiry Payload
                </button>
              )}

              {status === "submitting" && (
                <button
                  type="button"
                  disabled
                  className="px-12 py-4 bg-[#00A8CC]/80 text-white text-xs uppercase tracking-widest font-bold squircle-sm flex items-center gap-3 justify-center"
                >
                  <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  <span>Synchronizing...</span>
                </button>
              )}

              {status === "success" && (
                <button
                  type="button"
                  disabled
                  className="px-12 py-4 bg-green-500 text-white text-xs uppercase tracking-widest font-bold squircle-sm flex items-center gap-3 justify-center shadow-lg border border-green-400"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Payload Secured</span>
                </button>
              )}
            </div>

          </form>

        </div>
      </div>
    </section>
  );
}
