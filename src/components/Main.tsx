import React, { useState } from "react";
import Form from "./Form";
import Student from "./Student";
import type { UserForm } from "./User/User.form";

const Main: React.FC = () => {
  const [page, setPage] = useState(true);
  const [data, setData] = useState<UserForm[]>([
    {
      id: 1,
      fullName: "umarxoja",
      email: "umarxoja@gmail.com",
      password: "bilmadim",
      birthDate: "1999-12-31",
      gender: "male",
    },
    {
      id: 2,
      fullName: "Bobur Mirzo",
      email: "boburmirzo@gmail.com",
      password: "bilmadim",
      birthDate: "1999-12-31",
      gender: "male",
    },
  ]);

  const [editingStudent, setEditingStudent] = useState<UserForm | null>(null);

  const handlePageButton = () => {
    setPage((prev) => !prev);
    setEditingStudent(null);
  };

  const handleAddStudent = (newStudent: UserForm) => {
    setData((prev) => [...prev, newStudent]);
    setPage(true);
  };

  const handleDeleteStudent = (id: number) => {
    setData((prev) => prev.filter((student) => student.id !== id));
  };

  const handleEditClick = (student: UserForm) => {
    setEditingStudent(student);
    setPage(false);
  };

  const handleUpdateStudent = (updatedStudent: UserForm) => {
    setData((prev) =>
      prev.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setEditingStudent(null);
    setPage(true);
  };

  return (
    <section className="w-full min-h-screen py-10 px-4 bg-gradient-to-br from-[#43C6AC] to-[#F8FFAE]">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex gap-4 mb-8 bg-white p-2 rounded-lg shadow-md border border-gray-200">
          <button
            onClick={handlePageButton}
            className={`px-6 py-2 rounded-md font-semibold bg-gradient-to-br from-[#43C6AC] to-[#F8FFAE] transition-all duration-900 ${
              page
                ? "text-gray-800 "
                : "text-white  "
            }`}
          >
            Student List
          </button>
          <button
            onClick={() => {
              setEditingStudent(null);
              setPage(false);
            }}
            className={`px-6 py-2 rounded-md font-semibold bg-gradient-to-br from-[#43C6AC] to-[#F8FFAE] transition-all duration-900 ${
              !page && !editingStudent
                ? "text-gray-800"
                : " text-white "
            }`}
          >
            Add Form
          </button>
        </div>

        <div className="w-full">
          {page ? (
            <Student
              data={data}
              handleDelete={handleDeleteStudent}
              handleEdit={handleEditClick}
            />
          ) : (
            <Form
              handleAdd={handleAddStudent}
              editingStudent={editingStudent}
              handleUpdate={handleUpdateStudent}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Main);
