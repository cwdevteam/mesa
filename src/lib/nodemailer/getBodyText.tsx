export const getEmailHtmlText = (
  name: string,
  description: string,
  link: string
) => {
  return `
      <p>Hi there,</p>
      <p><strong>${name}</strong> has invited you to join his Project</p>
      <p>You can be a part of <strong>${name}'s</strong> project</p>
      <p><strong>description:</strong> ${description}</p>
      <p>Join the project. </p>
      <p>Link: ${link} </p>
      <p>Thanks, Mesa Team</p>
    `;
};
