import React from "react";
import { useResume } from "../../context/ResumeContext";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkedAlt, FaLinkedin, FaGlobe } from "react-icons/fa";

const PersonalInfoEditor: React.FC = () => {
    const { resume, updatePersonal } = useResume();
    const { personal } = resume;

    const handleChange = (field: keyof typeof personal) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        updatePersonal({ [field]: e.target.value });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                    <FaUser className="text-xl" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900"> Personal Information</h2>
                    <p className="text-sm text-gray-500">Enter your basic contact details</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                    </label>
                    <input
                        type="text"
                        value={personal.firstName}
                        onChange={handleChange('firstName')}
                        className="input-field"
                        placeholder="John"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                    </label>
                    <input
                        type="text"
                        value={personal.lastName}
                        onChange={handleChange('lastName')}
                        className="input-field"
                        placeholder="Doe"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Professional Title
                </label>
                <input
                    type="text"
                    value={personal.title}
                    onChange={handleChange('title')}
                    className="input-field"
                    placeholder="Senior Full-Stack Developer"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                </label>
                <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="email"
                        value={personal.email}
                        onChange={handleChange('email')}
                        className="input-field pl-10"
                        placeholder="john.doe@email.com"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                </label>
                <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="tel"
                        value={personal.phone}
                        onChange={handleChange('phone')}
                        className="input-field pl-10"
                        placeholder="+1 (555) 123-4567"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                </label>
                <div className="relative">
                    <FaMapMarkedAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={personal.location}
                        onChange={handleChange('location')}
                        className="input-field pl-10"
                        placeholder="San Francisco, CA"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Linkdean Profile
                </label>
                <div className="relative">
                    <FaLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={personal.linkedin}
                        onChange={handleChange('linkedin')}
                        className="input-filed pl-10"
                        placeholder="linkedin.com/in/username"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Portfolio Website
                </label>
                <div className="relative">
                    <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={personal.portfolio}
                        className="input-field pl-10"
                        placeholder="johndoe.dev"
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoEditor;
