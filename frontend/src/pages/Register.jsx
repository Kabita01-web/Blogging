import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateName = (name) => (!name.trim() ? "Name is required" : "");
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Please enter a valid email";
    return "";
  };
  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };
  const validateConfirmPassword = (value) =>
    value !== form.password ? "Passwords do not match" : "";

  const handleBlur = (field) => () => {
    const validators = {
      name: validateName,
      email: validateEmail,
      password: validatePassword,
      confirmPassword: validateConfirmPassword,
    };
    setErrors((prev) => ({ ...prev, [field]: validators[field](form[field]) }));
  };

  const validateAll = () => {
    const next = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(form.confirmPassword),
    };
    setErrors(next);
    return Object.values(next).every((msg) => !msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!validateAll()) return;

    setLoading(true);
    try {
      const result = await register(form.name, form.email, form.password);
      if (result.success) {
        navigate("/");
      } else {
        setFormError(result.error || "Registration failed");
      }
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)] px-4">
      <div className="w-full max-w-md bg-white/60 rounded-2xl shadow-[var(--shadow-card)] p-8 md:p-10 border border-[var(--color-rule)]">
        <div className="text-center mb-8">
          <p className="font-[var(--font-mono)] text-xs font-medium text-[var(--color-indigo)] uppercase tracking-[0.15em]">
            Get started
          </p>
          <h1 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)] mt-2">
            Create your account
          </h1>
          <p className="font-[var(--font-body)] text-[var(--color-muted)] text-sm mt-1">
            Takes less than a minute.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {formError && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700 font-[var(--font-body)]"
            >
              {formError}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block font-[var(--font-mono)] text-xs uppercase tracking-[0.1em] text-[var(--color-muted)] mb-1.5"
            >
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur("name")}
              className={`w-full px-4 py-2.5 border rounded-xl bg-white/50 font-[var(--font-body)] focus:ring-2 focus:ring-[var(--color-indigo-soft)] focus:border-[var(--color-indigo)] outline-none transition-colors ${
                errors.name ? "border-red-400" : "border-[var(--color-rule)]"
              }`}
              placeholder="Ada Lovelace"
              autoComplete="name"
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-[var(--font-mono)] text-xs uppercase tracking-[0.1em] text-[var(--color-muted)] mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur("email")}
              className={`w-full px-4 py-2.5 border rounded-xl bg-white/50 font-[var(--font-body)] focus:ring-2 focus:ring-[var(--color-indigo-soft)] focus:border-[var(--color-indigo)] outline-none transition-colors ${
                errors.email ? "border-red-400" : "border-[var(--color-rule)]"
              }`}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-[var(--font-mono)] text-xs uppercase tracking-[0.1em] text-[var(--color-muted)] mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur("password")}
                className={`w-full px-4 py-2.5 border rounded-xl bg-white/50 font-[var(--font-body)] focus:ring-2 focus:ring-[var(--color-indigo-soft)] focus:border-[var(--color-indigo)] outline-none transition-colors pr-10 ${
                  errors.password
                    ? "border-red-400"
                    : "border-[var(--color-rule)]"
                }`}
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block font-[var(--font-mono)] text-xs uppercase tracking-[0.1em] text-[var(--color-muted)] mb-1.5"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur("confirmPassword")}
              className={`w-full px-4 py-2.5 border rounded-xl bg-white/50 font-[var(--font-body)] focus:ring-2 focus:ring-[var(--color-indigo-soft)] focus:border-[var(--color-indigo)] outline-none transition-colors ${
                errors.confirmPassword
                  ? "border-red-400"
                  : "border-[var(--color-rule)]"
              }`}
              placeholder="Re-enter your password"
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-bright)] text-white font-[var(--font-body)] font-medium py-3 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="mt-6 text-center font-[var(--font-body)] text-sm text-[var(--color-muted)]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[var(--color-indigo)] hover:text-[var(--color-indigo-bright)] font-medium transition-colors"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
