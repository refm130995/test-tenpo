import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { fetchPhotos } from "../../services/images/images.service";

const ITEMS_PER_PAGE = 20;
const TOTAL_ITEMS = 2000;
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

interface Photo {
  id: string;
  alt_description: string;
  urls: { regular: string };
}

const Home = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [items, setItems] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const userEmail = useAuthStore((state) => state.email);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPhotos(currentPage, ITEMS_PER_PAGE);
      setItems(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prev) =>
      direction === "next"
        ? Math.min(prev + 1, TOTAL_PAGES)
        : Math.max(prev - 1, 1)
    );
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-indigo-500 to-blue-600 flex flex-col items-center justify-center p-6">
      <div className="container mx-auto max-w-5xl bg-white bg-opacity-90 shadow-2xl rounded-2xl p-6 backdrop-blur-md flex flex-col h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Bienvenido, <span className="text-blue-600">{userEmail}</span>
          </h2>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>

        <div className="flex-1 overflow-auto flex flex-col justify-center">
          {loading && (
            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  <div className="w-full h-40 bg-gray-300 animate-pulse"></div>
                </li>
              ))}
            </ul>
          )}
          {!loading && error && (
            <p className="text-center text-red-500 text-lg font-semibold">
              {error}
            </p>
          )}
          {!loading && !error && (
            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={item.urls.regular}
                    alt={item.alt_description}
                    className="w-full h-40 object-cover"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 transition"
            disabled={currentPage === 1}
            onClick={() => handlePageChange("prev")}
          >
            Anterior
          </button>
          <span className="text-gray-800 text-lg font-medium">
            Página {currentPage} de {TOTAL_PAGES}
          </span>
          <button
            className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 transition"
            disabled={currentPage === TOTAL_PAGES}
            onClick={() => handlePageChange("next")}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
