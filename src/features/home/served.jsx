import { useState } from "react";
import {
    Users,
    BadgeCheck,
    Globe,
    ArrowRight,
    ChevronDown,
} from "lucide-react";

export default function SuccessStatsSection() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        course: "",
        purpose: "",
        agree: true,
    });

    const stats = [
        {
            icon: Users,
            value: "10,000+",
            label: "Professionals Trained",
        },
        {
            icon: BadgeCheck,
            value: "90%",
            label: "Success Rate",
        },
        {
            icon: Globe,
            value: "5+",
            label: "Countries",
        },
    ];

    return (
        <section className="py-10 bg-white">
            <div className="mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-2xl">

                <div className="grid lg:grid-cols-2">

                    {/* LEFT PANEL */}

                    <div className="relative bg-blue-900 p-12">

                        <h2 className="text-2xl font-semibold text-white leading-tight">
                            We have successfully served
                        </h2>

                        <div className="mt-14 grid grid-cols-2 gap-8">

                            {stats.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={index}
                                        className="rounded-3xl bg-white/10 backdrop-blur-md p-4 border border-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                                    >
                                        <div className="flex h-11 w-14 items-center justify-center rounded-xl bg-white/15 text-orange-300">
                                            <Icon size={28} />
                                        </div>

                                        <h3 className="mt-5 text-xl font-bold text-white">
                                            {item.value}
                                        </h3>

                                        <p className="mt-2 text-white/80">
                                            {item.label}
                                        </p>
                                    </div>
                                );
                            })}

                            {/* Decorative Card */}

                            {/* <div className="rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md" /> */}
                        </div>

                        {/* Decorative circles */}

                        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-orange-400/20 blur-3xl" />
                        <div className="absolute bottom-0 left-0 h-50 w-72 rounded-full bg-blue-500/20 blur-3xl" />

                    </div>

                    {/* RIGHT PANEL */}

                    <div className="bg-white p-12">

                        <h2 className="text-2xl font-bold text-slate-900">
                            Drop a Query
                        </h2>

                        <form className="mt-5 space-y-6">

                            {/* Name */}

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Email */}

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Phone */}

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Phone Number
                                </label>

                                <div className="flex h-11 rounded-xl border border-slate-300 overflow-hidden">

                                    <div className="flex items-center gap-2 border-r px-4 bg-slate-50">
                                        +91
                                        <ChevronDown size={16} />
                                    </div>

                                    <input
                                        type="text"
                                        className="flex-1 px-4 outline-none"
                                        placeholder="Phone Number"
                                    />
                                </div>
                            </div>              {/* Course */}

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Course
                                </label>

                                <div className="relative">
                                    <select
                                        className="h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                        defaultValue=""
                                    >
                                        <option value="">Select a Course</option>
                                        <option>Data Science</option>
                                        <option>Artificial Intelligence</option>
                                        <option>Cloud Computing</option>
                                        <option>Cyber Security</option>
                                        <option>Project Management</option>
                                    </select>

                                    <ChevronDown
                                        size={18}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                    />
                                </div>
                            </div>

                            {/* Purpose */}

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Purpose
                                </label>

                                <div className="relative">
                                    <select
                                        className="h-11 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                        defaultValue=""
                                    >
                                        <option value="">Select Purpose</option>
                                        <option>Career Guidance</option>
                                        <option>Course Information</option>
                                        <option>Fee Details</option>
                                        <option>Corporate Training</option>
                                        <option>Placement Support</option>
                                    </select>

                                    <ChevronDown
                                        size={18}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                    />
                                </div>
                            </div>

                            {/* Terms */}

                            <label className="flex items-start gap-3 text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="mt-1 h-4 w-4 rounded border-slate-300 accent-orange-500"
                                />

                                <span>
                                    I agree to the{" "}
                                    <a
                                        href="/terms"
                                        className="font-medium text-blue-700 underline"
                                    >
                                        Terms & Conditions
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="/privacy"
                                        className="font-medium text-blue-700 underline"
                                    >
                                        Privacy Policy
                                    </a>.
                                </span>
                            </label>

                            {/* Submit */}

                            <button
                                type="submit"
                                className="flex h-11 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-blue-600 text-lg font-semibold text-white shadow-xl transition duration-300 hover:scale-[1.02] hover:shadow-2xl"
                            >
                                Submit
                                <ArrowRight size={20} />
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}