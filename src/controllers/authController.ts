import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/authService';
import Boom  from '@hapi/boom';

export default class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userResp = await this.authService.register(req.body);
      res.status(201).json(userResp);
    } catch (error) {
      if (!Boom.isBoom(error)) {
        next(Boom.boomify(error as Error));
      } else {
        next(error);
      }
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const loginResp = await this.authService.login(req.body);
      res.status(200).json(loginResp);
    } catch (error) {
      if (!Boom.isBoom(error)) {
        next(Boom.boomify(error as Error));
      } else {
        next(error);
      }
    }    
  }
  public async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const logoutResp = await this.authService.logout();
      res.status(200).json(logoutResp);
    } catch (error) {
      if (!Boom.isBoom(error)) {
        next(Boom.boomify(error as Error));
      } else {
        next(error);
      }
    }
  }
  
}

const authService = new AuthService();
export const authController = new AuthController(authService);
