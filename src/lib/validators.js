import validate from 'validate.js';

validate.validators.arrayOfFiles = (value, options, key, attributes) => {
  const errors = [];

  if (!validate.isArray(value)) {
    return 'is not an array';
  }

  let passesFileCheck = true;
  value.forEach((item, i) => {
    if (!item.name || !item.size || !item.type) {
      errors.push(
        `contains item at index ${i} that does not appear to be a file`
      )
    }
  })

  return (errors.length > 0) ? errors : null;
}
