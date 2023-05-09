import {Router} from "express";

const router = Router();

router.get('/', (req, res)=>{
    res.render("vista1")
})

export default router;