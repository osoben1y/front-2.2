import React, { type FC } from "react";
import type { UserForm } from "./User/User.form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import maleImg from "../assets/male.png";
import femaleImg from "../assets/female.png";

interface StudentProps {
  data: UserForm[];
  handleDelete: (id: number) => void;
  handleEdit: (student: UserForm) => void;
}

const Student: FC<StudentProps> = ({ data, handleDelete, handleEdit }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-[#1E293B] mb-8">
        Student List
      </h2>

      {data.length === 0 ? (
        <p className="text-center py-6 italic text-[#1E293B]/60">
          No students available
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((student, index) => {
            const genderImg = student.gender === "female" ? femaleImg : maleImg;

            return (
              <div
                key={student.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-md transition hover:shadow-xl hover:bg-white/20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={genderImg}
                    alt={student.gender}
                    className="w-14 h-14 rounded-full object-cover border border-white/30"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-[#1E293B]">
                      {index + 1}. {student.fullName}
                    </h3>
                    <p className="text-sm text-gray-700 capitalize mt-1">
                      {student.gender}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[#1E293B] mb-1">
                  <strong>Email:</strong> {student.email}
                </p>
                <p className="text-sm text-[#1E293B] mb-3">
                  <strong>Password:</strong> {student.password}
                </p>

                <div className="flex items-center justify-end gap-4 mt-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="text-blue-700 hover:text-blue-900 transition"
                    title="Edit student"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete student"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default React.memo(Student);
