import Application from '../models/Application';
import { sendMail } from '../lib/sendMail';
import { generateApprovalLink } from '../utils/helpers';

export const processApproval = async (token, action, role, rejectReason) => {
  const application = await Application.findOne({ approvalToken: token });

  if (!application) {
    return { status: 404, message: { message: 'Application not found' } };
  }

  if (application.status !== 'pending' && role !== 'admin') {
    return { status: 400, message: { message: 'Application has already been processed' } };
  }

  if (action === 'approve') {
    application.approval_chain[role].is_approved = true;
    application.approval_chain[role].approved_at = new Date();

    if (role === 'admin') {
      application.status = 'approved';
      await sendMailToClubLead('approved', application);
    } else {
      const allApproved = application.approval_chain.every(approver => approver.is_approved);

      if (allApproved) {
        const adminApprovalLink = generateApprovalLink(application.approvalToken);
        await sendMail({
          to: process.env.ADMIN_EMAIL,
          title: `Application Forwarded to Admin: ${application.title}`,
          message: `All approvers have approved. Admin approval pending: ${adminApprovalLink}`,
        });
      }
    }
  } else if (action === 'reject') {
    application.status = 'rejected';
    application.approval_chain[role].is_approved = false;

    if (role === 'admin') {
      await sendMailToClubLead('rejected', application, rejectReason);
    } else {
      await sendMail({
        to: process.env.CLUB_LEAD_EMAIL,
        title: `Application Rejected: ${application.title}`,
        message: `Rejected by ${role}. Reason: ${rejectReason || 'No reason provided.'}`,
      });
    }
  }

  await application.save();

  return { status: 200, message: { message: `Application ${action}ed successfully` } };
};

// Example mail functions
const sendMailToClubLead = async (status, application, rejectReason = null) => {
  const message =
    status === 'approved'
      ? `Your application titled '${application.title}' has been fully approved.`
      : `Your application titled '${application.title}' was rejected. Reason: ${rejectReason || 'No reason provided.'}`;

  await sendMail({
    to: process.env.CLUB_LEAD_EMAIL,
    title: `Application ${status.charAt(0).toUpperCase() + status.slice(1)}: ${application.title}`,
    message,
  });
};
