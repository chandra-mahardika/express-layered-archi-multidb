import { Router } from "express";
import * as productController from "./product.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { requirePermission } from "../../middlewares/rbac.middleware";
import { validate } from "../../middlewares/validate.middleware";
import {
  createProductSchema,
  updateProductSchema,
} from "./product.validation";

const router = Router();

router.use(authenticate);

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post("/", requirePermission("products:create"), validate(createProductSchema), productController.create);
router.put("/:id", requirePermission("products:update"), validate(updateProductSchema), productController.update);
router.delete("/:id", requirePermission("products:delete"), productController.remove);

export default router;
