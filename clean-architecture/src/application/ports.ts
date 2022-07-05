import { Cart } from "../domain/cart";
import { Order } from "../domain/order";
import { User, UserName } from "../domain/user";

/**
 * 왜 ports를 따로 적어줄까?
 * the specifications of how our application wants the outside world to communicate with it.
 * Usually a port is an interface, a behavior contract.
 */

export interface UserStorageService {
  user?: User;
  updateUser(user: User): void;
}

export interface CartStorageService {
  cart: Cart;
  updateCart(cart: Cart): void;
  emptyCart(): void;
}

export interface OrdersStorageService {
  orders: Order[];
  updateOrders(orders: Order[]): void;
}

export interface AuthenticationService {
  auth(name: UserName, email: Email): Promise<User>;
}

export interface NotificationService {
  notify(message: string): void;
}

export interface PaymentService {
  tryPay(amount: PriceCents): Promise<boolean>;
}
