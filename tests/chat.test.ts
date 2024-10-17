import { test, chromium, expect } from '@playwright/test';

test.use({ headless: false })

test.describe('Chat testing', ()=>{

    test('chat testing_01', async({ page })=>{
    
        const browerInstance = await chromium.launch();
        const userContext1 = await browerInstance.newContext();
        const userPage1 = await userContext1.newPage();
    
        await userPage1.goto('');
        await userPage1.getByPlaceholder('channel').fill('naopeke');
        await userPage1.locator('#join_button').click();
        await expect(userPage1).toHaveURL('/naopeke', { timeout: 5000 });
        //toHaveValue()は<input>, <textarea>, toHaveText()は<div><span>
        await expect(userPage1.locator('#user-counter')).toHaveText('1', { timeout: 5000 });
    })

    test('chat testing_02', async({ page })=>{
        const browerInstance = await chromium.launch();
        const userContext2 = await browerInstance.newContext();
        const userPage2 = await userContext2.newPage();

        await userPage2.goto('/naopeke');
        await userPage2.getByPlaceholder('Name').fill('Taro');
        const nameInput =  userPage2.getByPlaceholder('Name');
        await nameInput.focus();
        await nameInput.press('Enter');
        await expect(userPage2.locator('#user-counter')).toHaveText('2', { timeout: 5000 });
    })

    test('chat testing_03', async ({ page })=>{
        const browerInstance = await chromium.launch();
        const userContext1 = await browerInstance.newContext();
        const userPage1 = await userContext1.newPage();
        const userContext2 = await browerInstance.newContext();
        const userPage2 = await userContext2.newPage();
    
        await userPage1.goto('');
        await userPage1.getByPlaceholder('channel').fill('naopeke');
        await userPage1.locator('#join_button').click();
        await expect(userPage1).toHaveURL('/naopeke', { timeout: 5000 });
        //toHaveValue()は<input>, <textarea>, toHaveText()は<div><span>
        await expect(userPage1.locator('#user-counter')).toHaveText('1', { timeout: 5000 });

        await userPage2.goto('/naopeke');
        await userPage2.getByPlaceholder('Name').fill('Taro');
        const nameInput =  userPage2.getByPlaceholder('Name');
        await nameInput.focus();
        await nameInput.press('Enter');
        await expect(userPage2.locator('#user-counter')).toHaveText('2', { timeout: 5000 });
    })
})


