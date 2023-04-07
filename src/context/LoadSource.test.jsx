import { LoadSource } from './LoadSource';

describe('LoadSource', () => {
  it('should return the correct data when given a search value and a page number', async () => {
    const searchValue = 'Rick';
    const page = 2;
    const result = await LoadSource(searchValue, page);

    expect(result).toBeDefined();
    expect(result.info.count).toBeGreaterThan(0);
    expect(result.results.length).toBeGreaterThan(0);
  });

  it('should return the correct data when given a search value without a page number', async () => {
    const searchValue = 'Morty';
    const result = await LoadSource(searchValue);

    expect(result).toBeDefined();
    expect(result.info.count).toBeGreaterThan(0);
    expect(result.results.length).toBeGreaterThan(0);
  });

  it('should return the correct data when given a page number without a search value', async () => {
    const page = 3;
    const result = await LoadSource(null, page);

    expect(result).toBeDefined();
    expect(result.info.count).toBeGreaterThan(0);
    expect(result.results.length).toBeGreaterThan(0);
  });

  it('should return the correct data when given neither a search value nor a page number', async () => {
    const result = await LoadSource(null);
    expect(result).toBeDefined();
    expect(result.info.count).toBeGreaterThan(0);
    expect(result.results.length).toBeGreaterThan(0);
  });

  it('should throw an error when the API call fails', async () => {
    const error = new Error('Could not load the data from the resourse');
    jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve({ ok: false }));

    await expect(LoadSource(null)).rejects.toThrow(error);
  });
});
