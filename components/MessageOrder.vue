<template>
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
          <!-- <div class="flex items-end" v-if="menuItem.quantity > 0">
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
          /> -->
          <div class="px-3 py-1 text-sm bg-neutral-700 rounded-full">
            ${{ menuItem.price }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="isAction" class="py-2">Your action is required to proceed.</div>
    <div
      v-if="order.OrderStatus.abbreviation"
      @click="handleOrderStatusClick()"
      :class="{
        '!bg-blue-600 border-[1px] border-blue-500 cursor-pointer':
          isAction && order.OrderStatus.abbreviation !== 'OD',
        '!bg-green-600': order.OrderStatus.abbreviation === 'OD',
      }"
      class="bg-neutral-600 px-5 py-3 rounded-xl text-center"
    >
      {{ isAction ? order.OrderStatus.actionName : order.OrderStatus.name }}
    </div>
  </div>
</template>
<script setup>
import { useCartStore } from "~/stores/cart";
import { useUserStore } from "~/stores/user";

const props = defineProps({
  order: Object,
});

const userStore = useUserStore();
const user = computed(() => userStore.currentUser);

const order = ref(props.order);

console.log("order", props.order);

// const menuItems = computed(() => cartStore.items);

// const cartItems = cartStore.cartItems;
// const messageMenuItems = ref(props.messageMenuItems);
// console.log("props.messageMenuItems", props.messageMenuItems);

const menuItems = computed(() =>
  order.value.orderItems.map((orderItem) => {
    return {
      ...orderItem.ProviderMenuItem,
    };
  })
);

const isAction = computed(() => {
  let isCompany = user.value.isCompany;
  let companyProcess = ["PC", "OI"];
  let userProcess = ["PP"];
  return (
    (isCompany &&
      companyProcess.includes(order.value.OrderStatus.abbreviation)) ||
    (!isCompany && userProcess.includes(order.value.OrderStatus.abbreviation))
  );
});

async function handleOrderStatusClick() {
  const { data, error } = await useFetch("/api/orders/status", {
    method: "PUT",
    body: {
      orderStatus: order.value.OrderStatus,
      orderId: order.value.id,
    },
  });
}
</script>
