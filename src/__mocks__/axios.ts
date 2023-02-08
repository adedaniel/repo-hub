const mockedAxios = jest.mock('axios', () => ({
  get: () => Promise.resolve({ data: [] }),
}));

export default mockedAxios;
