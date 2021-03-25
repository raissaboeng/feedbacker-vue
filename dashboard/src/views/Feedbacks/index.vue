<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Feedbacks
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </div>

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2 ">
      <div>
        <h1 class="text-3xl font-black text-brand-darkgray">
          Listagem
        </h1>
        <suspense>
          <template #default>
            <filters
              @select="changeFeedbacksType"
              class="mt-8 animate__animated animate__fadeIn animate__faster"
            />
          </template>
          <template #fallback>
            <filters-loading class="mt-8" />
          </template>
        </suspense>
      </div>

      <div class="px-10 pt-20 col-span-3">
        <p
          v-if="state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Aconteceu um erro ao carregar os feedbacks
        </p>
        <p
          v-if="!state.feedbacks.length && !state.isLoading"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Ainda nenhum feedback recebido
        </p>

        <feedback-card-loading v-if="state.isLoading || state.isLoadingFeedbacks" />
        <feedback-card
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :is-opened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />

      </div>
    </div>
  </div>

</template>

<script>
import { reactive, onMounted } from 'vue';
import Filters from './Filters';
import FiltersLoading from './FiltersLoading';
import HeaderLogged from '../../components/HeaderLogged';
import FeedbackCard from '../../components/FeedbackCard';
import FeedbackCardLoading from '../../components/FeedbackCard/Loading';
import services from '../../services';

export default {
  components: {
    HeaderLogged,
    Filters,
    FiltersLoading,
    FeedbackCard,
    FeedbackCardLoading
  },
  setup () {
    const state = reactive({
      isLoading: false,
      isLoadingFeedbacks: false,
      feedbacks: [],
      currentFeedbackType: '',
      pagination: {
        limit: 5,
        offset: 0
      },
      hasError: false
    });

    onMounted(() => {
      fetchFeedbacks();
    });

    function handleErrors (error) {
      state.isLoading = false;
      state.hasError = !!error;
    }

    async function changeFeedbacksType (type) {
      try {
        state.isLoadingFeedbacks = true;
        state.pagination.limit = 5;
        state.pagination.offset = 0;
        state.currentFeedbackType = type;
        const { data } = await services.feedbacks.getAll({
          type,
          ...state.pagination
        });
        state.feedbacks = data.results;
        state.pagination = data.pagination;
        state.isLoadingFeedbacks = false;
      } catch (error) {
        handleErrors(error);
      }
    }

    async function fetchFeedbacks () {
      try {
        state.isLoading = true;
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType
        });
        state.feedbacks = data.results;
        state.pagination = data.pagination;
        state.isLoading = false;
      } catch (error) {
        handleErrors(error);
      }
    }

    return { state, changeFeedbacksType };
  }
};
</script>
