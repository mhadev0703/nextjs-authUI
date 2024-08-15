"use server";

export async function handleForm(prevState: any, formData: FormData) {
  console.log(prevState);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const password = formData.get('password');
  if (password !== '12345') {
    return {
      errors: ['wrong password'],
    };
  }

  return {
    errors: [],
  };
}