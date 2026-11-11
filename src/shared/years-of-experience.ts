// First professional role: September 1999. Ticks over each September.
const yearsOfExperience = (date: Date) =>
  date.getFullYear() - 1999 - (date.getMonth() < 8 ? 1 : 0);

export default yearsOfExperience;
