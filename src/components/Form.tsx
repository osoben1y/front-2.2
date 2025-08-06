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
    <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/30">
      <h2 className="text-3xl font-bold text-center text-[#1E293B] mb-6">
        {editingStudent ? "Edit Student" : "Add New Student"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5 ">
        <div>
          <label htmlFor="fullName" className="block text-[#1E293B] font-semibold mb-2">
            * Full name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Umarxoja Karimov"
            className="w-full px-3 py-2 border  text-[#1E293B] bg-transparent rounded-lg placeholder-[#1E293B]/60 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/50"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-[#1E293B] font-semibold mb-2">
            * Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. example@mail.com"
            className="w-full px-3 py-2 border  text-[#1E293B] bg-transparent rounded-lg placeholder-[#1E293B]/60 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/50"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-[#1E293B] font-semibold mb-2">
            * Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="**********"
              className="w-full px-3 py-2 border  text-[#1E293B] bg-transparent rounded-lg placeholder-[#1E293B]/60 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#1E293B]/70 hover:text-[#1E293B]"
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
          <label htmlFor="gender" className="block text-[#1E293B] font-semibold mb-2">
            * Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border text-[#1E293B] bg-transparent rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white/50"
          >
            <option className="text-black" value="male">Male</option>
            <option className="text-black" value="female">Female</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg font-semibold text-[#1E293B] 
             bg-[#6fd884] hover:bg-[#43C6AC]
             transition-all duration-300 ease-in-out
             shadow-md hover:shadow-lg transform hover:scale-[1.02]"
        >
          {editingStudent ? "Update student" : "Create student"}
        </button>

      </form>
    </div>
  );
};

export default React.memo(Form);
