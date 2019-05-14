import { fetchOptionsCreator } from './fetchOptionsCreator';

describe('fetchOptionsCreator', () => {
  let type;
  let mockBody;

  beforeEach(() => {
    type = 'POST';
    mockBody = {
      project_name: 'Mock Project Name',
    }
  })

  it('should return expected data', async () => {
    const result = await fetchOptionsCreator(type, mockBody);
    const expected = {
        method: type,
        body: JSON.stringify(mockBody),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    expect(result).toEqual(expected);
  })
})