import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useResponsiveStore = defineStore('responsive', () => {
    const isLargeScreen = ref(false);

    if (typeof window !== 'undefined') {
        const mediaQuery = window.matchMedia('(min-width: 1024px)');

        const handleMediaQueryChange = (e) => {
            isLargeScreen.value = e.matches;
        };

        isLargeScreen.value = mediaQuery.matches;


        mediaQuery.addEventListener('change', handleMediaQueryChange);
    }

    return { isLargeScreen };
});