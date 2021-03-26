
import { setGlobalLoading } from './global';
import state from './global';


it('should set global loading', () => {
    setGlobalLoading(true);
    expect(state.isLoading).toBe(true);
});