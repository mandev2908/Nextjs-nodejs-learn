import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';


// ----------------------------------------------------------------------

export function ForgotPasswordView() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForgotPassword = async () => {
    setIsSubmitting(true);

    // Thực hiện yêu cầu quên mật khẩu tới server tại đây
    // Giả lập gửi yêu cầu và chuyển trang sau khi thành công
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Password reset link has been sent to your email');
      router.push('/login');
    }, 2000);
  };

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Forgot Password</Typography>
        <Typography variant="body2" color="text.secondary">
          Please enter your email to receive a password reset link.
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <TextField
          fullWidth
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleForgotPassword}
        >
          Send Reset Link
        </LoadingButton>
      </Box>

      <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
        <Link href="/sign-in" variant="body2" color="inherit">
          Back to Sign In
        </Link>
      </Box>
    </>
  );
}
