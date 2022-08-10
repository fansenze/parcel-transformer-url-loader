import pkg from '../src';

describe('<%= package %> basic test', () => {
  it('init', () => {
    expect(pkg).toBe('<%= package %>');
  });
});
