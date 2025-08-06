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
    <div className="w-full max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Student List</h2>
      <div className="overflow-x-auto shadow-md rounded-xl border border-gray-200">
        <table className="w-full text-left text-sm bg-white">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-3">№</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Password</th>
              <th className="px-4 py-3">Birth Date</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((student, index) => (
              <tr key={student.id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{student.fullName}</td>
                <td className="px-4 py-3">{student.email}</td>
                <td className="px-4 py-3">{student.password}</td>
                <td className="px-4 py-3">{student.birthDate}</td>
                <td className="px-4 py-3 capitalize">{student.gender}</td>
                <td className="px-4 py-3 text-center flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleEdit(student)}
                    className="text-blue-600 hover:text-blue-800 transition"
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
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500 italic">
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
