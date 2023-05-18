import { productValidator, stockValidator } from "../middlewares/productValidator.js";

import { Router } from "express";
import { productManager } from "../manager/productsManager.js";
import { uploader } from "../middlewares/multer.js";

const router = Router();

/*----------------------------------------------------------*/
router.get("/", async (req, res)=>{
try {
    const products = await getAllProducts();
    res.status(200).json(products);
} catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
}
});

/*----------------------------------------------------------*/
router.get("/:id", async (req, res) => {
try {
    const { id } = req.params;
    const product = await getProductById(Number(id));
    if (product) {
    res.status(200).json({message: "producto no encontrado", product});
    } else {
    res.status(404).send("Producto no encontrado");
    }
} catch (error) {
    res.status(500).json({ message: "Error al obtener el producto" });
}
});

/*----------------------------------------------------------*/
router.post("/", productValidator, async (req, res) => {
try {
    const product = req.body;
    const newProduct = await createProduct(product);
    res.json(newProduct);
} catch (error) {
    res.status(500).json({ message: "Error al crear el producto" });
}
});

/*----------------------------------------------------------*/
router.post("/test-multer", uploader.single('img'), async (req, res) => {
try {
    console.log(req.file)
    const product = req.body;
    product.img = req.file.path;
    const newProduct = await createProduct(product);
    res.status(201).json(newProduct);
} catch (error) {
    res.status(500).json({ message: "Error al crear el producto" });
}
});

/*----------------------------------------------------------*/
router.put("/:id", async (req, res) => {
try {
    const product = req.body;
    const { id } = req.params;
    const productFile = await getProductById(Number(id));
    if (productFile) {
    await productManager.updateProduct(product, Number(id));
    res.send("Producto actualizado con éxito");
    } else {
    }
} catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto" });
}
});

/*----------------------------------------------------------*/
router.delete("/:id", async (req, res) => {
try {
    const { id } = req.params;
    const product = await getProductById();
    if (product.length > 0) {
    await deleteProductById(Number(id));
    res.send(`Producto con id ${id} eliminado`);
    } else {
    res.status(404).send(`Producto con id ${id} no encontrado`);
    }
} catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto" });
}
});

/*----------------------------------------------------------*/
router.delete("/", async (req, res) => {
try {
    await deleteAllProducts();
    res.send("Todos los productos han sido eliminados");
} catch (error) {
    res.status(500).json({ message: "Error al eliminar los productos" });
}
});

export default router;