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
          <UButton
            @click="removeFromSuggestions(menuItem)"
            class="w-24 flex justify-center"
            label="Remove"
            color="red"
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
import { useSuggestionMenuItemStore } from "~/stores/suggestionMenuItem";

// const props = defineProps({
//   menuCategoryId: String,
// });

const cartStore = useCartStore();
const suggestionStore = useSuggestionMenuItemStore();

const menuItems = computed(() => suggestionStore.items);
console.log("menu items", menuItems);

// console.log("menu items", props.menuCategoryId);

//   const searchTerm = ref("");

//   function selectMenuCategory(category) {
//     console.log("selectMenuCategory : : ", category);
//     categories.value.forEach((category) => {
//       category.selected = false;
//     });
//     category.selected = true;
//   }

//   let categories = ref([]);

//   let providerMenuItems = ref([]);

//   function loadProviderMenuItems() {
//     providerMenuItems.value = [];
//     useFetch("/api/providerMenuItems/all")
//       .then((data1) => {
//         data1.data.value.forEach((item) => {
//           providerMenuItems.value.push({
//             ...item,
//             price: item.price.toFixed(2),
//             quantity: 0,
//           });
//         });
//         console.log("providerMenuItems data : : ", providerMenuItems.value);
//         // providerMenuItems.value = data;
//       })
//       .catch((error) => {
//         console.log("error : : ", error);
//       });
//   }

//   useFetch("/api/menuCategories/all")
//     .then((data) => {
//       console.log("menuCategories data : : ", data.data.value);
//       data.data.value.forEach((category) => {
//         category.selected = false;
//         category.editMode = false;
//         categories.value.push(category);
//       });
//       categories.value[0].selected = true;
//       loadProviderMenuItems();
//     })
//     .catch((error) => {
//       console.log("error : : ", error);
//     });

// const { data: menuItemsData } = await useFetch(
//   "/api/providerMenuItems/all"
// );

// console.log("menu items", menuItemsData.value);

//   const suggestedMenuItems = suggestionStore.menuItems;
// console.log("cart items", cartItems);

//   const menuItems = computed(() =>
//     providerMenuItems.value.filter((menuItem) => {
//       menuItem.added = suggestedMenuItems.find((item) => item.id === menuItem.id)
//         ? true
//         : false;
//       return (
//         menuItem.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
//         menuItem.description
//           .toLowerCase()
//           .includes(searchTerm.value.toLowerCase())
//       );
//     })
//   );

function addToSuggestions(menuItem) {
  suggestionStore.addToMenu(menuItem);
  menuItem.added = true;
}

function removeFromSuggestions(menuItem) {
  suggestionStore.removeFromMenu(menuItem);
  menuItem.added = false;
}
// menuItems.value = providerMenuItems.value.map((menuItem) => {
//   //   const cartItem = cartItems.find((item) => item.id === menuItem.id);
//   return {
//     ...menuItem,
//     price: menuItem.price.toFixed(2),
//     quantity: 0,
//   };
// });

//   function incrementQuantity(menuItem) {
//     //   const doubleValue = computed(() => cartStore.doubleCount);
//     // console.log(
//     //   "::::::::::::::cartStore doubleValue::::::::::::::",
//     //   doubleValue.value,
//     //   cartStore.count
//     // );
//     cartStore.addToCart(menuItem);
//     menuItem.quantity++;
//   }

//   function decrementQuantity(menuItem) {
//     if (menuItem.quantity > 0) {
//       cartStore.removeFromCart(menuItem);
//       menuItem.quantity--;
//     }
//   }
</script>
