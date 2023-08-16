<template>
  <div class="px-3 py-3 flex flex-col gap-1">
    <div>Name</div>
    <UInput v-model="state.name" size="xl" />
    <div>Description</div>
    <UTextarea v-model="state.description" size="xl" />
    <div>Price</div>
    <UInput v-model="state.price" type="number" size="xl" />
    <div>Image URL</div>
    <UInput v-model="state.imageURL" size="xl" />
    <!-- {{ menuCategoryID }} -->

    <div class="py-2">
      <UButton type="submit" @click="submit"> Submit </UButton>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    menuCategoryID: {
      type: String,
      required: true,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    menuItem: {
      type: Object,
      default: () => ({}),
    },
    close: {
      type: Function,
      required: true,
    },
  },
  created() {
    if (this.isEdit) {
      this.state = {
        name: this.menuItem.name,
        description: this.menuItem.description,
        price: this.menuItem.price,
        imageURL: this.menuItem.imageURL,
      };
    }
    // this.name = this.menuCategory.name;
  },
  data() {
    return {
      isLoading: false,
      state: {
        name: "",
        description: "",
        price: 0.0,
        imageURL: "",
      },
    };
  },
  setup() {
    async function save() {
      console.log("save=> ", this.menuCategoryID);
      if (!this.isEdit) {
        const { data, error } = await useFetch(
          "/api/providerMenuItems/create",
          {
            method: "POST",
            body: {
              ...this.state,
              menuCategoryID: this.menuCategoryID,
            },
          }
        );
        console.log("create data=> ", data);
      } else {
        const { data, error } = await useFetch(
          "/api/providerMenuItems/" + this.menuItem.id,
          {
            method: "PUT",
            body: {
              ...this.state,
            },
          }
        );
        console.log("update data=> ", data);
      }
    }
    return {
      save,
    };
  },
  methods: {
    async submit() {
      this.isLoading = true;
      try {
        await this.save();
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
        this.close();
      }
    },
    showEdit() {
      this.editMode = true;
      this.$nextTick(() => {
        this.$refs.nameInput.focus();
      });
    },
  },
};
</script>
