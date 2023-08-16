<!-- <script setup lang="ts">
definePageMeta({ auth: true });

const { status, data, signIn, signOut } = useAuth();

async function logout() {
  await signOut();
}
</script> -->

<template>
  <div class="bg-green-600 h-screen flex flex-row overflow-hidden">
    <div
      class="w-72 bg-blue-500 h-full flex-none overflow-y-auto text-neutral-00"
    >
      <div class="relative">
        <div class="bg-neutral-700 text-sm sticky top-0 p-2">Recent</div>
        <div
          v-for="i in 3"
          :key="i"
          class="w-full flex flex-row p-3 bg-neutral-800 hover:bg-neutral-900 cursor-pointer border-b-[1px] border-neutral-700"
        >
          <div class="flex-none w-12 h-12 bg-blue-700 rounded-xl"></div>
          <div class="w-full px-2">
            <div>Bidue</div>
            <div class="w-full bg-re-300 flex justify-between items-center">
              <div class="text">Eat now {{ i }}</div>
              <div class="text-sm">2 miles</div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative">
        <div class="bg-neutral-700 p-1 text-sm sticky top-0 p-2">Near By</div>
        <div
          v-for="i in 12"
          :key="i"
          class="w-full flex flex-row p-3 bg-neutral-800 hover:bg-neutral-900 cursor-pointer border-b-[1px] border-neutral-700"
        >
          <div class="flex-none w-12 h-12 bg-blue-700 rounded-xl"></div>
          <div class="w-full px-2">
            <div>Bidue {{ i }}</div>
            <div class="w-full bg-re-300 flex justify-between items-center">
              <div class="text">Eat now</div>
              <div class="text-sm">2 miles</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>
<script>
export default {
  data() {
    return {
      leftNavItems: [
        {
          icon: "i-heroicons-chat-bubble-left-right",
          label: "Home",
          selected: true,
          to: "/",
        },
        {
          icon: "i-heroicons-star",
          label: "Home",
          selected: false,
          to: "/",
        },

        // {
        //   icon: "i-heroicons-user-circle",
        //   label: "Profile",
        //   to: "/profile",
        // },
        {
          icon: "i-heroicons-cog-6-tooth",
          label: "Settings",
          selected: false,
          to: "/settings",
        },
        // {
        //   icon: 'i-heroicons-logout-6',
        //   label: 'Logout',
        //   to: '/logout'
        // },
      ],
    };
  },
  methods: {
    selectNavItem(item) {
      this.leftNavItems.forEach((i) => (i.selected = false));
      item.selected = true;
    },
  },
};
</script>
