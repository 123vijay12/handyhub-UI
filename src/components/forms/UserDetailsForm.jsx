import React, { useEffect, useState } from "react";
import DynamicForm from "../util/DynamicForm";
import { fetchCategories } from "../../api/categoryApi";
import { fetchSubcategoriesByCategoryId } from "../../api/subcategoryApi";

const UserDetailsForm = ({ onSubmit, initialData = {}, submitButtonLabel = "Next" }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetchCategories();
        const data = response.data || [];
        setCategories(data.map((cat) => ({ label: cat.categoryName, value: cat.categoryId })));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    loadCategories();
  }, []);

  // Load subcategories whenever category changes
  useEffect(() => {
    if (!selectedCategory) return;

    const loadSubcategories = async () => {
      setLoadingSubcategories(true);
      try {
        const response = await fetchSubcategoriesByCategoryId(selectedCategory);
        const data = response.data || [];
        setSubcategories(
          data.map((sub) => ({ label: sub.subcategoryName, value: sub.subcategoryId }))
        );
      } catch (error) {
        console.error("Failed to fetch subcategories:", error);
      } finally {
        setLoadingSubcategories(false);
      }
    };
    loadSubcategories();
  }, [selectedCategory]);

  const formConfig = {
    title: "User Details",
    sections: [
      {
        title: "Basic User Details",
        fields: [
          { label: "Employee ID", name: "employeeId", type: "text", required: true },
          { label: "Salutation", name: "salutation", type: "select", options: ["Mr.", "Ms.", "Mrs.", "Dr."] },
          { label: "Password", name: "password", type: "password", required: true },
          { label: "First Name", name: "firstName", type: "text", required: true },
          { label: "Last Name", name: "lastName", type: "text", required: true },
          { label: "Photo", name: "photo", type: "file" },
        ],
      },
      {
        title: "Personal Information",
        fields: [
          { label: "Date of Birth", name: "birthDate", type: "date" },
          { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Other"] },
          { label: "Nationality", name: "nationality", type: "text" },
        ],
      },
        {
        title: "Job Details",
        fields: [ {
            label: "Category",
            name: "categoryId",
            type: "select",
            required: true,
            options: loadingCategories
              ? [{ label: "Loading categories...", value: "" }]
              : [{ label: "Select a Category", value: "" }, ...categories],
          },
          {
            label: "Subcategory",
            name: "subcategoryId",
            type: "select",
            required: true,
            options: loadingSubcategories
              ? [{ label: "Loading subcategories...", value: "" }]
              : [{ label: "Select a Subcategory", value: "" }, ...subcategories],
          },
           {
              label: "Skills",
              name: "skills",
              type: "defult", // ← use multitext instead of text
              placeholder: "Enter skills separated by commas"
            }

        
        ]},
      {
        title: "Contact Details",
        fields: [
          { label: "Phone Number", name: "phone", type: "text" },
          { label: "Email", name: "email", type: "email", required: true },
          { label: "Address", name: "address", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "State", name: "state", type: "text" },
          { label: "Country", name: "country", type: "text" },
        ],
      },
    ],
    submitButton: { label: submitButtonLabel },
  };

  // Handle category change
  const handleFieldChange = (name, value) => {
    if (name === "categoryId") {
      setSelectedCategory(value);
      setSubcategories([]);
    }
  };

  return (
    <DynamicForm
      config={formConfig}
      onSubmit={onSubmit}
      initialData={initialData}
      onFieldChange={handleFieldChange} // 🔹 only for dynamic updates
    />
  );
};

export default UserDetailsForm;
