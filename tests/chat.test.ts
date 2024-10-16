import { test, chromium } from '@playwright/test';

test.use({ headless: false })

test('chat testing', async({ page })=>{

    const browerInstance = await chromium.launch();
    
    const automationUser1Context = await browerInstance.newContext();
    const automationUser2Context = await browerInstance.newContext();
    
    const automationUser1Page = await automationUser1Context.newPage();
    const automationUser2Page = await automationUser2Context.newPage();

    await automationUser1Page.goto('');
    await automationUser1Page.getByPlaceholder('channel').fill('naopeke');
})

