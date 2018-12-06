const createEntryConstraint = {
  title: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 characters'
    }
  },
  content: {
    presence: true,
    length: {
      minimum: 10,
      message: 'must be at least 10 characters'
    }
  }
};

const updateEntryConstraint = createEntryConstraint;

export { createEntryConstraint, updateEntryConstraint };
