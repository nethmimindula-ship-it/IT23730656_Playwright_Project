import { test, expect } from '@playwright/test';

test.describe('Negative Test Cases - Error Handling and Edge Cases', () => {
  
  test.beforeEach(async ({ page }) => {
    // Try to navigate, but don't skip if it fails
    try {
      await page.goto('http://localhost:3000', { timeout: 5000 });
    } catch (error) {
      console.log('❌ Application not running at http://localhost:3000');
      // Don't skip - we'll handle this in each test
    }
  });

  const negativeTestCases = [
    { testId: 'Neg_Fun_0001', input: 'apiraeetakannapaangenaavaa', description: 'Joined words without spaces' },
    { testId: 'Neg_Fun_0002', input: 'supiri kellanee, let\'s go shopping', description: 'Mixed-language slang with English command' },
    { testId: 'Neg_Fun_0003', input: 'mam heta mehen pitath vela gedhara yanava.', description: 'Misspelled Singlish input' },
    { testId: 'Neg_Fun_0004', input: 'thx machan aavata', description: 'Unsupported chat-style slang' },
    { testId: 'Neg_Fun_0005', input: 'haiyooo eyaa eka kaalaa', description: 'Repetitive emphasis with slang exclamation' },
    { testId: 'Neg_Fun_0006', input: 'KARUNAkarala heta enavada??', description: 'Polite request with duplicate punctuation' },
    { testId: 'Neg_Fun_0007', input: 'blorch g@rble 123% mama', description: 'Mixed language with nonsense words and symbols' },
    { testId: 'Neg_Fun_0008', input: 'koomada? yko. giiye?', description: 'Extreme abbreviation and missing context' },
    { testId: 'Neg_Fun_0009', input: 'mamageedharagiyaa2023december25eethhethapassebalannaavashyayakkarala', description: 'Overly long word concatenation with numerals' },
    { testId: 'Neg_Fun_0010', input: 'mama gedhara yanavaa 2025-12-01 @Colombo api kathaa karamu but sometimes mata email karanna kiyala kiyavala example@gmail.com 2+2=4 zoom.lk WiFi naa connection 😅 ahh ehema hariyata karanna baee oyaa enava dha? lamai school giya dha dha naa mama dhaen vahina naa api passe balamu karanna baee mata udhav karanna puLuvan dha? $$$ Rs.5000 only urgent!!! heta enava dha???', description: 'Extremely long paragraph with mixed scripts, symbols, and inconsistent spacing' },
  ];

  // Run all negative test cases
  negativeTestCases.forEach(({ testId, input, description }) => {
    test(`Negative Test: ${testId} - ${description}`, async ({ page }) => {
      console.log(`\n=== Negative Test: ${testId} ===`);
      console.log(`Description: ${description}`);
      console.log(`Input length: ${input.length} characters`);
      
      // ========== CRITICAL: Check if app is running FIRST ==========
      const currentUrl = await page.url();
      if (!currentUrl.includes('localhost:3000') && !currentUrl.includes('http')) {
        console.log('❌ FAIL: Application is not running!');
        console.log('Start your Singlish-to-Sinhala converter application at http://localhost:3000');
        expect(false).toBe(true); // TEST FAILS - app not running
        return;
      }
      
      // For very long inputs, show only first 100 chars
      if (input.length > 100) {
        console.log(`Input preview: ${input.substring(0, 100)}...`);
      } else {
        console.log(`Input: ${input}`);
      }
      
      // ========== Find ACTUAL input field ==========
      const inputSelectors = [
        'input[type="text"]',
        'textarea',
        '[id*="input"]',
        '[class*="input"]',
        '[placeholder*="singlish" i]'
      ];
      
      let inputField = null;
      for (const selector of inputSelectors) {
        const element = page.locator(selector).first();
        if (await element.count() > 0) {
          inputField = element;
          break;
        }
      }
      
      if (!inputField) {
        console.log('❌ FAIL: Could not find input field in the application!');
        expect(false).toBe(true); // TEST FAILS
        return;
      }
      
      // ========== Find ACTUAL output field ==========
      const outputSelectors = [
        '[id*="output"]',
        '[id*="result"]',
        '[class*="output"]',
        '[class*="result"]'
      ];
      
      let outputField = null;
      for (const selector of outputSelectors) {
        const element = page.locator(selector).first();
        if (await element.count() > 0) {
          outputField = element;
          break;
        }
      }
      
      if (!outputField) {
        console.log('❌ FAIL: Could not find output field in the application!');
        expect(false).toBe(true); // TEST FAILS
        return;
      }
      
      // ========== TEST THE ACTUAL APPLICATION ==========
      // Enter the negative test input
      await inputField.fill(input);
      
      // Find and click convert button if it exists
      const convertButton = page.locator('button:has-text("Convert"), button:has-text("Translate")').first();
      if (await convertButton.count() > 0) {
        await convertButton.click();
        await page.waitForTimeout(1000);
      } else {
        // If no button, wait for real-time conversion
        await page.waitForTimeout(1500);
      }
      
      // Get the ACTUAL output from your application
      const actualOutput = await outputField.textContent() || '';
      console.log(`Actual App Output: ${actualOutput}`);
      
      // ========== NEGATIVE TEST ASSERTIONS ==========
      // These tests SHOULD FAIL if your app is buggy (matching Excel)
      
      // 1. The app should not crash (output should exist)
      if (!actualOutput) {
        console.log('❌ FAIL: App returned empty output!');
        expect(false).toBe(true); // TEST FAILS
        return;
      }
      
      // 2. Check specific negative scenarios
      
      // Special characters test
      if (input.includes('@') || input.includes('$') || input.includes('???')) {
        const hasErrorIndicator = actualOutput.includes('error') || 
                                  actualOutput.includes('Error') ||
                                  await page.locator('.error, .warning, [role="alert"]').isVisible().catch(() => false);
        
        const hasSpecialCharsInOutput = actualOutput.includes('@') || 
                                        actualOutput.includes('$');
        
        console.log(`Checking special chars - Has error: ${hasErrorIndicator}, Has special chars in output: ${hasSpecialCharsInOutput}`);
        
        // THIS SHOULD FAIL IF APP HAS BUGS
        if (!hasErrorIndicator && hasSpecialCharsInOutput) {
          console.log(`❌ FAIL: App accepted special characters without error!`);
          console.log(`Expected: Error message or no special chars in output`);
          console.log(`Actual: Output contains special characters: ${actualOutput}`);
          expect(false).toBe(true); // TEST FAILS
          return;
        }
      }
      
      console.log(`✓ Test ${testId} passed - Application handled input`);
    });
  });

  test('Test with empty string - Should show error', async ({ page }) => {
    // Check if app is running
    const currentUrl = await page.url();
    if (!currentUrl.includes('localhost:3000')) {
      console.log('❌ FAIL: Application is not running!');
      expect(false).toBe(true); // TEST FAILS
      return;
    }
    
    const inputField = page.locator('input, textarea').first();
    const outputField = page.locator('[id*="output"]').first();
    
    if (!inputField || !outputField) {
      console.log('❌ FAIL: Could not find input/output fields!');
      expect(false).toBe(true); // TEST FAILS
      return;
    }
    
    // Test empty input
    await inputField.fill('');
    
    const convertButton = page.locator('button:has-text("Convert")').first();
    if (await convertButton.count() > 0) {
      await convertButton.click();
    }
    
    await page.waitForTimeout(500);
    
    const result = await outputField.textContent() || '';
    
    // ========== THIS SHOULD FAIL IF APP ACCEPTS EMPTY INPUT ==========
    const isEmpty = result.trim() === '';
    const hasError = result.toLowerCase().includes('error') || 
                     await page.locator('.error').isVisible().catch(() => false);
    
    console.log(`Empty input test - Output: "${result}", Is empty: ${isEmpty}, Has error: ${hasError}`);
    
    if (!isEmpty && !hasError) {
      console.log('❌ FAIL: App converted empty string! Should show error or empty output.');
      expect(false).toBe(true); // TEST FAILS
      return;
    }
    
    console.log('✓ Empty string test passed');
  });

  test('Test with only special characters - Should be rejected', async ({ page }) => {
    // Check if app is running
    const currentUrl = await page.url();
    if (!currentUrl.includes('localhost:3000')) {
      console.log('❌ FAIL: Application is not running!');
      expect(false).toBe(true); // TEST FAILS
      return;
    }
    
    const inputField = page.locator('input, textarea').first();
    const outputField = page.locator('[id*="output"]').first();
    
    if (!inputField || !outputField) {
      console.log('❌ FAIL: Could not find input/output fields!');
      expect(false).toBe(true); // TEST FAILS
      return;
    }
    
    await inputField.fill('!@#$%^&*()');
    
    const convertButton = page.locator('button:has-text("Convert")').first();
    if (await convertButton.count() > 0) {
      await convertButton.click();
    }
    
    await page.waitForTimeout(500);
    
    const result = await outputField.textContent() || '';
    
    // ========== THIS SHOULD FAIL IF APP CONVERTS SPECIAL CHARS ==========
    const hasSpecialCharsInOutput = result.includes('@') || result.includes('#') || result.includes('$');
    const hasError = result.toLowerCase().includes('error');
    const isEmpty = result.trim() === '';
    
    console.log(`Special chars test - Output: "${result}", Has special chars: ${hasSpecialCharsInOutput}`);
    
    if (hasSpecialCharsInOutput && !hasError && !isEmpty) {
      console.log('❌ FAIL: App converted special characters to Sinhala! Should reject them.');
      expect(false).toBe(true); // TEST FAILS
      return;
    }
    
    console.log('✓ Special characters test passed');
  });
});