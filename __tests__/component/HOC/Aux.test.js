import Aux from '../../../src/component/HOC/Aux';

describe('Aux', () => {
  const props = {
    children: {

    }
  };
  it('should return props', () => {
    const result = Aux(props);
    expect(result).toEqual(props.children);
  });
});
