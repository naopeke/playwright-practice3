import { test, chromium, expect } from '@playwright/test';

test.use({ headless: false })

test.describe('Chat testing', ()=>{

    test('chat testing_01', async({ page })=>{
    
        const browerInstance = await chromium.launch();
        const automationUser1Context = await browerInstance.newContext();
        const automationUser1Page = await automationUser1Context.newPage();
    
        await automationUser1Page.goto('');
        await automationUser1Page.getByPlaceholder('channel').fill('naopeke');
        await automationUser1Page.locator('#join_button').click();
        await expect(automationUser1Page).toHaveURL('/naopeke', { timeout: 5000 });
        //toHaveValue()は<input>, <textarea>, toHaveText()は<div><span>
        await expect(automationUser1Page.locator('#user-counter')).toHaveText('1', { timeout: 5000 });
    })

    test('chat testing_02', async({ page })=>{
        const browerInstance = await chromium.launch();
        const automationUser2Context = await browerInstance.newContext();
        const automationUser2Page = await automationUser2Context.newPage();

        await automationUser2Page.goto('/naopeke');
        await automationUser2Page.getByPlaceholder('Name').fill('Taro');
        const nameInput =  automationUser2Page.getByPlaceholder('Name');
        await nameInput.focus();
        await nameInput.press('Enter');
        await expect(automationUser2Page.locator('#user-counter')).toHaveText('2', { timeout: 5000 });
    })

    test('chat testing_03', async ({ page })=>{

    })
})


