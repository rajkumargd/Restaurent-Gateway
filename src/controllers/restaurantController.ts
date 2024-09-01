import { Request, Response, NextFunction } from 'express';
import RestaurantService from '../services/restaurantService';
import Boom  from '@hapi/boom';


export default class RestaurantController {
  private restaurantService: RestaurantService;

  constructor(restaurantService: RestaurantService) {
    this.restaurantService = restaurantService;
  }

  public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const restaurantData = await this.restaurantService.getRestaurant(id);
      console.log(restaurantData)
      res.status(200).json(restaurantData);
    } catch (error) {
      if (!Boom.isBoom(error)) {
        next(Boom.boomify(error as Error));
      } else {
        next(error);
      }
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const loginResp = await this.restaurantService.updateRestaurant(id,req.body);
      res.status(200).json(loginResp);
    } catch (error) {
      if (!Boom.isBoom(error)) {
        next(Boom.boomify(error as Error));
      } else {
        next(error);
      }
    }
  }
}

const restaurantService = new RestaurantService();
export const restaurantController = new RestaurantController(restaurantService);