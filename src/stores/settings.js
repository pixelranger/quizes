import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        settings: [],
    }),
    actions: {
        setSettings(settings) {
            this.settings = settings;
        },
    },
});
