import axios from "axios";
 let api = axios.create({
  baseURL: "https://fani.khz-fanoos.ir/",
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
