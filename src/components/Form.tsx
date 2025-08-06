import React, { useState, useEffect, type FC } from "react";
import type { UserForm } from "./User/User.form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface FormProps {
  handleAdd: (newStudent: UserForm) => void;
  handleUpdate: (updatedStudent: UserForm) => void;
  editingStudent?: UserForm | null;
}

const initialState: Omit<UserForm, "id"> = {
  fullName: "",
  email: "",
  password: "",
  birthDate: "",
  gender: "male",
};

const Form: FC<FormProps> = ({ handleAdd, editingStudent, handleUpdate }) => {
  const [formData, setFormData] = useState<Omit<UserForm, "id">>(initialState);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      const { id, ...rest } = editingStudent;
      setFormData(rest);
    } else {
      setFormData(initialState);
    }
  }, [editingStudent]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      handleUpdate({ id: editingStudent.id, ...formData });
    } else {
      handleAdd({ id: Date.now(), ...formData });
    }
    setFormData(initialState);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {editingStudent ? "Edit Student" : "Add New Student"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="birthDate"
            className="block text-gray-700 font-semibold mb-2"
          >
            Birth Date
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-gray-700 font-semibold mb-2"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          {editingStudent ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default React.memo(Form);
