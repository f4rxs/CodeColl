import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/codeColl",
  headers: {
    "Content-Type": "application/json" // Fixed content type
  }
});