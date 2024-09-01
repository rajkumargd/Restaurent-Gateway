import { Request, Response, NextFunction } from 'express';
import ReviewService from '../services/reviewService';
import Boom from '@hapi/boom';

export default class ReviewController {
  private reviewService: ReviewService;

  constructor(reviewService: ReviewService) {
    this.reviewService = reviewService;
  }

  public async addReview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const addReviewResp = await this.reviewService.addReview(req.body);
      res.status(201).json(addReviewResp);
    } catch (error) {
      if (!Boom.isBoom(error)) {
        next(Boom.boomify(error as Error));
      } else {
        next(error);
      }
    }
  }

  public async getReviews(req: Request, res: Response, next: NextFunction): Promise<void> {
    
    try {
      const reviewData = await this.reviewService.getReviews(req.query);
      res.status(200).json(reviewData);
    } catch (error) {
      if (!Boom.isBoom(error)) {
        next(Boom.boomify(error as Error));
      } else {
        next(error);
      }
    }
  }
}
const reviewService = new ReviewService();
export const reviewController = new ReviewController(reviewService);