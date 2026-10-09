import {test,expect} from '@playwright/test';
test('five pages render, photos and fonts load, and routes support browser history',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const path of ['/','/about','/projects','/impact','/donate']){
  await page.goto(path);await expect(page.locator('h1')).toBeVisible();await page.evaluate(()=>document.fonts.ready);
  await page.locator('img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
  await expect.poll(()=>page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0))).toBe(true);
  expect(await page.evaluate(()=>document.fonts.check('16px Figtree')&&document.fonts.check('16px "DM Mono"'))).toBe(true);
 }
 await page.getByRole('link',{name:'Projects',exact:true}).click();await expect(page).toHaveURL(/\/projects$/);await page.goBack();await expect(page).toHaveURL(/\/donate$/);expect(errors).toEqual([]);
});
test('all 47 counties are interactive through map, keyboard and selector',async({page})=>{
 await page.goto('/');await expect(page.locator('.map-drawing path')).toHaveCount(47);
 await page.getByLabel('Find a county').selectOption({label:'Mombasa'});await expect(page.locator('.county-heading')).toContainText('MOMBASA');
 const path=page.getByRole('button',{name:'Turkana, Active sample project'});await path.focus();await path.press('Enter');await expect(path).toHaveAttribute('aria-pressed','true');await expect(page.locator('.county-heading')).toContainText('TURKANA');
 await page.getByRole('button',{name:'View sample project'}).click();await expect(page.getByRole('dialog')).toContainText('Turkana');await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
});
test('project filters and empty state derive from sample data',async({page})=>{
 await page.goto('/projects');await expect(page.locator('.project-directory .project-card')).toHaveCount(47);
 await page.getByRole('button',{name:'Completed',exact:true}).click();await expect(page.locator('.project-directory .project-card')).toHaveCount(16);
 await page.getByLabel('Search projects or counties').fill('no-such-county');await expect(page.getByText('No sample projects match.')).toBeVisible();await page.getByRole('button',{name:'Reset filters'}).click();await page.getByLabel('Search projects or counties').fill('Nairobi');await expect(page.locator('.project-directory .project-card')).toHaveCount(1);
 await page.locator('.project-directory').getByRole('button',{name:'Explore project'}).click();await expect(page.getByRole('dialog')).toContainText('Nairobi');
});
test('chart selector changes values and story controls change the displayed story',async({page})=>{
 await page.goto('/impact');const before=await page.locator('.bar-column strong').allTextContents();await page.getByLabel('Chart metric').selectOption('Children');const after=await page.locator('.bar-column strong').allTextContents();expect(after).not.toEqual(before);
 await page.getByRole('button',{name:'Read The comfort of belonging'}).click();await expect(page.locator('.impact-story h2')).toContainText('The comfort of belonging');
});
test('donation form validates and explicitly avoids charging or transmitting details',async({page})=>{
 const sent=[];page.on('request',r=>{if(r.method()==='POST')sent.push(r.url())});await page.goto('/donate');
 await page.getByRole('button',{name:'Give monthly'}).click();await page.getByRole('button',{name:'KES 3,000',exact:true}).click();await page.getByRole('button',{name:'Card',exact:true}).click();await expect(page.getByLabel('M-Pesa phone number')).toHaveCount(0);
 await page.getByLabel('Email address').fill('example@example.com');await page.getByRole('button',{name:'Preview KES 3,000 monthly gift'}).click();await expect(page.getByRole('status')).toContainText('no payment was taken');expect(sent).toEqual([]);
 await page.getByRole('button',{name:'M-Pesa',exact:true}).click();await page.getByLabel('M-Pesa phone number').fill('0712345678');await page.getByRole('button',{name:'Preview KES 3,000 monthly gift'}).click();await expect(page.getByRole('status')).toContainText('no payment was taken');
});
test('mobile pages have no horizontal overflow and navigation opens',async({page})=>{
 await page.setViewportSize({width:375,height:812});
 for(const path of ['/','/about','/projects','/impact','/donate']){await page.goto(path);await page.evaluate(()=>document.fonts.ready);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true)}
 await page.getByRole('button',{name:'Open menu'}).click();await page.getByRole('link',{name:'Home',exact:true}).click();await expect(page).toHaveURL(/\/$/);await expect(page.getByRole('button',{name:'Open menu'})).toBeVisible();
 await page.screenshot({path:'/tmp/kch-mobile.png',fullPage:true});
});
