import "swiper/css";
import "swiper/css/effect-cards";
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
      <body>{children}</body>
    </html>
  );
}
