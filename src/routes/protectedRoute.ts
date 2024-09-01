import { Router } from 'express';
import { authController } from '../controllers/authController';
import { restaurantController } from '../controllers/restaurantController';
import { reviewController } from '../controllers/reviewController';
import googlePlacesController from '../controllers/googlePlacesController';
import verifyToken from '../middlewares/verifyToken';

const protectedRouter = Router();
protectedRouter.use(verifyToken);
protectedRouter.post('/auth/logout', authController.logout.bind(authController));

protectedRouter.get('/restaurants/:id', restaurantController.get.bind(restaurantController));
protectedRouter.put('/restaurants/:id', restaurantController.update.bind(restaurantController));

protectedRouter.get('/reviews', reviewController.getReviews.bind(reviewController));
protectedRouter.post('/reviews',reviewController.addReview.bind(reviewController));

protectedRouter.get('/integrations/google/:restaurant_id',googlePlacesController.getGooglePlaceData.bind(googlePlacesController));

export default protectedRouter;
