const slugify = (text) => {
  return text.toLowerCase().replace(/\s+/g, "-");
};

export default slugify;