import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div style={{ width: '200px', height: '100vh', background: '#f4f4f4', padding: '1rem' }}>
      <h3>Menu</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333' }}>
            Dashboard
          </Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/dashboard/gastos-padroes" style={{ textDecoration: 'none', color: '#333' }}>
            Gastos Padrões
          </Link>
        </li>
        {/* Adicione mais links aqui */}
        <li>
          <button onClick={() => console.log('Logout')} style={{ width: '100%', marginTop: '20px' }}>
            Sair
          </button>
        </li>
      </ul>
    </div>
  );
};
