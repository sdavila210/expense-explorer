module.exports = {
    format_date: (date) => {
        // Check if the date is defined and not null
        if (date) {
            // Format date as MM/DD/YYYY
            return new Date(date).toLocaleDateString();
        } else {
            // Return an empty string or a default value if the date is undefined or null
            return '';
        }
    },
    get_emoji: () => {
        const randomNum = Math.random();

        // Return a random emoji
        if (randomNum > 0.7) {
            return `<span for="img" aria-label="lightbulb">💡</span>`;
        } else if (randomNum > 0.4) {
            return `<span for="img" aria-label="laptop">💻</span>`;
        } else {
            return `<span for="img" aria-label="gear">⚙️</span>`;
        }
    },
};
