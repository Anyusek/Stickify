import bridge from '@vkontakte/vk-bridge';
import { demoAnalysis } from '../data/demo';
import type { AnalysisResult, CollectorProfile } from '../data/types';
import { downloadDataUrl, getBase64FromDataUrl, resolveAvatarDataUrl } from './share';

const BRIDGE_TIMEOUT_MS = 1200;

async function withTimeout<T>(promise: Promise<T>, timeoutMs = BRIDGE_TIMEOUT_MS): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      window.setTimeout(() => reject(new Error('VK Bridge timeout')), timeoutMs);
    })
  ]);
}

export async function initVk(): Promise<void> {
  try {
    await withTimeout(bridge.send('VKWebAppInit'));
  } catch {
    // Local browser preview works without the VK client.
  }
}

export async function authorizeVk(): Promise<CollectorProfile | null> {
  try {
    const user = await withTimeout(bridge.send('VKWebAppGetUserInfo'));
    const photoUrl = user.photo_200 || user.photo_100;

    return {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`.trim(),
      link: `vk.com/id${user.id}`,
      avatarUrl: await resolveAvatarDataUrl(photoUrl),
      level: 'VK Collector'
    };
  } catch {
    return null;
  }
}

export async function pickFriend(): Promise<string | null> {
  try {
    const result = await withTimeout(bridge.send('VKWebAppGetFriends', {}));
    const firstFriend = result.users?.[0];
    return firstFriend ? `https://vk.com/id${firstFriend.id}` : null;
  } catch {
    return null;
  }
}

export async function shareToStory(dataUrl: string): Promise<boolean> {
  try {
    await withTimeout(bridge.send('VKWebAppShowStoryBox', {
      background_type: 'image',
      blob: getBase64FromDataUrl(dataUrl),
      locked: false
    }), 10000);
    return true;
  } catch {
    downloadDataUrl(dataUrl, 'stickify-story.png');
    return false;
  }
}

export async function analyzeCollection(profileUrl: string): Promise<AnalysisResult> {
  await new Promise((resolve) => window.setTimeout(resolve, 950));

  const id = Number(profileUrl.match(/(?:id)?(\d+)/)?.[1] ?? demoAnalysis.profile.id);
  return {
    ...demoAnalysis,
    profile: {
      ...demoAnalysis.profile,
      id,
      link: profileUrl.replace(/^https?:\/\//, '') || demoAnalysis.profile.link
    },
    updatedAt: new Date().toISOString()
  };
}
