import { Service } from 'vue-di-container';
import UserService from './UserService';

@Service()
export default class RoleService {
    constructor(private userService: UserService) {}

    public async getUser(): Promise<any> {
        return await this.userService.getUser();
    }

    public async getRole(): Promise<string | null> {
        const user = await this.getUser();
        if (!user || !user.profile) {
            return null;
        }

        const roleClaimType = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
        const role = user.profile[roleClaimType];

        if (Array.isArray(role)) {
            return role[0];
        }

        return role || null;
    }

    public async isAdmin(): Promise<boolean> {
        const role = await this.getRole();
        return role === 'Admin';
    }

    public async getUsername(): Promise<string | null> {
        const user = await this.getUser();
        if (!user || !user.profile) {
            return null;
        }

        const nameClaimType = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
        return user.profile[nameClaimType] || user.profile.sub || null;
    }

    public async getDisplayName(): Promise<string | null> {
        const user = await this.getUser();
        if (!user || !user.profile) {
            return null;
        }

        return user.profile.name || user.profile.preferred_username || null;
    }

    public async getRoleInfo(): Promise<{ role: string | null; isAdmin: boolean }> {
        const role = await this.getRole();
        const isAdmin = await this.isAdmin();

        return {
            role,
            isAdmin
        };
    }
}
