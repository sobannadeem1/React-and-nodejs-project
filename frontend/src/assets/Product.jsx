import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:4000/findp", {
        method: "GET",
      });
      const result = await res.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:4000/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setProducts(products.filter((product) => product._id !== id));
      } else {
        console.error("Failed to delete the product");
      }
    } catch (error) {
      console.error("Error deleting the product:", error);
    }
  };

  const changing = async (e) => {
    let key = e.target.value;
    if (!key) {
      fetchProducts(); // If search is cleared, fetch all products
    } else {
      try {
        const res = await fetch(`http://localhost:4000/search/${key}`);
        const result = await res.json();
        setProducts(result.length > 0 ? result : []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  return (
    <div className="divi">
      <h1 style={{ textAlign: "center" }}>Products List</h1>
      <input
        type="search"
        name="search"
        placeholder="Search here"
        style={{
          textAlign: "center",
          padding: "10px",
          marginLeft: "37%",
          borderRadius: "5px",
        }}
        onChange={changing}
      />
      <ul className="ul">
        <li>S No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Action</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id} className="ul">
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button onClick={() => handleDelete(item._id)} id="btn">
                Delete
              </button>
              <Link to={`/update/${item._id}`} style={{ marginLeft: "10px" }}>
                Update
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          No results found
        </h2>
      )}
    </div>
  );
};

export default Product;
