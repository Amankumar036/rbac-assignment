import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const role = localStorage.getItem("role");

  return (
    <div className="h-screen flex flex-col">

      
      <div className="bg-green-600 text-white px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold">User Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-white text-green-600 px-4 py-1 rounded hover:bg-gray-200"
        >
          Logout
        </button>
      </div>

      
      <div className="flex-1 flex flex-col justify-center items-center text-center">

        <h1 className="text-5xl font-bold mb-4">
          Welcome 
        </h1>

        <p className="text-2xl text-gray-700">
          You are logged in as:{" "}
          <span className="font-semibold text-black">
            {role}
          </span>
        </p>

      </div>

    </div>
  );
};

export default UserDashboard;