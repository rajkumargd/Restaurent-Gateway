import { Request, Response, NextFunction } from 'express';
import GooglePlacesService from '../services/googlePlacesService';
import Boom from '@hapi/boom';

class GooglePlacesController {
  private googlePlaceService: GooglePlacesService;

  constructor(googlePlaceService: GooglePlacesService) {
    this.googlePlaceService = googlePlaceService;
  }

  public async getGooglePlaceData(req: Request, res: Response, next: NextFunction): Promise<void> {   
    try {
      const { restaurant_id } = req.params;
      const restaurantData = await this.googlePlaceService.getGooglePlaceData(restaurant_id);
      
      res.status(200).json(restaurantData);
    } catch (error) {
      if (!Boom.isBoom(error)) {
        next(Boom.boomify(error as Error));
      } else {
        next(error);
      }
    }
  }
}

const googlePlaceSerice = new GooglePlacesService();
export default new GooglePlacesController(googlePlaceSerice);
