import mockAxios from 'axios';
import AuthService from './auth';

jest.mock('axios');

describe('AuthService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a token when user login', async () => {
        const token = '123.123.123';
        mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({ data: { token } });
        });
        const response = await AuthService(mockAxios).login({
            email: 'raissa@raissa.com',
            password: '123'
        });
        expect(response.data).toHaveProperty('token');
        expect(response).toMatchSnapshot();
    });

    it('should return an user when user register', async () => {
        const user = {
            name: 'Raissa',
            password: '123',
            email: 'raissa@raissa.com'
        };
        mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({ data: user });
        });

        const response = await AuthService(mockAxios).register(user);
        expect(response.data).toHaveProperty('name');
        expect(response.data).toHaveProperty('password');
        expect(response.data).toHaveProperty('email');
        expect(response).toMatchSnapshot();

    });

    it('should throw an error when not found', async () => {
        const errors = { status: 404, statusText: 'Not Found' };
        mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({ request: errors });
        });
        const response = await AuthService(mockAxios).login({
            email: 'raissa@raissa.com',
            password: '123'
        });
        expect(response.errors).toHaveProperty('status');
        expect(response.errors).toHaveProperty('statusText');
    })

})