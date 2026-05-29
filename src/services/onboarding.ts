const ONBOARDING_KEY = 'onboarding_completed';

export function hasCompletedOnboarding(): boolean {
  try {
    return window.localStorage.getItem(ONBOARDING_KEY) === 'true';
  } catch {
    return false;
  }
}

export function completeOnboarding(): void {
  try {
    window.localStorage.setItem(ONBOARDING_KEY, 'true');
  } catch {
    // VK Storage can be connected here for devices with restricted localStorage.
  }
}
