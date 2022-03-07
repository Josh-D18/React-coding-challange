let URL;

if (process.env.NODE_ENV === "development") {
  URL = "http://localhost:8080/";
} else if (process.env.NODE_ENV === "production") {
  URL = "https://galleryphotoss.herokuapp.com/";
}

export default URL;
