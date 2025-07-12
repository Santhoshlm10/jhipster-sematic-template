import React, { useEffect } from 'react';
import { Translate, ValidatedField, ValidatedForm, isEmail, translate } from 'react-jhipster';
import { Alert, Button, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handlePasswordResetInit, reset } from '../password-reset.reducer';
import { Link } from 'react-router';
import './../password-reset.scss';

export const PasswordResetInit = () => {
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  const handleValidSubmit = ({ email }) => {
    dispatch(handlePasswordResetInit(email));
  };

  const successMessage = useAppSelector(state => state.passwordReset.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(translate(successMessage));
    }
  }, [successMessage]);

  return (
    <div className="reset-password-form-container">
      <Row className="justify-content-center">
        <Col>
          <h4 id="reset-password-title">
            <Translate contentKey="reset.request.title">Reset your password</Translate>
          </h4>
          <ValidatedForm onSubmit={handleValidSubmit}>
            <ValidatedField
              name="email"
              label={translate('global.form.email.label')}
              placeholder={translate('global.form.email.placeholder')}
              type="email"
              validate={{
                required: { value: true, message: translate('global.messages.validate.email.required') },
                minLength: { value: 5, message: translate('global.messages.validate.email.minlength') },
                maxLength: { value: 254, message: translate('global.messages.validate.email.maxlength') },
                validate: v => isEmail(v) || translate('global.messages.validate.email.invalid'),
              }}
              data-cy="emailResetPassword"
            />
            <Button color="primary" type="submit" data-cy="submit">
              <Translate contentKey="reset.request.form.button">Reset password</Translate>
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
      <br />
      <Alert color="info">
        If you already have an account &nbsp;
        <Link to="/login" className="alert-link">
          Click here
        </Link>
        &nbsp; to sign in
      </Alert>
    </div>
  );
};

export default PasswordResetInit;
