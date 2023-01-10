import axios, { AxiosError } from "axios";

export default class Service {
  static async getAll(url: string, page?: number | string, query?: string) {
    try {
      const response = await axios.get(
        `http://localhost:5000/${url}?page=${page}$limit=7&query=${query}`
      );
      console.log(response.statusText);
      return response.data;
    } catch (e) {
      alert(e);
    }
  }

  static async createItem(url: string, item: object) {
    let message: string = "";
    try {
      await axios.post(`http://localhost:5000/${url}`, item);
      message = "The entry was created successfully!";
    } catch (e) {
      message = "Error";
    }
    return message;
  }

  static async deleteItem(url: string, id: string | number) {
    let message: string = "";
    try {
      await axios.delete(`http://localhost:5000/${url}/${id}`);
      message = "Entry deleted";
      console.log(message);
    } catch (e: any) {
      message = e.response.data.message;
      console.log(message);
    }
    return message;
  }

  static async updateItem(url: string, item: object) {
    let message: string = "";
    try {
      await axios.put(`http://localhost:5000/${url}`, item);
      message = "The entry has been changed successfully!";
    } catch (e) {
      message = "Error";
    }
    return message;
  }
}
