"use client";
import { Card, CardContent, TextField, Button, MenuItem, Typography, Grid, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormMessages from "../../../components/(admin)/formMessages";
import { useAdminForm } from "../../../hooks/(admin)/useAdminForm";

/**
 *Page to create a new admin account.
 * 
 * This component renders a form where users can input details such as name, email, password, and phone number.
 * It includes password visibility toggling, validation messages, and a dropdown for selecting the admin access level.
 * 
 * @returns {JSX.Element} The CreateAdmin component.
 */

export default function CreateAdmin() {
  const {
    formData,
    errors,
    successMessage,
    showPassword,
    showConfirmPassword,
    handleChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleSubmit,
  } = useAdminForm();

  return (
    <>
      <Typography variant="h5" fontWeight="bold" align="center">
        Create New Admin
      </Typography>

      <FormMessages successMessage={successMessage} errorMessage={errors.general} />

      <Card sx={{ maxWidth: 800, mx: "auto", p: 1, mt: 2 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Admin Access Level"
                  name="accessLevel"
                  value={formData.accessLevel}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Level 1">Level 1</MenuItem>
                  <MenuItem value="Level 2">Level 2</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth label="Phone Number" name="phoneNumber" value={formData.phoneNumber} helperText="Enter numbers without spaces (e.g., 7871234567)." onChange={handleChange} required />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth type="submit">
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
