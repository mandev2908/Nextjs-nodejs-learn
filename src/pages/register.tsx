import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { RegisterView } from 'src/sections/auth';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Register - ${CONFIG.appName}`}</title>
      </Helmet>

      <RegisterView />
    </>
  );
}
