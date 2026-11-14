import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getSummary,
}from "../controllers/TransactionController.js";

const router = express.Router();

router.use(protect);
router.get("/summary" , getSummary );
router.route("/").post(addTransaction).get(getTransactions);
router.route("/:id").put(updateTransaction).delete(deleteTransaction);

export default router ;