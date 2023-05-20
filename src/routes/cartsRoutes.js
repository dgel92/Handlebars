import {CartManager} from "../manager/cartManager.js"
import {Router} from "express";

const router = Router();
const cartManager = new CartManager;

router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts()
        res.status(200).json(carts)
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cartFound = await cartManager.getCartById(Number(cid))
        if (cartFound) {
            res.status(200).json({ message: `(i) carrito con ID (${cid}) encontrado`, cart: cartFound })
        } else {
            res.status(404).json({ message: `(!) no se encuentra carrito con ID (ID: ${Number(cid)}).` })
        }
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})

router.post('/', async (req, res) => {
    try {
        await cartManager.createCart();
        res.status(200).json({ message: 'Carrito creado con exito' })
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})

router.put('/:cid/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const result = await cartManager.addToCart(Number(cid), Number(pid))
        const updatedCart = await cartManager.getCartById(Number(cid))
        if (result === 'cart_404'){
            res.status(404).json({message: `(!) no se encuentra el carrito con el id (ID: ${cid})`})
        } else if (result === 'prod_404') {
            res.status(404).json({message: `(!) no se puede encontrar el producto con ID(ID: ${pid})`})
        } else {
            res.status(200).json({ message: `(i) producto con ID (${pid}) agregado al carrito (${cid}) exitosamente!`, cart: updatedCart })
        }
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})

export default router