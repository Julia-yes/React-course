import { renderHook } from '@testing-library/react';
import { useGetDataQuery, useGetCharacterQuery } from './API';

describe('dataApi', () => {
  describe('useGetDataQuery', () => {
    it('useGetDataQuery should return data for valid input', async () => {
      const { result } = renderHook(() => () => useGetDataQuery({ search: 'rick', page: 1 }));

      expect(result).toBeDefined();
    });

    it('useGetCharacterQuery should return data for valid input', async () => {
      const { result } = renderHook(() => () => useGetCharacterQuery(6));

      expect(result).toBeDefined();
    });
  });
});
