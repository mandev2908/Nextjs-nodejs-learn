import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function RegisterView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    setIsSubmitting(true);

    // Thực hiện yêu cầu đăng ký tới server tại đây
    // Giả lập đăng ký thành công và chuyển trang
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Registration successful!');
      router.push('/sign-in');
    }, 2000);
  };

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Register</Typography>
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
          name="fullName"
          label="Full Name"
          value={formData.fullName}
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
