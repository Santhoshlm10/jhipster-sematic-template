import './header.scss';

import React, { useState } from 'react';
import { Storage } from 'react-jhipster';
import { Collapse, Nav, Navbar, NavbarToggler } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { useAppDispatch } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';
import { AccountMenu, AdminMenu, EntitiesMenu, LocaleMenu } from '../menus';
import { Brand, Home } from './header-components';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    dispatch(setLocale(langKey));
  };
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div id="app-header">
      <LoadingBar className="loading-bar" />
      {props.isAuthenticated ? (
        <>
          <Navbar data-cy="navbar" dark expand="md" fixed="top" className="jh-navbar">
            <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
            <Brand />
            <Collapse isOpen={menuOpen} navbar>
              <Nav id="header-tabs" className="ms-auto" navbar>
                <Home />
                <EntitiesMenu />
                {props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />}
                <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
                <AccountMenu isAuthenticated={props.isAuthenticated} />
              </Nav>
            </Collapse>
          </Navbar>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
