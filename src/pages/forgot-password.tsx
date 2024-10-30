import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ForgotPasswordView } from 'src/sections/auth/forgot-password-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Forgot password - ${CONFIG.appName}`}</title>
      </Helmet>

      <ForgotPasswordView />
    </>
  );
}
