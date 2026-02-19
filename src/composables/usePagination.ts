import { ref, computed, watch, type Ref } from "vue";

export function usePagination<T>(data: Ref<T[]>, itemsPerPage: number = 5) {
  const currentPage = ref(1);

  // Reset to page 1 if the data source changes (filtering/deleting)
  watch(
    data,
    () => {
      currentPage.value = 1;
    },
    { deep: true },
  );

  const totalPages = computed(() => {
    return Math.ceil(data.value.length / itemsPerPage) || 1;
  });

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.value.slice(start, end);
  });

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };
  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };
  const setPage = (page: number) => {
    currentPage.value = page;
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    setPage,
  };
}
