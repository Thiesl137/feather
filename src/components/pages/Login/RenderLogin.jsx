import React, { useState } from 'react';
import { Button } from '../../common';
import { Link } from 'react-router-dom';
import {
  StyledFormWrapper,
  StyledPage,
  StyledTitle,
  StyledInput,
} from '../../../styles/styled';
import styled from 'styled-components';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const StyledImgContainer = styled.div`
  background-image: url(${'https://media.istockphoto.com/vectors/coins-with-wings-fly-into-the-piggy-bank-vector-id840496806?k=6&m=840496806&s=170667a&w=0&h=6BSCHGqIpG3xMYciHauRLOuAr9kpI_ZNgUx-JpCBTOk='});
  background-repeat: no-repeat;
  background-position: 50% 70%;
  background-color: #94b49b;
  flex-basis: 55%;
  height: 100vh;
  order: 1;
`;

const StyledImgText = styled(StyledTitle.withComponent('p'))`
  display: flex;
  font-size: 1.8rem;
  justify-content: center;
  margin-top: 40px;
  padding: 10px;
  color: white;
`;

function RenderLogin() {
  const [loginInfo, setLoginInfo] = useState({});
  const { register, errors, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState(null);

  const handleChange = e => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const url = '/api/user/login';

  const sendData = () => {
    axios
      .post(url, loginInfo)
      .then(res => setLoginError(res.data))
      .catch(err => console.log(`Error from RenderLogin -> ${err}`));
  };

  const loginSubmit = e => {
    // e.preventDefault();
    sendData();
  };

  return (
    <StyledPage>
      <StyledImgContainer>
        <StyledImgText>
          Financial projections
          <br />
          we hope you'll love
        </StyledImgText>
      </StyledImgContainer>
      <StyledFormWrapper>
        <form onSubmit={handleSubmit(loginSubmit)}>
          <StyledTitle capitalize>Login</StyledTitle>
          <div>
            <label
              className="label"
              style={{
                fontSize: '1rem',
                letterSpacing: '2px',
                color: '#363b3d;',
              }}
            >
              USERNAME
            </label>

            <br />
            <StyledInput
              ref={register({ required: true })}
              type="text"
              name="user_name"
              onChange={handleChange}
            />
            {/* {TODO: build styledError component} */}
            {errors.user_name && 'Username is required'}
          </div>

          <div className="field">
            <label
              className="label"
              style={{
                fontSize: '1rem',
                letterSpacing: '2px',
                color: '#363b3d;',
              }}
            >
              PASSWORD{' '}
            </label>
            <br />
            <StyledInput
              ref={register({ required: true })}
              type="password"
              name="password"
              onChange={handleChange}
            />
            {/* {TODO: build styledError component} */}
            {errors.password && 'Password is required'}
          </div>
          <div>
            <Button type="submit" buttonText="Log in" />
            <Link
              style={{ color: '#334F79', fontSize: '1rem' }}
              to="/register"
              className="active"
            >
              Forgot password?
            </Link>
            {loginError}
          </div>
        </form>
        <div>
          <Link style={{ color: '#334F79' }} to="/register" className="active">
            New to Feather? <strong>Create an account.</strong>
          </Link>
        </div>
      </StyledFormWrapper>
    </StyledPage>
  );
}

export default RenderLogin;
