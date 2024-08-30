export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
  
      if (token) {
        setIsAuthenticated(true);
        setIsAdmin(role === 'ADMIN');
      }
    }, []);
  
    const login = (token, role) => {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
  
      setIsAuthenticated(true);
      setIsAdmin(role === 'ADMIN');
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
  
      setIsAuthenticated(false);
      setIsAdmin(false);
    };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  