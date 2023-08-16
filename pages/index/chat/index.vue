<template>
  <div class="w-full bg-green-600 h-screen flex flex-row overflow-hidden">
    <div
      class="w-72 bg-neutral-800 h-full flex-none overflow-y-auto text-neutral-00 border-r-[1px] border-neutral-900"
    >
      <div
        class="relative"
        v-for="(allProvider, index) in allProvidersList"
        :key="index"
      >
        <div class="bg-neutral-700 text-sm sticky top-0 p-2">
          {{ allProvider.type }}
        </div>
        <NuxtLink
          @click="handleClick(chat)"
          :to="'/chat/' + chat.id"
          v-for="(chat, index) in allProvider.chats"
          :key="index"
          :class="{ '!bg-purple-800': chat.selected }"
          class="w-full flex flex-row p-3 bg-neutral-800 hover:bg-neutral-900 cursor-pointer border-b-[1px] border-neutral-700"
        >
          <div class="flex-none w-12 h-12 bg-lue-700 rounded-xl">
            <UAvatar
              v-if="user"
              size="lg"
              :class="{ 'rounded-lg': !user.isCompany }"
              :src="!user.isCompany ? chat.companyLogoUrl : chat.image"
              :alt="!user.isCompany ? chat.companyName : chat.name"
              class="border-[1px] bg-neutral-800 border-neutral-400"
            />
          </div>
          <div class="w-full px-2">
            <div>
              {{ !user.isCompany ? chat.companyName : chat.name }}
              <!-- {{ chat.id }} -->
            </div>
            <div class="w-full bg-re-300 flex justify-between items-center">
              <div class="text">
                {{ !user.isCompany ? chat.companySlogan : chat.selected }}
              </div>
              <div class="text-sm">{{ !user.isCompany ? "2 miles" : "" }}</div>
            </div>
            <!-- <div>{{ company.selected }}</div> -->
          </div>
        </NuxtLink>
      </div>
      <!-- <div class="relative" v-if="!user.isCompany">
        <div class="bg-neutral-700 text-sm sticky top-0 p-2">Near By</div>
        <NuxtLink
          @click="handleClick(company)"
          :to="'/chat/' + company.id"
          v-for="(company, index) in nearByProvidersList"
          :key="index"
          :class="{ '!bg-purple-800': company.selected }"
          class="w-full flex flex-row gap-1 p-3 bg-neutral-800 hover:bg-neutral-900 cursor-pointer border-b-[1px] border-neutral-700"
        >
          <div class="flex-none w-12 h-12 bg-blue-100 rounded">
            <UAvatar
              size="lg"
              :src="company.companyLogoUrl"
              :alt="company.companyName"
              :class="{ 'rounded-md': true }"
              class="border-[1px] bg-neutral-800 border-neutral-400 !rounded"
            />
          </div>
          <div class="w-full px-2">
            <div>
              {{ company.companyName }}
            </div>
            <div class="w-full bg-re-300 flex justify-between items-center">
              <div class="text">{{ company.companySlogan }}</div>
              <div class="text-sm">2 miles</div>
            </div>
          </div>
        </NuxtLink>
      </div> -->
    </div>
    <!-- <div class="w-full h-full bg-red-500"></div> -->
    <NuxtPage />
  </div>
</template>
<script setup>
import { useUserStore } from "~/stores/user";

const nearByProviders = ref([]);
const recentProviders = ref([]);

const allProviders = ref([]);

const { params } = useRoute();
const store = useUserStore();

const user = computed(() => store.currentUser);

async function loadNearBy() {
  // console.log("loadNearBy :: ::");
  const { data } = await useFetch("/api/companies/all");
  nearByProviders.value = data.value;
  // console.log("nearByProviders :: ::", nearByProviders.value);
}

async function loadRecent() {
  // console.log("loadRecent :: ::", params.id);
  const { data: recentProvidersData } = await useFetch("/api/chats/all");
  allProviders.value = recentProvidersData.value;
  // recentProviders.value = recentProvidersData.value.map((chat) => {
  //   return chat;
  // });

  console.log("chats :: //// - //// ::", allProviders.value);
}

// await loadNearBy();
await loadRecent();

const currentId = ref(params.id);

const allProvidersList = computed(() => {
  return allProviders.value?allProviders.value.map((provider) => {
    provider.chats = provider.chats.map((chat) => {
      chat.selected = currentId.value === chat.id;
      return chat;
    });
    return provider;
  }):[];
});

function handleClick(company) {
  console.log("company :: ::", company.id);
  currentId.value = company.id;
}
</script>
