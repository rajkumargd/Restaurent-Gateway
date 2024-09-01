import Boom from '@hapi/boom';
import axios from 'axios';

class AuthService {

  public async register(regData: any) {
    try {
      const response = await axios.post(`${process.env.AUTH_SERVICE}/api/auth/register`, regData);
      
      return response.data;
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw Boom.boomify(new Error(error.response.data.message), { statusCode: error.response.status });
        } else {
          throw Boom.internal('No response from authentication service');
        }
      } else {
        throw Boom.internal('An unexpected error occurred');
      }
    }
  }
  public async login(loginData: any): Promise<void> {
    try {
      const response = await axios.post(`${process.env.AUTH_SERVICE}/api/auth/login`, loginData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw Boom.boomify(new Error(error.response.data.message), { statusCode: error.response.status });
        } else {
          throw Boom.internal('No response from authentication service');
        }
      } else {
        throw Boom.internal('An unexpected error occurred');
      }
    }
  }
  public async logout(): Promise<void> {
    try {
      const response = await axios.post(`${process.env.AUTH_SERVICE}/api/auth/logout`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw Boom.boomify(new Error(error.response.data.message), { statusCode: error.response.status });
        } else {
          throw Boom.internal('No response from authentication service');
        }
      } else {
        throw Boom.internal('An unexpected error occurred');
      }
    }
  }
}

export default AuthService;
