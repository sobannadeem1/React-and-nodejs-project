import React from "react";
import { useForm } from "react-hook-form";

const Addproduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:4000/product", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Data sent");
      } else {
        alert("Data not sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Add Products
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Enter name"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "minlength is 2" },
            maxLength: { value: 30, message: "maxlength is 30" },
          })}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        {errors.name && (
          <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
            {errors.name.message}
          </p>
        )}

        <input
          type="number"
          placeholder="Enter price"
          {...register("price", { required: "Price is required" })}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        {errors.price && (
          <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
            {errors.price.message}
          </p>
        )}

        <input
          type="text"
          placeholder="Enter company"
          {...register("company", { required: "Company is required" })}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        {errors.company && (
          <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
            {errors.company.message}
          </p>
        )}

        <input
          type="text"
          placeholder="Enter category"
          {...register("category", { required: "Category is required" })}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        {errors.category && (
          <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
            {errors.category.message}
          </p>
        )}

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
          Add
        </button>
      </form>
    </>
  );
};

export default Addproduct;
