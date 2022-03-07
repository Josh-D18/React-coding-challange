let API;

if (process.env.NODE_ENV === "development") {
  API = "http://localhost:8080/";
} else if (process.env.NODE_ENV === "production") {
  API = "https://galleryphotoss.herokuapp.com/";
}

export default API;
