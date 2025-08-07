import React, { useState } from "react";
import Form from "./Form";
import Student from "./Student";
import type { UserForm } from "./User/User.form";

const Main: React.FC = () => {
  const [page, setPage] = useState(true);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<UserForm[]>([
    {
      id: 1,
      fullName: "Jasur Xudoyberdiyev",
      email: "jasurx99@gmail.com",
      password: "alphaTiger23",
      birthDate: "1998-06-14",
      gender: "male",
    },
    {
      id: 2,
      fullName: "Nodira Mahmudova",
      email: "nodira.mh@gmail.com",
      password: "sunnyQueen45",
      birthDate: "2001-11-29",
      gender: "female",
    },
    {
      id: 3,
      fullName: "Otabek Rustamov",
      email: "otabek_r@gmail.com",
      password: "strongHorse91",
      birthDate: "1996-03-08",
      gender: "male",
    },
    {
      id: 4,
      fullName: "Dilnoza Qodirova",
      email: "dilnoza.q@gmail.com",
      password: "moonLight66",
      birthDate: "2003-09-22",
      gender: "female",
    },
    {
      id: 5,
      fullName: "Shahzodbek Karimov",
      email: "shahzod_krm@gmail.com",
      password: "qwertyK123",
      birthDate: "1999-12-03",
      gender: "male",
    },
    {
      id: 6,
      fullName: "Zilola Erkinova",
      email: "zilola.er@gmail.com",
      password: "flowerGirl88",
      birthDate: "2002-04-17",
      gender: "female",
    },
  ]);

  const [editingStudent, setEditingStudent] = useState<UserForm | null>(null);

  const handlePageButton = () => {
    setPage((prev) => !prev);
    setEditingStudent(null);
    setSearch("");
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

  const filteredData = data.filter((student) =>
    student.fullName.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="w-full min-h-screen py-10 px-4 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE]">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full justify-between">
          <div className="flex gap-4 bg-white p-2 rounded-lg shadow-md border border-gray-200">
            <button
              onClick={handlePageButton}
              className={`px-6 py-2 rounded-md font-semibold bg-[#a1d1b1] transition-all duration-500 ${page
                  ? "text-black "
                  : "text-gray-400  "
                }`}
            >
              Students
            </button>
            <button
              onClick={() => {
                setEditingStudent(null);
                setPage(false);
              }}
              className={`px-6 py-2 rounded-md font-semibold bg-[#a1d1b1] transition-all duration-500 ${!page && !editingStudent
                  ? "text-black"
                  : "text-gray-400  "
                }`}
            >
              Add form
            </button>
          </div>

          {page && (
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-80 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
          )}
        </div>

        <div className="w-full">
          {page ? (
            <Student
              data={filteredData}
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
