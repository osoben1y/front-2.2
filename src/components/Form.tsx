import React, { useState, type FC } from "react";
import type { UserForm } from "./User/User.form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface FormProps {
  handleAdd: (newStudent: UserForm) => void;
}

const initialState: Omit<UserForm, "id"> = {
  fullName: "",
  email: "",
  password: "",
  birthDate: "",
  gender: "male",
};

const Form: FC<FormProps> = ({ handleAdd }) => {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: UserForm = {
      id: Date.now(),
      ...formData,
    };
    handleAdd(newStudent);
    setFormData(initialState);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Add New Student
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            type="text"
            placeholder="e.g. John Doe"
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="e.g. john@example.com"
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="birthDate">
            Birth Date
          </label>
          <input
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            type="date"
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default React.memo(Form);
