import useStore from '../hooks/useStore';
import { resetUserStore, setCurrentUser, setApiKey, cleanCurrentUser } from './user';

describe('UseStore', () => {
    afterEach(() => {
        resetUserStore();
    });

    it('should set current user', () => {
        const store = useStore();
        setCurrentUser({ name: 'Raissa' });
        expect(store.User.currentUser.name).toBe('Raissa');
    });

    it('should set api_key on current user', () => {
        const store = useStore();
        setApiKey('123');
        expect(store.User.currentUser.apikey).toBe('123');
    });

    it('should clean current user', () => {
        const store = useStore();

        setCurrentUser({ name: 'Raissa' });

        expect(store.User.currentUser.name).toBe('Raissa');
        cleanCurrentUser();

        expect(store.User.currentUser.name).toBeFalsy();
    });
})