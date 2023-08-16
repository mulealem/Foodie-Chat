<template>
  <div class="bg-green-600 h-screen flex flex-row overflow-hidden">
    <div
      class="w-16 bg-neutral-800 h-full flex-none border-r-[1px] border-neutral-700"
    >
      <div class="h-full flex flex-col justify-between">
        <div class="flex flex-col gap-0">
          <div class="m-3 w-8 h-8 bg-purple-500 rounded-xl mb-3"></div>
          <div class="pt-5">
            <NuxtLink
              :to="leftNavItem.to"
              v-for="leftNavItem in leftNavItems"
              :key="leftNavItem.name"
            >
              <div
                v-if="
                  (leftNavItem.canCompanyAccess && user.isCompany) ||
                  (leftNavItem.canCustomerAccess && !user.isCompany)
                "
                @click="selectNavItem(leftNavItem)"
                class="bg-yellw-300 flex justify-center py-4 cursor-pointer border-l-[3px] border-transparent hover:border-neutrl-300 text-neutral-400 hover:text-neutral-50"
                :class="{
                  'border-neutral-300 text-neutral-50': leftNavItem.selected,
                }"
              >
                <div
                  class="bg-purpe-500 rounded-xl flex justify-center items-center"
                >
                  <UTooltip :text="leftNavItem.label">
                    <UIcon class="text-2xl" :name="leftNavItem.icon" />
                  </UTooltip>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <div
          class="flex flex-col p-3 gap-3 bg-rd-400 justify-center items-center"
        >
          <UPopover>
            <UAvatar
              v-if="user"
              size="sm"
              :src="user.isCompany ? user.companyLogoUrl : user.image"
              :alt="user.isCompany ? user.companyName : user.name"
              :class="{ 'rounded-lg': user.isCompany }"
              class="border-[1px]"
            />

            <template #panel>
              <div class="p-3 bg-neutral-800">
                <div class="flex flex-row">
                  <div>
                    <UAvatar
                      v-if="user"
                      size="md"
                      :class="{ 'rounded-lg': user.isCompany }"
                      :src="user.isCompany ? user.companyLogoUrl : user.image"
                      :alt="user.isCompany ? user.companyName : user.name"
                      class="border-[2px]"
                    />
                  </div>
                  <div class="text-sm px-3" v-if="user">
                    <div>
                      {{ user.isCompany ? user.companyName : user.name }}
                    </div>
                    <div>{{ user.email }}</div>
                    <div>ID: {{ user.id }}</div>
                  </div>
                </div>
                <div class="py-0 pt-3">
                  <UButton @click="logout()" block label="Logout" />
                </div>
              </div>
            </template>
          </UPopover>
        </div>
      </div>
    </div>

    <NuxtPage />
  </div>
</template>
<script setup>
import { useUserStore } from "~/stores/user";

const leftNavItems = ref([
  {
    icon: "i-heroicons-chat-bubble-left-right",
    label: "Home",
    selected: false,
    canCompanyAccess: true,
    canCustomerAccess: true,
    to: "/chat",
  },
  {
    icon: "i-heroicons-star",
    label: "Home",
    selected: false,
    canCompanyAccess: false,
    canCustomerAccess: true,
    to: "/favorites",
  },
  {
    icon: "i-heroicons-cog-6-tooth",
    label: "Settings",
    selected: false,
    canCompanyAccess: true,
    canCustomerAccess: false,
    to: "/settings",
  },
  {
    icon: "i-heroicons-rectangle-stack",
    label: "Settings",
    selected: false,
    canCompanyAccess: true,
    canCustomerAccess: false,
    to: "/mymenu",
  },
  {
    icon: "i-heroicons-square-3-stack-3d",
    label: "Settings",
    selected: false,
    canCompanyAccess: true,
    canCustomerAccess: false,
    to: "/settings",
  },
]);

const { path } = useRoute();
const store = useUserStore();

const item = leftNavItems.value.find((i) => path.includes(i.to));
if (item) {
  item.selected = true;
}

async function getCurrentUser() {
  const { data: me } = await useFetch("/api/me");
  console.log(me.value);

  store.setCurrentUser(me.value);
}
const user = computed(() => store.currentUser);

await getCurrentUser();

const logout = () => {
  console.log("logout");
  const { status, data, signIn, signOut } = useAuth();
  signOut();
};

function selectNavItem(item) {
  leftNavItems.value.forEach((i) => (i.selected = false));
  item.selected = true;
}
</script>
