const classNames = (classes: Array<string|undefined|false|null>): string => classes.filter((el) => el).join(' ');

export default classNames;
