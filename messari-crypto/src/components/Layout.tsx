import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className='flex w-full flex-col'>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;