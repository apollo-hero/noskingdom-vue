<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Form Validation</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 lg:col-span-6">
        <!-- BEGIN: Form Validation -->
        <div class="intro-y box">
          <div
            class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Implementation</h2>
            <div
              class="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0"
            >
              <div class="mr-3">Show example code</div>
              <input
                data-target="#form-validation"
                class="show-code input input--switch border"
                type="checkbox"
              />
            </div>
          </div>
          <div id="form-validation" class="p-5">
            <div class="preview">
              <form class="validate-form" @submit.prevent="save">
                <div>
                  <label class="flex flex-col sm:flex-row">
                    Name
                    <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-gray-600"
                      >Required, at least 2 characters</span
                    >
                  </label>
                  <input
                    v-model.trim="$v.name.$model"
                    type="text"
                    class="input w-full border mt-2"
                    :class="{ 'border-theme-6': $v.name.$error }"
                    placeholder="John Legend"
                  />
                  <template v-if="$v.name.$error">
                    <div v-if="!$v.name.required" class="text-theme-6 mt-2">
                      Field is required
                    </div>
                    <div v-if="!$v.name.minLength" class="text-theme-6 mt-2">
                      Name must have at least
                      {{ $v.name.$params.minLength.min }} letters.
                    </div>
                  </template>
                </div>
                <div class="mt-3">
                  <label class="flex flex-col sm:flex-row">
                    Email
                    <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-gray-600"
                      >Required, email address format</span
                    >
                  </label>
                  <input
                    v-model.trim="$v.email.$model"
                    type="email"
                    class="input w-full border mt-2"
                    :class="{ 'border-theme-6': $v.email.$error }"
                    placeholder="example@gmail.com"
                  />
                  <template v-if="$v.email.$error">
                    <div v-if="!$v.email.required" class="text-theme-6 mt-2">
                      Field is required
                    </div>
                    <div v-if="!$v.email.email" class="text-theme-6 mt-2">
                      Please enter a valid email address.
                    </div>
                  </template>
                </div>
                <div class="mt-3">
                  <label class="flex flex-col sm:flex-row">
                    Password
                    <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-gray-600"
                      >Required, at least 6 characters</span
                    >
                  </label>
                  <input
                    v-model.trim="$v.password.$model"
                    type="password"
                    class="input w-full border mt-2"
                    :class="{ 'border-theme-6': $v.password.$error }"
                    placeholder="secret"
                  />
                  <template v-if="$v.password.$error">
                    <div v-if="!$v.password.required" class="text-theme-6 mt-2">
                      Field is required
                    </div>
                    <div
                      v-if="!$v.password.minLength"
                      class="text-theme-6 mt-2"
                    >
                      Password must have at least
                      {{ $v.password.$params.minLength.min }} letters.
                    </div>
                  </template>
                </div>
                <div class="mt-3">
                  <label class="flex flex-col sm:flex-row">
                    Age
                    <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-gray-600"
                      >Required, integer only & maximum 3 characters</span
                    >
                  </label>
                  <input
                    v-model.trim="$v.age.$model"
                    type="number"
                    class="input w-full border mt-2"
                    :class="{ 'border-theme-6': $v.age.$error }"
                    placeholder="21"
                  />
                  <template v-if="$v.age.$error">
                    <div v-if="!$v.age.required" class="text-theme-6 mt-2">
                      Field is required
                    </div>
                    <div v-if="!$v.age.integer" class="text-theme-6 mt-2">
                      Field is integer only
                    </div>
                    <div v-if="!$v.age.maxLength" class="text-theme-6 mt-2">
                      Age must have at least
                      {{ $v.age.$params.maxLength.max }} letters.
                    </div>
                  </template>
                </div>
                <div class="mt-3">
                  <label class="flex flex-col sm:flex-row">
                    Profile URL
                    <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-gray-600"
                      >Optional, URL format</span
                    >
                  </label>
                  <input
                    v-model.trim="$v.url.$model"
                    type="url"
                    class="input w-full border mt-2"
                    :class="{ 'border-theme-6': $v.url.$error }"
                    placeholder="https://google.com"
                  />
                  <div v-if="!$v.url.url" class="text-theme-6 mt-2">
                    Field is URL format only
                  </div>
                </div>
                <div class="mt-3">
                  <label class="flex flex-col sm:flex-row">
                    Comment
                    <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-gray-600"
                      >Required, at least 10 characters</span
                    >
                  </label>
                  <textarea
                    v-model.trim="$v.comment.$model"
                    class="input w-full border mt-2"
                    placeholder="Type your comments"
                    :class="{ 'border-theme-6': $v.comment.$error }"
                  ></textarea>
                  <template v-if="$v.comment.$error">
                    <div v-if="!$v.comment.required" class="text-theme-6 mt-2">
                      Field is required
                    </div>
                    <div v-if="!$v.comment.minLength" class="text-theme-6 mt-2">
                      Comment must have at least
                      {{ $v.comment.$params.minLength.min }} letters.
                    </div>
                  </template>
                </div>
                <button type="submit" class="button bg-theme-1 text-white mt-5">
                  Register
                </button>
              </form>
            </div>
            <div class="source-code hidden">
              <button
                data-target="#copy-form-validation"
                class="copy-code button button--sm border flex items-center text-gray-700 dark:border-dark-5 dark:text-gray-300"
              >
                <FileIcon class="w-4 h-4 mr-2" /> Copy example code
              </button>
              <div class="overflow-y-auto h-64 mt-3">
                <Highlight id="copy-form-validation" class="source-preview">
                  <code
                    class="text-xs p-0 rounded-md html pl-5 pt-8 pb-4 -mb-10 -mt-10"
                  >
                    <textarea>
                      <form class="validate-form" @submit.prevent="save">
                        <div>
                          <label class="flex flex-col sm:flex-row">
                            Name
                            <span
                              class="sm:ml-auto mt-1 sm:mt-0 text-xs text-gray-600"
                              >Required, at least 2 characters</span
                            >
                          </label>
                          <input
                            v-model.trim="$v.name.$model"
                            type="text"
                            class="input w-full border mt-2"
                            :class="{ 'border-theme-6': $v.name.$error }"
                            placeholder="John Legend"
                          />
                          <template v-if="$v.name.$error">
                            <div
                              v-if="!$v.name.required"
                              class="text-theme-6 mt-2"
                            >
                              Field is required
                            </div>
                          </template>
                        </div>
                        <div class="mt-3">
                          <label class="flex flex-col sm:flex-row">
                            Email
                            <span
                              class="sm:ml-auto mt-1 sm:mt-0 text-xs text-gray-600"
                              >Required, email address format</span
                            >
                          </label>
                          <input
                            v-model.trim="$v.email.$model"
                            type="email"
                            class="input w-full border mt-2"
                            :class="{ 'border-theme-6': $v.email.$error }"
                            placeholder="example@gmail.com"
                          />
                          <template v-if="$v.email.$error">
                            <div
                              v-if="!$v.email.required"
                              class="text-theme-6 mt-2"
                            >
                              Field is required
                            </div>
                            <div v-if="!$v.email.email" class="text-theme-6 mt-2">
                              Please enter a valid email address.
                            </div>
                          </template>
                        </div>
                        <div class="mt-3">
                          <label class="flex flex-col sm:flex-row">
                            Password
                            <span
                              class="sm:ml-auto mt-1 sm:mt-0 text-xs text-gray-600"
                              >Required, at least 6 characters</span
                            >
                          </label>
                          <input
                            v-model.trim="$v.password.$model"
                            type="password"
                            class="input w-full border mt-2"
                            :class="{ 'border-theme-6': $v.password.$error }"
                            placeholder="secret"
                          />
                          <template v-if="$v.password.$error">
                            <div
                              v-if="!$v.password.required"
                              class="text-theme-6 mt-2"
                            >
                              Field is required
                            </div>
                          </template>
                        </div>
                        <div class="mt-3">
                          <label class="flex flex-col sm:flex-row">
                            Age
                            <span
                              class="sm:ml-auto mt-1 sm:mt-0 text-xs text-gray-600"
                              >Required, integer only & maximum 3 characters</span
                            >
                          </label>
                          <input
                            v-model.trim="$v.age.$model"
                            type="number"
                            class="input w-full border mt-2"
                            :class="{ 'border-theme-6': $v.age.$error }"
                            placeholder="21"
                          />
                          <template v-if="$v.age.$error">
                            <div
                              v-if="!$v.age.required"
                              class="text-theme-6 mt-2"
                            >
                              Field is required
                            </div>
                            <div v-if="!$v.age.integer" class="text-theme-6 mt-2">
                              Field is integer only
                            </div>
                          </template>
                        </div>
                        <div class="mt-3">
                          <label class="flex flex-col sm:flex-row">
                            Profile URL
                            <span
                              class="sm:ml-auto mt-1 sm:mt-0 text-xs text-gray-600"
                              >Optional, URL format</span
                            >
                          </label>
                          <input
                            v-model.trim="$v.url.$model"
                            type="url"
                            class="input w-full border mt-2"
                            :class="{ 'border-theme-6': $v.url.$error }"
                            placeholder="https://google.com"
                          />
                          <div v-if="!$v.url.url" class="text-theme-6 mt-2">
                            Field is URL format only
                          </div>
                        </div>
                        <button
                          type="submit"
                          class="button bg-theme-1 text-white mt-5"
                        >
                          Register
                        </button>
                      </form>
                    </textarea>
                  </code>
                </Highlight>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Form Validation -->
      </div>
    </div>
  </div>
</template>

<script>
import Toastify from "toastify-js";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email,
  url,
  integer
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    name: {
      required,
      minLength: minLength(2)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    age: {
      required,
      integer,
      maxLength: maxLength(3)
    },
    url: {
      url
    },
    comment: {
      required,
      minLength: minLength(10)
    }
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      age: "",
      url: "",
      comment: ""
    };
  },
  methods: {
    save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Toastify({
          text: "Registration failed, please check the fileld form.",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "left",
          backgroundColor: "#D32929",
          stopOnFocus: true
        }).showToast();
      } else {
        Toastify({
          text: "Registration success!",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "left",
          backgroundColor: "#91C714",
          stopOnFocus: true
        }).showToast();
      }
    }
  }
};
</script>
