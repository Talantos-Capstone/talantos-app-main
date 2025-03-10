import { useState } from "react";
import { validatePassword } from "../../utils/validation";

/**
Custom hook to manage the admin form state and validation.
 * Handles input changes, password visibility toggles, and form submission.
 * @returns {Object} An object containing form data, error messages, success messages, 
 * and handler functions for managing form state and submission.
 */

export const useAdminForm = () => {
  /* State to manage the admin form input values. */
  const [formData, setFormData] = useState({
    accessLevel: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  /**
   * State to track errors related to passwords and general form validation.
   */
  const [errors, setErrors] = useState({ password: "", confirmPassword: "", general: "" });

  /**
   * State to store success messages after successful form submission.
   */
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * State to control password visibility toggling.
   */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * Handles input changes in the form fields and resets any existing errors.
   * 
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The input change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /**
   * Toggles the visibility of the password field.
   */
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  /**
   * Handles form submission, validates passwords, and simulates an API call.
   * 
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ password: "", confirmPassword: "", general: "" });
    setSuccessMessage("");

    // Validate password format
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "Passwords do not match." }));
      return;
    }

    try {
      // Simulate an API response (50% success / 50% failure)
      const simulatedResponse = { ok: Math.random() > 0.5 };

      if (!simulatedResponse.ok) throw new Error("Error creating account");

      setSuccessMessage("Account created successfully!");
      setFormData({
        accessLevel: "",
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      });
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, general: "There was an error creating the account." }));
    }
  };

  return {
    formData,
    setFormData,
    errors,
    successMessage,
    showPassword,
    showConfirmPassword,
    handleChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleSubmit,
  };
};
