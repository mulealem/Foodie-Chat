<template>
  <div
    @dblclick="showEdit()"
    :class="{ hidden: editMode }"
    class="p-1 px-5 hover:bg-neutral-900 cursor-pointer text-center rounded-lg outline-none focus:outline-none select-none"
  >
    {{ name }}
  </div>
  <UIcon
    name="i-heroicons-pencil-square"
    class="text-neutral-300"
    :class="{ hidden: editMode }"
    @click="showEdit()"
  />
  <input
    type="text"
    ref="nameInput"
    v-model="name"
    @keyup.enter="update()"
    :class="{ hidden: !editMode }"
    class="w-28 p-1 px-5 bg-neutral-700 hover:bg-neutral-600 cursor-pointer text-center rounded-lg outline-none focus:outline-none"
  />
  <UIcon
    name="i-heroicons-check-circle"
    class="text-neutral-300"
    :class="{ hidden: !editMode }"
    @click="update()"
  />
</template>
<script>
export default {
  props: {
    menuCategory: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.name = this.menuCategory.name;
  },
  data() {
    return {
      isLoading: false,
      name: "",
      editMode: false,
    };
  },
  async setup() {
    async function save() {
      console.log("save=> ", this.menuCategory);
      const { data, error } = await useFetch("/api/menuCategories/update", {
        method: "PUT",
        body: {
          id: this.menuCategory.id,
          name: this.name,
        },
      });
      console.log("data=> ", data);
      console.log("error=> ", error);
    }
    return {
      save,
    };
  },
  methods: {
    async update() {
      this.isLoading = true;
      try {
        await this.save();
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
        this.editMode = false;
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
