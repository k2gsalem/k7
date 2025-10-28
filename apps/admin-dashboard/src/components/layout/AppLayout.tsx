import { PropsWithChildren, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AppLayout.css';

const menuItems = [
  { to: '/', label: 'Analytics' },
  { to: '/orders', label: 'Orders' },
  { to: '/catalog', label: 'Catalog' },
  { to: '/credit', label: 'Credit' },
  { to: '/notifications', label: 'Notifications' },
  { to: '/users', label: 'Users' }
];

export function AppLayout({ children }: PropsWithChildren) {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(true);

  return (
    <div className="layout">
      <aside className={`sidebar ${isMenuOpen ? 'open' : 'collapsed'}`}>
        <button className="sidebar__toggle" onClick={() => setMenuOpen((open) => !open)}>
          ☰
        </button>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.to} className={location.pathname === item.to ? 'active' : ''}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <h1>K7 Platform Admin</h1>
        </header>
        <section>{children}</section>
      </main>
    </div>
  );
}
