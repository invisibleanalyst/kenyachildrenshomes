import {test,expect} from '@playwright/test';
import {paymentReducer,initialPayment} from '../src/payment.js';
import {followUps,exampleBudget,cashRequired} from '../src/data.js';

test('five pages render with local photos/fonts, direct routes and history',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const path of ['/','/about','/projects','/impact','/donate']){
  await page.goto(path);await expect(page.locator('h1')).toBeVisible();await page.evaluate(()=>document.fonts.ready);
  await page.locator('img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
  await expect.poll(()=>page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0))).toBe(true);
  expect(await page.evaluate(()=>document.fonts.check('16px Figtree')&&document.fonts.check('16px "DM Mono"'))).toBe(true);
 }
 await page.getByRole('link',{name:'Projects',exact:true}).click();await expect(page).toHaveURL(/\/projects$/);await page.goBack();await expect(page).toHaveURL(/\/donate$/);expect(errors).toEqual([]);
 await expect(page.locator('footer a[href="https://kch.co.ke/"]')).toBeVisible();
});
test('all 47 counties remain accessible, with sparse data and shared Nairobi locations',async({page})=>{
 await page.goto('/');await expect(page.locator('.map-drawing path')).toHaveCount(47);
 const selector=page.getByLabel('Find a county');const options=await selector.locator('option').evaluateAll(opts=>opts.map(o=>({id:o.value,name:o.textContent})));
 for(const {id,name} of options){await selector.selectOption(id);await expect(page.locator('.county-heading')).toContainText(name.toUpperCase())}
 await selector.selectOption('nairobi');await expect(page.locator('.county-detail .county-programme')).toHaveCount(2);await expect(page.locator('.county-detail')).toContainText('Kibera Sponsorship');await expect(page.locator('.county-detail')).toContainText('Jonathan Gloag Academy');
 await selector.selectOption('mombasa');await expect(page.locator('.county-detail')).toContainText('No programme information published here');await expect(page.locator('.county-detail')).toContainText('does not mean');
 const path=page.getByRole('button',{name:'Turkana, no published programme record',exact:true});await path.focus();await path.press('Enter');await expect(path).toHaveAttribute('aria-pressed','true');await expect(page.locator('.county-heading')).toContainText('TURKANA');
 await page.getByRole('button',{name:'Zoom in map'}).click();await expect(page.locator('.map-drawing svg')).toHaveAttribute('style',/1.2/);await page.getByRole('button',{name:'Zoom out map'}).click();
 const narok=page.getByRole('button',{name:'Narok, published programme locations',exact:true});await narok.focus();await narok.press('Enter');await expect(page.getByRole('dialog')).toContainText('Soila');await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await expect(narok).toBeFocused();
});
test('directory uses six actual programme records and filters; dialog traps focus and carries interest',async({page})=>{
 await page.goto('/projects');const directory=page.locator('.project-directory');await expect(directory.locator('.project-card')).toHaveCount(6);await expect(directory.getByRole('button',{name:'Completed',exact:true})).toHaveCount(0);
 await page.getByLabel('Search projects or counties').fill('no-such-county');await expect(page.getByText('No programmes match.')).toBeVisible();await page.getByRole('button',{name:'Reset filters'}).click();
 await page.getByLabel('Search projects or counties').fill('Nairobi');await expect(directory.locator('.project-card')).toHaveCount(2);
 await page.getByLabel('Search projects or counties').fill('Butterfly');const trigger=directory.getByRole('button',{name:'Explore programme'});await trigger.click();const dialog=page.getByRole('dialog');await expect(dialog).toContainText('August 2025');await expect(dialog).toContainText('KES 40,000 cash still required');
 const close=page.getByRole('button',{name:'Close project'});await expect(close).toBeFocused();await page.keyboard.press('Shift+Tab');await expect(dialog.getByRole('link',{name:'Support a brighter future'})).toBeFocused();await page.keyboard.press('Tab');await expect(close).toBeFocused();await page.keyboard.press('Escape');await expect(trigger).toBeFocused();
 await trigger.click();await dialog.getByRole('link',{name:'Support a brighter future'}).click();await expect(page).toHaveURL(/donate\?programme=butterfly/);await expect(page.locator('.interest-note')).toContainText('Butterfly Support');await expect(page.locator('.interest-note')).toContainText('without promising restricted allocation');
});
test('explicit comparable observations, null counts and pledges are never fabricated or added',async({page})=>{
 expect(followUps).toEqual([{period:'A',scheduled:30,completed:21},{period:'B',scheduled:30,completed:24},{period:'C',scheduled:30,completed:27}]);expect(cashRequired(exampleBudget)).toBe(40000);
 await page.goto('/impact');await expect(page.locator('.bar-column strong')).toHaveText(['21','24','27']);await page.getByLabel('Chart metric').selectOption('Scheduled');await expect(page.locator('.bar-column strong')).toHaveText(['30','30','30']);await page.locator('.evidence-note').first().getByText('Definitions & example basis').click();await expect(page.locator('.evidence-note').first()).toContainText('both the academic-progress check and welfare check');
 await expect(page.locator('.impact-story')).toContainText('does not prove');await page.getByRole('button',{name:'Read The comfort of belonging'}).click();await expect(page.locator('.impact-story h2')).toContainText('The comfort of belonging');
 await expect(page.locator('#reports')).toContainText('No KCH annual report');await expect(page.getByRole('link',{name:'Request reports'})).toHaveAttribute('href',/^mailto:info@kch.co.ke/);await page.locator('footer').getByRole('link',{name:'Reports & financials'}).click();await expect(page).toHaveURL(/impact#reports$/);await expect.poll(()=>page.locator('#reports').evaluate(el=>Math.abs(el.getBoundingClientRect().top))).toBeLessThan(5);
 await page.goto('/projects');await page.getByLabel('Search projects or counties').fill('Adoption');await page.locator('.project-directory').getByRole('button',{name:'Explore programme'}).click();await expect(page.getByRole('dialog')).not.toContainText('0 children');await expect(page.getByRole('dialog')).not.toContainText('null');
});
test('mock confirmation is event-driven and duplicate or stale events do not double count',()=>{
 let state=paymentReducer(initialPayment,{type:'start'});expect(state.status).toBe('pending');state=paymentReducer(state,{type:'result',status:'failed',attempt:1});state=paymentReducer(state,{type:'start'});
 expect(paymentReducer(state,{type:'result',status:'confirmed',attempt:1})).toEqual(state);
 state=paymentReducer(state,{type:'result',status:'confirmed',attempt:2});expect(state.confirmationCount).toBe(1);expect(paymentReducer(state,{type:'result',status:'confirmed',attempt:2})).toEqual(state);expect(paymentReducer(state,{type:'start'})).toEqual(state);
});
test('giving preserves amount, intent and optional update during failed/cancelled/timed-out retries',async({page})=>{
 const sent=[];page.on('request',r=>{if(r.method()==='POST')sent.push(r.url())});await page.goto('/donate?programme=butterfly');
 await page.getByRole('button',{name:'Give monthly'}).click();await expect(page.locator('.donation-form')).toContainText('does not set up billing');await page.getByRole('button',{name:'KES 3,000',exact:true}).click();await page.getByLabel('Show me a sample programme update').check();
 for(const [action,status] of [['Simulate failure','failed'],['Cancel simulation','cancelled'],['Simulate timeout','timed-out']]){
  await page.getByRole('button',{name:/^(Preview|Retry) KES 3,000 gift$/}).click();await expect(page.locator('form')).toHaveAttribute('data-payment-state','pending');await expect(page.getByRole('status')).toContainText('Waiting');await page.getByRole('button',{name:action,exact:true}).click();await expect(page.locator('form')).toHaveAttribute('data-payment-state',status);await expect(page.getByLabel('Custom donation amount')).toHaveValue('3000');await expect(page.getByRole('button',{name:'Give monthly'})).toHaveAttribute('aria-pressed','true');await expect(page.getByLabel('Show me a sample programme update')).toBeChecked();
 }
 await page.getByRole('button',{name:'Retry KES 3,000 gift'}).click();await page.getByRole('button',{name:'Confirm simulation',exact:true}).click();await expect(page.getByRole('status')).toContainText('No payment was taken');await expect(page.locator('form')).toHaveAttribute('data-payment-state','confirmed');await expect(page.getByRole('button',{name:'Simulation confirmed',exact:true})).toBeDisabled();await expect(page.locator('.sample-update')).toContainText('not actual KCH reporting or email delivery');expect(sent).toEqual([]);
});
test('pending times out, optional updates stay separate and only amount is required',async({page})=>{
 await page.clock.install();await page.goto('/donate');await expect(page.getByLabel('Example email')).not.toHaveAttribute('required');await expect(page.getByLabel('Show me a sample programme update')).not.toBeChecked();await expect(page.locator('input[required]')).toHaveCount(1);await page.getByRole('button',{name:'Preview KES 1,500 gift'}).click();await page.clock.fastForward(31000);await expect(page.locator('form')).toHaveAttribute('data-payment-state','timed-out');await page.getByRole('button',{name:'Retry KES 1,500 gift'}).click();await page.getByRole('button',{name:'Confirm simulation',exact:true}).click();await expect(page.locator('.sample-update details')).toHaveCount(0);
});
test('mobile navigation, all routes and open interactive states have no overflow',async({page})=>{
 await page.setViewportSize({width:375,height:812});
 for(const path of ['/','/about','/projects','/impact','/donate']){await page.goto(path);await page.evaluate(()=>document.fonts.ready);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true)}
 await page.getByRole('button',{name:'Open menu'}).click();await page.getByRole('link',{name:'Home',exact:true}).click();await expect(page).toHaveURL(/\/$/);await expect(page.getByRole('button',{name:'Open menu'})).toBeVisible();
 await page.getByLabel('Find a county').selectOption('narok');await page.getByRole('button',{name:'View Soila'}).click();await expect(page.getByRole('dialog')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.keyboard.press('Escape');
});
