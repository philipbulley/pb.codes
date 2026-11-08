/** Joins the truthy class names */
const cx = (...classNames) => classNames.filter(Boolean).join(' ');

export default cx;
