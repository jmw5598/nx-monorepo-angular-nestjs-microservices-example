import { DeepPropertyAccessPipe } from './deep-property-access.pipe';

describe('DeepPropertyAccessPipe', () => {
  it('create an instance', () => {
    const pipe = new DeepPropertyAccessPipe();
    expect(pipe).toBeTruthy();
  });
});
