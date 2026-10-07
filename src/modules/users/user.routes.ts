import { Router } from "express";
import * as userController from "./user.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { requirePermission } from "../../middlewares/rbac.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { updateUserSchema } from "./user.validation";

const router = Router();

router.use(authenticate, requirePermission("users:manage"));

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.put("/:id", validate(updateUserSchema), userController.update);
router.delete("/:id", userController.remove);

export default router;
