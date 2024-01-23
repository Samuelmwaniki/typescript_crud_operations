const { expect } = chai;

describe('getValue function', function () {
  it('should return the value of an input element', function () {
    document.body.innerHTML = '<input id="testInput" value="test value" />';
    const result = getValue('testInput');
    expect(result).to.equal('test value');
  });
});

describe('localStoragePromise function', function () {
  it('should resolve with an empty array if no data is stored', async function () {
    localStorage.clear();
    const result = await localStoragePromise('students');
    expect(result).to.deep.equal([]);
  });

  it('should store and retrieve data correctly', async function () {
    localStorage.clear();
    const testData = [{ classGrade: 'A', students: [{ firstName: 'John', lastName: 'Doe' }] }];
    await localStoragePromise('students', JSON.stringify(testData));
    const result = await localStoragePromise('students');
    expect(result).to.deep.equal(testData);
  });
});

// Add more test cases for registerStudent and studentList functions
