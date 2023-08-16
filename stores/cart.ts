import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [] as any[],
  }),
  getters: {
    items: (state) => state.cartItems,
    total: (state) => {
      let total = 0;
      state.cartItems.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total;
    },
  },
  actions: {
    addToCart(item: any) {
      const index = this.cartItems.findIndex((i) => i.id === item.id);
      if (index === -1) {
        this.cartItems.push({ ...item, quantity: 1 });
      } else {
        this.cartItems[index].quantity++;
      }
    },
    removeFromCart(item: any) {
      const index = this.cartItems.findIndex((i) => i.id === item.id);
      if (index === -1) {
        return;
      }
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      } else {
        this.cartItems.splice(index, 1);
      }
    },
    clearCart() {
      this.cartItems = [];
    },
  },
});
