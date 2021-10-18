import { Router } from 'express';
import * as condominios from '../controllers/condominios';
import * as pessoas from '../controllers/pessoas';
import * as containers from '../controllers/containers';

const router = Router();

router.get('/condominios', condominios.list);
router.post('/condominios', condominios.create);
router.put('/condominios', condominios.update);
router.delete('/condominios', condominios.erase);

router.get('/pessoas', pessoas.list);
router.post('/pessoas', pessoas.create);
router.put('/pessoas', pessoas.update);
router.delete('/pessoas', pessoas.erase);

router.get('/containers', containers.list);
router.post('/containers', containers.create);
router.put('/containers', containers.update);
router.delete('/containers', containers.erase);

export default router;
