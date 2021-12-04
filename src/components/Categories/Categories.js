import React from "react";
import { useParams } from "react-router-dom";

const Categories = () => {
  const { category } = useParams();
  return <div className="categories">{category}</div>;
};

export default Categories;
