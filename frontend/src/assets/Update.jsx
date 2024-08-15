import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [values, setValues] = useState({
    name: "",
    price: "",
    company: "",
    category: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  // Fetch details when the component mounts
  useEffect(() => {
    const getDetails = async () => {
      try {
        const result = await fetch(`http://localhost:4000/update/${params.id}`);
        const data = await result.json();
        console.log(data);

        // Set fetched data to state
        setValues({
          name: data.name || "",
          price: data.price || "",
          company: data.company || "",
          category: data.category || "",
        });
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    getDetails();
  }, [params.id]);

  // Update state when input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault(); // Prevent default form submission
    try {
      const res = await fetch(`http://localhost:4000/update/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const result = await res.json();
      if (res.ok) {
        console.log("Update successful:", result);
        navigate("/product"); // Navigate on success
      } else {
        console.log("Update failed:", result);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Update Products
      </h2>
      <form
        onSubmit={handleSubmit} // Use your custom handleSubmit function
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={values.name}
          onChange={handleChange}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          type="number"
          name="price"
          placeholder="Enter price"
          value={values.price}
          onChange={handleChange}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          type="text"
          name="company"
          placeholder="Enter company"
          value={values.company}
          onChange={handleChange}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          type="text"
          name="category"
          placeholder="Enter category"
          value={values.category}
          onChange={handleChange}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            marginTop: "20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Update
        </button>
      </form>
    </>
  );
};

export default Update;
