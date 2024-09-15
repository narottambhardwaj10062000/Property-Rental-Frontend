import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";
import { display } from "@mui/system";
import { useNavigate, useLocation } from "react-router-dom";
import { userSignUp, userLogin } from "../apis/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

   // Get the state from the location (login or signUp)
   const formType = location.state?.formType || "login";

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // Handle form submission here

    if( formType === "signUp" ) {
        const response = await userSignUp(data);
        console.log(response);

        if ( response?.status === 200) {
            localStorage.setItem("authToken", response?.data?.user.token);

            navigate("/");
            alert("Registered Successfully")
        }
        else {
            alert("registration failed");
        }
    }
    else if ( formType === "login") {
        const response = await userLogin(data);

        console.log(response);

        if ( response?.status === 200) {
            localStorage.setItem("authToken", response?.data?.user.token);

            navigate("/");
            alert("Logged In Successfully");
        }
        else {
            alert("failed to log In");
        }
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">{formType === "login" ? "Login" : "Sign Up"}</Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              {formType === "login" ? "Login" : "Sign Up"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginForm;
