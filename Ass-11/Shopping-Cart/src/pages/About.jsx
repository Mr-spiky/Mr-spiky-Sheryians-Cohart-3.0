import React from "react";
import { Link } from "react-router";

const features = [
    { 
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />, 
        title: "Free Shipping", 
        desc: "On all orders above $50. Fast and reliable delivery right to your doorstep." 
    },
    { 
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />, 
        title: "Easy Returns", 
        desc: "30-day hassle-free return policy on every product. We want you to be 100% satisfied." 
    },
    { 
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />, 
        title: "24/7 Support", 
        desc: "Our support team is always here to help you out, anytime, anywhere." 
    },
];

const team = [
    { name: "Nandani Pande", role: "Founder & CEO", color: "bg-indigo-600" },
    { name: "Riya Sharma", role: "Head of Design", color: "bg-emerald-600" },
    { name: "Arjun Mehta", role: "Lead Developer", color: "bg-rose-600" },
    { name: "Aisha Khan", role: "Marketing Director", color: "bg-amber-600" }
];

const stats = [
    { label: "Happy Customers", value: "50K+" },
    { label: "Products Available", value: "2,000+" },
    { label: "Brands Partnered", value: "150+" },
    { label: "Years in Business", value: "5" },
];

const About = () => {
    return (
        <div className="text-white pb-20">

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gray-900 border-b border-gray-800 pt-20 pb-24 px-8 text-center">
                <div className="max-w-3xl mx-auto relative z-10">
                    <p className="text-indigo-400 font-semibold tracking-widest uppercase text-xs mb-4">Our Mission</p>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Redefining the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            Ecommerce Experience
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                        ShopNow started with a simple idea — shopping online should be fast, honest, and enjoyable. 
                        We curate only the best products across fashion, electronics, and lifestyle.
                    </p>
                </div>
                {/* Decorative background elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>
            </div>

            {/* Stats Strip */}
            <div className="max-w-5xl mx-auto px-8 -mt-12 relative z-20 mb-20">
                <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-700/50">
                    {stats.map((stat, idx) => (
                        <div key={idx} className={`text-center ${idx % 2 === 0 ? "border-none md:border-solid" : ""} ${idx === 0 ? "border-none" : ""}`}>
                            <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div className="max-w-6xl mx-auto px-8 mb-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why Choose ShopNow?</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm">We are committed to providing the best shopping experience possible, focusing on quality, speed, and customer satisfaction.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f) => (
                        <div key={f.title} className="bg-gray-900 border border-gray-800 hover:border-indigo-500/50 transition-colors rounded-2xl p-8 group">
                            <div className="w-14 h-14 bg-gray-800 group-hover:bg-indigo-600/20 rounded-xl flex items-center justify-center mb-6 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {f.icon}
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team */}
            <div className="max-w-6xl mx-auto px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold mb-3">Meet the Team</h2>
                        <p className="text-gray-400 text-sm max-w-lg">The passionate people working behind the scenes to make your shopping experience seamless.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member) => (
                        <div key={member.name} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                            <div className={`w-20 h-20 rounded-full ${member.color} flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg ring-4 ring-gray-800`}>
                                {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h3 className="text-white font-bold text-lg">{member.name}</h3>
                            <p className="text-indigo-400 text-xs font-medium uppercase tracking-wider mt-1">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-4xl mx-auto px-8 mt-24">
                <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 rounded-3xl p-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to start shopping?</h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">Join thousands of satisfied customers and discover the best products curated just for you.</p>
                    <Link to="/" className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-lg">
                        Explore Our Store
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default About;
