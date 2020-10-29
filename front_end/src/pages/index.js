import React from 'react';
import Head from 'next/head';
import { getInitialLocale } from '../common/utlities/languageUtilities';

const Index = () => {
  React.useEffect(async () => {
    const initialLanguage = await getInitialLocale();
    if (typeof window !== 'undefined') {
      window.location.replace(`/${initialLanguage}`);
    }
  });
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default Index;
