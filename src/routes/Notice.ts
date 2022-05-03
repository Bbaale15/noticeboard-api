import express from "express";
import controller from "../controllers/Notice";

const router = express.Router();

router.get("/", controller.getAllNotices);
router.get("/:id", controller.getNotice);
router.post("/", controller.createNotice);
router.patch("/:id", controller.updateNotice);
router.delete("/:id", controller.deleteNotice);

export = router;
