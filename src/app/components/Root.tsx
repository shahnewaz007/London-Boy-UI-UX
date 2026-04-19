import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AddedToBagNotification } from './AddedToBagNotification';

export function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <AddedToBagNotification />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}