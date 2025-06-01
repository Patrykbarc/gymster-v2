import { expect, test } from '@playwright/test'

test('successful login redirects to dashboard', async ({ page }) => {
  // Start from login page
  await page.goto('/login')

  // Fill in login form
  await page.getByRole('textbox', { name: 'Email' }).fill('test@test.com')
  await page.getByRole('textbox', { name: 'Password' }).fill('password')

  // Submit form
  await page.getByRole('button', { name: 'Login' }).click()

  // Wait for navigation and verify we're redirected to dashboard
  await page.waitForURL('/dashboard')
  expect(page.url()).toBe('http://localhost:5173/dashboard')

  // Verify we can access protected route
  await page.getByRole('link', { name: 'Workout plans' }).click()
  await page.waitForURL('**/workout-plans')
  expect(page.url()).toContain('/workout-plans')
})

test('unauthenticated user is redirected to login', async ({ page }) => {
  // Try to access protected route
  await page.goto('/dashboard')

  // Should be redirected to login
  await page.waitForURL('/login')
  expect(page.url()).toBe('http://localhost:5173/login')
})
