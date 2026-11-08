/** Joins the truthy class names */
const cx = (...classNames: (string | false | null | undefined)[]) =>
  classNames.filter(Boolean).join(' ');

export default cx;
