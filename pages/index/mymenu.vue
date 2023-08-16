<template>
  <div class="w-full h-full bg-neutral-950 flex flex-col">
    <div
      class="w-full overflow-x-uto scroll-m-0 flex-none border-b-[1px] border-neutral-700 px-3 flex justify-start items-center gap-0"
    >
      <div
        class="flex items-center gap-2 border-b-[2px] border-transparent p-2"
        :class="{ '!border-neutral-300': menuCategory.selected }"
        @click="selectMenuCategory(menuCategory)"
        v-for="(menuCategory, index) in categories"
        :key="index"
      >
        <menu-category-item :menu-category="menuCategory" />
        <!-- <div
          :class="{ hidden: menuCategory.editMode }"
          class="w-28 p-1 px-5 hover:bg-neutral-900 cursor-pointer text-center rounded-lg outline-none focus:outline-none"
        >
          {{ menuCategory.name }}
        </div>
        <UIcon
          name="i-heroicons-pencil-square"
          class="text-neutral-300"
          :class="{ hidden: menuCategory.editMode }"
          @click="menuCategory.editMode = true"
        />
        <input
          type="text"
          v-model="menuCategory.name"
          :class="{ hidden: !menuCategory.editMode }"
          class="w-28 p-1 px-5 bg-neutral-700 hover:bg-neutral-600 cursor-pointer text-center rounded-lg outline-none focus:outline-none"
        />
        <UIcon
          name="i-heroicons-check-circle"
          class="text-neutral-300"
          :class="{ hidden: !menuCategory.editMode }"
          @click="menuCategory.editMode = false"
        /> -->

        <!-- <div>
        </div> -->
      </div>

      <button
        @click="create()"
        class="mx-5 p-1 px-5 bg-neutral-700 hover:bg-neutral-600 cursor-pointer rounded-lg outline-none focus:outline-none flex items-center gap-2"
      >
        <UIcon name="i-heroicons-plus" />
        Add
      </button>
    </div>
    <div
      class="w-full overflow-hidden p-2 border-b-[1px] border-b-neutral-600 flex justify-between items-center"
    >
      <UInput v-model="searchTerm" size="xl" placeholder="Filter item..." />
      <UButton
        icon="i-heroicons-plus"
        size="sm"
        color="primary"
        variant="solid"
        @click="isOpen = true"
        label="Create"
        :trailing="false"
      />
    </div>
    <div class="w-full h-full overflow-hidden bg-neutral-950">
      <UTable :rows="filteredRows" :columns="columns" class="w-full flex-row">
        <template #description-data="{ row }">
          <div class="flex flex-row items-center gap-2 text-ellipsis w-32">
            {{ row.description }}
          </div>
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
    </div>
    <USlideover v-model="isOpen">
      <div
        class="w-full h-full bg-neutral-800 border-l-[1px] border-neutral-600"
      >
        <div
          class="border-b-[1px] border-neutral-600 p-3 py-2 flex flex-row justify-between items-center"
        >
          <div>Add Drink</div>
          <UButton
            @click="isOpen = false"
            icon="i-heroicons-x-mark"
            variant="ghost"
            color="gray"
          />
        </div>
        <div class="w-full h-full bg-ed-400 flex flex-col">
          <div class="w-full h-full">
            <MenuItemForm
              :is-edit="isEdit"
              :menu-item="selectedMenuItem"
              :menuCategoryID="selectedMenuCategory.id"
              :close="closeForm"
            />
          </div>
        </div>
      </div>
    </USlideover>
  </div>
</template>
<script setup>
const isOpen = ref(false);
const isEdit = ref(false);
const selectedMenuItem = ref({});
const searchTerm = ref("");
const columns = ref([
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "price",
    label: "Price",
    sortable: true,
  },
  {
    key: "actions",
    label: "Actions",
    sortable: false,
  },
]);

function closeForm() {
  isOpen.value = false;
  isEdit.value = false;
  loadProviderMenuItems();
}

function showEditForm(id) {
  console.log("showEditForm : : ", id);
  isEdit.value = true;
  isOpen.value = true;
  selectedMenuItem.value = providerMenuItems.value.find(
    (item) => item.id === id
  );
}

function selectMenuCategory(category) {
  console.log("selectMenuCategory : : ", category);
  categories.value.forEach((category) => {
    category.selected = false;
  });
  category.selected = true;
}

let categories = ref([]);

let providerMenuItems = ref([]);

function loadProviderMenuItems() {
  providerMenuItems.value = [];
  useFetch("/api/providerMenuItems/all")
    .then((data1) => {
      console.log("providerMenuItems data : : ", data1);
      data1.data.value.forEach((item) => {
        providerMenuItems.value.push(item);
      });
      // providerMenuItems.value = data;
    })
    .catch((error) => {
      console.log("error : : ", error);
    });
}

useFetch("/api/menuCategories/all")
  .then((data) => {
    console.log("menuCategories data : : ", data.data.value);
    data.data.value.forEach((category) => {
      category.selected = false;
      category.editMode = false;
      categories.value.push(category);
    });
    categories.value[0].selected = true;
    loadProviderMenuItems();
  })
  .catch((error) => {
    console.log("error : : ", error);
  });

async function create() {
  console.log("create method");
  // use fetch to create new menu category
  const { data, error } = await useFetch("/api/menuCategories/create", {
    method: "POST",
    body: {
      name: "Unnamed",
    },
  });
  // console.log("create method : : ", data.value);
  if (error.value) {
    console.log("error : : ", error.value);
  }

  const createdMenuCategory = data.value;
  if (createdMenuCategory) {
    this.categories.push(createdMenuCategory);
    this.selectMenuCategory(createdMenuCategory);
  }

  // if (createdMenuCategory) {
  //   const { data, error } = await useFetch(
  //     "/api/menuCategories/" + createdMenuCategory.id
  //   );
  //   console.log("get by id method : : ", data.value);
  // }

  // if (createdMenuCategory) {
  //   const { data, error } = await useFetch(
  //     "/api/menuCategories/" + createdMenuCategory.id,
  //     {
  //       method: "PUT",
  //       body: {
  //         name: "Drink2",
  //       },
  //     }
  //   );
  //   console.log("update method : : ", data.value);
  // }
}

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => showEditForm(row.id),
    },
    {
      label: "Delete",
      icon: "i-heroicons-document-duplicate-20-solid",
    },
  ],
];

const selectedMenuCategory = computed(() => {
  return categories.value.find((category) => category.selected);
});

const filteredRows = computed(() => {
  return providerMenuItems.value
    .filter((row) => {
      return Object.keys(row).some((key) => {
        return String(row[key])
          .toLowerCase()
          .includes(searchTerm.value.toLowerCase());
      });
    })
    .filter((row) => {
      return row.menuCategoryID === selectedMenuCategory.value.id;
    });
});
</script>
