// THROW
const x = 7;

if (!Number.isInteger(x)) {
  throw new Error("EKB Personalized Error: Number is not Integer.");
  console.log("DOES NOT CONTINUE CODE");
}
console.log(`${x} * 8 = ${x * 8}`);

console.log("=".repeat(30));
// TRY CATCH

try {
  x = 2;
} catch (error) {
  console.log(`Err: ${error}`);
}
console.log("CONTINUES CODE.");
