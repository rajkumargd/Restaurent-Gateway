import Boom from "@hapi/boom";
import axios from "axios";

class ReviewService {

  public async addReview(reviewData:any): Promise<void> {
    try {      
      const response = await axios.post(`${process.env.REVIEW_SERVICE}/api/reviews`, reviewData);
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

  public async getReviews(reviewQuery:any): Promise<void> {
    try {      
      const response = await axios.get(`${process.env.REVIEW_SERVICE}/api/reviews`,{params:reviewQuery});
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

export default ReviewService;
