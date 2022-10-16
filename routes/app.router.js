const router=require('express').Router();
const appController=require('../controller/app.controller');

router.get("/",appController.create);
router.post('/insert',appController.insert);
router.get('/student-views',appController.studentViews);
router.get('/delete/:id',appController.delete);
router.get('/edit/:id',appController.edit);
router.post('/update',appController.update);
module.exports=router;