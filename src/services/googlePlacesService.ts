import Boom  from '@hapi/boom';
import axios from 'axios';

class GooglePlacesService {

  public async getGooglePlaceData(google_place_id: string): Promise<any> {
    try {
      const response = await axios.get(`${process.env.REVIEW_SERVICE}/api/integrations/google/${google_place_id}`);
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

export default GooglePlacesService;
