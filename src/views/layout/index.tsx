import Header from '@/components/Header';

const Layout = ({ children }: any) => {
  return (
    <div>
      <Header />
      <section>{children}</section>
    </div>
  );
};

export default Layout;
