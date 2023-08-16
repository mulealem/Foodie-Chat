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
            Shaping a world with
            <span class="text-primary dark:text-white">reimagination.</span>
          </h1>
          <p class="mt-8 text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            incidunt nam itaque sed eius modi error totam sit illum. Voluptas
            doloribus asperiores quaerat aperiam. Quidem harum omnis beatae
            ipsum soluta!
          </p>
          <div class="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
            <div
              @click="login('github')"
              class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span class="relative text-base font-semibold text-white"
                >Get started</span
              >
            </div>
            <div
              @click="login('descope')"
              class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
            >
              <span
                class="relative text-base font-semibold text-primary dark:text-white"
                >Learn more</span
              >
            </div>
          </div>
          <div
            class="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between"
          >
            <div class="text-left">
              <h6 class="text-lg font-semibold text-gray-700 dark:text-white">
                The lowest price
              </h6>
              <p class="mt-2 text-gray-500">Some text here</p>
            </div>
            <div class="text-left">
              <h6 class="text-lg font-semibold text-gray-700 dark:text-white">
                The fastest on the market
              </h6>
              <p class="mt-2 text-gray-500">Some text here</p>
            </div>
            <div class="text-left">
              <h6 class="text-lg font-semibold text-gray-700 dark:text-white">
                The most loved
              </h6>
              <p class="mt-2 text-gray-500">Some text here</p>
            </div>
          </div>
        </div>
        <div class="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
          <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
            <img
              src="./images/clients/microsoft.svg"
              class="h-12 w-auto mx-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
          <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
            <img
              src="./images/clients/airbnb.svg"
              class="h-12 w-auto mx-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
          <div
            class="p-4 flex grayscale transition duration-200 hover:grayscale-0"
          >
            <img
              src="./images/clients/google.svg"
              class="h-9 w-auto m-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
          <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
            <img
              src="./images/clients/ge.svg"
              class="h-12 w-auto mx-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
          <div
            class="p-4 flex grayscale transition duration-200 hover:grayscale-0"
          >
            <img
              src="./images/clients/netflix.svg"
              class="h-8 w-auto m-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
          <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
            <img
              src="./images/clients/google-cloud.svg"
              class="h-12 w-auto mx-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
    <div class="mb-20 space-y-4 px-6 md:px-0">
      <h2
        class="text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl"
      >
        We have some fans.
      </h2>
    </div>
    <div class="md:columns-2 lg:columns-3 gap-8 space-y-8">
      <div
        class="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none"
      >
        <div class="flex gap-4">
          <img
            class="w-12 h-12 rounded-full"
            src="./images/avatars/avatar.webp"
            alt="user avatar"
            width="400"
            height="400"
            loading="lazy"
          />
          <div>
            <h6 class="text-lg font-medium text-gray-700 dark:text-white">
              Daniella Doe
            </h6>
            <p class="text-sm text-gray-500 dark:text-gray-300">Mobile dev</p>
          </div>
        </div>
        <p class="mt-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aliquid
          quo eum quae quos illo earum ipsa doloribus nostrum minus libero
          aspernatur laborum cum, a suscipit, ratione ea totam ullam! Lorem
          ipsum dolor sit amet consectetur, adipisicing elit. Architecto
          laboriosam deleniti aperiam ab veniam sint non cumque quis tempore
          cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis
          harum et rerum.
        </p>
      </div>
      <div
        class="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none"
      >
        <div class="flex gap-4">
          <img
            class="w-12 h-12 rounded-full"
            src="./images/avatars/avatar-1.webp"
            alt="user avatar"
            width="200"
            height="200"
            loading="lazy"
          />
          <div>
            <h6 class="text-lg font-medium text-gray-700 dark:text-white">
              Jane doe
            </h6>
            <p class="text-sm text-gray-500 dark:text-gray-300">Marketing</p>
          </div>
        </div>
        <p class="mt-8">
          Lorem ipsum dolor laboriosam deleniti aperiam ab veniam sint non
          cumque quis tempore cupiditate. Sint libero voluptas veniam at
          reprehenderit, veritatis harum et rerum.
        </p>
      </div>
      <div
        class="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none"
      >
        <div class="flex gap-4">
          <img
            class="w-12 h-12 rounded-full"
            src="./images/avatars/avatar-2.webp"
            alt="user avatar"
            width="200"
            height="200"
            loading="lazy"
          />
          <div>
            <h6 class="text-lg font-medium text-gray-700 dark:text-white">
              Yanick Doe
            </h6>
            <p class="text-sm text-gray-500 dark:text-gray-300">Developer</p>
          </div>
        </div>
        <p class="mt-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
          laboriosam deleniti aperiam ab veniam sint non cumque quis tempore
          cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis
          harum et rerum.
        </p>
      </div>
      <div
        class="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none"
      >
        <div class="flex gap-4">
          <img
            class="w-12 h-12 rounded-full"
            src="./images/avatars/avatar-3.webp"
            alt="user avatar"
            width="200"
            height="200"
            loading="lazy"
          />
          <div>
            <h6 class="text-lg font-medium text-gray-700 dark:text-white">
              Jane Doe
            </h6>
            <p class="text-sm text-gray-500 dark:text-gray-300">Mobile dev</p>
          </div>
        </div>
        <p class="mt-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
          laboriosam deleniti aperiam ab veniam sint non cumque quis tempore
          cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis
          harum et rerum.
        </p>
      </div>
      <div
        class="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none"
      >
        <div class="flex gap-4">
          <img
            class="w-12 h-12 rounded-full"
            src="./images/avatars/avatar-4.webp"
            alt="user avatar"
            width="200"
            height="200"
            loading="lazy"
          />
          <div>
            <h6 class="text-lg font-medium text-gray-700 dark:text-white">
              Andy Doe
            </h6>
            <p class="text-sm text-gray-500 dark:text-gray-300">Manager</p>
          </div>
        </div>
        <p class="mt-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
          laboriosam deleniti aperiam ab veniam sint non cumque quis tempore
          cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis
          harum et rerum.
        </p>
      </div>
      <div
        class="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none"
      >
        <div class="flex gap-4">
          <img
            class="w-12 h-12 rounded-full"
            src="./images/avatars/avatar-2.webp"
            alt="user avatar"
            width="400"
            height="400"
            loading="lazy"
          />
          <div>
            <h6 class="text-lg font-medium text-gray-700 dark:text-white">
              Yanndy Doe
            </h6>
            <p class="text-sm text-gray-500 dark:text-gray-300">Mobile dev</p>
          </div>
        </div>
        <p class="mt-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
          laboriosam deleniti aperiam ab veniam sint non cumque quis tempore
          cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis
          harum et rerum.
        </p>
      </div>
    </div>
  </div>
  <div class="relative py-16">
    <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
      <div class="relative">
        <div class="flex items-center justify-center -space-x-2">
          <img
            loading="lazy"
            width="400"
            height="400"
            src="./images/avatars/avatar.webp"
            alt="member photo"
            class="h-8 w-8 rounded-full object-cover"
          />
          <img
            loading="lazy"
            width="200"
            height="200"
            src="./images/avatars/avatar-2.webp"
            alt="member photo"
            class="h-12 w-12 rounded-full object-cover"
          />
          <img
            loading="lazy"
            width="200"
            height="200"
            src="./images/avatars/avatar-3.webp"
            alt="member photo"
            class="z-10 h-16 w-16 rounded-full object-cover"
          />
          <img
            loading="lazy"
            width="200"
            height="200"
            src="./images/avatars/avatar-4.webp"
            alt="member photo"
            class="relative h-12 w-12 rounded-full object-cover"
          />
          <img
            loading="lazy"
            width="200"
            height="200"
            src="./images/avatars/avatar-1.webp"
            alt="member photo"
            class="h-8 w-8 rounded-full object-cover"
          />
        </div>
        <div class="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
          <h1
            class="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl"
          >
            Get Started now
          </h1>
          <p class="text-center text-xl text-gray-600 dark:text-gray-300">
            Be part of millions people around the world using tailus in modern
            User Interfaces.
          </p>
          <div class="flex flex-wrap justify-center gap-6">
            <div
              @click="login()"
              class="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span
                class="relative text-base font-semibold text-white dark:text-dark"
                >Get Started</span
              >
            </div>
            <a
              href="#"
              class="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
            >
              <span
                class="relative text-base font-semibold text-primary dark:text-white"
                >More about</span
              >
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
