export async function saveFile(file: File): Promise<string> {
  const fileName = file.name.replaceAll(" ", "_");
  const uuid = Bun.randomUUIDv7();
  const fileComposedName = `${uuid}.${fileName}`;
  const filePath = `./uploads/${fileComposedName}`;

  await Bun.write(filePath, file);
  return fileComposedName;
}
