import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon, ShieldCheckIcon, ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const navigation = [
    {
      name: 'Learn',
      href: '#modules',
      dropdown: [
        { name: 'Gamified Modules', href: '#modules' },
        { name: 'Virtual Drills', href: '#virtual-drills' },
        { name: 'Interactive Tech', href: '#interactive-tech' },
      ]
    },
    { name: 'Live Alerts', href: '#alerts' },
    { name: 'News', href: '#news' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Emergency Contacts', href: '#contacts' },
    {
      name: 'More',
      href: '#',
      dropdown: [
        { name: 'Languages', href: '#multilingual' },
        { name: 'ERP Integration', href: '#erp-integration' },
      ]
    },
  ];

  return (
    <>
      <header className="fixed top-0 w-full bg-card/95 backdrop-blur-md border-b border-border z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-hero">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient-hero">DPRES</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-8">
                {navigation.map((item) => (
                  <div key={item.name} className="relative group">
                    <a
                      href={item.href}
                      className="nav-link flex items-center space-x-1"
                    >
                      <span>{item.name}</span>
                      {item.dropdown && <ChevronDownIcon className="h-4 w-4" />}
                    </a>
                    {item.dropdown && (
                      <div className="absolute left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-foreground hover:bg-accent rounded-xl"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Auth Section */}
              {!loading && (
                <div className="flex items-center space-x-4">
                  {user ? (
                    <div className="relative">
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center space-x-2 nav-link"
                      >
                        <UserCircleIcon className="h-6 w-6" />
                        <span className="hidden lg:inline">
                          {user.user_metadata?.full_name || user.email}
                        </span>
                        <ChevronDownIcon className="h-4 w-4" />
                      </button>
                      {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg z-50">
                          <button
                            onClick={() => {
                              signOut();
                              setUserMenuOpen(false);
                            }}
                            className="block w-full text-left px-4 py-3 text-sm text-foreground hover:bg-accent rounded-xl"
                          >
                            Sign Out
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        onClick={() => navigate('/auth')}
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => navigate('/auth')}
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden rounded-lg p-2 text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border mt-4 pt-4 pb-4"
            >
              <div className="space-y-3">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      className="block px-3 py-2 text-foreground hover:bg-accent rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                    {item.dropdown && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-2 text-sm text-muted-foreground hover:bg-accent rounded-lg"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile Auth Section */}
                {!loading && (
                  <div className="border-t border-border pt-4 mt-4">
                    {user ? (
                      <div className="space-y-2">
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          {user.user_metadata?.full_name || user.email}
                        </div>
                        <button
                          onClick={() => {
                            signOut();
                            setMobileMenuOpen(false);
                          }}
                          className="block w-full text-left px-3 py-2 text-foreground hover:bg-accent rounded-lg"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            navigate('/auth');
                            setMobileMenuOpen(false);
                          }}
                        >
                          Sign In
                        </Button>
                        <Button
                          className="w-full justify-start"
                          onClick={() => {
                            navigate('/auth');
                            setMobileMenuOpen(false);
                          }}
                        >
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navigation;