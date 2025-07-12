import React from 'react';
import { Translate, ValidatedField, translate } from 'react-jhipster';
import { Alert, Button, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { type FieldError, useForm } from 'react-hook-form';
import './login.scss';

export interface ILoginModalProps {
  loginError: boolean;
  handleLogin: (username: string, password: string, rememberMe: boolean) => void;
}

const LoginPage = (props: ILoginModalProps) => {
  const login = ({ username, password, rememberMe }) => {
    props.handleLogin(username, password, rememberMe);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({ mode: 'onTouched' });

  const { loginError } = props;

  const handleLoginSubmit = e => {
    handleSubmit(login)(e);
  };

  return (
    <div className="login-form-container">
      <Col>
        <h4 id="login-title" data-cy="loginTitle">
          <Translate contentKey="login.title">Sign in</Translate>
        </h4>
        <Form onSubmit={handleLoginSubmit}>
          <Row>
            <Col md="12">
              {loginError ? (
                <Alert color="danger" data-cy="loginError">
                  <Translate contentKey="login.messages.error.authentication">
                    <strong>Failed to sign in!</strong> Please check your credentials and try again.
                  </Translate>
                </Alert>
              ) : null}
            </Col>
            <Col md="12">
              <ValidatedField
                name="username"
                label={translate('global.form.username.label')}
                placeholder={translate('global.form.username.placeholder')}
                required
                autoFocus
                data-cy="username"
                validate={{ required: 'Username cannot be empty!' }}
                register={register}
                error={errors.username as FieldError}
                isTouched={touchedFields.username}
              />
              <ValidatedField
                name="password"
                type="password"
                label={translate('login.form.password')}
                placeholder={translate('login.form.password.placeholder')}
                required
                data-cy="password"
                validate={{ required: 'Password cannot be empty!' }}
                register={register}
                error={errors.password as FieldError}
                isTouched={touchedFields.password}
              />
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <ValidatedField
                  name="rememberMe"
                  type="checkbox"
                  check
                  label={translate('login.form.rememberme')}
                  value={true}
                  register={register}
                />
                <Link to="/account/reset/request" data-cy="forgetYourPasswordSelector">
                  <Translate contentKey="login.password.forgot">Forgot password?</Translate>
                </Link>
              </div>
              <Button color="primary" type="submit" data-cy="submit" className="mt-2">
                <Translate contentKey="login.form.button">Sign in</Translate>
              </Button>
            </Col>
          </Row>
          <div className="mt-1">&nbsp;</div>
        </Form>
        <Alert color="info">
          <span>
            <Translate contentKey="global.messages.info.register.noaccount">You don&apos;t have an account yet?</Translate>
          </span>{' '}
          <Link to="/account/register">
            <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
          </Link>
        </Alert>
      </Col>
    </div>
  );
};

export default LoginPage;
