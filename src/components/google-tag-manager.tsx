import Script from "next/script";

const GTM_ID = "GTM-KWWBLPP2";

export function GoogleTagManager() {
  return (
    <>
      <Script
        id="gtm-js"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        async
      />
      <Script
        id="gtm-dataLayer"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date());`,
        }}
      />
    </>
  );
}