import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Button } from '../../../components/ui/button';

describe('Button component', () => {
  test('renders without errors', () => {
    render(<Button />);
  });
});
