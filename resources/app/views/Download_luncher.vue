<template>
    <div class="container">
      <!-- BEGIN: Error Page -->
      <div
        class="flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left"
      >
        <div class="text-white mt-10 lg:mt-0 text-center">
          <div class="intro-x text-6xl font-medium">Download the game</div>
          <div class="intro-x text-xl lg:text-3xl font-medium">
            (v. 3.20.0)
          </div>
          <div class="intro-x text-lg mt-3">
            Download the game to start playing!
          </div>
          <div class="flex justify-center">
            <button
                class="intro-x button button--lg border border-white dark:border-dark-5 dark:text-gray-300 mt-10 mr-20 bg-theme-1"
            >
                Download x64 version
            </button>
            <button
                class="intro-x button button--lg border border-white dark:border-dark-5 dark:text-gray-300 mt-10 bg-theme-1"
            >
                Download x86 version
            </button>
          </div>
        </div>
      </div>
      <!-- END: Error Page -->
    </div>
</template>
  
<script>


export default {
components: {
},
data() {
    return {
    salesReportFilter: ""
    };
},
methods: {
}
};
</script>
