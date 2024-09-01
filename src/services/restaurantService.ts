import Boom from '@hapi/boom';
import axios from 'axios';

class RestaurantService {
  
  public async getRestaurant(id: number) {
    try {
      const response = await axios.get(`${process.env.RESTAURANT_SERVICE}/api/restaurants/${id}`);
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

  public async updateRestaurant(id: number, restaurantUpdateData:any) {
    try {
      const response = await axios.put(`${process.env.RESTAURANT_SERVICE}/api/restaurants/${id}`,restaurantUpdateData);
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

export default RestaurantService;
