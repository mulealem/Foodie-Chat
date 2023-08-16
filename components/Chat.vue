<template>
  <div class="w-full h-full bg-blue-500 flex flex-col">
    <div class="w-full p-2 bg-neutral-700 flex flex-row items-center">
      <div class="flex-none h-8 w-8 mr-2">
        <UButton variant="ghost" icon="i-heroicons-arrow-uturn-left" />
      </div>
      <div class="w-full bg-gren-800 text-sm px-1">
        <div>
          {{ receiver.isCompany ? receiver.companyName : receiver.name }}
        </div>
        <div>
          {{ receiver.isCompany ? receiver.companySlogan : receiver.email }}
        </div>
        <!-- <div>
          {{ receiver.isCompany ? "Company: " : "Consumer: " }}{{ params.id }}
        </div> -->
      </div>
      <!-- <div class="flex-none h-8 w-8 ml-2">
        <UButton variant="ghost" icon="i-heroicons-shopping-cart" />
      </div> -->
      <div class="flex-none h-8 w-8 ml-2">
        <UButton variant="ghost" icon="i-heroicons-ellipsis-vertical" />
      </div>
    </div>
    <div
      class="h-full bg-neutral-900 overflow-y-auto flex flex-col-reverse gap-1"
    >
      <div
        class="mb-3 flex flex-row items-end gap-3 px-2"
        v-for="(message, index) in currentMessages"
        :key="index"
      >
        <div class="-mb-[6px]">
          <UAvatar
            size="md"
            :src="
              message.Sender.isCompany
                ? message.Sender.companyLogoUrl
                : message.Sender.image
            "
            :alt="
              message.Sender.isCompany
                ? message.Sender.companyName
                : message.Sender.name
            "
            :class="{ 'rounded-lg': message.Sender.isCompany }"
            class="border-[1px]"
          />
        </div>
        <div class="min-w-[260px]">
          <div class="text-xs pb-1 text-purple-300">
            {{
              message.Sender.isCompany
                ? message.Sender.companyName
                : message.Sender.name
            }}
          </div>
          <div
            class="text-sm p-3 pt-1 pb-2 rounded-2xl rounded-bl-none bg-neutral-800"
            :class="{ '!bg-blue-900': message.Sender.id === user.id }"
          >
            {{ message.content }}
            <div v-if="message.MessageType.abbreviation === 'MENUITEMS'">
              <MessageMenuItems :messageMenuItems="message.menuItems" />
            </div>
            <div v-if="message.MessageType.abbreviation === 'ORDER'">
              <MessageOrder :order="message.order" />
            </div>
            <div class="text-xs text-right pt-1">
              {{ dayjs(message.createdAt).fromNow() }}
            </div>
          </div>
        </div>
        <!-- {{ message }} -->
      </div>
    </div>
    <div
      @click="showCart()"
      v-if="total > 0"
      class="bg-green-700 flex justify-between items-center p-2 px-5 cursor-pointer"
    >
      <div>View Order</div>
      <div>${{ total.toFixed(2) }}</div>
    </div>
    <div
      @click="showSuggestionMenuItems()"
      v-if="suggestedItemsTotalQty > 0"
      class="bg-purple-500 flex justify-center items-center p-2 px-5 cursor-pointer"
    >
      <div class="text-sm">
        View Suggest Items
        <span class="bg-purple-800 px-3 py-1 rounded-3xl">{{
          suggestedItemsTotalQty
        }}</span>
      </div>
    </div>
    <!-- <div>{{ company.id + ":::" + customer.id }}</div> -->
    <div class="bg-neutral-800 p-2 border-t-[1px] border-neutral-600">
      <div class="w-full bg-red-40 rounded-xl pb-2">
        <textarea
          @keypress.enter="handleSubmit"
          v-model="newMessage"
          placeholder="Write a message..."
          class="w-full bg-transparent p-2 resize-none focus:outline-none text-sm"
        />
      </div>
      <div class="flex justify-between">
        <div class="flex gap-2">
          <UButton
            v-for="(menuCategory, index) in menuCategories"
            :key="index"
            @click="handleClick(menuCategory)"
            :label="menuCategory.name"
            :ui="{ rounded: 'rounded-full' }"
            variant="solid"
            color="gray"
          />
          <UButton
            @click="showMyMenu()"
            label="My Menu"
            v-if="user.isCompany"
            :ui="{ rounded: 'rounded-full' }"
            variant="solid"
            color="gray"
          />
          <UModal v-model="isMyMenuItemsOpen">
            <div class="bg-neutral-800">
              <div
                class="p-2 pl-4 border-b-[1px] border-neutral-700 flex justify-between items-center"
              >
                My Menu
                <div>
                  <UButton
                    @click="isMyMenuItemsOpen = false"
                    icon="i-heroicons-x-mark"
                    variant="ghost"
                    color="gray"
                  />
                </div>
              </div>
              <MyMenuItems />
            </div>
          </UModal>
          <UModal v-model="isCartOpen">
            <div class="bg-neutral-800">
              <div
                class="p-2 pl-4 border-b-[1px] border-neutral-700 flex justify-between items-center"
              >
                Cart
                <div>
                  <UButton
                    @click="isCartOpen = false"
                    icon="i-heroicons-x-mark"
                    variant="ghost"
                    color="gray"
                  />
                </div>
              </div>
              <Cart />
            </div>
          </UModal>
          <UModal v-model="isSuggestionMenuItemsOpen">
            <div class="bg-neutral-800">
              <div
                class="p-2 pl-4 border-b-[1px] border-neutral-700 flex justify-between items-center"
              >
                Suggest Items
                <div>
                  <UButton
                    @click="isSuggestionMenuItemsOpen = false"
                    icon="i-heroicons-x-mark"
                    variant="ghost"
                    color="gray"
                  />
                </div>
              </div>
              <SuggestedMenuItems />
            </div>
          </UModal>
          <UModal v-model="isMenuCategoryItemsOpen">
            <div class="bg-neutral-800">
              <div
                class="p-2 pl-4 border-b-[1px] border-neutral-700 flex justify-between items-center"
              >
                <div>{{ selectedMenuCategory.name }}</div>
                <div>
                  <UButton
                    @click="isMenuCategoryItemsOpen = false"
                    icon="i-heroicons-x-mark"
                    variant="ghost"
                    color="gray"
                  />
                </div>
              </div>
              <MenuItems :menuCategoryId="selectedMenuCategory.id" />
            </div>
          </UModal>
        </div>
        <div>
          <UButtonGroup size="sm">
            <UButton label="Send" color="blue" @click="handleSubmit" />
            <UButton icon="i-heroicons-chevron-down-20-solid" color="blue" />
          </UButtonGroup>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import io from "socket.io-client";

