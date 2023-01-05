import axios from "axios";

export default class Service {
  static async getAll(url: string) {
    try {
      const response = await axios.get(`http://localhost:5000/${url}`);
      return response.data;
    } catch (e) {
      alert(e);
    }
  }

  static async search(url: string, query: string) {
    try {
      const response = await axios.get(
        `http://localhost:5000/${url}?query=${query}`
      );
      return response.data;
    } catch (e) {
      alert(e);
    }
  }

  static async createItem(url: string, item: object) {
    try {
      await axios.post(`http://localhost:5000/${url}`, item);
    } catch (e) {
      alert(e);
    }
  }

  static async deleteItem(url: string, id: string | number) {
    try {
      await axios.delete(`http://localhost:5000/${url}/${id}`);
    } catch (e) {
      console.log(e);
    }
  }

  static async updateItem(url: string, item: object) {
    try {
      await axios.put(`http://localhost:5000/${url}`, item);
    } catch (e) {
      alert(e);
    }
  }
}
