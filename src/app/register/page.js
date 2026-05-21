"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Envelope,
  Key,
  ArrowRight,
  Heart,
  Eye,
  EyeSlash,
  Person,
  Picture,
  Check,
  Xmark,
} from "@gravity-ui/icons";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";
import { toast } from "sonner";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    imageUrl: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Password strength checker - simple counting
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;

    // Check for uppercase
    let hasUpper = false;
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= "A" && password[i] <= "Z") {
        hasUpper = true;
        break;
      }
    }
    if (hasUpper) strength++;

    // Check for lowercase
    let hasLower = false;
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= "a" && password[i] <= "z") {
        hasLower = true;
        break;
      }
    }
    if (hasLower) strength++;

    // Check for number
    let hasNumber = false;
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= "0" && password[i] <= "9") {
        hasNumber = true;
        break;
      }
    }
    if (hasNumber) strength++;

    // Check for special character
    let hasSpecial = false;
    const specials = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    for (let i = 0; i < password.length; i++) {
      if (specials.includes(password[i])) {
        hasSpecial = true;
        break;
      }
    }
    if (hasSpecial) strength++;

    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "bg-destructive",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-emerald-500",
  ];

  // Check if password has uppercase
  const hasUppercase = (password) => {
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= "A" && password[i] <= "Z") return true;
    }
    return false;
  };

  // Check if password has lowercase
  const hasLowercase = (password) => {
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= "a" && password[i] <= "z") return true;
    }
    return false;
  };

  // Check if password has number
  const hasNumber = (password) => {
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= "0" && password[i] <= "9") return true;
    }
    return false;
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation - browser handles format with type="email"
    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    const formData = new FormData(e.target); // Capture data
    const Userdata = Object.fromEntries(formData); // Convert to object
    // console.log(data);
    const { data, error } = await authClient.signUp.email({
      name: Userdata.name, // required
      email: Userdata.email, // required
      password: Userdata.password, // required
      image: Userdata.imageUrl,
      // callbackURL: "/",
    });
    setIsLoading(false);
    await authClient.signOut();
    if (error){
      toast.error("Sign Up failed",{
        description: error.message,
      });
    } else{
      toast.success("Sign Up successful!", {
        description: "Please Login to continue.",
      })
      router.refresh();
      router.push("/login");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Simple field validation on blur
    const newErrors = { ...errors };

    if (name === "name") {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      } else if (formData.name.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      } else {
        delete newErrors.name;
      }
    }

    if (name === "email") {
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "password") {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else {
        delete newErrors.password;
      }
    }

    if (name === "confirmPassword") {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  return (
    <div className="min-h-screen my-10 flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full space-y-8 relative z-10"
      >
        {/* Logo & Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">PetGhor</span>
          </Link>
          <h2 className="text-3xl font-bold text-foreground">
            Create Your Account
          </h2>
          <p className="mt-2 text-muted-foreground">
            Join our community of pet lovers today
          </p>
        </motion.div>

        {/* Register Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 bg-background/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-border"
        >
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Full Name <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Person className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your full name"
                className={`block w-full pl-12 pr-4 py-3.5 rounded-xl border ${
                  errors.name && touched.name
                    ? "border-destructive focus:ring-destructive/20"
                    : "border-border focus:ring-primary/20"
                } bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 transition-all`}
              />
              {formData.name && !errors.name && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                </div>
              )}
            </div>
            {errors.name && touched.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-destructive flex items-center gap-1"
              >
                <Xmark className="h-4 w-4" />
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email Address <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Envelope className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                className={`block w-full pl-12 pr-4 py-3.5 rounded-xl border ${
                  errors.email && touched.email
                    ? "border-destructive focus:ring-destructive/20"
                    : "border-border focus:ring-primary/20"
                } bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 transition-all`}
              />
              {formData.email && !errors.email && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <Check className="h-5 w-5 text-emerald-500" />
                </div>
              )}
            </div>
            {errors.email && touched.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-destructive flex items-center gap-1"
              >
                <Xmark className="h-4 w-4" />
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Image URL Field (Optional) */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Profile Image URL
              <span className="ml-2 text-xs text-muted-foreground font-normal">
                (Optional)
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Picture className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="https://example.com/your-image.jpg"
                className={`block w-full pl-12 pr-4 py-3.5 rounded-xl border ${
                  errors.imageUrl && touched.imageUrl
                    ? "border-destructive focus:ring-destructive/20"
                    : "border-border focus:ring-primary/20"
                } bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 transition-all`}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Password <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Create a strong password"
                className={`block w-full pl-12 pr-12 py-3.5 rounded-xl border ${
                  errors.password && touched.password
                    ? "border-destructive focus:ring-destructive/20"
                    : "border-border focus:ring-primary/20"
                } bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeSlash className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-3">
                <div className="flex gap-1 h-1.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        i < passwordStrength
                          ? strengthColors[passwordStrength - 1]
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Password strength:{" "}
                  <span
                    className={`font-medium ${strengthColors[passwordStrength - 1]?.replace("bg-", "text-") || "text-muted-foreground"}`}
                  >
                    {strengthLabels[passwordStrength]}
                  </span>
                </p>
              </div>
            )}

            {errors.password && touched.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-destructive flex items-center gap-1"
              >
                <Xmark className="h-4 w-4" />
                {errors.password}
              </motion.p>
            )}

            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li
                className={`flex items-center gap-1 ${formData.password.length >= 8 ? "text-emerald-500" : ""}`}
              >
                <Check
                  className={`h-3 w-3 ${formData.password.length >= 8 ? "opacity-100" : "opacity-0"}`}
                />
                At least 8 characters
              </li>
              <li
                className={`flex items-center gap-1 ${hasUppercase(formData.password) && hasLowercase(formData.password) ? "text-emerald-500" : ""}`}
              >
                <Check
                  className={`h-3 w-3 ${hasUppercase(formData.password) && hasLowercase(formData.password) ? "opacity-100" : "opacity-0"}`}
                />
                Uppercase & lowercase letters
              </li>
              <li
                className={`flex items-center gap-1 ${hasNumber(formData.password) ? "text-emerald-500" : ""}`}
              >
                <Check
                  className={`h-3 w-3 ${hasNumber(formData.password) ? "opacity-100" : "opacity-0"}`}
                />
                At least one number
              </li>
            </ul>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Confirm Password <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm your password"
                className={`block w-full pl-12 pr-12 py-3.5 rounded-xl border ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-destructive focus:ring-destructive/20"
                    : formData.confirmPassword &&
                        formData.password === formData.confirmPassword
                      ? "border-emerald-500 focus:ring-emerald-500/20"
                      : "border-border focus:ring-primary/20"
                } bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeSlash className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {formData.confirmPassword &&
              formData.password === formData.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-emerald-500 flex items-center gap-1"
                >
                  <Check className="h-4 w-4" />
                  Passwords match
                </motion.p>
              )}
            {errors.confirmPassword && touched.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-destructive flex items-center gap-1"
              >
                <Xmark className="h-4 w-4" />
                {errors.confirmPassword}
              </motion.p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full"
              />
            ) : (
              <>
                Create Account
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-1 gap-4">
            <motion.button
              onClick={() =>
                authClient.signIn.social({
                  provider: "google",
                })
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border bg-background hover:bg-muted transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium">Google</span>
            </motion.button>
          </div>
        </motion.form>

        {/* Login Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-muted-foreground"
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Sign in here
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
