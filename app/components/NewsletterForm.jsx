"use client";

import React, { useState } from "react";

export default function NewsletterForm() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState({ loading: false, success: null, message: "" });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = (form.email || "").trim();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus({ loading: false, success: false, message: 'Please enter a valid email.' });
      return;
    }

    setStatus({ loading: true, success: null, message: '' });

    try {
      const res = await fetch('/api/newslates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), name: form.name.trim(), source: 'footer' }),
      });

      // Try JSON first, fall back to text so we never throw on HTML error pages
      let payload = null;
      try {
        payload = await res.json();
      } catch (parseErr) {
        const text = await res.text().catch(() => null);
        console.warn('newslates: failed to parse JSON response, falling back to text.', parseErr, text);
        if (res.ok) {
          setStatus({ loading: false, success: true, message: 'Subscribed!' });
          setForm({ name: '', email: '' });
          setTimeout(() => setStatus({ loading: false, success: null, message: '' }), 5000);
          return;
        }
        setStatus({ loading: false, success: false, message: text || 'Subscription failed' });
        return;
      }

      if (res.ok) {
        setStatus({ loading: false, success: true, message: payload?.message || 'Subscribed!' });
        setForm({ name: '', email: '' });
        setTimeout(() => setStatus({ loading: false, success: null, message: '' }), 5000);
      } else {
        setStatus({ loading: false, success: false, message: payload?.error || payload?.message || 'Subscription failed' });
      }
    } catch (err) {
      console.error('newslates submit error:', err);
      setStatus({ loading: false, success: false, message: 'Network error. Try again.' });
    }
  };

  return (
    <form className="mb-10" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="Your name (optional)"
          className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl placeholder-white/70 text-white py-3 px-4 outline-none focus:border-white/50 focus:bg-white/30 transition-all duration-300"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Enter your email"
          className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl placeholder-white/70 text-white py-3 px-4 outline-none focus:border-white/50 focus:bg-white/30 transition-all duration-300"
        />
      </div>

      {status.message && (
        <div className={`mb-4 text-sm ${status.success ? 'text-green-300' : 'text-red-300'}`}>{status.message}</div>
      )}

      <button
        type="submit"
        className="w-full bg-white text-[#001E5F] rounded-2xl px-8 py-4 font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
        disabled={status.loading}
      >
        {status.loading ? 'Subscribing...' : 'Subscribe Now'}
      </button>
    </form>
  );
}
