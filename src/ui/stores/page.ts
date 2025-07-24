export const usePageStore = defineStore("page", () => {
  const isLoading = ref(false);
  const isError = ref(false);
  const error = ref(null);
  const pageData = ref({
    title: "",
    description: "",
    keywords: "",
    image: "",
    url: "",
    type: "",
    siteName: "",
  });
  return {
    isLoading,
    isError,
    error,
    pageData,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot));
}
