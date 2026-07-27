import React, { useState } from "react";

const contactInfo = [
    { icon: "📧", label: "Email", value: "support@shopzone.com" },
    { icon: "📞", label: "Phone", value: "+91 98765 43210" },
    { icon: "📍", label: "Location", value: "Mumbai, India" },
];

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app this would call an API
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="px-8 py-14 text-white">

            <p className="text-indigo-500 text-sm font-medium uppercase tracking-widest mb-3">Get in Touch</p>
            <h1 className="text-4xl font-bold mb-12">We'd love to <br /> hear from you.</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Contact Form */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-12">
                            <p className="text-4xl mb-4">✅</p>
                            <h3 className="text-white font-semibold text-lg mb-2">Message Sent!</h3>
                            <p className="text-gray-400 text-sm">We'll get back to you within 24 hours.</p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="mt-6 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div>
                                <label className="text-xs text-gray-400 font-medium block mb-1.5">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Shivam Patel"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 font-medium block mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="you@example.com"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 font-medium block mb-1.5">Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Write your message here..."
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    )}
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-4">
                    {contactInfo.map((info) => (
                        <div key={info.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-4">
                            <span className="text-2xl">{info.icon}</span>
                            <div>
                                <p className="text-xs text-gray-500 font-medium mb-0.5">{info.label}</p>
                                <p className="text-white text-sm font-medium">{info.value}</p>
                            </div>
                        </div>
                    ))}

                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mt-2">
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Our support team is available <span className="text-white font-medium">Monday – Saturday, 9am – 6pm IST</span>.
                            We typically respond within a few hours.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;
