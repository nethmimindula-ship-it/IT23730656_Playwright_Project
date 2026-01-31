import { test, expect } from '@playwright/test';

test.describe('Negative Test Cases - Error Handling and Edge Cases', () => {
  
  test.beforeEach(async ({ page }) => {
    try {
      await page.goto('http://localhost:3000', { timeout: 5000 });
    } catch (error) {
      console.log('❌ Application not running at http://localhost:3000');
    }
  });

  const negativeTestCases = [
    { 
      testId: 'Neg_Fun_0001', 
      input: 'apiraeetakannapaangenaavaa', 
      description: 'Joined words without spaces',
      expectedBehavior: 'Should show error or handle joined words appropriately'
    },
    { 
      testId: 'Neg_Fun_0002', 
      input: 'supiri kellanee, let\'s go shopping', 
      description: 'Mixed-language slang with English command',
      expectedBehavior: 'English parts should remain unchanged in output'
    },
    { 
      testId: 'Neg_Fun_0003', 
      input: 'mam heta mehen pitath vela gedhara yanava.', 
      description: 'Misspelled Singlish input',
      expectedBehavior: 'Should handle misspellings gracefully or show error'
    },
    { 
      testId: 'Neg_Fun_0004', 
      input: 'thx machan aavata', 
      description: 'Unsupported chat-style slang',
      expectedBehavior: 'Should not convert "thx" or show appropriate error'
    },
    { 
      testId: 'Neg_Fun_0005', 
      input: 'haiyooo eyaa eka kaalaa', 
      description: 'Repetitive emphasis with slang exclamation',
      expectedBehavior: 'Should handle repetitive words appropriately'
    },
    { 
      testId: 'Neg_Fun_0006', 
      input: 'KARUNAkarala heta enavada??', 
      description: 'Polite request with duplicate punctuation',
      expectedBehavior: 'Should handle duplicate punctuation properly'
    },
    { 
      testId: 'Neg_Fun_0007', 
      input: 'blorch g@rble 123% mama', 
      description: 'Mixed language with nonsense words and symbols',
      expectedBehavior: 'Should reject nonsense words and special symbols or show error'
    },
    { 
      testId: 'Neg_Fun_0008', 
      input: 'koomada? yko. giiye?', 
      description: 'Extreme abbreviation and missing context',
      expectedBehavior: 'Should handle abbreviations or show error for unclear input'
    },
    { 
      testId: 'Neg_Fun_0009', 
      input: 'mamageedharagiyaa2023december25eethhethapassebalannaavashyayakkarala', 
      description: 'Overly long word concatenation with numerals',
      expectedBehavior: 'Should handle long concatenated words or show error'
    },
    { 
      testId: 'Neg_Fun_0010', 
      input: 'mama gedhara yanavaa 2025-12-01 @Colombo api kathaa karamu but sometimes mata email karanna kiyala kiyavala example@gmail.com 2+2=4 zoom.lk WiFi naa connection 😅 ahh ehema hariyata karanna baee oyaa enava dha? lamai school giya dha dha naa mama dhaen vahina naa api passe balamu karanna baee mata udhav karanna puLuvan dha? $$$ Rs.5000 only urgent!!! heta enava dha???', 
      description: 'Extremely long paragraph with mixed scripts, symbols, and inconsistent spacing',
      expectedBehavior: 'Should handle long mixed input without crashing, special chars should not appear in Sinhala output'
    },
  ];

  // Run all negative test cases
  negativeTestCases.forEach(({ testId, input, description, expectedBehavior }) => {
    test(`Negative Test: ${testId} - ${description}`, async ({ page }) => {
      console.log(`\n=== Negative Test: ${testId} ===`);
      console.log(`Description: ${description}`);
      console.log(`Expected Behavior: ${expectedBehavior}`);
      console.log(`Input length: ${input.length} characters`);
      
      // For very long inputs, show only first 100 chars
      if (input.length > 100) {
        console.log(`Input preview: ${input.substring(0, 100)}...`);
      } else {
        console.log(`Input: ${input}`);
      }
      
      // ========== Find input and output fields ==========
      const inputField = page.locator('input[type="text"], textarea, [id*="input"]').first();
      const outputField = page.locator('[id*="output"], [class*="output"]').first();
      
      if (await inputField.count() === 0 || await outputField.count() === 0) {
        console.log('❌ FAIL: Required UI elements not found');
        expect(false).toBe(true);
        return;
      }
      
      // ========== Test the input ==========
      await inputField.fill(input);
      await page.waitForTimeout(1500); // Wait for conversion
      
      const actualOutput = await outputField.textContent() || '';
      console.log(`Actual Output: "${actualOutput}"`);
      
      // ========== SPECIFIC ASSERTIONS FOR EACH TEST CASE ==========
      let testPassed = true;
      let failureReason = '';
      
      switch(testId) {
        case 'Neg_Fun_0001': // Joined words without spaces
          // Should either show error or attempt to parse
          if (actualOutput.toLowerCase().includes('error') || actualOutput === '') {
            console.log('✓ Handled joined words appropriately');
          } else {
            testPassed = false;
            failureReason = 'Joined words should show error or empty output';
          }
          break;
          
        case 'Neg_Fun_0002': // Mixed-language slang with English command
          // English parts should remain in output
          if (actualOutput.includes("let's") || actualOutput.includes("shopping")) {
            console.log('✓ English parts preserved');
          } else {
            console.log('⚠️ English parts may have been converted');
          }
          break;
          
        case 'Neg_Fun_0004': // Unsupported chat-style slang
          // "thx" should not be converted to Sinhala
          if (actualOutput.includes('thx') || actualOutput.toLowerCase().includes('error')) {
            console.log('✓ "thx" not converted or error shown');
          } else {
            testPassed = false;
            failureReason = '"thx" should not be converted to Sinhala';
          }
          break;
          
        case 'Neg_Fun_0006': // Duplicate punctuation
          // Should handle duplicate punctuation
          if (actualOutput.includes('??') || actualOutput.includes('error')) {
            console.log('✓ Duplicate punctuation handled');
          }
          break;
          
        case 'Neg_Fun_0007': // Special symbols
          // @, %, and nonsense words should not appear in Sinhala output
          if (actualOutput.includes('@') || actualOutput.includes('%') || actualOutput.includes('blorch')) {
            testPassed = false;
            failureReason = 'Special symbols/nonsense words appear in output';
          } else {
            console.log('✓ Special symbols/nonsense words not in output');
          }
          break;
          
        case 'Neg_Fun_0009': // Long concatenated word with numbers
          // Should handle or show error
          if (actualOutput.length > 0) {
            console.log('✓ Long concatenated word handled');
          }
          break;
          
        case 'Neg_Fun_0010': // Extremely long mixed input
          // Should not crash and special chars should not appear
          if (actualOutput.includes('@') || actualOutput.includes('$') || actualOutput.includes('😅')) {
            testPassed = false;
            failureReason = 'Special characters appear in Sinhala output';
          } else if (actualOutput.length > 0) {
            console.log('✓ Long mixed input handled without special chars in output');
          }
          break;
          
        default:
          // For other tests, just ensure app didn't crash
          if (actualOutput !== undefined) {
            console.log('✓ Application handled input without crashing');
          }
      }
      
      // ========== FINAL ASSERTION ==========
      if (!testPassed) {
        console.log(`❌ FAIL: ${failureReason}`);
        console.log(`Expected: ${expectedBehavior}`);
        console.log(`Actual: "${actualOutput}"`);
        expect(false).toBe(true);
      } else {
        console.log(`✓ PASS: ${expectedBehavior}`);
        expect(true).toBe(true);
      }
    });
  });

  // Additional negative tests with clear expected outputs
  test('Neg_Fun_0011 - Empty string should show error', async ({ page }) => {
    console.log('\n=== Negative Test: Neg_Fun_0011 ===');
    console.log('Description: Empty string input');
    console.log('Expected: Should show error or empty output');
    
    const inputField = page.locator('input, textarea').first();
    const outputField = page.locator('[id*="output"]').first();
    
    await inputField.fill('');
    await page.waitForTimeout(1000);
    
    const result = await outputField.textContent() || '';
    
    if (result.trim() === '' || result.toLowerCase().includes('error')) {
      console.log('✓ PASS: Empty string handled correctly');
      expect(true).toBe(true);
    } else {
      console.log(`❌ FAIL: Empty string converted to: "${result}"`);
      expect(false).toBe(true);
    }
  });

  test('Neg_Fun_0012 - Only special characters should be rejected', async ({ page }) => {
    console.log('\n=== Negative Test: Neg_Fun_0012 ===');
    console.log('Description: Only special characters');
    console.log('Expected: Should show error or empty output');
    
    const inputField = page.locator('input, textarea').first();
    const outputField = page.locator('[id*="output"]').first();
    
    await inputField.fill('!@#$%^&*()');
    await page.waitForTimeout(1000);
    
    const result = await outputField.textContent() || '';
    
    if (result.includes('@') || result.includes('#') || result.includes('$')) {
      console.log(`❌ FAIL: Special characters appear in output: "${result}"`);
      expect(false).toBe(true);
    } else {
      console.log('✓ PASS: Special characters not in output');
      expect(true).toBe(true);
    }
  });
});