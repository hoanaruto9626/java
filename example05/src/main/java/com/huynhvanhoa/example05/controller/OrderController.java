package com.huynhvanhoa.example05.controller;

import com.huynhvanhoa.example05.payloads.OrderDTO;
import com.huynhvanhoa.example05.payloads.OrderResponse;
import com.huynhvanhoa.example05.service.OrderService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api"})
@SecurityRequirement(name = "E-Commerce Application")
@CrossOrigin(origins = {"*"})
public class OrderController {
    @Autowired
   public OrderService orderService;

   public OrderController() {
   }

   @PostMapping({"/public/users/{emailId}/carts/{cartId}/payments/{paymentMethod}/order"})
   public ResponseEntity<OrderDTO> orderProducts(@PathVariable String emailId, @PathVariable Long cartId, @PathVariable String paymentMethod) {
      OrderDTO order = this.orderService.placeOrder(emailId, cartId, paymentMethod);
      return new ResponseEntity(order, HttpStatus.CREATED);
   }

   @GetMapping({"/admin/orders"})
   public ResponseEntity<OrderResponse> getAllOrders(@RequestParam(name = "pageNumber",defaultValue = "0",required = false) Integer pageNumber, @RequestParam(name = "pageSize",defaultValue = "5",required = false) Integer pageSize, @RequestParam(name = "sortBy",defaultValue = "totalAmount",required = false) String sortBy, @RequestParam(name = "sortOrder",defaultValue = "asc",required = false) String sortOrder) {
      OrderResponse orderResponse = this.orderService.getAllOrders(pageNumber, pageSize, sortBy, sortOrder);
      return new ResponseEntity(orderResponse, HttpStatus.OK);
   }

   @GetMapping({"public/users/{emailId}/orders"})
   public ResponseEntity<List<OrderDTO>> getOrdersByUser(@PathVariable String emailId) {
      List<OrderDTO> orders = this.orderService.getOrdersByUser(emailId);
      return new ResponseEntity(orders, HttpStatus.OK);
   }

   @GetMapping({"public/users/{email}/orders/{orderId}"})
   public ResponseEntity<OrderDTO> getOrderByUser(@PathVariable String email, @PathVariable Long orderId) {
      OrderDTO order = this.orderService.getOrder(email, orderId);
      return new ResponseEntity(order, HttpStatus.OK);
   }

   @PutMapping({"admin/users/{emailId}/orders/{orderId}/orderStatus/{orderStatus}"})
   public ResponseEntity<OrderDTO> updateOrderByUser(@PathVariable String emailId, @PathVariable Long orderId, @PathVariable String orderStatus) {
      OrderDTO order = this.orderService.updateOrder(emailId, orderId, orderStatus);
      return new ResponseEntity(order, HttpStatus.OK);
   }
}
