import axios from "axios";

const baseUrl = "http://localhost:9090/api";
const token = localStorage.getItem("token");
// const id = localStorage.getItem("userId");
export const loginUser = async (loginData) => {
  try {
    // Make a POST request to authenticate the user
    const response = await axios.post(`${baseUrl}/login`, loginData);

    console.log(response.data);
    const { token, data } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", data.id);
    return { success: true, data };
  } catch (error) {
    console.error("Error logging in:", error);

    // Handle different types of errors (network error, server error, etc.)
    // Customize the error handling based on your application's requirements
    return { success: false, error: "Invalid credentials" };
  }
};

export const insertAdmin = async (data) => {
  try {
    const insertData = {
      admin_name: data.name,
      admin_email: data.email,
      admin_mbno: data.mobile,
      password: data.password,
    };

    console.log(insertData);
    const response = await axios.post(`${baseUrl}/admins`, insertData, {
      headers: { Authorization: token },
    });
    // console.log(response.data);
    return response.data.message;
  } catch (error) {
    console.error("Error inserting admin:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/users`, userData);
    console.log(response.data);
    return response.data.message;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Function to update user data
export const updateUser = async (updatedData) => {
  try {
    const response = await axios.put(`${baseUrl}/users`, updatedData);
    console.log(response.data);
    return response.data.message;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Function to delete user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${baseUrl}/users/${userId}`, {
      headers: { Authorization: token },
    });
    console.log(response.data);
    return response.data.message;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Function to get user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/users/${userId}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
};

// Function to get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/users`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

export const uploadFile = async (file) => {
  try {
    // Create a FormData object to send the file
    // const formData = new FormData();
    // formData.append("file", file);

    // Send a POST request to the server's upload endpoint
    const response = await axios.post(`${baseUrl}/files/upload`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });

    console.log(response.data);
    return response.data.message;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const getUploadedFiles = async () => {
  try {
    // Make a GET request to the endpoint that returns uploaded files
    const response = await axios.get(`${baseUrl}/files`);

    // console.log(response.data);
    return response.data.files;
  } catch (error) {
    console.error("Error getting uploaded files:", error);
    throw error;
  }
};

export const getUploadedFilesbyUserId = async (id) => {
  try {
    // Make a GET request to the endpoint that returns uploaded files
    const response = await axios.get(`${baseUrl}/files/${id}`);

    // console.log(response.data);
    return response.data.files;
  } catch (error) {
    console.error("Error getting uploaded files:", error);
    throw error;
  }
};
