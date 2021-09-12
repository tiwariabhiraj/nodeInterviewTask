const express = require('express');
const router = express.Router();
import { controller } from "../controller/insertController"
import { searchController } from "../controller/searchController"
import { messageController } from "../controller/messageController"
router.get("/search", searchController.search);
router.get("/policy-info", searchController.aggregatePolicyOfUser);
router.post('/upload', controller.assignToChildProcess)
router.post('/message', messageController.saveMessage)

export const Router = router
