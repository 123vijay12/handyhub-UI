import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { login } from "../../api/auth";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const { data } = await login({
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("roles", JSON.stringify(data.roles));
      localStorage.setItem("username", data.username);
      localStorage.setItem("token", data.token);
      localStorage.setItem("workerID", data.workerID);

      loginUser();
      navigate("/handyhub/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        {/* Logo Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Paper
            sx={{
              width: 64,
              height: 64,
              mx: "auto",
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "white",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, color: "primary.main" }}>
              L
            </Typography>
          </Paper>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "white", mb: 1 }}>
            LocalPro+
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
            Find. Book. Trust. Get it Done.
          </Typography>
        </Box>

        {/* Login Card */}
        <Card sx={{ p: 4, boxShadow: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}>
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mb: 3, textAlign: "center" }}
          >
            Sign in to your account to continue
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Email Field */}
            <TextField
              label="Email Address"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              variant="outlined"
              fullWidth
              required
            />

            {/* Password Field */}
            <TextField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              variant="outlined"
              fullWidth
              required
            />

            {/* Remember Me */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
              <Typography
                variant="body2"
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                <input type="checkbox" style={{ marginRight: 8 }} />
                Remember me
              </Typography>
              <Button size="small" variant="text" sx={{ textTransform: "none" }}>
                Forgot password?
              </Button>
            </Box>

            {/* Submit Button */}
            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{ mt: 2 }}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />
              }
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Box>

          {/* Divider and Social Login (Optional) */}
          <Box sx={{ my: 3, textAlign: "center", color: "textSecondary" }}>
            <Typography variant="body2">or</Typography>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <Button variant="outlined" disabled>
              Google
            </Button>
            <Button variant="outlined" disabled>
              Apple
            </Button>
          </Box>
        </Card>

        {/* Footer */}
        <Box sx={{ textAlign: "center", mt: 4, color: "white" }}>
          <Typography variant="body2">
            Need help?{" "}
            <Button
              size="small"
              sx={{
                color: "white",
                textDecoration: "underline",
                textTransform: "none",
              }}
            >
              Contact support
            </Button>
          </Typography>
        </Box>

        {/* Trust Badges */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            mt: 6,
            textAlign: "center",
            color: "white",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontSize: 24, mb: 1 }}>
              🔒
            </Typography>
            <Typography variant="caption">Secure</Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontSize: 24, mb: 1 }}>
              ⚡
            </Typography>
            <Typography variant="caption">Fast</Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontSize: 24, mb: 1 }}>
              ✓
            </Typography>
            <Typography variant="caption">Verified</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
