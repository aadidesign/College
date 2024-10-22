export const generateApprovalLink = (token) => {
    return `${process.env.BASE_URL}/api/application/approve/${token}`;
  };
  