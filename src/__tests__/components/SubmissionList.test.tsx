import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SubmissionList from '../../components/SubmissionList/SubmissionList.tsx';
import { useFormStore } from '../../store/useFormStore.ts';

describe('SubmissionList', () => {
  it('should render nothing when there are no submissions', () => {
    render(<SubmissionList />);

    expect(screen.queryByText('Submissions')).not.toBeInTheDocument();
  });

  it('should render a card for each submission', () => {
    useFormStore.setState({
      successfulSubmissions: [
        {
          id: '1',
          createdAt: Date.now(),
          name: 'Alice',
          age: 25,
          email: 'alice@example.com',
          gender: 'female',
          country: 'Canada',
          image: 'data:image/png;base64,abc',
        },
      ],
    });
    render(<SubmissionList />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Alice' })).toBeInTheDocument();
  });

  it('should render card without country and image when fields are missing', () => {
    useFormStore.setState({
      successfulSubmissions: [
        {
          id: '2',
          createdAt: Date.now(),
          name: 'Bob',
          age: 30,
          email: 'bob@example.com',
          gender: 'male',
          country: '',
          image: '',
        },
      ],
    });
    render(<SubmissionList />);

    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
