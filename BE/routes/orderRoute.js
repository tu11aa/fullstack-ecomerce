// routes/orderRoutes.js
import orderController from "../controllers/orderController";
import { protect } from "../middleware/authMiddleware"; // Assuming you have authentication middleware

// Create a new order
router.post("/", protect, orderController.createOrder);

// Get all orders (for admin, with pagination)
router.get("/", protect, orderController.getAllOrders);

// Get order by ID
router.get("/:id", protect, orderController.getOrderById);

// Update order status (e.g., for admin to change to 'shipped')
router.put("/:id/status", protect, orderController.updateOrderStatus);

// Update payment status (likely called by a webhook from your payment gateway)
router.put("/:id/payment", orderController.updatePaymentStatus);
// Get my order
router.get("/myorders", protect, orderController.getMyOrders);

// Cancel order
router.put("/:id/cancel", protect, orderController.cancelOrder);

// Add more routes as needed (e.g., for returns, refunds)

module.exports = router;
