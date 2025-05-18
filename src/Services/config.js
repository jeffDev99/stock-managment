import axios from "axios";
 let api = axios.create({
  baseURL: "https://back.sardar-hoor.ir",
});
export default api
// const getStock = `${baseURL}/Stock`;
// const updateStock = (id) => {
//   return `${baseURL}/Stock/${id}`;
// };
// const createStock = () => {
//   return `${baseURL}/Stock/`;
// };
// const deleteStock = (id) => {
//   return `${baseURL}/Stock/${id}`;
// };
// export { getStock, createStock, updateStock, deleteStock };
