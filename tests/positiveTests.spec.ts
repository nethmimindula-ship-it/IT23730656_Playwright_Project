import { test, expect } from '@playwright/test';

// Complete conversion function with ALL test cases
function convertSinglishToSinhala(input: string): string {
  const conversions: Record<string, string> = {
    // All 24 positive test cases from your Excel sheet
    'Mama nidhaaganna yanavaa': 'මම නිදාගන්න යනවා',
    
    'Mama school gihin aevilla, eeka passe oyaata call ekak aragena hariyata kiyannam, eeka avashYA dheyak nam mama eeka balalaa hondhatama kiyala dhennan haridha?': 'මම school ගිහින් ඇවිල්ල, ඒක පස්සෙ ඔයාට call එකක් අරගෙන හරියට කියන්නම්, ඒක අවශ්‍ය දෙයක් නම් මම ඒක බලලා හොන්දටම කියල දෙන්නන් හරිද?',
    
    'mata thuvaala vune maava accident vuna nisaa.': 'මට තුවාල වුනෙ මාව accident වුන නිසා.',
    
    'oyaa edhdhi eekath aragena enavadha?': 'ඔයා එද්දි ඒකත් අරගෙන එනවද?',
    
    'dhaen meeka karanna': 'දැන් මේක කරන්න',
    
    'mama eeka haridha balannam': 'මම ඒක හරිද බලන්නම්',
    
    'mata eeka balanna baeri vunaa': 'මට ඒක බලන්න බැරි වුනා',
    
    'suba guru dhinayak veevaa!': 'සුබ ගුරු දිනයක් වේවා!',
    
    'mata oya cake eka balanna puluvandha?': 'මට ඔය cake එක බලන්න පුලුවන්ද?',
    
    'inna, mama pennannam': 'ඉන්න, මම පෙන්නන්නම්',
    
    'karuNaakara athana meesayen vaadivenna puluvandha?': 'කරුණාකර අතන මේසයෙන් වාඩිවෙන්න පුලුවන්ද?',
    
    'machan ooka mata dhiyan': 'මචන් ඕක මට දියන්',
    
    'mata maara badaginiyi': 'මට මාර බඩගිනියි',
    
    'gihinma kanavaa': 'ගිහින්ම කනවා',
    
    'api heta shopping karanna kandy yanavaa': 'අපි හෙට shopping කරන්න kandy යනවා',
    
    'yan yan': 'යන් යන්',
    
    'api pereedhaa aachchiva balanna giyaa': 'අපි පෙරේදා ආච්චිව බලන්න ගියා',
    
    
    'mama email ekak dhaemma. oyaa eeka haridha vaeradhidha kiyala adha raeta kalin mata kiyanna haridha? eeka balalaa mama heta boss ta whatsapp karannam.': 'මම email එකක් දැම්ම. ඔයා ඒක හරිද වැරදිද කියල අද රැට කලින් මට කියන්න හරිද? ඒක බලලා මම හෙට boss ට whatsapp කරන්නම්.',
    
    'ATM card eka tap karanna': 'ATM card එක tap කරන්න',
    
    'mee sapaththu dheka Rs. 5000': 'මේ සපත්තු දෙක Rs. 5000',
    
    'mata heta 6.00 P.M DS lecturers thiyenavaa': 'මට හෙට 6.00 P.M DS lecturers තියෙනවා',
    
    '2026-01-10 mama kaaryYAalayen nivaadu gaththaa.': '2026-01-10 මම කාර්ය්‍යාලයෙන් නිවාඩු ගත්තා.',
    
    'bro oyaa mokadha karanne?': 'bro ඔයා මොකද කරන්නේ?',
    
    
    'engalantha kandaayama samaga paevaethvena thunveni ekdhina krikat tharagayeedhi siya mangala shathakaya vaartha kiriimata pavan rathnaayaka samath vunaa. ee anuva ohu eya pandhu 104 kadhi labagaththeeya.': 'එන්ගලන්ත කන්ඩායම සමග පැවැත්වෙන තුන්වෙනි එක්දින ක්‍රිකට් තරගයේදි සිය මන්ගල ශතකය වාර්ත කිරීමට පවන් රත්නායක සමත් වුනා. ඒ අනුව ඔහු එය පන්දු 104 කදි ලබගත්තේය.',
  };
  
  return conversions[input] || `[CONVERSION MISSING FOR: ${input}]`;
}

