import { useState } from "react";

export default function SelfRegistration() {
  // State to manage form input
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    phone: "",
    email: "",
    branch: "",
    yearOfStudy: "",
    isPCCOE: false, // To check if student is from PCCOE
    event: "",
    role: "",
    attendance: false,
    specialRequirements: "",
    fees: 0,
    paymentMethod: "", // To hold the selected payment method
  });

  // State for the receipt
  const [receipt, setReceipt] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate receipt data
    const receiptData = {
      name: `${formData.firstName} ${formData.lastName}`,
      studentId: formData.studentId,
      email: formData.email,
      branch: formData.branch,
      yearOfStudy: formData.yearOfStudy,
      isPCCOE: formData.isPCCOE,
      fees: formData.fees,
      role: formData.role,
      specialRequirements: formData.specialRequirements,
      paymentMethod: formData.paymentMethod,
      attendance: formData.attendance,
    };

    // Set the receipt state
    setReceipt(receiptData);

    if (formData.isPCCOE || formData.fees === 0) {
      // Send receipt if PCCOE student or fees are zero
      await sendReceiptEmail(receiptData);
      alert("Form submitted successfully! Receipt sent to your email.");
    } else {
      // Redirect to payment page if not PCCOE student and fees apply
      window.location.href = `/payment?amount=${formData.fees}&method=${formData.paymentMethod}`;
    }
  };

  // Update form data state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Set fee based on whether the student is from PCCOE
    if (name === "isPCCOE") {
      setFormData((prevState) => ({
        ...prevState,
        fees: checked ? 0 : 500, // Example: non-PCCOE students pay 500 (this can be dynamic based on event)
      }));
    }
  };

  // Function to send an automatic receipt email (mocked for now)
  const sendReceiptEmail = async (receiptData) => {
    // Mocked email sending function (replace with actual email API integration)
    console.log("Sending receipt email to", receiptData.email);
    // You can use email APIs like SendGrid, Mailgun, or nodemailer in a real scenario.
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto">
          <h1 className="text-white text-3xl font-bold">PCCOE Event & Inventory Management</h1>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">Self-Registration & Attendance</h2>
          <p className="mt-4 text-lg">Register for upcoming events or mark attendance manually.</p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Register for Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter your last name"
                  required
                />
              </div>

              {/* Student ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter your student ID"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Branch/Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Branch/Department</label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                >
                  <option value="">Choose your branch</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Electronics Engineering">Electronics Engineering</option>
                  {/* Add more branches as needed */}
                </select>
              </div>

              {/* Year of Study */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Year of Study</label>
                <select
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                >
                  <option value="">Choose your year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              {/* Is Student from PCCOE */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPCCOE"
                  checked={formData.isPCCOE}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Are you a PCCOE student?
                </label>
              </div>

              {/* Fee Section */}
              {!formData.isPCCOE && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Event Fees</label>
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                    readOnly
                  />
                  <p className="text-sm text-gray-500">
                    The fees are based on the event details provided by the coordinators.
                  </p>
                </div>
              )}

              {/* Event Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Event</label>
                <select
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                >
                  <option value="">Select an event</option>
                  <option value="Tech Fest">Tech Fest</option>
                  <option value="Cultural Fest">Cultural Fest</option>
                  <option value="Sports Day">Sports Day</option>
                </select>
              </div>

              {/* Role in Event */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Role in Event</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                >
                  <option value="">Select your role</option>
                  <option value="Participant">Participant</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Organizer">Organizer</option>
                </select>
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Special Requirements</label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Any special requirements?"
                />
              </div>

              {/* Attendance Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="attendance"
                  checked={formData.attendance}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Mark attendance
                </label>
              </div>

              {/* Payment Method Selection */}
              {!formData.isPCCOE && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                  >
                    <option value="">Select payment method</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="UPI">UPI</option>
                  </select>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>

              {/* Payment Button for non-PCCOE students */}
              {!formData.isPCCOE && (
                <button
                  type="button"
                  onClick={() => window.location.href = `/payment?amount=${formData.fees}&method=${formData.paymentMethod}`}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 mt-4"
                >
                  Pay Fees
                </button>
              )}
            </form>

            {/* Display Receipt if available */}
{receipt && (
  <div className="mt-8 p-4 border border-gray-300 rounded-md bg-gray-100">
    <h3 className="text-lg font-bold">Receipt</h3>
    <p className="text-green-600 font-semibold">Your seat has been confirmed!</p>
    <p><strong>Name:</strong> {receipt.name}</p>
    <p><strong>Student ID:</strong> {receipt.studentId}</p>
    <p><strong>Email:</strong> {receipt.email}</p>
    <p><strong>Branch:</strong> {receipt.branch}</p>
    <p><strong>Year of Study:</strong> {receipt.yearOfStudy}</p>
    <p><strong>Role:</strong> {receipt.role}</p>
    <p><strong>Special Requirements:</strong> {receipt.specialRequirements || 'None'}</p>
    <p><strong>Attendance Marked:</strong> {receipt.attendance ? 'Yes' : 'No'}</p>
    <p><strong>Fees:</strong> ₹{receipt.fees}</p>
    <p><strong>Payment Method:</strong> {receipt.paymentMethod || 'N/A'}</p>
  </div>
)}

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 p-6 text-white text-center">
        © 2024 PCCOE Event & Inventory Management. All rights reserved.
      </footer>
    </div>
  );
}
