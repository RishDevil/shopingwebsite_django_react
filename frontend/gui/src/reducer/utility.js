export const updateObject = (oldObject, updatedProperty) => {
  console.log("updateobject");
  return {
    ...oldObject,
    ...updatedProperty
  };
};
