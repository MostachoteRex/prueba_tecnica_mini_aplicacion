import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';

const router = Router();
const itemController = new ItemController();

router.get('/items', (req, res) => itemController.getAllItems(req, res));
router.post('/items', (req, res) => itemController.createItem(req, res));
router.put('/items/:id', (req, res) => itemController.updateItem(req, res));
router.delete('/items/:id', (req, res) => itemController.deleteItem(req, res));

export default router;