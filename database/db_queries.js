const mysql = require("mysql2");

// Create database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "resumeDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL server.");
});

// Insert user data
async function insertUser({ name, address, email, phone }) {
  const query =
    "INSERT INTO users (name, address, email, phone) VALUES (?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    connection.query(query, [name, address, email, phone], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Insert education data
async function insertEducation({ school, level, year }) {
  const query = "INSERT INTO education (school, level, year) VALUES (?, ?, ?)";
  return new Promise((resolve, reject) => {
    connection.query(query, [school, level, year], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Insert experience data
async function insertExperience({
  company,
  position,
  duties,
  work_year,
  skills,
}) {
  const query =
    "INSERT INTO experience (company, position, duties, work_year, skills) VALUES (?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [company, position, duties, work_year, skills],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

// Fetch all users
async function getUsers() {
  const query = "SELECT * FROM users";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Fetch user details by ID
async function getUserById(id) {
  const query = "SELECT * FROM users WHERE id = ?";
  return new Promise((resolve, reject) => {
    connection.query(query, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Fetch education details by ID
async function getEducationById(id) {
  const query = "SELECT * FROM education WHERE id = ?";
  return new Promise((resolve, reject) => {
    connection.query(query, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Fetch experience details by ID
async function getExperienceById(id) {
  const query = "SELECT * FROM experience WHERE id = ?";
  return new Promise((resolve, reject) => {
    connection.query(query, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Update user data
async function updateUser({ name, address, email, phone, id }) {
  const query =
    "UPDATE users SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [name, address, email, phone, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

// Update education data
async function updateEducation({ school, level, year, id }) {
  const query =
    "UPDATE education SET school = ?, level = ?, year = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    connection.query(query, [school, level, year, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Update experience data
async function updateExperience({
  company,
  position,
  duties,
  work_year,
  skills,
  id,
}) {
  const query =
    "UPDATE experience SET company = ?, position = ?, duties = ?, work_year = ?, skills = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [company, position, duties, work_year, skills, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

async function deleteUser(id) {
  const query = "DELETE FROM users WHERE id = ?";
  return new Promise((resolve, reject) => {
    connection.query(query, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

async function deleteEducation(id) {
  const query = "DELETE FROM education WHERE id = ?";
  return new Promise((resolve, reject) => {
    connection.query(query, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
async function deleteExperience(id) {
  const query = "DELETE FROM experience WHERE id = ?";
  return new Promise((resolve, reject) => {
    connection.query(query, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = {
  insertUser,
  insertEducation,
  insertExperience,
  getUsers,
  getUserById,
  getEducationById,
  getExperienceById,
  updateUser,
  updateEducation,
  updateExperience,
  deleteUser,
  deleteEducation,
  deleteExperience,
};
