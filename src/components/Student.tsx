import React, { type FC } from "react";
import type { UserForm } from "./User/User.form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

interface StudentProps {
  data: UserForm[];
  handleDelete: (id: number) => void;
  handleEdit: (student: UserForm) => void;
}

const Student: FC<StudentProps> = ({ data, handleDelete, handleEdit }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-[#1E293B] mb-6">
        Student List
      </h2>

      <div className="overflow-x-auto rounded-xl bg-white/10 backdrop-blur-md border border-white/30 shadow-lg">
        <table className="w-full text-sm text-left text-[#1E293B]">
          <thead className="bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] text-[#1E293B]">
            <tr>
              <th className="px-4 py-3 font-semibold">№</th>
              <th className="px-4 py-3 font-semibold">Full Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Password</th>
              <th className="px-4 py-3 font-semibold">Birth Date</th>
              <th className="px-4 py-3 font-semibold">Gender</th>
              <th className="px-4 py-3 text-center font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/20">
            {data.map((student, index) => (
              <tr
                key={student.id}
                className="hover:bg-white/20 transition-colors duration-300"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{student.fullName}</td>
                <td className="px-4 py-3">{student.email}</td>
                <td className="px-4 py-3">{student.password}</td>
                <td className="px-4 py-3">{student.birthDate}</td>
                <td className="px-4 py-3 capitalize">{student.gender}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-4">
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
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 italic text-[#1E293B]/60"
                >
                  No students available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(Student);
