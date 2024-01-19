import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Input } from '../../../components/ui/input';

describe('InputField component', () => {
  test('renders without errors', () => {
    render(<Input label="test" dataTestId="input-test" />);
    expect(screen.getByTestId('input-test')).toBeInTheDocument();
  });
});
