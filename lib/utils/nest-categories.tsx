const removeRootIfInChildren = (categories: any) => {
  // Collect all IDs present in children
  const childIds = new Set();

  const collectChildIds = (children: any) => {
    children.forEach((child: any) => {
      childIds.add(child.id);
      if (child.children) {
        collectChildIds(child.children);
      }
    });
  };

  categories.forEach((category: any) => {
    if (category.children) {
      collectChildIds(category.children);
    }
  });

  // Filter out root categories that exist in childIds
  return categories
    .filter((category: any) => !childIds.has(category.id))
    .map((category: any) => ({
      ...category,
      children: category.children ? removeRootIfInChildren(category.children) : [],
    }));
};


export default removeRootIfInChildren;