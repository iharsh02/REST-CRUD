// Import required modules
const exp = require("constants"); // Not used in this code
const express = require("express"); // Import the Express framework
const app = express(); // Create an instance of the Express application
const path = require("path"); // Import the path module for working with file paths
const methodOverride = require("method-override"); // Import the method-override middleware for HTTP method overriding
const { v4: uuidv4 } = require("uuid"); // Import the uuid module for generating unique identifiers

uuidv4(); // Call the uuidv4 function (unnecessary)

// Define the server port
const port = 8080;

// Middleware setup
app.use(express.urlencoded({ extended: true })); // Use the urlencoded middleware to parse URL-encoded data
app.use(methodOverride("_method")); // Use the method-override middleware to override HTTP methods

// Setting up the view engine for template rendering
app.set("view engine", "ejs"); // Set the view engine to EJS
app.set("views", path.join(__dirname, "views")); // Set the directory for views
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory

// Array to store the data (initial posts)
let posts = [
  {
    id: uuidv4(), // Generate a unique identifier for the post
    username: "Harsh Thakur",
    Content: "I am MERN stack dev.",
  },
  {
    id: uuidv4(),
    username: "Tarun Thakur",
    Content: "I am front-end dev.",
  },
  {
    id: uuidv4(),
    username: "Abhinandan",
    Content: "I am Doctor",
  },
  {
    id: uuidv4(),
    username: "Ashish",
    Content: "I am VET Doctor",
  },
];

// Route to handle root URL (display all posts)
app.get("/posts", (req, res) => {
  res.render("index", { posts }); // Render the "index" view with posts data
});

// Route to render form for creating a new post
app.get("/posts/new", (req, res) => {
  res.render("form"); // Render the "form" view for creating a new post
});

// Route to handle form submission for creating a new post
app.post("/posts", (req, res) => {
  let { username, Content } = req.body; // Extract username and content from the request body
  let id = uuidv4(); // Generate a unique identifier for the new post
  posts.push({ id, username, Content }); // Add the new post to the posts array
  res.redirect("/posts"); // Redirect to the "/posts" route to display all posts
});

// Route to display details of a specific post
app.get("/posts/:id", (req, res) => {
  let { id } = req.params; // Extract the post ID from the request parameters
  let post = posts.find((p) => id === p.id); // Find the post with the specified ID
  console.log(post); // Log the post object to the console
  res.render("show", { post }); // Render the "show" view with the details of the post
});

// Route to update the content of a specific post
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params; // Extract the post ID from the request parameters
  let newContent = req.body.Content; // Extract the new content from the request body
  let post = posts.find((p) => id === p.id); // Find the post with the specified ID
  post.Content = newContent; // Update the content of the post
  console.log(post); // Log the updated post object to the console
  res.redirect("/posts"); // Redirect to the "/posts" route to display all posts
});

// Route to render form for editing a specific post
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params; // Extract the post ID from the request parameters
  let post = posts.find((p) => id === p.id); // Find the post with the specified ID
  res.render("edit", { post }); // Render the "edit" view with the details of the post
});

// Route to delete a specific post
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params; // Extract the post ID from the request parameters
  posts = posts.filter((p) => id !== p.id); // Filter out the post with the specified ID from the posts array
  res.redirect("/posts"); // Redirect to the "/posts" route to display all posts
});

// Start server and listen on specified port
app.listen(port, () => {
  console.log(`listening to port http://localhost:${port}`); // Log a message indicating that the server is listening
});
