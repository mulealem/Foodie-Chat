<template>
  <div class="p-3 border-b-[1px] border-neutral-700">
    <UInput
      icon="i-heroicons-magnifying-glass-20-solid"
      size="xl"
      color="white"
      :trailing="false"
    />
  </div>
  <div class="max-h-96 p-3 overflow-y-auto">
    <div
      v-for="(menuItem, index) in menuItems"
      :key="index"
      class="flex flex-row border-b-[1px] last:border-b-0 border-neutral-700 pb-2 mb-2"
    >
      <div
        class="w-52 h-20 rounded-lg bg-neutral-800 flex justify-center items-center"
      >
        <img
          :src="menuItem.imageURL"
          :alt="menuItem.name + ' image'"
          class="h-full"
        />
      </div>
      <div class="w-full px-3 flex flex-col justify-between">
        <div class="py-0">
          <div class="text-lg">{{ menuItem.name }}</div>
          <div class="text-sm">{{ menuItem.description }}</div>
        </div>
        <div class="flex justify-between items-center font-bold">
          <div class="flex items-end" v-if="menuItem.quantity > 0">
            <UButton
              class="w-8 h-8 flex justify-center"
              icon="i-heroicons-minus"
              color="primary"
              variant="solid"
              @click="decrementQuantity(menuItem)"
            />
            <div class="px-3 py-1 text-sm bg-neural-700">
              {{ menuItem.quantity }}
            </div>
            <UButton
              class="w-8 h-8 flex justify-center"
              icon="i-heroicons-plus"
              color="primary"
              size="xs"
              variant="solid"
              @click="incrementQuantity(menuItem)"
            />
          </div>

          <UButton
            v-else
            @click="incrementQuantity(menuItem)"
            class="w-24 flex justify-center"
            label="ADD"
            color="primary"
            variant="solid"
          />
          <div class="px-3 py-1 text-sm bg-neutral-700 rounded-full">
            ${{ menuItem.price }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCartStore } from "~/stores/cart";

const props = defineProps({
  menuCategoryId: String,
});

const store = useCartStore();

const menuItems = ref([]);

console.log("menu items", props.menuCategoryId);

const { data: menuItemsData } = await useFetch(
  "/api/providerMenuItems/" + props.menuCategoryId
);

console.log("menu items", menuItemsData.value);

const cartItems = store.cartItems;
console.log("cart items", cartItems);

menuItems.value = menuItemsData.value.map((menuItem) => {
  const cartItem = cartItems.find((item) => item.id === menuItem.id);
  return {
    ...menuItem,
    price: menuItem.price.toFixed(2),
    quantity: cartItem ? cartItem.quantity : 0,
  };
});

function incrementQuantity(menuItem) {
  //   const doubleValue = computed(() => store.doubleCount);
  // console.log(
  //   "::::::::::::::store doubleValue::::::::::::::",
  //   doubleValue.value,
  //   store.count
  // );
  store.addToCart(menuItem);
  menuItem.quantity++;
}

function decrementQuantity(menuItem) {
  if (menuItem.quantity > 0) {
    store.removeFromCart(menuItem);
    menuItem.quantity--;
  }
}
</script>
