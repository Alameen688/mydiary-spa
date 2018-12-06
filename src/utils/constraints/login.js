const loginConstraint = {
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true,
    length: {
      minimum: 8,
      message: 'must be at least 8 characters'
    }
  }
};

const signUpConstraint = {
  fullname: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 characters'
    }
  },
  ...loginConstraint,
  confirmPassword: {
    presence: true,
    equality: 'password'
  }
};
export { loginConstraint, signUpConstraint };
