// app/privacy-policy/page.tsx
export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-6 text-gray-600">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">
            1. Information We Collect
          </h2>
          <p className="mb-3">
            We collect information to provide better services to all our users.
            The types of information we collect include:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, shipping address
            </li>
            <li>
              <strong>Payment Information:</strong> Credit card details, billing
              address (processed securely through our payment processors)
            </li>
            <li>
              <strong>Device Information:</strong> IP address, browser type,
              operating system
            </li>
            <li>
              <strong>Usage Data:</strong> Pages visited, products viewed, time
              spent on site
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            2. How We Use Your Information
          </h2>
          <p className="mb-3">
            We use the information we collect for various purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>To process and fulfill your orders</li>
            <li>To communicate with you about your account or orders</li>
            <li>To improve our website and services</li>
            <li>To prevent fraud and enhance security</li>
            <li>For marketing and promotional purposes (with your consent)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Data Sharing</h2>
          <p className="mb-3">
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Service providers who assist with our business operations
              (shipping carriers, payment processors)
            </li>
            <li>Legal authorities when required by law</li>
            <li>Business partners in the event of a merger or acquisition</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Your Rights</h2>
          <p className="mb-3">
            You have certain rights regarding your personal information:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Right to access and receive a copy of your personal data</li>
            <li>Right to request correction of inaccurate data</li>
            <li>Right to request deletion of your personal data</li>
            <li>Right to opt-out of marketing communications</li>
            <li>Right to lodge a complaint with a data protection authority</li>
          </ul>
          <p className="mt-3">
            To exercise these rights, please contact us at
            privacy@hypermart.com.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            5. Cookies and Tracking
          </h2>
          <p className="mb-3">
            We use cookies and similar tracking technologies to enhance your
            experience on our website. You can set your browser to refuse all or
            some cookies, but this may affect website functionality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            6. Changes to This Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className="mt-2">
            Email: privacy@hypermart.com
            <br />
            Phone: 1-800-555-1234
            <br />
            Address: 123 Commerce Street, Suite 100, San Francisco, CA 94107
          </p>
        </section>
      </div>
    </div>
  );
}
