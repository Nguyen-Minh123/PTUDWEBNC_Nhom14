/**
 * ============================================================================
 * Chức năng:
 * - Quản lý state hồ sơ cá nhân trong Dashboard.
 * - Nạp profile từ backend.
 * - Đồng bộ profile với NextAuth session.
 * - Cập nhật profile người dùng.
 * - Cung cấp loading/saving state cho UI.
 *
 * Ghi chú:
 * - Hook này chỉ xử lý logic liên quan đến profile.
 * - Không render UI.
 * - API call vẫn dùng service riêng.
 * ============================================================================
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';

import { authService } from '@/services/authService';

/**
 * Dữ liệu user mở rộng từ NextAuth session.
 */
export interface SessionUserExt {
    id?: string;
    accessToken?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    bio?: string | null;
}

/**
 * DTO dùng cho form hồ sơ.
 */
export interface ProfileFormState {
    displayName: string;
    bio: string;
    avatarUrl: string;
}

/**
 * Kết quả hook useProfile.
 */
export interface UseProfileReturn {
    // Session / user
    currentUser: SessionUserExt | undefined;
    accessToken: string | null;

    // Form state
    displayName: string;
    setDisplayName: React.Dispatch<React.SetStateAction<string>>;

    bio: string;
    setBio: React.Dispatch<React.SetStateAction<string>>;

    avatarUrl: string;
    setAvatarUrl: React.Dispatch<React.SetStateAction<string>>;

    // UI state
    loading: boolean;
    saving: boolean;

    // Derived data
    profileInitials: string;
    hasAvatar: boolean;

    // Actions
    loadProfile: () => Promise<void>;
    saveProfile: () => Promise<boolean>;
    resetProfile: () => void;
    syncFromSession: () => void;
    updateLocalProfile: (profile: Partial<ProfileFormState>) => void;
}

/**
 * useProfile
 * Gom toàn bộ logic nạp và lưu hồ sơ cá nhân.
 */
export function useProfile(): UseProfileReturn {
    // Lấy session NextAuth hiện tại.
    const { data: session, update: updateSession } = useSession();

    // User mở rộng từ session.
    const currentUser = session?.user as SessionUserExt | undefined;

    // Token để gọi API.
    const accessToken = currentUser?.accessToken ?? null;

    // Trạng thái loading khi nạp profile.
    const [loading, setLoading] = useState<boolean>(false);

    // Trạng thái saving khi lưu profile.
    const [saving, setSaving] = useState<boolean>(false);

    // Tên hiển thị.
    const [displayName, setDisplayName] = useState<string>('');

    // Bio cá nhân.
    const [bio, setBio] = useState<string>('');

    // Avatar URL.
    const [avatarUrl, setAvatarUrl] = useState<string>('');

    /**
     * Đồng bộ form từ session khi chưa có dữ liệu từ API.
     */
    const syncFromSession = useCallback(() => {
        setDisplayName(currentUser?.name ?? '');
        setBio(currentUser?.bio ?? '');
        setAvatarUrl(currentUser?.image ?? '');
    }, [currentUser?.bio, currentUser?.image, currentUser?.name]);

    /**
     * Reset form về dữ liệu session hiện tại.
     */
    const resetProfile = useCallback(() => {
        syncFromSession();
    }, [syncFromSession]);

    /**
     * Nạp hồ sơ từ backend.
     */
    const loadProfile = useCallback(async () => {
        if (!accessToken) {
            syncFromSession();
            return;
        }

        setLoading(true);

        try {
            const profile = await authService.getProfile(accessToken);

            if (profile) {
                setDisplayName(profile.displayName || currentUser?.name || '');
                setBio(profile.bio || currentUser?.bio || '');
                setAvatarUrl(profile.avatarUrl || currentUser?.image || '');
            } else {
                syncFromSession();
            }
        } catch (error) {
            console.error('Lỗi tải profile:', error);
            syncFromSession();
        } finally {
            setLoading(false);
        }
    }, [accessToken, currentUser?.bio, currentUser?.image, currentUser?.name, syncFromSession]);

    /**
     * Lưu hồ sơ lên backend và cập nhật session.
     */
    const saveProfile = useCallback(async (): Promise<boolean> => {
        if (!accessToken) {
            return false;
        }

        setSaving(true);

        try {
            const updatedProfile = await authService.updateProfile(
                {
                    displayName,
                    bio,
                    avatarUrl,
                },
                accessToken
            );

            if (!updatedProfile) {
                return false;
            }

            // Đồng bộ lại session để Navbar/Dashboard khác dùng ngay.
            if (updateSession) {
                await updateSession({
                    ...(session ?? {}),
                    user: {
                        ...(currentUser ?? {}),
                        name: displayName,
                        image: avatarUrl,
                        bio,
                    },
                } as never);
            }

            return true;
        } catch (error) {
            console.error('Lỗi lưu profile:', error);
            return false;
        } finally {
            setSaving(false);
        }
    }, [accessToken, avatarUrl, bio, currentUser, displayName, session, updateSession]);

    /**
     * Cập nhật một phần state profile tại local.
     */
    const updateLocalProfile = useCallback((profile: Partial<ProfileFormState>) => {
        if (profile.displayName !== undefined) {
            setDisplayName(profile.displayName);
        }

        if (profile.bio !== undefined) {
            setBio(profile.bio);
        }

        if (profile.avatarUrl !== undefined) {
            setAvatarUrl(profile.avatarUrl);
        }
    }, []);

    /**
     * Tính chữ cái đầu để hiển thị fallback avatar.
     */
    const profileInitials = useMemo(() => {
        const sourceName = displayName.trim() || currentUser?.name || 'User';
        return sourceName.charAt(0).toUpperCase();
    }, [currentUser?.name, displayName]);

    /**
     * Kiểm tra có avatar hợp lệ hay không.
     */
    const hasAvatar = useMemo(() => avatarUrl.trim().length > 0, [avatarUrl]);

    /**
     * Tự load profile khi session thay đổi.
     */
    useEffect(() => {
        void loadProfile();
    }, [loadProfile]);

    return {
        currentUser,
        accessToken,

        displayName,
        setDisplayName,

        bio,
        setBio,

        avatarUrl,
        setAvatarUrl,

        loading,
        saving,

        profileInitials,
        hasAvatar,

        loadProfile,
        saveProfile,
        resetProfile,
        syncFromSession,
        updateLocalProfile,
    };
}