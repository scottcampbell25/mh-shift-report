function calculateHours(input) {
    const row = input.closest('tr');
    const startInput = row.querySelector('.activity-start');
    const endInput = row.querySelector('.activity-end');
    const hoursInput = row.querySelector('.activity-hours');

    if (startInput.value && endInput.value) {
        const start = new Date(`2000-01-01T${startInput.value}`);
        const end = new Date(`2000-01-01T${endInput.value}`);

        let diff = (end - start) / (1000 * 60 * 60); // Convert to hours

        // Handle crossing midnight
        if (diff < 0) {
            diff += 24;
        }

        // Round to nearest 0.5
        hoursInput.value = Math.round(diff * 2) / 2;
    }
}

module.exports = { calculateHours };
