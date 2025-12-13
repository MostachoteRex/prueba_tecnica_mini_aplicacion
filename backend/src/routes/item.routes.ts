import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';

const router = Router();
const itemController = new ItemController();

router.get('/items', itemController.getAllItems.bind(itemController));
router.post('/items', itemController.createItem.bind(itemController));
router.put('/items/:id', itemController.updateItem.bind(itemController));
router.patch('/items/:id/toggle', itemController.toggleItem.bind(itemController));
router.delete('/items/:id', itemController.deleteItem.bind(itemController));

export default router;