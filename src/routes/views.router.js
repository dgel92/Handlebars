import {Router} from "express";

const router = Router();

router.get('/', (req, res)=>{
    res.render('vista1')
})

router.get('/view2', (req, res) => {
    res.render('vista2')
});

router.get('/view3',(req, res)=>{
    let user ={
        firstname: "juan",
        lasttname: "perez"
    };
    res.render("vista3", user)
});

export default router;