import { useCartStore } from "~/stores/cart";
import { useUserStore } from "~/stores/user";
import { useMessageStore } from "~/stores/message";
import { useSuggestionMenuItemStore } from "~/stores/suggestionMenuItem";

const socket = io("http://localhost:3007");

const dayjs = useDayjs();

const cartStore = useCartStore();
const userStore = useUserStore();
const messageStore = useMessageStore();
const suggestionStore = useSuggestionMenuItemStore();

cartStore.clearCart();
messageStore.clearCurrentMessages();
suggestionStore.clearMenu();

const user = computed(() => userStore.currentUser);
const total = computed(() => cartStore.total);
const cartItems = computed(() => cartStore.items);
const suggestedItemsTotalQty = computed(() => suggestionStore.total);
const suggestedItems = computed(() => suggestionStore.items);

const newMessage = ref("");

const { params } = useRoute();
const id = ref(params.id);

const receiver = ref({});

const showMyMenu = () => {
  isMyMenuItemsOpen.value = true;
};

const showCart = () => {
  isCartOpen.value = true;
};

const showSuggestionMenuItems = () => {
  isSuggestionMenuItemsOpen.value = true;
};

const { data: receiverData } = await useFetch("/api/users/" + id.value);
receiver.value = receiverData.value;

console.log("::::::::::::::receiver::::::::::::::", receiver.value);

const uniqueId = receiver.value?(receiver.value.isCompany
  ? receiver.value.id + user.value.id
  : user.value.id + receiver.value.id):"";
console.log("::::::::::::::uniqueId::::::::::::::", uniqueId);

socket.on("connect", () => {
  console.log("connected");
  socket.emit("create", uniqueId);
});

socket.on("chat message", (msg) => {
  console.log("::::::::::::::msg::::::::::::::", msg);
  messageStore.addMessage(msg);
});

const isMenuCategoryItemsOpen = ref(false);
const isMyMenuItemsOpen = ref(false);
const isCartOpen = ref(false);
const isSuggestionMenuItemsOpen = ref(false);
const selectedMenuCategory = ref({});
const menuCategories = ref([]);
const { data: menuCategoriesData } = await useFetch(
  "/api/menuCategories/" + id.value
);
menuCategories.value = menuCategoriesData.value;
menuCategories.value.forEach((menuCategory) => {
  menuCategory.selected = false;
});

const messages = computed(() => messageStore.messages);
const currentMessages = computed(() => messages.value);
const { data: messagesData } = await useFetch("/api/messages/" + id.value);
if (messagesData.value) {
  messagesData.value
    .slice()
    .reverse()
    .forEach((message) => {
      const ms = {
        ...message,
      };
      // console.log("message: ", ms);
      messageStore.addMessage(ms);
      console.log("message: ", ms);
    });
} else {
  console.log("messagesData.value: ", messagesData.value);
}

function handleClick(menuCategory) {
  console.log("menuCategory:: :: ", menuCategory);

  selectedMenuCategory.value = menuCategory;
  isMenuCategoryItemsOpen.value = !isMenuCategoryItemsOpen.value;
}

async function handleSubmit() {
  // console.log("newMessage: ", newMessage.value);

  let tempMessage = {
    content: newMessage.value,
    receiverId: params.id,
  };

  // console.log("suggestedItems: ", suggestedItems.value);
  // return;

  if (suggestedItems.value.length > 0) {
    tempMessage.type = "MENUITEMS";
    tempMessage.menuItems = suggestedItems.value;
  }

  if (cartItems.value.length > 0) {
    tempMessage.type = "ORDER";
    tempMessage.menuItems = cartItems.value;
  }

  const { data: result } = await useFetch("/api/messages/send", {
    method: "POST",
    body: tempMessage,
  });

  console.log("createdMessage: ", result.value);
  console.log("before  ://: ", messages.value.length);
  console.log("after  ://: ", messages.value.length);

  socket.emit("chat message", {
    room: uniqueId,
    message: result.value,
  });

  newMessage.value = "";
  suggestionStore.clearMenu();
}
</script>
