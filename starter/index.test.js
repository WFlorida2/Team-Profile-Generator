const {
  promptManager,
  promptEmployee,
  promptEngineer,
  promptIntern,
  generateHTML
} = require("./index");

// Mock inquirer and fs
jest.mock('inquirer');
jest.mock('fs');

// Import required classes
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

describe('Prompt Functions', () => {
  test('Prompt Manager', async () => {
    // Mock user input for Manager
    inquirer.prompt.mockResolvedValueOnce({
      name: 'John Doe',
      id: '1',
      email: 'john@example.com',
      officeNumber: '100'
    });
    await promptManager();
    expect(Manager).toHaveBeenCalledWith('John Doe', '1', 'john@example.com', '100');
  });

  // Similarly, test other prompt functions (promptEmployee, promptEngineer, promptIntern) with mock inputs
});

describe('HTML Generation', () => {
  test('Generate HTML File', () => {
    // Mock team array
    const team = [
      new Manager('John Doe', '1', 'john@example.com', '100'),
      new Engineer('Alice', '2', 'alice@example.com', 'alicegithub'),
      new Intern('Bob', '3', 'bob@example.com', 'UCLA')
    ];

    // Mock fs.writeFileSync
    fs.writeFileSync.mockImplementationOnce((filePath, data, encoding) => {
      expect(filePath).toBe(outputPath);
      expect(data).toContain('John Doe');
      expect(data).toContain('Alice');
      expect(data).toContain('Bob');
      expect(data).toContain('UCLA');
      // Ensure other expectations
    });

    generateHTML();

    // Ensure fs.writeFileSync is called with correct arguments
    expect(fs.writeFileSync).toHaveBeenCalledWith(expect.any(String), expect.any(String), 'utf-8');
  });
});
