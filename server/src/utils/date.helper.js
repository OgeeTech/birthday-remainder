exports.isBirthdayToday = (dob) => {
    const today = new Date();
    return (
        today.getDate() === dob.getDate() &&
        today.getMonth() === dob.getMonth()
    );
};
