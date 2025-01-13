import { ReactNode } from "react";
import { useLogout } from "../hooks/useLogout";

interface Header {
  pageName: string;
  children: ReactNode
}

export const Header = ({ pageName, children }: Header) => {
    const { logout } = useLogout()

  return (
    <header className="header">
      <h1 className="header-title">{pageName}</h1>
      <div className="flex gap-8">
        {children}
        <button
          onClick={logout}
          className="logout-button"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};
