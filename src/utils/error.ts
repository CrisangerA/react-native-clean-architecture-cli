export function manageAppErrors(error: any, origin: string) {
  console.log('Error origin:', origin);
  
  return error instanceof Error ? error : new Error(error);
}