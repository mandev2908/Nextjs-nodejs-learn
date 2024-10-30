import type { AlertColor } from '@mui/material/Alert';

import axios from 'axios';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { toCustomISOString, convertToISOString } from 'src/utils/format-date';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function RegisterView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '', // Đổi tên trường thành confirm_password
    date_of_birth: toCustomISOString(new Date()), // Trường ngày sinh
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // Trạng thái cho Snackbar
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
    vertical: string;
    horizontal: string;
  }>({
    open: false,
    message: '',
    severity: 'success',
    vertical: 'top',
    horizontal: 'center',
  });

  const handleRegister = async () => {
    setIsSubmitting(true);

    if (formData.password !== formData.confirm_password) {
      setConfirmPasswordError(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users/register/', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password, // Gửi confirm_password đến server
        date_of_birth: convertToISOString(formData.date_of_birth), // Gửi date_of_birth đến server
      });

      if (response.status === 201) {
        // Lưu email và password vào localStorage
        localStorage.setItem('registeredEmail', formData.email);
        localStorage.setItem('registeredPassword', formData.password);

        setSnackbar({
          open: true,
          message: 'Registration successful!',
          severity: 'success',
          vertical: 'top',
          horizontal: 'center',
        });

        setTimeout(() => {
          router.push('/sign-in');
        }, 2000);
      } else {
        setSnackbar({
          open: true,
          message: 'Registration failed. Please try again.',
          severity: 'error',
          vertical: 'top',
          horizontal: 'center',
        });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setSnackbar({
        open: true,
        message: 'Registration failed. Please try again.',
        severity: 'error',
        vertical: 'top',
        horizontal: 'center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'confirm_password') {
      setConfirmPasswordError(value !== formData.password);
    }
  };

  // Đóng Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
        >
          Register
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Already have an account?
          <Link href="/sign-in" variant="subtitle2" sx={{ ml: 0.5 }}>
            Sign in
          </Link>
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <TextField
          fullWidth
          name="name"
          label="Full Name"
          value={formData.name}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="email"
          label="Email address"
          value={formData.email}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="confirm_password" // Đổi tên trường thành confirm_password
          label="Confirm Password"
          color={formData.password !== formData.confirm_password ? 'error' : 'success'}
          type={showPassword ? 'text' : 'password'}
          value={formData.confirm_password}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={confirmPasswordError}
          helperText={confirmPasswordError ? 'Passwords do not match' : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="date_of_birth" // Trường ngày sinh
          label="Date of Birth"
          type="date"
          value={formData.date_of_birth}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          loading={isSubmitting}
          onClick={handleRegister}
        >
          Register
        </LoadingButton>
      </Box>
    </>
  );
}
