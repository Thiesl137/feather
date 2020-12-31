import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { IconButton, Avatar } from '@material-ui/core';
import { logout, useAuthContext } from '../../../state';

const StyledNavBar = styled.div`
  background: #334f79;
  height: 4rem;
  padding-left: 2rem;
  position: fixed;
  top: 0px;
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 1.7rem;
`;

function RenderNavBar() {
  const history = useHistory();
  const { authState, dispatch } = useAuthContext(); //read user details from context

  console.log('authState in renderNav -> ', authState);
  const handleLogout = () => {
    logout(dispatch); //call the logout action
    history.push({
      pathname: '/login',
    });
  };
  return (
    <StyledNavBar>
      <StyledLink to="/">Feather</StyledLink>
      {/* TODO: should be placed next to avatar*/}
      {/* <p>Welcome {authState.userDetails.first_name}</p> */}
      <IconButton
        style={{ paddingLeft: 'calc(100vw - 200px)' }}
        onClick={handleLogout}
      >
        <Avatar src="/broken-image.jpg" />
      </IconButton>
    </StyledNavBar>
  );
}

export default RenderNavBar;
