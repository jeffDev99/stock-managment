import api from "../Services/config";

const useGetMainStock = (id) => {
  try {
    const res = api.get(`/api/Stock/getstockbyid/${id}`);
    return res.data;
  } catch (e) {}
};
export { useGetMainStock };
