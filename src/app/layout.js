import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "./header";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head/>
      <body className="m-10">
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          <Header/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