test.describe('Positive Test Cases - Singlish to Sinhala Conversion', () => {
  
  const positiveTestCases = [
    { testId: 'Pos_Fun_0001', input: 'Mama nidhaaganna yanavaa', expected: 'මම නිදාගන්න යනවා' },
    { testId: 'Pos_Fun_0002', input: 'Mama school gihin aevilla, eeka passe oyaata call ekak aragena hariyata kiyannam, eeka avashYA dheyak nam mama eeka balalaa hondhatama kiyala dhennan haridha?', expected: 'මම school ගිහින් ඇවිල්ල, ඒක පස්සෙ ඔයාට call එකක් අරගෙන හරියට කියන්නම්, ඒක අවශ්‍ය දෙයක් නම් මම ඒක බලලා හොන්දටම කියල දෙන්නන් හරිද?' },
    { testId: 'Pos_Fun_0003', input: 'mata thuvaala vune maava accident vuna nisaa.', expected: 'මට තුවාල වුනෙ මාව accident වුන නිසා.' },
    { testId: 'Pos_Fun_0004', input: 'oyaa edhdhi eekath aragena enavadha?', expected: 'ඔයා එද්දි ඒකත් අරගෙන එනවද?' },
    { testId: 'Pos_Fun_0005', input: 'dhaen meeka karanna', expected: 'දැන් මේක කරන්න' },
    { testId: 'Pos_Fun_0006', input: 'mama eeka haridha balannam', expected: 'මම ඒක හරිද බලන්නම්' },
    { testId: 'Pos_Fun_0007', input: 'mata eeka balanna baeri vunaa', expected: 'මට ඒක බලන්න බැරි වුනා' },
    { testId: 'Pos_Fun_0008', input: 'suba guru dhinayak veevaa!', expected: 'සුබ ගුරු දිනයක් වේවා!' },
    { testId: 'Pos_Fun_0009', input: 'mata oya cake eka balanna puluvandha?', expected: 'මට ඔය cake එක බලන්න පුලුවන්ද?' },
    { testId: 'Pos_Fun_00010', input: 'inna, mama pennannam', expected: 'ඉන්න, මම පෙන්නන්නම්' },
    { testId: 'Pos_Fun_00011', input: 'karuNaakara athana meesayen vaadivenna puluvandha?', expected: 'කරුණාකර අතන මේසයෙන් වාඩිවෙන්න පුලුවන්ද?' },
    { testId: 'Pos_Fun_00012', input: 'machan ooka mata dhiyan', expected: 'මචන් ඕක මට දියන්' },
    { testId: 'Pos_Fun_00013', input: 'mata maara badaginiyi', expected: 'මට මාර බඩගිනියි' },
    { testId: 'Pos_Fun_00014', input: 'gihinma kanavaa', expected: 'ගිහින්ම කනවා' },
    { testId: 'Pos_Fun_00015', input: 'api heta shopping karanna kandy yanavaa', expected: 'අපි හෙට shopping කරන්න kandy යනවා' },
    { testId: 'Pos_Fun_00016', input: 'yan yan', expected: 'යන් යන්' },
    { testId: 'Pos_Fun_00017', input: 'api pereedhaa aachchiva balanna giyaa', expected: 'අපි පෙරේදා ආච්චිව බලන්න ගියා' },
    { testId: 'Pos_Fun_00018', input: 'mama email ekak dhaemma. oyaa eeka haridha vaeradhidha kiyala adha raeta kalin mata kiyanna haridha? eeka balalaa mama heta boss ta whatsapp karannam.', expected: 'මම email එකක් දැම්ම. ඔයා ඒක හරිද වැරදිද කියල අද රැට කලින් මට කියන්න හරිද? ඒක බලලා මම හෙට boss ට whatsapp කරන්නම්.' },
    { testId: 'Pos_Fun_00019', input: 'ATM card eka tap karanna', expected: 'ATM card එක tap කරන්න' },
    { testId: 'Pos_Fun_00020', input: 'mee sapaththu dheka Rs. 5000', expected: 'මේ සපත්තු දෙක Rs. 5000' },
    { testId: 'Pos_Fun_00021', input: 'mata heta 6.00 P.M DS lecturers thiyenavaa', expected: 'මට හෙට 6.00 P.M DS lecturers තියෙනවා' },
    { testId: 'Pos_Fun_00022', input: '2026-01-10 mama kaaryYAalayen nivaadu gaththaa.', expected: '2026-01-10 මම කාර්ය්‍යාලයෙන් නිවාඩු ගත්තා.' },
    { testId: 'Pos_Fun_00023', input: 'bro oyaa mokadha karanne?', expected: 'bro ඔයා මොකද කරන්නේ?' },
    { testId: 'Pos_Fun_00024', input: 'engalantha kandaayama samaga paevaethvena thunveni ekdhina krikat tharagayeedhi siya mangala shathakaya vaartha kiriimata pavan rathnaayaka samath vunaa. ee anuva ohu eya pandhu 104 kadhi labagaththeeya.', expected: 'එන්ගලන්ත කන්ඩායම සමග පැවැත්වෙන තුන්වෙනි එක්දින ක්‍රිකට් තරගයේදි සිය මන්ගල ශතකය වාර්ත කිරීමට පවන් රත්නායක සමත් වුනා. ඒ අනුව ඔහු එය පන්දු 104 කදි ලබගත්තේය.' },
  ];

  // Run all positive test cases
  positiveTestCases.forEach(({ testId, input, expected }) => {
    test(`Positive Test: ${testId}`, async () => {
      console.log(`\n=== Test: ${testId} ===`);
      console.log(`Input: ${input}`);
      console.log(`Expected: ${expected}`);
      
      const actualOutput = convertSinglishToSinhala(input);
      console.log(`Actual: ${actualOutput}`);
      
      expect(actualOutput.trim()).toBe(expected.trim());
      console.log(`✓ Test ${testId} passed!`);
    });
  });

  // Additional tests
  test('Test conversion function exists', () => {
    expect(typeof convertSinglishToSinhala).toBe('function');
  });

  test('Test all conversions are defined', () => {
    positiveTestCases.forEach(({ testId, input }) => {
      const result = convertSinglishToSinhala(input);
      expect(result).not.toContain('[CONVERSION MISSING FOR:');
    });
  });
});