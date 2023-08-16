<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

// const { data: messageTypes } = await useFetch("/api/messageTypes/all");
// console.log(messageTypes.value);

const { status, data, signIn, signOut } = useAuth();

const loggedIn = computed(() => status.value === "authenticated");

async function login(provider: string) {
  await signIn(provider, { callbackUrl: "/" });
  // await signIn();
}

async function logout() {
  await signOut();
}
</script>
<template>
  <!-- <div>This is login page</div>

  <button v-if="!loggedIn" @click="login">Login</button> -->
  <!-- <button @click="logout">Logout</button> -->
  <!-- <br />
  {{ status }} -->
  <div class="relative" id="home">
    <div
      aria-hidden="true"
      class="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
    >
      <div
        class="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"
      ></div>
      <div
        class="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"
      ></div>
    </div>
    <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
      <div class="relative pt-36 ml-auto">
        <div class="lg:w-2/3 text-center mx-auto">
          <h1
            class="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl"
          >
            Simplify food ordering while embracing
            <span class="text-primary dark:text-white">exploration.</span>
          </h1>
          <p class="mt-8 text-gray-700 dark:text-gray-300">
            With our chat interface, user can confidently interact with food
            providers, receive expert guidance, and embark on a journey of
            gastronomic delight.
          </p>
          <div class="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
            <div
              @click="login('descope')"
              class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span
                class="relative text-base font-semibold text-white cursor-pointer"
                >Get started</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
