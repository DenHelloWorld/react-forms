import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useImageToBase64 } from '../../hooks/useImageToBase64/useImageToBase64.ts';

const mockResult = 'data:image/png;base64,abc123';

function makeMockFileReader(succeed: boolean) {
  return class MockFileReader {
    result: string | null = succeed ? mockResult : null;
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    readAsDataURL() {
      setTimeout(() => {
        if (succeed) this.onload?.();
        else this.onerror?.();
      }, 0);
    }
  };
}

describe('useImageToBase64', () => {
  beforeEach(() => {
    vi.stubGlobal('FileReader', makeMockFileReader(true));
  });

  it('should start with isPending=false and no error', () => {
    const { result } = renderHook(() => useImageToBase64());

    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should resolve with a base64 string on success', async () => {
    const { result } = renderHook(() => useImageToBase64());
    const file = new File([''], 'img.png', { type: 'image/png' });

    let base64: string | undefined;
    await act(async () => {
      base64 = await result.current.convertFile(file);
    });

    expect(base64).toBe(mockResult);
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should reject and set error on FileReader failure', async () => {
    vi.stubGlobal('FileReader', makeMockFileReader(false));
    const { result } = renderHook(() => useImageToBase64());
    const file = new File([''], 'img.png', { type: 'image/png' });

    await act(async () => {
      await result.current.convertFile(file).catch(() => {});
    });

    expect(result.current.error).toBe('Failed to read file');
    expect(result.current.isPending).toBe(false);
  });
});
