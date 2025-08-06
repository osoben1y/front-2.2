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

  const handlePageButton = () => {
    setPage((prev) => !prev);
  };

  const handleAddStudent = (newStudent: UserForm) => {
    setData((prev) => [...prev, newStudent]);
    setPage(true);
  };

  const handleDeleteStudent = (id: number) => {
    setData((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <section className="w-full min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex gap-4 mb-8 bg-white p-2 rounded-lg shadow-md border border-gray-200">
          <button
            onClick={handlePageButton}
            className={`px-6 py-2 rounded-md font-semibold transition-all duration-900 ${
              page
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-green-100"
            }`}
          >
            Student List
          </button>
          <button
            onClick={handlePageButton}
            className={`px-6 py-2 rounded-md font-semibold transition-all duration-900 ${
              !page
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-green-100"
            }`}
          >
            Add Form
          </button>
        </div>

        <div className="w-full">
          {page ? (
            <Student data={data} handleDelete={handleDeleteStudent} />
          ) : (
            <Form handleAdd={handleAddStudent} />
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Main);
