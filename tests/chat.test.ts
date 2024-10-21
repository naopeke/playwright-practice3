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

    test.only('chat testing_03', async ({ page })=>{
        const browerInstance = await chromium.launch();
        const userContext1 = await browerInstance.newContext();
        const userPage1 = await userContext1.newPage();
        const userContext2 = await browerInstance.newContext();
        const userPage2 = await userContext2.newPage();

        const channelName = 'naochannel';
        const channelURL = '/naochannel';
        const user1 = 'Nao';
        const user2 = 'Taro';
    
        // user1
        await userPage1.goto('');
        await userPage1.getByPlaceholder('channel').fill(channelName);
        await userPage1.locator('#join_button').click();
        await expect(userPage1).toHaveURL(channelURL, { timeout: 5000 });
        await userPage1.getByPlaceholder('Name').fill(user1);
        const nameInput1 = userPage1.getByPlaceholder('Name');
        await nameInput1.focus();
        await nameInput1.press('Enter');
        //toHaveValue()は<input>, <textarea>, toHaveText()は<div><span>
        await expect(userPage1.locator('#user-counter')).toHaveText('1', { timeout: 5000 });

        // user2
        await userPage2.goto(channelURL);
        await userPage2.getByPlaceholder('Name').fill(user2);
        const nameInput2 =  userPage2.getByPlaceholder('Name');
        await nameInput2.focus();
        await nameInput2.press('Enter');
        await expect(userPage2.locator('#user-counter')).toHaveText('2', { timeout: 5000 });

        // user1 sends a message
        await userPage1.locator('#message_body').fill('Hi naopeke');
        await userPage1.keyboard.press('Enter');

        // user2 can see the message and sends a message
        await expect(userPage2.locator('.post-message')).toContainText('Hi naopeke', { timeout: 5000 });
        await userPage2.locator('#messsage_body').fill('Hi Taro');

    })
})


