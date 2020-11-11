export default function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("loadend", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.result));
  });
}
