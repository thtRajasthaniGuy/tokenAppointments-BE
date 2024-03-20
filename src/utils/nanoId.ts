// nanoidUtils.js
async function generateCustomId(alphabet, length) {
  let nanoidModule;
  try {
    // Dynamically import nanoid
    nanoidModule = await import("nanoid");
  } catch (error) {
    console.error("Error importing nanoid:", error);
    return null;
  }

  // Extract customAlphabet from the module
  const { customAlphabet } = nanoidModule;

  // Generate the custom alphabet-based ID
  return customAlphabet(alphabet, length)();
}

export { generateCustomId };
