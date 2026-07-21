import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackBttn = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-gray-300 hover:text-white duration-200"
    >
      <IoArrowBack size={20} />
      Back
    </button>
  );
};

export default BackBttn;
