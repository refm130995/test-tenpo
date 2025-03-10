import axios from "axios";
import axiosInstance from "../../api/axiosInstance";

interface Photo {
  id: string;
  alt_description: string;
  urls: { regular: string };
}

export const fetchPhotos = async (
  page: number,
  perPage: number
): Promise<Photo[]> => {
  try {
    const response = await axiosInstance.get("/photos", {
      params: {
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error("Limites de solicitudes alcanzados. Inténtalo más tarde.");
      }
    }
    throw new Error("Limites de solicitudes alcanzados. Inténtalo más tarde.");
  }
};
