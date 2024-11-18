import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x && x !== 'null'); // Убираем пустые элементы и 'null'
  
  
  const breadcrumbsMapping: Record<string, string> = {
    '': 'Главная',
    'details': 'Детали',
    'detail': 'Описание',
  };

  return (
    <nav className="breadcrumbs">
      <span>
        <Link to="/">{breadcrumbsMapping['']}</Link> {/* Главная */}
      </span>
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

        const isNumber = !isNaN(Number(pathname)) || pathname === 'null';

        if (isNumber) return null; // Пропускаем числовые значения

        const isLast = index === pathnames.length - 1;

        return (
          <span key={routeTo}>
            {' > '}
            {pathname === 'details' ? (
              <Link to="/details">
                {breadcrumbsMapping[pathname]}
              </Link>
            ) : pathname === 'detail' ? (
              <>
                <Link to="/details">{breadcrumbsMapping['details']}</Link>
                {' > '}
                <Link to={`${location.pathname}`}>
                {breadcrumbsMapping[pathname]}</Link>
              </>
            ) : isLast ? (
              <span>{breadcrumbsMapping[pathname] || pathname}</span>
            ) : (
              <Link to={routeTo}>
                {breadcrumbsMapping[pathname] || pathname}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;