import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        settings: [],
    }),
    actions: {
        setSettings(settings) {
            this.settings = settings;
        },
        getFirstFieldByType(type) {
            let field = null;

            this.settings.steps.forEach(step => {
                step.blocks.forEach(block => {
                    if (block.type === type) {
                        field = block;
                    }
                });
            });

            return field;

        }
    },
});
