import "swiper/css";
import "swiper/css/effect-cards";
import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "AE Moments | Studio-Quality Photo Booth Sydney",
  description:
    "Studio-quality photo booth experiences for weddings, corporate events, and private parties across Sydney.",
  icons: {
    icon: "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d55d552c9526c6c263eb3.png",
    shortcut:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d55d552c9526c6c263eb3.png",
    apple:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d55d552c9526c6c263eb3.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=335302416203331&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17980189545"
          strategy="beforeInteractive"
        />
        <Script id="google-gtag-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            gtag('config', 'AW-17980189545');
            gtag('config', 'G-RQH4YNT2Z0');
            gtag('config', 'AW-17980189545/qDdqCKnLg4AcEOnWz_1C', {
              phone_conversion_number: '0468 165 827'
            });
          `}
        </Script>
        <Script id="meta-pixel-init" strategy="beforeInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '335302416203331');
            fbq('track', 'PageView');
          `}
        </Script>
        <Script id="email-click-tracking" strategy="afterInteractive">
          {`
            (function () {
              if (window.__aeEmailTrackingBound) return;
              window.__aeEmailTrackingBound = true;
              document.addEventListener('click', function (event) {
                var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
                if (!link) return;
                var href = (link.getAttribute('href') || '').trim().toLowerCase();
                if (href === 'mailto:admin@aemoments.com.au' && typeof window.gtag === 'function') {
                  window.gtag('event', 'Email Click', {
                    event_category: 'button',
                    event_label: 'Email'
                  });
                }
              });
            })();
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
